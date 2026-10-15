"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

type Enquete = {
  id: string;
  pergunta: string;
  opcoes: string[];
  ativa: boolean;
};

export default function EnquetesPage() {
  const [lista, setLista] = useState<Enquete[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [votados, setVotados] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // form admin
  const [pergunta, setPergunta] = useState("");
  const [opcoesTxt, setOpcoesTxt] = useState("Sim\nNão");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

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
      setIsAdmin(profile?.role === "ADMIN");

      const { data: meusVotos } = await supabase
        .from("enquete_votos")
        .select("enquete_id, opcao_index")
        .eq("user_id", user.id);
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
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
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
      setErro(error.message);
      return;
    }
    setPergunta("");
    setOpcoesTxt("Sim\nNão");
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
      <h1 className="text-2xl font-bold text-foreground mb-2">Enquetes</h1>
      <p className="text-muted mb-6 text-sm">
        Participe das votações da escola.
        {isAdmin ? " Como admin, você pode criar novas enquetes." : ""}
      </p>

      {isAdmin && (
        <form onSubmit={criar} className="bg-card border border-border rounded-2xl p-5 mb-8 space-y-3">
          <h2 className="font-bold text-sm">Criar enquete</h2>
          <input
            required
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Pergunta"
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
          <textarea
            required
            value={opcoesTxt}
            onChange={(e) => setOpcoesTxt(e.target.value)}
            rows={3}
            placeholder="Opções (uma por linha)"
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
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
          Nenhuma enquete ativa no momento.
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
