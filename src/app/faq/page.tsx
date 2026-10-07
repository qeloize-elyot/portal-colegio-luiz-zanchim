"use client";

import { useState } from "react";

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Perguntas Frequentes</h1>
      <p className="text-muted mb-6">
        Tire dúvidas sobre regimento interno, atestados, horários e procedimentos
        administrativos.
      </p>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Buscar por palavra-chave..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        {filtrados.length === 0 && (
          <p className="text-muted text-sm">Nenhum resultado encontrado.</p>
        )}
        {filtrados.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white border border-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-gray-50"
              onClick={() => setAberto(aberto === idx ? null : idx)}
              aria-expanded={aberto === idx}
            >
              <div>
                <span className="text-xs text-primary font-medium mr-2">
                  {faq.categoria}
                </span>
                <span className="font-medium text-sm">{faq.pergunta}</span>
              </div>
              <svg
                className={`w-5 h-5 shrink-0 transition-transform ${aberto === idx ? "rotate-180" : ""}`}
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
              <div className="px-4 pb-4 text-sm text-foreground leading-relaxed border-t border-border pt-3">
                {faq.resposta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
