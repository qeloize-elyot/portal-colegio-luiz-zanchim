"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  created_at: string;
};

export default function GremioPage() {
  const { isProfessor, isAdmin, role, userId, loading: roleLoading } = useRole();
  const [posts, setPosts] = useState<Post[]>([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  const podePublicar = isProfessor || isAdmin;

  async function carregar() {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("gremio_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setPosts(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      setErro("Faça login novamente.");
      return;
    }
    setEnviando(true);
    setErro("");
    const supabase = getSupabase();
    const { error } = await supabase.from("gremio_posts").insert({
      titulo: titulo.trim(),
      conteudo: conteudo.trim(),
      autor_id: userId,
    });
    setEnviando(false);
    if (error) {
      setErro(error.message + " — rode o FIX_EDICAO.sql no Supabase se a tabela não existir.");
      return;
    }
    setTitulo("");
    setConteudo("");
    await carregar();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start gap-3 mb-6">
        <span className="text-4xl">📣</span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Painel do Grêmio</h1>
          <p className="text-muted text-sm">Comunicados e novidades da comunidade estudantil.</p>
          <p className="text-xs text-muted mt-1">
            Seu perfil: <b>{role || "?"}</b>
          </p>
        </div>
      </div>

      {!roleLoading && !podePublicar && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm px-4 py-3 rounded-xl mb-4">
          Publicar no Grêmio é para <b>Professor</b> ou <b>Admin</b>. Seu perfil: <b>{role || "?"}</b>.
        </div>
      )}

      {podePublicar && (
        <form onSubmit={publicar} className="bg-card border border-border rounded-2xl p-5 mb-8 space-y-3">
          <h2 className="font-bold text-sm">Nova publicação</h2>
          <input
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
          <textarea
            required
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            rows={4}
            placeholder="Escreva o comunicado... Pode colar também um link de foto."
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
          {erro && <p className="text-sm text-red-700">{erro}</p>}
          <button
            type="submit"
            disabled={enviando}
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-xl disabled:opacity-60"
          >
            {enviando ? "Publicando..." : "Publicar"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-muted text-sm">Carregando...</p>
      ) : posts.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-8 text-center text-muted text-sm">
          <p className="text-3xl mb-2">📌</p>
          Nenhuma publicação ainda.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <article key={p.id} className="bg-card border border-border rounded-2xl p-5">
              <time className="text-xs text-muted">
                {new Date(p.created_at).toLocaleString("pt-BR")}
              </time>
              <h2 className="font-bold text-foreground mt-1 mb-2">{p.titulo}</h2>
              <p className="text-sm text-muted whitespace-pre-wrap">{p.conteudo}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
