"use client";

import { useEffect, useState } from "react";
import { useRole } from "@/lib/useRole";
import {
  getEnquetes,
  addEnquete,
  getMeusVotos,
  votarEnquete,
  type DemoEnquete,
} from "@/lib/demo-auth";
import {
  PageHeroBanner,
  EnquetesIllustration,
  EmptyStateIllustration,
} from "@/components/SvgDecorations";

export default function EnquetesPage() {
  const { isAdmin, loading: roleLoading } = useRole();
  const [lista, setLista] = useState<DemoEnquete[]>([]);
  const [votados, setVotados] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [pergunta, setPergunta] = useState("");
  const [opcoesTxt, setOpcoesTxt] = useState("Sim\nNão\nTalvez");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  function carregar() {
    setLista(getEnquetes());
    setVotados(getMeusVotos());
    setLoading(false);
  }

  useEffect(() => {
    if (!roleLoading) carregar();
  }, [roleLoading]);

  function criar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    try {
      const opcoes = opcoesTxt.split("\n").map((o) => o.trim()).filter(Boolean);
      if (!pergunta.trim() || opcoes.length < 2) {
        setErro("Informe a pergunta e pelo menos 2 opções.");
        setEnviando(false);
        return;
      }
      addEnquete(pergunta.trim(), opcoes);
      setPergunta("");
      setOpcoesTxt("Sim\nNão\nTalvez");
      carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar enquete.");
    } finally {
      setEnviando(false);
    }
  }

  function votar(enqueteId: string, index: number) {
    if (votados[enqueteId] !== undefined) return;
    votarEnquete(enqueteId, index);
    carregar();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Participação Estudantil"
        title="Enquetes"
        subtitle="Vote nas enquetes ativas e ajude a decidir ações da escola e do grêmio."
        accentColor="#7c3aed"
        softBg="#f3e8ff"
        illustration={<EnquetesIllustration />}
      />

      {isAdmin && (
        <form onSubmit={criar} className="mb-10 bg-card border border-border rounded-3xl p-6 space-y-4">
          <h2 className="font-bold text-lg">Criar nova enquete</h2>
          <input
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            required
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
            placeholder="Pergunta da enquete"
          />
          <textarea
            value={opcoesTxt}
            onChange={(e) => setOpcoesTxt(e.target.value)}
            rows={4}
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
            placeholder="Uma opção por linha"
          />
          {erro && <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">{erro}</div>}
          <button type="submit" disabled={enviando} className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl disabled:opacity-60">
            {enviando ? "Criando..." : "Publicar enquete"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-muted">Carregando...</p>
      ) : lista.length === 0 ? (
        <div className="text-center py-12">
          <EmptyStateIllustration />
          <p className="mt-4 text-sm text-muted">Nenhuma enquete ativa.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {lista.map((enq) => {
            const total = enq.votos.reduce((a, b) => a + b, 0);
            const jaVotou = votados[enq.id] !== undefined;
            return (
              <article key={enq.id} className="bg-card border border-border rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-4">{enq.pergunta}</h3>
                <ul className="space-y-3">
                  {enq.opcoes.map((op, i) => {
                    const votos = enq.votos[i] || 0;
                    const pct = total > 0 ? Math.round((votos / total) * 100) : 0;
                    const escolhida = votados[enq.id] === i;
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          disabled={jaVotou}
                          onClick={() => votar(enq.id, i)}
                          className={`w-full text-left border rounded-xl px-4 py-3 ${
                            escolhida ? "border-primary bg-primary/10" : "border-border"
                          } ${jaVotou ? "cursor-default" : "cursor-pointer hover:bg-background/80"}`}
                        >
                          <div className="flex justify-between items-center gap-3 mb-1.5">
                            <span className="text-sm font-medium">{op}</span>
                            {jaVotou && (
                              <span className="text-xs text-muted">{votos} · {pct}%</span>
                            )}
                          </div>
                          {jaVotou && (
                            <div className="h-1.5 bg-background rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {jaVotou && (
                  <p className="mt-3 text-xs text-muted">Você já votou. Total: {total} voto{total !== 1 ? "s" : ""}.</p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
