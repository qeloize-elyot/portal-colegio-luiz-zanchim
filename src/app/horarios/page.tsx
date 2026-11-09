"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

type Doc = {
  id: string;
  titulo: string;
  descricao: string | null;
  turno: string | null;
  url: string | null;
  tipo: string;
  ordem: number;
};

/*
  Manhã:
  - Entrada dos alunos: 07:20
  - Aulas começam: 07:30
  - Cada aula: 50 min
  - Intervalo de 15 min depois da 3ª aula
  - Término: 12:45

  Tarde:
  - Entrada: 13:10
  - Aulas começam: 13:20
  - Mesma estrutura
  - Término: 18:35
*/
const QUADRO_MANHA = [
  { aula: "1ª aula", inicio: "07:30", fim: "08:20" },
  { aula: "2ª aula", inicio: "08:20", fim: "09:10" },
  { aula: "3ª aula", inicio: "09:10", fim: "10:00" },
  { aula: "Intervalo", inicio: "10:00", fim: "10:15", destaque: true },
  { aula: "4ª aula", inicio: "10:15", fim: "11:05" },
  { aula: "5ª aula", inicio: "11:05", fim: "11:55" },
  { aula: "6ª aula", inicio: "11:55", fim: "12:45" },
];

const QUADRO_TARDE = [
  { aula: "1ª aula", inicio: "13:20", fim: "14:10" },
  { aula: "2ª aula", inicio: "14:10", fim: "15:00" },
  { aula: "3ª aula", inicio: "15:00", fim: "15:50" },
  { aula: "Intervalo", inicio: "15:50", fim: "16:05", destaque: true },
  { aula: "4ª aula", inicio: "16:05", fim: "16:55" },
  { aula: "5ª aula", inicio: "16:55", fim: "17:45" },
  { aula: "6ª aula", inicio: "17:45", fim: "18:35" },
];

