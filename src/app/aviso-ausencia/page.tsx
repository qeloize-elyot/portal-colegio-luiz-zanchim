"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

type Aviso = {
  id: string;
  professor_id: string;
  professor_nome: string;
  tipo: string;
  data: string;
  turno: string | null;
  motivo: string | null;
  atestado_url: string | null;
  status: string;
  created_at: string;
};

export default function AvisoAusenciaPage() {
  const { role, userId, email, loading: roleLoading, isProfessor } = useRole();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    tipo: "FALTA",
    data: new Date().toISOString().slice(0, 10),
    turno: "MANHA",
    motivo: "",
    atestado_url: "",
  });

  async function carregar() {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from("avisos_ausencia")
        .select("*")
        .order("data", { ascending: false })
        .limit(50);
      setAvisos((data as Aviso[]) || []);
    } catch {
      setAvisos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!isProfessor || !userId) {
      setMsg("Apenas professores podem registrar aviso de ausência.");
      return;
    }
    setMsg("");
    try {
      const supabase = getSupabase();
      const nome = email?.split("@")[0] || "Professor";
      const { error } = await supabase.from("avisos_ausencia").insert({
        professor_id: userId,
        professor_nome: nome,
        tipo: form.tipo,
        data: form.data,
        turno: form.turno,
        motivo: form.motivo || null,
        atestado_url: form.atestado_url || null,
        status: "PENDENTE",
      });
      if (error) throw error;
      setMsg("Aviso enviado para a equipe pedagógica.");
      setForm({ ...form, motivo: "", atestado_url: "" });
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro ao enviar");
    }
  }

  async function atualizarStatus(id: string, status: string) {
    if (role !== "ADMIN") return;
    const supabase = getSupabase();
    await supabase.from("avisos_ausencia").update({ status }).eq("id", id);
    carregar();
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3E8]">
        <p className="font-bold">Carregando...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-[#0F1E36] pb-16"
      style={{
        backgroundColor: "#F7F3E8",
        backgroundImage: "radial-gradient(#0F1E36 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 pt-8">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#E04F33] bg-[#FFF0E5] border-2 border-[#0F1E36] px-3 py-1 rounded-lg shadow-[2px_2px_0_#0F1E36]">
          Comunicação docente
        </span>
        <h1 className="mt-3 text-3xl font-black">Aviso de Ausência ou Atraso</h1>
        <p className="mt-2 text-sm opacity-75 font-medium">
          Canal direto para professores notificarem faltas, atrasos e enviarem atestados. A equipe pedagógica organiza substituições com agilidade.
        </p>

        {isProfessor && (
          <form
            onSubmit={enviar}
            className="mt-8 bg-white border-[3px] border-[#0F1E36] rounded-2xl p-6 shadow-[6px_6px_0_#E04F33] space-y-3"
          >
            <h2 className="text-lg font-black">Registrar aviso</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-black mb-1">Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                >
                  <option value="FALTA">Falta</option>
                  <option value="ATRASO">Atraso</option>
                  <option value="ATESTADO">Atestado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black mb-1">Data</label>
                <input
                  type="date"
                  required
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                  className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-black mb-1">Turno</label>
                <select
                  value={form.turno}
                  onChange={(e) => setForm({ ...form, turno: e.target.value })}
                  className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                >
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                  <option value="INTEGRAL">Integral</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-black mb-1">Motivo (opcional)</label>
              <textarea
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                rows={2}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">Link do atestado (Drive/PDF)</label>
              <input
                value={form.atestado_url}
                onChange={(e) => setForm({ ...form, atestado_url: e.target.value })}
                placeholder="https://..."
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
            </div>
            {msg && <p className="text-sm font-bold text-[#15803D]">{msg}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#E04F33] text-white font-black border-2 border-[#0F1E36] shadow-[3px_3px_0_#0F1E36]"
            >
              Enviar aviso
            </button>
          </form>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-black mb-4">Avisos recentes</h2>
          {loading ? (
            <p className="text-sm">Carregando...</p>
          ) : avisos.length === 0 ? (
            <p className="text-sm opacity-70">Nenhum aviso registrado.</p>
          ) : (
            <ul className="space-y-3">
              {avisos.map((a) => (
                <li
                  key={a.id}
                  className="bg-white border-2 border-[#0F1E36] rounded-xl p-4 shadow-[2px_2px_0_#0F1E36]"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#FFF0E5] border border-[#0F1E36]">
                      {a.tipo}
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#EBF3FF] border border-[#0F1E36]">
                      {a.status}
                    </span>
                    <span className="text-xs font-bold opacity-70">{a.data}</span>
                  </div>
                  <p className="font-black text-sm">{a.professor_nome}</p>
                  <p className="text-sm opacity-80">
                    {a.turno === "MANHA" ? "Manhã" : a.turno === "TARDE" ? "Tarde" : a.turno || "—"}
                    {a.motivo ? ` · ${a.motivo}` : ""}
                  </p>
                  {a.atestado_url && (
                    <a
                      href={a.atestado_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-[#2554C7] underline"
                    >
                      Ver atestado
                    </a>
                  )}
                  {role === "ADMIN" && a.status === "PENDENTE" && (
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => atualizarStatus(a.id, "CIENTE")}
                        className="text-xs font-black px-3 py-1 rounded-lg bg-[#E6F8EF] border-2 border-[#0F1E36]"
                      >
                        Marcar ciente
                      </button>
                      <button
                        type="button"
                        onClick={() => atualizarStatus(a.id, "SUBSTITUIDO")}
                        className="text-xs font-black px-3 py-1 rounded-lg bg-[#FFF8DB] border-2 border-[#0F1E36]"
                      >
                        Substituído
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
