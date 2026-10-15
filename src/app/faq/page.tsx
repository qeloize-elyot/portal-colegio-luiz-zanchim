"use client";

import { useState } from "react";
import {
  PageHeroBanner,
  FaqIllustration,
  EmptyStateIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

const faqs = [
  {
    categoria: "Documentos",
    pergunta: "Como solicitar um atestado de matrícula?",
    resposta:
      "O atestado de matrícula pode ser solicitado na secretaria escolar, de segunda a sexta, das 8h às 17h. É necessário apresentar documento de identificação do aluno ou do responsável.",
  },
  {
    categoria: "Horários",
    pergunta: "Qual o horário de funcionamento da biblioteca?",
    resposta:
      "A biblioteca funciona de segunda a sexta, das 7h30 às 17h. Em períodos de prova o horário pode ser estendido mediante aviso prévio.",
  },
  {
    categoria: "Regimento",
    pergunta: "Qual a política de uso do uniforme?",
    resposta:
      "O uso do uniforme completo é obrigatório em todos os dias de aula e atividades oficiais. Em casos excepcionais, a coordenação deve ser comunicada antecipadamente.",
  },
  {
    categoria: "Documentos",
    pergunta: "Como justificar faltas?",
    resposta:
      "As faltas devem ser justificadas na secretaria em até 48 horas após o retorno do aluno, com apresentação de atestado médico ou declaração do responsável.",
  },
  {
    categoria: "Cantina",
    pergunta: "Existem opções para restrições alimentares?",
    resposta:
      "Sim. Alunos com restrições alimentares devem informar a secretaria no início do ano letivo ou quando houver mudança. A cantina se adapta sempre que possível.",
  },
  {
    categoria: "Horários",
    pergunta: "Qual o horário das aulas?",
    resposta:
      "As aulas do turno matutino iniciam às 7h20 e terminam às 12h. O turno vespertino inicia às 13h20 e termina às 18h. Consulte o horário específico da sua turma na secretaria.",
  },
];

export default function FaqPage() {
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState<number | null>(null);

  const filtrados = faqs.filter(
    (f) =>
      f.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      f.resposta.toLowerCase().includes(busca.toLowerCase()) ||
      f.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Guia Rápido do Estudante"
        title="Perguntas Frequentes"
        subtitle="Tire dúvidas sobre o regimento interno cívico-militar, atestados, horários de aulas e procedimentos da secretaria."
        accentColor="#c45c26"
        softBg="#fdf0e6"
        illustration={<FaqIllustration />}
      />

      <div className="mb-6">
        <input
          type="search"
          placeholder="Buscar dúvida por palavra-chave (ex: uniforme, horário, atestado)..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-lg border border-border bg-white rounded-2xl px-4 py-3 text-sm shadow-2xs focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-3">
        {filtrados.length === 0 && (
          <EmptyStateIllustration label="Nenhuma pergunta encontrada para sua busca." />
        )}
        {filtrados.map((faq, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xs"
          >
            <button
              type="button"
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-primary-soft/40 transition-colors"
              onClick={() => setAberto(aberto === idx ? null : idx)}
              aria-expanded={aberto === idx}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-primary-soft text-primary px-2.5 py-0.5 rounded-full">
                  {faq.categoria}
                </span>
                <span className="font-bold text-sm text-foreground">{faq.pergunta}</span>
              </div>
              <svg
                className={`w-5 h-5 shrink-0 text-primary transition-transform ${aberto === idx ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {aberto === idx && (
              <div className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-border pt-3 bg-background/40">
                {faq.resposta}
              </div>
            )}
          </div>
        ))}
      </div>

      <WaveDivider color="#c45c26" />
    </div>
  );
}
