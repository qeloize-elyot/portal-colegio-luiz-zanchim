"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import {
  PageHeroBanner,
  SugestoesIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

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
      const res = await fetch("/api/moderar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });

      const analise = await res.json();

      if (!analise.permitido) {
        setStatus("erro");
        setMensagemErro(
          analise.motivo ||
            "Seu texto contém linguagem que não está de acordo com as regras de convivência da escola. Por favor, reescreva de forma respeitosa."
        );
        return;
      }

      const supabase = getSupabase();
      const { error } = await supabase.from("feedbacks").insert({
        categoria,
        texto: texto.trim(),
        status: "PENDENTE",
      });

      if (error) throw new Error(error.message);

      setStatus("sucesso");
      setTexto("");
      setCategoria("");
    } catch (err) {
      setStatus("erro");
      setMensagemErro(
        err instanceof Error
          ? err.message
          : "Erro ao enviar. Tente novamente em alguns instantes."
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
          <svg className="w-16 h-16 mx-auto mb-3 svg-float" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" fill="#2f6f4e" />
            <path d="M20 32l8 8 16-16" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-bold text-lg text-secondary mb-2">Enviado com sucesso!</p>
          <p className="text-sm text-muted mb-5">
            Sua mensagem passou pela moderação e será analisada com atenção pela administração.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs relative overflow-hidden"
        >
          <svg
            className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-10"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="40" stroke="#2f6f4e" strokeWidth="4" strokeDasharray="8 6" />
          </svg>

          <div>
            <label htmlFor="categoria" className="block text-sm font-bold text-foreground mb-1.5">
              Categoria da mensagem *
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
              required
            >
              <option value="">Selecione uma área...</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="texto" className="block text-sm font-bold text-foreground mb-1.5">
              Sua mensagem anônima *
            </label>
            <textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="w-full border border-border rounded-xl px-3.5 py-2.5 resize-y text-sm bg-background/60"
              placeholder="Descreva sua sugestão, elogio ou reclamação de forma clara e respeitosa..."
              required
              minLength={10}
            />
            <p className="text-xs text-muted mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
              Mínimo de 10 caracteres. Mensagens ofensivas são filtradas automaticamente pela IA.
            </p>
          </div>

          {status === "erro" && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl">
              {mensagemErro}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "enviando"}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-xs"
          >
            {status === "enviando" ? "Analisando e enviando..." : "Enviar mensagem anônima"}
          </button>
        </form>
      )}

      <WaveDivider color="#2f6f4e" />
    </div>
  );
}
