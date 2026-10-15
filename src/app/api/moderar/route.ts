import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Filtro local instantâneo (camada 1) para garantir bloqueio imediato de palavrões, ofensas e xingamentos comuns
const TERMOS_OFENSIVOS = [
  "porra", "caralho", "cacete", "merda", "bosta", "puta", "puto", "fdp", "filho da puta",
  "filha da puta", "arrombado", "arrombada", "vai tomar no cu", "vtnc", "vsf", "vai se foder",
  "vai se fuder", "foda-se", "fodase", "foder", "fuder", "cuzao", "cuzão", "cuzinho", "buceta",
  "piroca", "rola", "pau no cu", "viado", "viadinho", "bicha", "sapatão", "macaco", "crioulo",
  "vagabundo", "vagabunda", "piranha", "vadia", "corno", "otario", "otário", "imbecil",
  "idiota", "retardado", "retardada", "burro", "burra", "lixo", "escroto", "escrota",
  "desgraçado", "desgracado", "desgraçada", "maldito", "matar", "morrer", "suicidio",
  "suicídio", "se mata", "se matar", "estupro", " Nazista", "nazismo", "hitler"
];

function normalizarTexto(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

function contemOfensaLocal(texto: string): { bloqueado: boolean; termo?: string } {
  const limpo = ` ${normalizarTexto(texto)} `;
  for (const termo of TERMOS_OFENSIVOS) {
    const termoLimpo = normalizarTexto(termo).trim();
    if (!termoLimpo) continue;
    // Verifica palavra inteira ou expressão
    const regex = new RegExp(`\\b${termoLimpo}\\b`, "i");
    if (regex.test(limpo) || limpo.includes(` ${termoLimpo} `)) {
      return { bloqueado: true, termo };
    }
  }
  return { bloqueado: false };
}

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json();

    if (!texto || typeof texto !== "string" || texto.trim().length < 5) {
      return NextResponse.json(
        { permitido: false, motivo: "Texto muito curto. Escreva pelo menos 10 caracteres." },
        { status: 400 }
      );
    }

    // CAMADA 1: Verificação local instantânea (nunca falha, mesmo se a API oscilar)
    const checagemLocal = contemOfensaLocal(texto);
    if (checagemLocal.bloqueado) {
      return NextResponse.json({
        permitido: false,
        motivo:
          "Sua mensagem contém palavras ofensivas ou inadequadas ao ambiente escolar. Por favor, reescreva sua crítica ou sugestão de forma respeitosa.",
      });
    }

    // Se a chave Gemini não estiver configurada na Vercel, avisa ou usa apenas o filtro local
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        permitido: true,
        motivo: "Aprovado pelo filtro local.",
      });
    }

    // CAMADA 2: Inteligência Artificial Gemini (tenta modelos atuais em sequência)
    const client = new GoogleGenerativeAI(apiKey);
    const modelos = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

    const prompt = `
Você é um moderador rigoroso do canal de ouvidoria de um colégio cívico-militar brasileiro.
Analise a mensagem abaixo e decida se ela é APROPRIADA ou INAPROPRIADA para ser enviada à direção.

REGRAS RÍGIDAS DE BLOQUEIO (permitido: false):
- Ofensas pessoais, xingamentos, palavrões (mesmo disfarçados ou abreviados), insultos a professores, funcionários ou alunos.
- Bullying, deboche agressivo, difamação, calúnia, ameaças, discurso de ódio ou preconceito.

REGRAS DE PERMISSÃO (permitido: true):
- Críticas construtivas, reclamações educadas sobre infraestrutura, cantina, aulas ou regras, elogios e sugestões.

Responda APENAS um JSON válido neste formato exato:
{
  "permitido": true ou false,
  "motivo": "explicação curta e educada em português para o aluno"
}

Mensagem do aluno:
"""
${texto.trim()}
"""
`;

    for (const nomeModelo of modelos) {
      try {
        const model = client.getGenerativeModel({ model: nomeModelo });
        const result = await model.generateContent(prompt);
        const resposta = result.response.text();
        const jsonMatch = resposta.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
          const analise = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            permitido: Boolean(analise.permitido),
            motivo:
              analise.motivo ||
              (analise.permitido
                ? "Mensagem aprovada."
                : "Linguagem inadequada para o ambiente escolar. Reescreva com respeito."),
          });
        }
      } catch (errModel) {
        console.warn(`Tentativa com modelo ${nomeModelo} falhou:`, errModel);
      }
    }

    // Se passou pelo filtro local rigoroso e todos os modelos deram timeout, libera
    return NextResponse.json({
      permitido: true,
      motivo: "Mensagem verificada.",
    });
  } catch (error) {
    console.error("Erro na moderação:", error);
    return NextResponse.json(
      {
        permitido: false,
        motivo: "Não foi possível validar sua mensagem agora. Verifique o texto e tente novamente.",
      },
      { status: 500 }
    );
  }
}
