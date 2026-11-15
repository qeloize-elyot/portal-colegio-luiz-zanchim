"use client";

import { useState } from "react";
import {
  PageHeroBanner,
  SugestoesIllustration,
} from "@/components/SvgDecorations";
import { addFeedback } from "@/lib/demo-auth";

const categorias = [
  "Infraestrutura",
  "Pedagógico",
  "Convivência",
  "Outros",
];

export default function SugestoesPage() {
  const [categoria, setCategoria] = useState("");
  const [texto, setTexto] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "sucesso" | "erro">("idle");
  const [mensagemErro, setMensagemErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!categoria || texto.trim().length < 10) {
      setMensagemErro("Selecione uma categoria e escreva pelo menos 10 caracteres.");
      setStatus("erro");
      return;
    }

    setStatus("enviando");
    setMensagemErro("");

    try {
      let permitido = true;
      try {
        const res = await fetch("/api/moderar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto }),
        });
        if (res.ok) {
          const analise = await res.json();
          permitido = Boolean(analise.permitido);
          if (!permitido) {
            setStatus("erro");
            setMensagemErro(
              analise.motivo ||
                "Seu texto contém linguagem que não está de acordo com as regras de convivência da escola."
            );
            return;
          }
        }
      } catch {
        // demo: se moderação falhar, deixa passar
      }

      addFeedback({ categoria, texto: texto.trim() });
      setStatus("sucesso");
      setTexto("");
      setCategoria("");
    } catch (err) {
      setStatus("erro");
      setMensagemErro(
        err instanceof Error ? err.message : "Erro ao enviar. Tente novamente."
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Canal de Escuta Seguro"
        title="Sugestões e Reclamações"
        subtitle="Canal 100% anônimo e moderado. Seu envio não registra identificação pessoal e ajuda a melhorar nossa escola."
        accentColor="#2f6f4e"
        softBg="#e8f3ec"
        illustration={<SugestoesIllustration />}
      />

      {status === "sucesso" ? (
        <div className="bg-secondary-soft border border-secondary/30 rounded-3xl p-8 text-center shadow-2xs">
          <p className="font-bold text-lg text-secondary mb-2">Enviado com sucesso!</p>
          <p className="text-sm text-muted mb-5">
            Sua mensagem será analisada com atenção pela administração.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm bg-primary text-white font-semibold px-5 py-2.5 rounded-xl"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
          <div>
            <label className="block text-sm font-bold mb-1.5">Categoria *</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm"
              required
            >
              <option value="">Selecione...</option>
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5">Mensagem anônima *</label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm"
              placeholder="Descreva de forma clara e respeitosa..."
              required
              minLength={10}
            />
          </div>
          {status === "erro" && mensagemErro && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl">
              {mensagemErro}
            </div>
          )}
          <button
            type="submit"
            disabled={status === "enviando"}
            className="bg-secondary text-white font-semibold px-6 py-2.5 rounded-xl disabled:opacity-60"
          >
            {status === "enviando" ? "Enviando..." : "Enviar mensagem anônima"}
          </button>
        </form>
      )}
    </div>
  );
}
