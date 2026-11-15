"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getDemoUser,
  getFeedbacks,
  updateFeedbackStatus,
  type DemoFeedback,
} from "@/lib/demo-auth";
import {
  PageHeroBanner,
  AdminIllustration,
  EmptyStateIllustration,
} from "@/components/SvgDecorations";

export default function AdminPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<DemoFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [autorizado, setAutorizado] = useState(false);
  const [meuRole, setMeuRole] = useState("");

  useEffect(() => {
    const user = getDemoUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setMeuRole(user.role);
    if (user.role !== "ADMIN") {
      setErro(
        `Seu perfil atual é "${user.role}". Apenas ADMIN acessa este painel. Faça logout e crie uma conta de Administrador.`
      );
      setAutorizado(false);
      setLoading(false);
      return;
    }
    setAutorizado(true);
    setFeedbacks(getFeedbacks());
    setLoading(false);
  }, [router]);

  function mudarStatus(id: string, status: DemoFeedback["status"]) {
    updateFeedbackStatus(id, status);
    setFeedbacks(getFeedbacks());
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-muted">
        Carregando painel...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Painel Administrativo"
        title="Administração"
        subtitle="Gerencie sugestões, reclamações e acompanhe o uso do portal."
        accentColor="#15803D"
        softBg="#E6F8EF"
        illustration={<AdminIllustration />}
      />

      {!autorizado ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-3xl p-6 text-sm">
          <p className="font-semibold mb-2">Acesso restrito</p>
          <p>{erro}</p>
          <p className="mt-3">Perfil atual: <strong>{meuRole || "desconhecido"}</strong></p>
          <Link href="/login" className="inline-block mt-4 font-semibold text-primary underline">
            Voltar ao login e escolher perfil ADMIN
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="font-bold text-lg">Sugestões e reclamações</h2>
            <span className="text-xs text-muted">
              {feedbacks.length} registro{feedbacks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <EmptyStateIllustration />
              <p className="mt-4 text-sm text-muted">
                Nenhuma mensagem ainda. Envie uma pela Ouvidoria para testar.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((f) => (
                <article key={f.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                      {f.categoria}
                    </span>
                    <span className="text-[11px] text-muted">
                      {new Date(f.created_at).toLocaleString("pt-BR")}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      {f.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap mb-4">{f.texto}</p>
                  <div className="flex flex-wrap gap-2">
                    {(["PENDENTE", "EM_ANALISE", "RESOLVIDO", "ARQUIVADO"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={f.status === s}
                        onClick={() => mudarStatus(f.id, s)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-border hover:bg-background disabled:opacity-40"
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
