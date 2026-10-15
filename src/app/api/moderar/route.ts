import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
            "Configuração pendente: A variável GEMINI_API_KEY não foi encontrada na Vercel. Adicione a chave em Settings > Environment Variables e faça um Redeploy.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `
Você é o sistema de moderação por Inteligência Artificial da ouvidoria do Colégio Estadual Cívico-Militar Vereador Luiz Zanchim.
Sua missão é analisar profundamente o CONTEXTO, o TOM e a INTENÇÃO da mensagem enviada pelo aluno.

REGRAS RÍGIDAS DE BLOQUEIO (permitido: false):
1. Palavrões e xingamentos explícitos OU camuflados (ex: palavras escritas com números, símbolos, espaços, letras trocadas ou abreviadas para tentar burlar filtros).
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

    // Tenta os modelos atuais do Gemini em ordem
    const modelos = ["gemini-2.5-flash", "gemini-2.0-flash"];
    let ultimoErro = "";

    for (const nomeModelo of modelos) {
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
        console.error(`Erro no modelo ${nomeModelo}:`, ultimoErro);
      }
    }

    // Importante: NUNCA aprova no escuro se a chamada da IA falhar!
    return NextResponse.json(
      {
        permitido: false,
        motivo:
          "A verificação de Inteligência Artificial não pôde validar sua mensagem agora (verifique se a GEMINI_API_KEY na Vercel é válida). Detalhe: " +
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