export default function HorariosPage() {
  const { role, loading: roleLoading } = useRole();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    turno: "AMBOS",
    url: "",
    tipo: "PDF",
  });
  const [msg, setMsg] = useState("");

  async function carregar() {
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from("horarios_docs")
        .select("*")
        .order("ordem")
        .order("created_at", { ascending: false });
      setDocs((data as Doc[]) || []);
    } catch {
      setDocs([]);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (role !== "ADMIN") return;
    setMsg("");
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("horarios_docs").insert({
        titulo: form.titulo,
        descricao: form.descricao || null,
        turno: form.turno,
        url: form.url || null,
        tipo: form.tipo,
      });
      if (error) throw error;
      setMsg("Documento adicionado.");
      setForm({ titulo: "", descricao: "", turno: "AMBOS", url: "", tipo: "PDF" });
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro");
    }
  }

  async function apagar(id: string) {
    if (role !== "ADMIN") return;
    const supabase = getSupabase();
    await supabase.from("horarios_docs").delete().eq("id", id);
    carregar();
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3E8]">
        <p className="font-medium">Carregando...</p>
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
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 pt-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F766E] bg-[#E6F7F8] border-2 border-[#0F1E36] px-3 py-1 rounded-lg shadow-[2px_2px_0_#0F1E36]">
          Cronograma 2026
        </span>
        <h1 className="mt-3 text-3xl font-semibold font-serif">Horários e Cronograma</h1>
        <p className="mt-2 text-sm opacity-75 font-medium max-w-2xl">
          Quadros oficiais dos turnos manhã e tarde. Os alunos devem estar no colégio 10 minutos antes do início das aulas.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Manhã */}
          <div className="bg-white border-[3px] border-[#0F1E36] rounded-2xl overflow-hidden shadow-[5px_5px_0_#2554C7]">
            <div className="bg-[#2554C7] text-white px-4 py-3">
              <p className="font-semibold text-lg">Turno Manhã</p>
              <p className="text-xs opacity-90 mt-0.5">Entrada dos alunos · 07:20 &nbsp;·&nbsp; Saída · 12:45</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#EBF3FF] font-semibold">
                  <th className="p-2.5 text-left">Período</th>
                  <th className="p-2.5">Início</th>
                  <th className="p-2.5">Fim</th>
                </tr>
              </thead>
              <tbody>
                {QUADRO_MANHA.map((q) => (
                  <tr
                    key={q.aula}
                    className={`border-t border-[#0F1E36]/10 ${
                      q.destaque ? "bg-[#FFF8DB] font-semibold" : ""
                    }`}
                  >
                    <td className="p-2.5 font-medium">{q.aula}</td>
                    <td className="p-2.5 text-center tabular-nums">{q.inicio}</td>
                    <td className="p-2.5 text-center tabular-nums">{q.fim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarde */}
          <div className="bg-white border-[3px] border-[#0F1E36] rounded-2xl overflow-hidden shadow-[5px_5px_0_#E04F33]">
            <div className="bg-[#E04F33] text-white px-4 py-3">
              <p className="font-semibold text-lg">Turno Tarde</p>
              <p className="text-xs opacity-90 mt-0.5">Entrada dos alunos · 13:10 &nbsp;·&nbsp; Saída · 18:35</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FFF0E5] font-semibold">
                  <th className="p-2.5 text-left">Período</th>
                  <th className="p-2.5">Início</th>
                  <th className="p-2.5">Fim</th>
                </tr>
              </thead>
              <tbody>
                {QUADRO_TARDE.map((q) => (
                  <tr
                    key={q.aula}
                    className={`border-t border-[#0F1E36]/10 ${
                      q.destaque ? "bg-[#FFF8DB] font-semibold" : ""
                    }`}
                  >
                    <td className="p-2.5 font-medium">{q.aula}</td>
                    <td className="p-2.5 text-center tabular-nums">{q.inicio}</td>
                    <td className="p-2.5 text-center tabular-nums">{q.fim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white/80 border-2 border-[#0F1E36] rounded-xl px-4 py-3">
            <p className="font-semibold mb-1">Manhã em resumo</p>
            <p className="opacity-80">6 aulas de 50 min · intervalo de 15 min após a 3ª aula · total até 12:45</p>
          </div>
          <div className="bg-white/80 border-2 border-[#0F1E36] rounded-xl px-4 py-3">
            <p className="font-semibold mb-1">Tarde em resumo</p>
            <p className="opacity-80">6 aulas de 50 min · intervalo de 15 min após a 3ª aula · total até 18:35</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold font-serif mb-4">Documentos oficiais</h2>
          {docs.length === 0 ? (
            <p className="text-sm opacity-70 mb-4">
              Ainda não há PDFs/links cadastrados. A direção pode publicar o cronograma anual e grades por turma aqui.
            </p>
          ) : (
            <ul className="space-y-2 mb-6">
              {docs.map((d) => (
                <li
                  key={d.id}
                  className="flex flex-wrap items-center justify-between gap-2 bg-white border-2 border-[#0F1E36] rounded-xl px-4 py-3 shadow-[2px_2px_0_#0F1E36]"
                >
                  <div>
                    <p className="font-semibold text-sm">{d.titulo}</p>
                    {d.descricao && <p className="text-xs opacity-70">{d.descricao}</p>}
                    <span className="text-[10px] font-bold uppercase opacity-60">
                      {d.turno || "AMBOS"} · {d.tipo}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {d.url && (
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#2554C7] text-white border-2 border-[#0F1E36]"
                      >
                        Abrir
                      </a>
                    )}
                    {role === "ADMIN" && (
                      <button
                        type="button"
                        onClick={() => apagar(d.id)}
                        className="text-xs font-semibold text-red-600 underline"
                      >
                        Apagar
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {role === "ADMIN" && (
            <form
              onSubmit={salvar}
              className="bg-white border-[3px] border-[#0F1E36] rounded-2xl p-5 space-y-3 max-w-lg shadow-[4px_4px_0_#0F1E36]"
            >
              <h3 className="font-semibold">Publicar documento (Admin)</h3>
              <input
                required
                placeholder="Título (ex: Cronograma Anual 2026)"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <input
                placeholder="Descrição"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <input
                placeholder="URL do PDF ou link"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <select
                  value={form.turno}
                  onChange={(e) => setForm({ ...form, turno: e.target.value })}
                  className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                >
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                  <option value="AMBOS">Ambos</option>
                </select>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                >
                  <option value="PDF">PDF</option>
                  <option value="LINK">Link</option>
                  <option value="IMAGEM">Imagem</option>
                </select>
              </div>
              {msg && <p className="text-sm font-semibold text-green-700">{msg}</p>}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white font-semibold border-2 border-[#0F1E36]"
              >
                Publicar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
