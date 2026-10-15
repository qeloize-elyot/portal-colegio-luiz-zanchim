import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Função que descobre automaticamente modelos ativos na conta caso a Google atualize as versões
async function descobrirModelosAtivos(apiKey: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const lista: string[] = (data.models || [])
      .filter(
        (m: { name?: string; supportedGenerationMethods?: string[] }) =>
          m.name &&
          Array.isArray(m.supportedGenerationMethods) &&
          m.supportedGenerationMethods.includes("generateContent") &&
          !m.name.includes("embedding") &&
          !m.name.includes("imagen") &&
          !m.name.includes("veo") &&
          !m.name.includes("tts") &&
          !m.name.includes("audio")
      )
      .map((m: { name: string }) => m.name.replace("models/", ""));

    // Prioriza modelos da linha "flash" (mais rápidos para moderação)
    const flashes = lista.filter((n) => n.includes("flash")).reverse();
    const outros = lista.filter((n) => !n.includes("flash")).reverse();
    return [...flashes, ...outros];
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json();

    if (!texto || typeof texto !== "string" || texto.trim().length < 10) {
      return NextResponse.json(
        {
          permitido: false,
          motivo: "Texto muito curto. Escreva pelo menos 10 caracteres.",
        },
        { status: 400 }
      );
    }

    const apiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      ""
    ).trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          permitido: false,
          motivo:
            "Configuração pendente: A variável GEMINI_API_KEY não foi encontrada na Vercel.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `
Você é o sistema de moderação por Inteligência Artificial da ouvidoria do Colégio Estadual Cívico-Militar Vereador Luiz Zanchim.
Sua missão é analisar profundamente o CONTEXTO, o TOM e a INTENÇÃO da mensagem enviada pelo aluno.

REGRAS RÍGIDAS DE BLOQUEIO (permitido: false):
1. Palavrões e xingamentos explícitos OU camuflados (ex: palavras escritas com números, símbolos, espaços, letras trocadas, erros propositais ou abreviações para tentar burlar filtros).
2. Ofensas sem palavrão: ataques pessoais, humilhação, deboche maldoso, ironia agressiva, diminuição de professores, diretores, militares, funcionários ou colegas (ex: chamar alguém de incompetente, inútil, ridículo, nojento, falar da aparência física ou atacar a honra de alguém).
3. Bullying, cyberbullying, fofoca maldosa, difamação, assédio, preconceito, racismo, homofobia ou intolerância.
4. Ameaças veladas ou diretas, incitação à violência, bagunça ou desrespeito às normas escolares.

REGRAS DE APROVAÇÃO (permitido: true):
- Críticas sérias, reclamações firmes porém respeitosas sobre aulas, provas, infraestrutura, banheiro, ventiladores, quadra, cantina, horários ou administração.
- Sugestões de melhoria e elogios.

Responda ESTRITAMENTE em JSON válido com este formato:
{
  "permitido": boolean,
  "motivo": "Explicação clara e educada em português dizendo por que a mensagem foi bloqueada (ou 'Mensagem aprovada' se permitida)"
}
`;

    // 1. Tenta primeiro o gemini-3.8-flash (pedido pela API) e os modelos mais novos
    const modelosPadrao = [
      "gemini-3.8-flash",
      "gemini-flash-latest",
      "gemini-3-flash-preview",
      "gemini-2.5-flash",
    ];

    // 2. Busca também a lista dinâmica da própria Google caso algum nome mude
    const modelosDescobertos = await descobrirModelosAtivos(apiKey);
    const filaDeModelos = Array.from(
      new Set([...modelosPadrao, ...modelosDescobertos])
    );

    let ultimoErro = "";

    for (const nomeModelo of filaDeModelos) {
      try {
        const model = genAI.getGenerativeModel({
          model: nomeModelo,
          systemInstruction,
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          },
        });

        const result = await model.generateContent(
          `Analise o contexto completo desta mensagem enviada por um estudante:\n"""\n${texto.trim()}\n"""`
        );

        const respostaTexto = result.response.text();
        const jsonMatch = respostaTexto.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
          const analise = JSON.parse(jsonMatch[0]);
          const permitido = Boolean(analise.permitido);

          return NextResponse.json({
            permitido,
            motivo:
              analise.motivo ||
              (permitido
                ? "Mensagem aprovada pela moderação."
                : "O contexto da sua mensagem foi considerado ofensivo ou desrespeitoso. Por favor, reescreva sua crítica de maneira construtiva."),
          });
        }
      } catch (err) {
        ultimoErro = err instanceof Error ? err.message : String(err);
        console.warn(`Modelo ${nomeModelo} indisponível, tentando próximo...`);
      }
    }

    return NextResponse.json(
      {
        permitido: false,
        motivo:
          "A verificação de Inteligência Artificial não pôde validar sua mensagem agora. Detalhe: " +
          ultimoErro,
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Erro fatal na rota /api/moderar:", error);
    return NextResponse.json(
      {
        permitido: false,
        motivo: "Erro ao processar a moderação da mensagem.",
      },
      { status: 500 }
    );
  }
}
