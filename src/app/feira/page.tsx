"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

type Anuncio = {
  id: string;
  titulo: string;
  descricao: string | null;
  tipo: string;
  contato: string | null;
  created_at: string;
};

export default function FeiraPage() {
  const [lista, setLista] = useState<Anuncio[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("TROCA");
  const [contato, setContato] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    const supabase = getSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) setUserId(user.id);

    const { data } = await supabase
      .from("feira")
      .select("*")
      .order("created_at", { ascending: false });
    setLista(data || []);
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setEnviando(true);
    setErro("");
    const supabase = getSupabase();
    const { error } = await supabase.from("feira").insert({
      titulo: titulo.trim(),
      descricao: descricao.trim() || null,
      tipo,
      contato: contato.trim() || null,
      autor_id: userId,
    });
    setEnviando(false);
    if (error) {
      setErro(error.message + " — rode o schema_extra.sql no Supabase se a tabela não existir.");
      return;
    }
    setTitulo("");
    setDescricao("");
    setContato("");
    await carregar();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Feira de Trocas</h1>
      <p className="text-muted mb-6 text-sm">
        Anuncie doações, trocas ou vendas de livros e uniformes entre alunos.
      </p>

      <form onSubmit={publicar} className="bg-card border border-border rounded-2xl p-5 mb-8 space-y-3">
        <h2 className="font-bold text-sm">Novo anúncio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título (ex: Livro de Matemática 2º ano)"
            className="border border-border rounded-xl px-3 py-2 text-sm"
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border border-border rounded-xl px-3 py-2 text-sm"
          >
            <option value="DOACAO">Doação</option>
            <option value="TROCA">Troca</option>
            <option value="VENDA">Venda</option>
          </select>
        </div>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={2}
          placeholder="Descrição (opcional)"
          className="w-full border border-border rounded-xl px-3 py-2 text-sm"
        />
        <input
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          placeholder="Contato (turma, WhatsApp, etc.)"
          className="w-full border border-border rounded-xl px-3 py-2 text-sm"
        />
        {erro && <p className="text-sm text-red-700">{erro}</p>}
        <button
          type="submit"
          disabled={enviando || !userId}
          className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-primary-dark disabled:opacity-60"
        >
          {enviando ? "Publicando..." : "Publicar anúncio"}
        </button>
      </form>

      {loading ? (
        <p className="text-muted text-sm">Carregando...</p>
      ) : lista.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-8 text-center text-muted text-sm">
          Nenhum anúncio ainda. Seja o primeiro!
        </div>
      ) : (
        <div className="space-y-3">
          {lista.map((a) => (
            <article key={a.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex flex-wrap gap-2 mb-1">
                <span className="text-[11px] font-semibold bg-secondary-soft text-secondary px-2 py-0.5 rounded-full">
                  {a.tipo}
                </span>
                <span className="text-[11px] text-muted">
                  {new Date(a.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <h3 className="font-bold text-foreground">{a.titulo}</h3>
              {a.descricao && <p className="text-sm text-muted mt-1">{a.descricao}</p>}
              {a.contato && (
                <p className="text-xs text-primary mt-2">Contato: {a.contato}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
