"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

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
      // 1. Moderação com Gemini
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

      // 2. Salvar no banco (sem identificação do usuário)
      const { error } = await supabase.from("feedbacks").insert({
        categoria,
        texto: texto.trim(),
        status: "PENDENTE",
      });

      if (error) {
        throw new Error(error.message);
      }

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
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Sugestões e Reclamações
      </h1>
      <p className="text-muted mb-6 text-[15px] leading-relaxed">
        Canal anônimo e moderado. Seu envio não registra identificação pessoal.
        A equipe administrativa recebe apenas o conteúdo aprovado.
      </p>

      {status === "sucesso" ? (
        <div className="bg-secondary-soft border border-border rounded-2xl p-6 text-center">
          <p className="font-semibold text-secondary mb-2">Enviado com sucesso!</p>
          <p className="text-sm text-muted mb-4">
            Sua mensagem passou pela moderação e será analisada pela administração.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-primary font-medium underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 space-y-5"
        >
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium mb-1.5">
              Categoria *
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-border rounded-xl px-3 py-2.5 bg-white text-sm"
              required
            >
              <option value="">Selecione...</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="texto" className="block text-sm font-medium mb-1.5">
              Sua mensagem *
            </label>
            <textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="w-full border border-border rounded-xl px-3 py-2.5 resize-y text-sm"
              placeholder="Descreva sua sugestão ou reclamação de forma clara e respeitosa..."
              required
              minLength={10}
            />
            <p className="text-xs text-muted mt-1.5">
              Mínimo de 10 caracteres. Mensagens ofensivas são bloqueadas automaticamente.
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
            className="w-full bg-primary text-white font-medium py-2.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {status === "enviando" ? "Analisando e enviando..." : "Enviar mensagem anônima"}
          </button>
        </form>
      )}
    </div>
  );
}
