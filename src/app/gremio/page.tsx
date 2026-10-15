"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";
import {
  PageHeroBanner,
  GremioIllustration,
  EmptyStateIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  created_at: string;
};

export default function GremioPage() {
  const { isProfessor, isAdmin, userId } = useRole();
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
      setErro(error.message);
      return;
    }
    setTitulo("");
    setConteudo("");
    await carregar();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Protagonismo Estudantil"
        title="Painel do Grêmio"
        subtitle="Acompanhe comunicados oficiais, campanhas, gincanas, projetos culturais e novidades da comunidade estudantil."
        accentColor="#c45c26"
        softBg="#fdf6d9"
        illustration={<GremioIllustration />}
      />

      {podePublicar && (
        <form onSubmit={publicar} className="bg-card border border-border rounded-3xl p-6 mb-8 space-y-3 shadow-2xs">
          <h2 className="font-bold text-sm flex items-center gap-2 text-primary">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Nova publicação no mural
          </h2>
          <input
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do comunicado ou evento"
            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm bg-background/50"
          />
          <textarea
            required
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            rows={4}
            placeholder="Escreva o comunicado... Pode colar também um link de foto."
            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm bg-background/50"
          />
          {erro && <p className="text-sm text-red-700">{erro}</p>}
          <button
            type="submit"
            disabled={enviando}
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark disabled:opacity-60"
          >
            {enviando ? "Publicando..." : "Publicar no mural"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-muted text-sm">Carregando...</p>
      ) : posts.length === 0 ? (
        <EmptyStateIllustration label="Nenhuma publicação no mural do Grêmio ainda." />
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <article
              key={p.id}
              className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden hover:border-primary/50 transition-colors"
            >
              <svg
                className="pointer-events-none absolute -right-4 -top-4 w-24 h-24 opacity-10"
                viewBox="0 0 80 80"
                fill="none"
              >
                <polygon points="40,8 48,28 70,28 52,42 58,64 40,50 22,64 28,42 10,28 32,28" fill="#e6b422" />
              </svg>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-accent-soft text-foreground px-2.5 py-0.5 rounded-full border border-border">
                  Comunicado Oficial
                </span>
                <time className="text-xs text-muted">
                  {new Date(p.created_at).toLocaleString("pt-BR")}
                </time>
              </div>
              <h2 className="font-bold text-lg text-foreground mb-2">{p.titulo}</h2>
              <p className="text-sm text-muted whitespace-pre-wrap leading-relaxed">{p.conteudo}</p>
            </article>
          ))}
        </div>
      )}

      <WaveDivider color="#e6b422" />
    </div>
  );
}
