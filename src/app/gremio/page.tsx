"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  created_at: string;
};

export default function GremioPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [podePublicar, setPodePublicar] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  async function carregar() {
    const supabase = getSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      setPodePublicar(profile?.role === "ADMIN" || profile?.role === "PROFESSOR");
    }
    const { data } = await supabase
      .from("gremio_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
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
    const { error } = await supabase.from("gremio_posts").insert({
      titulo: titulo.trim(),
      conteudo: conteudo.trim(),
      autor_id: userId,
    });
    setEnviando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    setTitulo("");
    setConteudo("");
    await carregar();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Painel do Grêmio</h1>
      <p className="text-muted mb-6 text-sm">
        Comunicados, eventos e novidades da comunidade estudantil.
      </p>

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
            rows={3}
            placeholder="Conteúdo"
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
