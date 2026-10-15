"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase/client";

type Feedback = {
  id: string;
  categoria: string;
  texto: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [autorizado, setAutorizado] = useState(false);
  const [aba, setAba] = useState<"feedbacks" | "gestao">("feedbacks");

  useEffect(() => {
    async function carregar() {
      try {
        const supabase = getSupabase();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!profile || profile.role !== "ADMIN") {
          setErro("Acesso restrito à administração.");
          setLoading(false);
          return;
        }

        setAutorizado(true);

        const { data, error } = await supabase
          .from("feedbacks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) setErro(error.message);
        else setFeedbacks(data || []);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro ao carregar.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [router]);

  async function atualizarStatus(id: string, status: string) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("feedbacks")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      );
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-14 text-center text-muted">
        Carregando...
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="max-w-md mx-auto px-4 py-14 text-center">
        <p className="text-muted mb-4">{erro || "Acesso não autorizado."}</p>
        <Link href="/" className="text-primary font-medium underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Painel Administrativo
        </h1>
        <p className="text-muted text-sm">
          Gerencie sugestões, reclamações e conteúdos da escola.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setAba("feedbacks")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            aba === "feedbacks"
              ? "bg-primary text-white"
              : "bg-white border border-border text-foreground hover:border-primary"
          }`}
        >
          Sugestões e reclamações
        </button>
        <button
          type="button"
          onClick={() => setAba("gestao")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            aba === "gestao"
              ? "bg-primary text-white"
              : "bg-white border border-border text-foreground hover:border-primary"
          }`}
        >
          Gestão de conteúdos
        </button>
      </div>

      {aba === "feedbacks" && (
        <>
          {feedbacks.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted">
              Nenhuma mensagem recebida ainda.
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <article
                  key={fb.id}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold bg-primary-soft text-primary px-2.5 py-1 rounded-full">
                      {fb.categoria}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(fb.created_at).toLocaleString("pt-BR")}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        fb.status === "PENDENTE"
                          ? "bg-amber-100 text-amber-800"
                          : fb.status === "RESOLVIDO"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {fb.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                    {fb.texto}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["PENDENTE", "EM_ANALISE", "RESOLVIDO", "ARQUIVADO"].map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => atualizarStatus(fb.id, s)}
                          disabled={fb.status === s}
                          className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary disabled:opacity-40 transition-colors"
                        >
                          {s.replace("_", " ")}
                        </button>
                      )
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {aba === "gestao" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/cardapio"
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors"
          >
            <h3 className="font-bold text-foreground mb-1">Cardápio semanal</h3>
            <p className="text-sm text-muted">
              Visualize e, em breve, edite a programação da cantina.
            </p>
          </Link>
          <Link
            href="/materiais"
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors"
          >
            <h3 className="font-bold text-foreground mb-1">Materiais</h3>
            <p className="text-sm text-muted">
              Como admin, você também pode publicar materiais didáticos.
            </p>
          </Link>
          <Link
            href="/enquetes"
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors"
          >
            <h3 className="font-bold text-foreground mb-1">Enquetes</h3>
            <p className="text-sm text-muted">
              Acompanhe resultados e, em breve, crie novas votações.
            </p>
          </Link>
          <Link
            href="/gremio"
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors"
          >
            <h3 className="font-bold text-foreground mb-1">Grêmio e eventos</h3>
            <p className="text-sm text-muted">
              Comunicados e agenda da comunidade estudantil.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
