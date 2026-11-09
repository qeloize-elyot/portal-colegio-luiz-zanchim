"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

const HORARIOS = ["1ª aula", "2ª aula", "3ª aula", "4ª aula", "5ª aula"];
const TURNOS = ["MANHA", "TARDE"] as const;
const LABS = ["Lab 1", "Lab 2"] as const;

type Reserva = {
  id: string;
  professor_id: string;
  professor_nome: string;
  lab: string;
  data: string;
  turno: string;
  horario: string;
  turma: string | null;
  disciplina: string | null;
  observacao: string | null;
};

function getWeekDates(base: Date) {
  const d = new Date(base);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return Array.from({ length: 5 }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return x;
  });
}

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

function labelDia(d: Date) {
  return d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });
}

export default function LaboratoriosPage() {
  const { role, userId, email, loading: roleLoading, isProfessor } = useRole();
  const [semanaBase, setSemanaBase] = useState(() => new Date());
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [labFiltro, setLabFiltro] = useState<string>("Lab 1");
  const [turnoFiltro, setTurnoFiltro] = useState<string>("MANHA");
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    data: fmt(new Date()),
    turno: "MANHA",
    horario: "1ª aula",
    lab: "Lab 1",
    turma: "",
    disciplina: "",
    observacao: "",
  });

  const dias = getWeekDates(semanaBase);
  const inicio = fmt(dias[0]);
  const fim = fmt(dias[4]);

  async function carregar() {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from("lab_reservas")
        .select("*")
        .gte("data", inicio)
        .lte("data", fim)
        .order("data")
        .order("horario");
      setReservas((data as Reserva[]) || []);
    } catch {
      setReservas([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inicio, fim]);

  async function reservar(e: React.FormEvent) {
    e.preventDefault();
    if (!isProfessor || !userId) {
      setMsg("Apenas professores e admin podem reservar laboratórios.");
      return;
    }
    setMsg("");
    try {
      const supabase = getSupabase();
      const nome = email?.split("@")[0] || "Professor";
      const { error } = await supabase.from("lab_reservas").insert({
        professor_id: userId,
        professor_nome: nome,
        lab: form.lab,
        data: form.data,
        turno: form.turno,
        horario: form.horario,
        turma: form.turma || null,
        disciplina: form.disciplina || null,
        observacao: form.observacao || null,
      });
      if (error) {
        if (error.code === "23505") {
          setMsg("Já existe reserva neste horário/lab/turno. Zero conflitos ativos.");
        } else {
          setMsg(error.message);
        }
        return;
      }
      setMsg("Reserva confirmada!");
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro ao reservar");
    }
  }

  async function cancelar(id: string, professorId: string) {
    if (professorId !== userId && role !== "ADMIN") return;
    const supabase = getSupabase();
    await supabase.from("lab_reservas").delete().eq("id", id);
    carregar();
  }

  const minhas = reservas.filter((r) => r.professor_id === userId);
  const grade = reservas.filter(
    (r) => r.lab === labFiltro && r.turno === turnoFiltro
  );

  function ocupado(data: string, horario: string) {
    return grade.find((r) => r.data === data && r.horario === horario);
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3E8]">
        <p className="font-bold text-[#0F1E36]">Carregando...</p>
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8">
        <div className="mb-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#2554C7] bg-[#EBF3FF] border-2 border-[#0F1E36] px-3 py-1 rounded-lg shadow-[2px_2px_0_#0F1E36]">
            Gestão escolar
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            Laboratórios de Informática
          </h1>
          <p className="mt-2 text-sm text-[#0F1E36]/75 font-medium max-w-2xl">
            Consulta e agendamento semanal. Zero conflitos: o sistema impede reservas duplicadas no mesmo lab, turno e horário.
          </p>
        </div>

        {/* Controles da semana */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              const d = new Date(semanaBase);
              d.setDate(d.getDate() - 7);
              setSemanaBase(d);
            }}
            className="px-4 py-2 rounded-xl border-2 border-[#0F1E36] bg-white font-black text-sm shadow-[2px_2px_0_#0F1E36]"
          >
            ← Semana anterior
          </button>
          <span className="font-black text-sm px-3 py-2 bg-[#FFF8DB] border-2 border-[#0F1E36] rounded-xl">
            {labelDia(dias[0])} — {labelDia(dias[4])}
          </span>
          <button
            type="button"
            onClick={() => {
              const d = new Date(semanaBase);
              d.setDate(d.getDate() + 7);
              setSemanaBase(d);
            }}
            className="px-4 py-2 rounded-xl border-2 border-[#0F1E36] bg-white font-black text-sm shadow-[2px_2px_0_#0F1E36]"
          >
            Próxima semana →
          </button>
          <select
            value={labFiltro}
            onChange={(e) => setLabFiltro(e.target.value)}
            className="px-3 py-2 rounded-xl border-2 border-[#0F1E36] bg-white font-bold text-sm"
          >
            {LABS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            value={turnoFiltro}
            onChange={(e) => setTurnoFiltro(e.target.value)}
            className="px-3 py-2 rounded-xl border-2 border-[#0F1E36] bg-white font-bold text-sm"
          >
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
          </select>
        </div>

        {/* Visão semanal */}
        <div className="overflow-x-auto mb-10 rounded-2xl border-[3px] border-[#0F1E36] bg-white shadow-[6px_6px_0_#0F1E36]">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-[#0F1E36] text-white">
                <th className="p-3 text-left font-black">Horário</th>
                {dias.map((d) => (
                  <th key={fmt(d)} className="p-3 text-center font-black">
                    {labelDia(d)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HORARIOS.map((h) => (
                <tr key={h} className="border-t-2 border-[#0F1E36]/15">
                  <td className="p-3 font-black bg-[#F7F3E8]">{h}</td>
                  {dias.map((d) => {
                    const cell = ocupado(fmt(d), h);
                    return (
                      <td key={fmt(d) + h} className="p-2 text-center align-top">
                        {loading ? (
                          <span className="text-xs opacity-50">...</span>
                        ) : cell ? (
                          <div className="bg-[#EBF3FF] border-2 border-[#2554C7] rounded-lg p-2 text-left">
                            <div className="font-black text-xs">{cell.professor_nome}</div>
                            <div className="text-[11px] opacity-80">
                              {cell.turma || "—"} · {cell.disciplina || "—"}
                            </div>
                            {(cell.professor_id === userId || role === "ADMIN") && (
                              <button
                                type="button"
                                onClick={() => cancelar(cell.id, cell.professor_id)}
                                className="mt-1 text-[10px] font-bold text-red-600 underline"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-green-700 font-bold">Livre</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Meus horários */}
        {isProfessor && (
          <div className="mb-10">
            <h2 className="text-xl font-black mb-3">Meus horários (esta semana)</h2>
            {minhas.length === 0 ? (
              <p className="text-sm opacity-70">Nenhuma reserva sua nesta semana.</p>
            ) : (
              <ul className="space-y-2">
                {minhas.map((r) => (
                  <li
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-2 bg-white border-2 border-[#0F1E36] rounded-xl px-4 py-3 shadow-[2px_2px_0_#0F1E36]"
                  >
                    <span className="font-bold text-sm">
                      {r.data} · {r.turno === "MANHA" ? "Manhã" : "Tarde"} · {r.horario} · {r.lab}
                      {r.turma ? ` · ${r.turma}` : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => cancelar(r.id, r.professor_id)}
                      className="text-xs font-black text-red-600 underline"
                    >
                      Cancelar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Formulário de reserva */}
        {isProfessor ? (
          <div className="bg-white border-[3px] border-[#0F1E36] rounded-2xl p-6 shadow-[6px_6px_0_#E04F33] max-w-xl">
            <h2 className="text-xl font-black mb-4">Nova reserva</h2>
            <form onSubmit={reservar} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
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
                  <label className="block text-xs font-black mb-1">Lab</label>
                  <select
                    value={form.lab}
                    onChange={(e) => setForm({ ...form, lab: e.target.value })}
                    className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                  >
                    {LABS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black mb-1">Turno</label>
                  <select
                    value={form.turno}
                    onChange={(e) => setForm({ ...form, turno: e.target.value })}
                    className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                  >
                    {TURNOS.map((t) => (
                      <option key={t} value={t}>
                        {t === "MANHA" ? "Manhã" : "Tarde"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black mb-1">Horário</label>
                  <select
                    value={form.horario}
                    onChange={(e) => setForm({ ...form, horario: e.target.value })}
                    className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                  >
                    {HORARIOS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black mb-1">Turma</label>
                  <input
                    value={form.turma}
                    onChange={(e) => setForm({ ...form, turma: e.target.value })}
                    placeholder="Ex: 1º A"
                    className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black mb-1">Disciplina</label>
                  <input
                    value={form.disciplina}
                    onChange={(e) => setForm({ ...form, disciplina: e.target.value })}
                    placeholder="Ex: Informática"
                    className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black mb-1">Observação</label>
                <input
                  value={form.observacao}
                  onChange={(e) => setForm({ ...form, observacao: e.target.value })}
                  className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                />
              </div>
              {msg && (
                <p className="text-sm font-bold text-[#E04F33]">{msg}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2554C7] text-white font-black border-2 border-[#0F1E36] shadow-[3px_3px_0_#0F1E36]"
              >
                Confirmar reserva
              </button>
            </form>
            <p className="mt-3 text-[11px] opacity-70">
              Dica: use o botão de impressão do navegador (Ctrl+P) na visão semanal para fixar a grade no mural físico.
            </p>
          </div>
        ) : (
          <div className="bg-[#FFF8DB] border-2 border-[#0F1E36] rounded-xl p-4 text-sm font-medium">
            Alunos visualizam a grade. Professores e direção reservam e cancelam.
          </div>
        )}
      </div>
    </div>
  );
}
