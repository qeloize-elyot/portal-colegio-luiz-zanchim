"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

type Enquete = {
  id: string;
  pergunta: string;
  opcoes: string[];
  ativa: boolean;
};

export default function EnquetesPage() {
  const { isAdmin, role, userId, loading: roleLoading } = useRole();
  const [lista, setLista] = useState<Enquete[]>([]);
  const [votados, setVotados] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [pergunta, setPergunta] = useState("");
  const [opcoesTxt, setOpcoesTxt] = useState("Sim\nNão\nTalvez");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const supabase = getSupabase();
      if (userId) {
        const { data: meusVotos } = await supabase
          .from("enquete_votos")
          .select("enquete_id, opcao_index")
          .eq("user_id", userId);
        const map: Record<string, number> = {};
        (meusVotos || []).forEach((v) => {
          map[v.enquete_id] = v.opcao_index;
        });
        setVotados(map);
      }
      const { data } = await supabase
        .from("enquetes")
        .select("*")
        .eq("ativa", true)
        .order("created_at", { ascending: false });
      setLista(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!roleLoading) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleLoading, userId]);

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      setErro("Faça login novamente.");
      return;
    }
    setEnviando(true);
    setErro("");
    const opcoes = opcoesTxt
      .split("\n")
      .map((o) => o.trim())
      .filter(Boolean);
    if (opcoes.length < 2) {
      setErro("Coloque pelo menos 2 opções (uma por linha).");
      setEnviando(false);
      return;
    }
    const supabase = getSupabase();
    const { error } = await supabase.from("enquetes").insert({
      pergunta: pergunta.trim(),
      opcoes,
      ativa: true,
      created_by: userId,
    });
    setEnviando(false);
    if (error) {
      setErro(error.message + " — rode o FIX_EDICAO.sql no Supabase.");
      return;
    }
    setPergunta("");
    setOpcoesTxt("Sim\nNão\nTalvez");
    await carregar();
  }

  async function votar(enqueteId: string, opcaoIndex: number) {
    if (!userId || votados[enqueteId] !== undefined) return;
    const supabase = getSupabase();
    const { error } = await supabase.from("enquete_votos").insert({
      enquete_id: enqueteId,
      user_id: userId,
      opcao_index: opcaoIndex,
    });
    if (!error) {
      setVotados((prev) => ({ ...prev, [enqueteId]: opcaoIndex }));
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start gap-3 mb-6">
        <span className="text-4xl">🗳️</span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Enquetes</h1>
          <p className="text-muted text-sm">
            Participe das votações da escola.
            {isAdmin ? " Como admin, use o formulário abaixo para criar." : ""}
          </p>
          <p className="text-xs text-muted mt-1">
            Seu perfil: <b>{role || "?"}</b>
          </p>
        </div>
      </div>

      {!roleLoading && !isAdmin && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm px-4 py-3 rounded-xl mb-4">
          Criar enquete é só para <b>Admin</b>. Seu perfil: <b>{role || "?"}</b>. Você ainda pode votar nas ativas.
        </div>
      )}

      {isAdmin && (
        <form onSubmit={criar} className="bg-card border border-border rounded-2xl p-5 mb-8 space-y-3">
          <h2 className="font-bold text-sm">Criar enquete</h2>
          <input
            required
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Pergunta da enquete"
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              Opções (uma por linha)
            </label>
            <textarea
              required
              value={opcoesTxt}
              onChange={(e) => setOpcoesTxt(e.target.value)}
              rows={4}
              className="w-full border border-border rounded-xl px-3 py-2 text-sm"
            />
          </div>
          {erro && <p className="text-sm text-red-700">{erro}</p>}
          <button
            type="submit"
            disabled={enviando}
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-xl disabled:opacity-60"
          >
            {enviando ? "Criando..." : "Criar enquete"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-muted text-sm">Carregando...</p>
      ) : lista.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-8 text-center text-muted text-sm">
          <p className="text-3xl mb-2">🗳️</p>
          Nenhuma enquete ativa.
          {isAdmin ? " Crie a primeira no formulário acima." : ""}
        </div>
      ) : (
        <div className="space-y-5">
          {lista.map((eq) => (
            <div key={eq.id} className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-bold text-foreground mb-3">{eq.pergunta}</h2>
              {votados[eq.id] !== undefined ? (
                <p className="text-sm text-secondary">
                  Seu voto: <strong>{eq.opcoes[votados[eq.id]]}</strong>
                </p>
              ) : (
                <div className="space-y-2">
                  {eq.opcoes.map((op, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => votar(eq.id, idx)}
                      className="w-full text-left px-4 py-2.5 border border-border rounded-xl hover:border-primary text-sm"
                    >
                      {op}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
