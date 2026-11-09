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

/** Calendário Escolar 2026 — SEED / Resolução 6.494/2025 */
const CALENDARIO_2026 = {
  feriados: [
    { data: "01/01", nome: "Ano Novo" },
    { data: "21/04", nome: "Tiradentes" },
    { data: "01/05", nome: "Dia do Trabalho" },
    { data: "07/09", nome: "Independência" },
    { data: "12/10", nome: "N. Sra. Aparecida" },
    { data: "02/11", nome: "Finados" },
    { data: "15/11", nome: "Proclamação da República" },
    { data: "20/11", nome: "Zumbi / Consciência Negra" },
    { data: "25/12", nome: "Natal" },
  ],
  moveis: [
    { data: "16–21/02", nome: "Carnaval (recesso)" },
    { data: "03/04", nome: "Sexta-feira Santa (Paixão)" },
    { data: "05/04", nome: "Páscoa" },
    { data: "04/06", nome: "Corpus Christi" },
  ],
  avaliacoes: [
    { periodo: "1º Trimestre", datas: "05/02 a 14/05", dias: "63 d.l." },
    { periodo: "2º Trimestre", datas: "18/05 a 04/09", dias: "66 d.l." },
    { periodo: "3º Trimestre", datas: "08/09 a 18/12", dias: "70 d.l." },
  ],
  totais: {
    ano: 201,
    semestre1: 101,
    semestre2: 100,
  },
  destaques: [
    "Início do ano letivo: fevereiro/2026",
    "Conselho de Classe Extraordinário e fechamento do 2º semestre conforme calendário oficial",
    "Prova Paraná prevista entre maio e setembro (observar ofícios)",
    "Dias de estudo e planejamento para professores não computam como dia letivo para alunos",
  ],
};

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
        <h1 className="mt-3 text-3xl font-semibold font-serif">Horários e Calendário</h1>
        <p className="mt-2 text-sm opacity-75 font-medium max-w-2xl">
          Quadros oficiais dos turnos, calendário letivo SEED 2026 e espaço para a direção publicar grades por
          turma e horários dos professores (PDFs).
        </p>

        {/* Quadros de aula */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white border-[3px] border-[#0F1E36] rounded-2xl overflow-hidden shadow-[5px_5px_0_#2554C7]">
            <div className="bg-[#2554C7] text-white px-4 py-3">
              <p className="font-semibold text-lg">Turno Manhã</p>
              <p className="text-xs opacity-90 mt-0.5">Entrada · 07:20 &nbsp;·&nbsp; Saída · 12:45</p>
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

          <div className="bg-white border-[3px] border-[#0F1E36] rounded-2xl overflow-hidden shadow-[5px_5px_0_#E04F33]">
            <div className="bg-[#E04F33] text-white px-4 py-3">
              <p className="font-semibold text-lg">Turno Tarde</p>
              <p className="text-xs opacity-90 mt-0.5">Entrada · 13:10 &nbsp;·&nbsp; Saída · 18:35</p>
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

        {/* Calendário 2026 */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold font-serif mb-4">Calendário Escolar 2026 (SEED)</h2>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {CALENDARIO_2026.avaliacoes.map((a) => (
              <div
                key={a.periodo}
                className="bg-white border-2 border-[#0F1E36] rounded-xl p-4 shadow-[2px_2px_0_#0F1E36]"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">{a.periodo}</p>
                <p className="font-semibold mt-1">{a.datas}</p>
                <p className="text-xs opacity-70 mt-0.5">{a.dias}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border-[3px] border-[#0F1E36] rounded-2xl p-5 shadow-[4px_4px_0_#0F1E36] mb-5">
            <p className="text-sm font-semibold mb-2">
              Total no ano: <span className="tabular-nums">{CALENDARIO_2026.totais.ano} dias letivos</span>
              <span className="opacity-60 font-normal">
                {" "}(1º sem. {CALENDARIO_2026.totais.semestre1} · 2º sem. {CALENDARIO_2026.totais.semestre2})
              </span>
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Feriados nacionais</p>
                <ul className="space-y-1 text-sm">
                  {CALENDARIO_2026.feriados.map((f) => (
                    <li key={f.data} className="flex gap-2">
                      <span className="font-semibold tabular-nums w-14 shrink-0">{f.data}</span>
                      <span className="opacity-80">{f.nome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Datas móveis / recessos</p>
                <ul className="space-y-1 text-sm">
                  {CALENDARIO_2026.moveis.map((f) => (
                    <li key={f.data} className="flex gap-2">
                      <span className="font-semibold tabular-nums w-20 shrink-0">{f.data}</span>
                      <span className="opacity-80">{f.nome}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 mt-4">Observações</p>
                <ul className="space-y-1.5 text-xs opacity-80 list-disc pl-4">
                  {CALENDARIO_2026.destaques.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#EBF3FF] border-2 border-[#0F1E36] rounded-xl p-4 text-sm">
            <p className="font-semibold mb-1">Horários dos professores (manhã e tarde)</p>
            <p className="opacity-80 text-xs leading-relaxed">
              Os relatórios oficiais por professor (cenário MANHÃ 2026 e TARDE 2026) podem ser publicados abaixo
              pela direção. Assim o aluno encontra o horário de um docente quando precisa falar com urgência.
              Peça à secretaria ou ao admin para anexar os PDFs em “Documentos oficiais”.
            </p>
          </div>
        </div>

        {/* Documentos */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold font-serif mb-4">Documentos oficiais</h2>
          {docs.length === 0 ? (
            <p className="text-sm opacity-70 mb-4">
              Ainda não há PDFs cadastrados. A direção pode publicar o calendário completo, grades por turma e
              horários dos professores aqui.
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
              <p className="text-xs opacity-70">
                Ideal para: Calendário 2026 SEED, Horário Manhã por professor, Horário Tarde por professor, grades
                por turma.
              </p>
              <input
                required
                placeholder="Título (ex: Horário dos Professores — Tarde 2026)"
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
                placeholder="URL do PDF ou link (Drive, etc.)"
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
