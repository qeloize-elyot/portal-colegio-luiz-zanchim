"use client";

import { useState } from "react";

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
      // Chama a API de moderação com Gemini
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

      // Se passou na moderação → sucesso
      // (no futuro aqui você salvaria no banco de dados)
      setStatus("sucesso");
      setTexto("");
      setCategoria("");
    } catch (err) {
      setStatus("erro");
      setMensagemErro("Erro ao enviar. Tente novamente em alguns instantes.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">
        Sugestões e Reclamações
      </h1>
      <p className="text-muted mb-6">
        Canal anônimo e moderado por inteligência artificial. Seu envio não
        registra identificação pessoal. A equipe administrativa receberá apenas
        o conteúdo aprovado.
      </p>

      {status === "sucesso" ? (
        <div className="bg-accent-light border border-green-300 rounded-lg p-6 text-center">
          <p className="font-medium text-accent mb-2">Enviado com sucesso!</p>
          <p className="text-sm text-gray-700 mb-4">
            Sua mensagem passou pela moderação e será analisada pela administração.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-primary underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border rounded-lg p-6 space-y-5"
        >
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium mb-1">
              Categoria *
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 bg-white"
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
            <label htmlFor="texto" className="block text-sm font-medium mb-1">
              Sua mensagem *
            </label>
            <textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="w-full border border-border rounded px-3 py-2 resize-y"
              placeholder="Descreva sua sugestão ou reclamação de forma clara e respeitosa..."
              required
              minLength={10}
            />
            <p className="text-xs text-muted mt-1">
              Mínimo de 10 caracteres. Mensagens ofensivas serão bloqueadas
              automaticamente pela inteligência artificial.
            </p>
          </div>

          {status === "erro" && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded">
              {mensagemErro}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "enviando"}
            className="w-full bg-primary text-white font-medium py-2.5 rounded hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {status === "enviando" ? "Analisando e enviando..." : "Enviar mensagem anônima"}
          </button>
        </form>
      )}
    </div>
  );
}
