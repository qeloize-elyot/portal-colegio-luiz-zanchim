import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json();

    if (!texto || typeof texto !== "string" || texto.trim().length < 5) {
      return NextResponse.json(
        { permitido: false, motivo: "Texto muito curto." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      // Se a chave não estiver configurada, permite o envio (modo desenvolvimento)
      return NextResponse.json({
        permitido: true,
        motivo: "Moderação desativada (chave não configurada).",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Você é um moderador de um colégio cívico-militar brasileiro.
Analise o texto abaixo e diga se ele é APROPRIADO ou INAPROPRIADO para ser enviado de forma anônima para a administração da escola.

Regras rígidas:
- BLOQUEAR: ofensas pessoais, xingamentos, discurso de ódio, linguagem chula, difamação, ameaças, bullying, preconceito.
- PERMITIR: críticas construtivas, reclamações respeitosas, sugestões, mesmo que sejam negativas ou apontem problemas.

Responda APENAS com um JSON válido, sem texto extra, no formato:
{
  "permitido": true ou false,
  "motivo": "explicação curta e educada em português"
}

Texto do aluno:
"""
${texto.trim()}
"""
`;

    const result = await model.generateContent(prompt);
    const resposta = result.response.text();

    // Tenta extrair o JSON da resposta
    const jsonMatch = resposta.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Se não conseguir analisar, permite por segurança
      return NextResponse.json({
        permitido: true,
        motivo: "Não foi possível analisar completamente.",
      });
    }

    const analise = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      permitido: Boolean(analise.permitido),
      motivo: analise.motivo || "Análise concluída.",
    });
  } catch (error) {
    console.error("Erro na moderação Gemini:", error);
    // Em caso de erro da API, permite o envio para não bloquear o usuário
    return NextResponse.json({
      permitido: true,
      motivo: "Erro temporário na análise. Mensagem liberada.",
    });
  }
}
