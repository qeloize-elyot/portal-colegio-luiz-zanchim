"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

type DiaCardapio = {
  id: string;
  dia: string;
  lanche: string;
  almoco: string;
};

const ORDEM = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

export default function CardapioPage() {
  const [itens, setItens] = useState<DiaCardapio[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = getSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        setIsAdmin(profile?.role === "ADMIN");
      }

      const { data } = await supabase.from("cardapio").select("*");
      const lista = (data || []).sort(
        (a, b) => ORDEM.indexOf(a.dia) - ORDEM.indexOf(b.dia)
      );
      setItens(lista);
      setLoading(false);
    }
    load();
  }, []);

  function updateLocal(id: string, field: "lanche" | "almoco", value: string) {
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  }

  async function salvar(item: DiaCardapio) {
    setSalvando(item.id);
    setMsg("");
    const supabase = getSupabase();
    const { error } = await supabase
      .from("cardapio")
      .update({ lanche: item.lanche, almoco: item.almoco, updated_at: new Date().toISOString() })
      .eq("id", item.id);
    setSalvando(null);
    setMsg(error ? error.message : "Cardápio salvo!");
  }

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-10 text-muted">Carregando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Cardápio da Cantina</h1>
      <p className="text-muted mb-6 text-sm">
        Programação da semana.
        {isAdmin ? " Você pode editar e salvar cada dia." : " Em caso de restrição alimentar, fale com a secretaria."}
      </p>

      {msg && (
        <p className="mb-4 text-sm text-secondary font-medium">{msg}</p>
      )}

      {itens.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-8 text-center text-muted text-sm">
          Nenhum cardápio cadastrado. Rode o arquivo schema_extra.sql no Supabase.
        </div>
      ) : (
        <div className="space-y-4">
          {itens.map((dia) => (
            <div key={dia.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="bg-primary text-white px-4 py-2.5 font-medium text-sm">
                {dia.dia}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">Lanche da manhã</label>
                  {isAdmin ? (
                    <input
                      value={dia.lanche}
                      onChange={(e) => updateLocal(dia.id, "lanche", e.target.value)}
                      className="w-full border border-border rounded-xl px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-sm">{dia.lanche}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">Almoço</label>
                  {isAdmin ? (
                    <input
                      value={dia.almoco}
                      onChange={(e) => updateLocal(dia.id, "almoco", e.target.value)}
                      className="w-full border border-border rounded-xl px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-sm">{dia.almoco}</p>
                  )}
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => salvar(dia)}
                    disabled={salvando === dia.id}
                    className="text-sm bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark disabled:opacity-60"
                  >
                    {salvando === dia.id ? "Salvando..." : "Salvar este dia"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
