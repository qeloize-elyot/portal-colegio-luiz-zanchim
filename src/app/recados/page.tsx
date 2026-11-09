"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

type Recado = {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: string;
  fixado: boolean;
  data_evento: string | null;
  hora_evento: string | null;
  video_url: string | null;
  autor_nome: string | null;
  created_at: string;
};

export default function RecadosPage() {
  const { role, userId, email, loading: roleLoading } = useRole();
  const [lista, setLista] = useState<Recado[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    conteudo: "",
    tipo: "RECADO",
    fixado: true,
    data_evento: "",
    hora_evento: "",
    video_url: "",
  });

  async function carregar() {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from("recados")
        .select("*")
        .order("fixado", { ascending: false })
        .order("created_at", { ascending: false });
      setLista((data as Recado[]) || []);
    } catch {
      setLista([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (role !== "ADMIN") {
      setMsg("Somente a direção/admin publica no mural oficial.");
      return;
    }
    setMsg("");
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("recados").insert({
        titulo: form.titulo,
        conteudo: form.conteudo,
        tipo: form.tipo,
        fixado: form.fixado,
        data_evento: form.data_evento || null,
        hora_evento: form.hora_evento || null,
        video_url: form.video_url || null,
        autor_id: userId,
        autor_nome: email?.split("@")[0] || "Direção",
      });
      if (error) throw error;
      setMsg("Publicado no mural.");
      setForm({
        titulo: "",
        conteudo: "",
        tipo: "RECADO",
        fixado: true,
        data_evento: "",
        hora_evento: "",
        video_url: "",
      });
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro");
    }
  }

  async function apagar(id: string) {
    if (role !== "ADMIN") return;
    const supabase = getSupabase();
    await supabase.from("recados").delete().eq("id", id);
    carregar();
  }

  const fixados = lista.filter((r) => r.fixado);
  const demais = lista.filter((r) => !r.fixado);

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
        <span className="text-[11px] font-black uppercase tracking-widest text-[#D97706] bg-[#FFF8DB] border-2 border-[#0F1E36] px-3 py-1 rounded-lg shadow-[2px_2px_0_#0F1E36]">
          Mural oficial
        </span>
        <h1 className="mt-3 text-3xl font-black">Recados Fixados e Eventos</h1>
        <p className="mt-2 text-sm opacity-75 font-medium">
          Comunicação oficial controlada pela direção: recados permanentes, próximos eventos e vídeos institucionais.
        </p>

        {role === "ADMIN" && (
          <form
            onSubmit={publicar}
            className="mt-8 bg-white border-[3px] border-[#0F1E36] rounded-2xl p-6 space-y-3 shadow-[6px_6px_0_#F4B41A]"
          >
            <h2 className="text-lg font-black">Publicar (somente Admin)</h2>
            <input
              required
              placeholder="Título"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
            />
            <textarea
              required
              rows={3}
              placeholder="Conteúdo"
              value={form.conteudo}
              onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
              className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
            />
            <div className="grid sm:grid-cols-3 gap-2">
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              >
                <option value="RECADO">Recado</option>
                <option value="EVENTO">Evento</option>
                <option value="VIDEO">Vídeo</option>
              </select>
              <label className="flex items-center gap-2 text-sm font-bold border-2 border-[#0F1E36] rounded-xl px-3 py-2">
                <input
                  type="checkbox"
                  checked={form.fixado}
                  onChange={(e) => setForm({ ...form, fixado: e.target.checked })}
                />
                Fixado
              </label>
              <input
                type="date"
                value={form.data_evento}
                onChange={(e) => setForm({ ...form, data_evento: e.target.value })}
                className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <input
                placeholder="Horário do evento (ex: 14h)"
                value={form.hora_evento}
                onChange={(e) => setForm({ ...form, hora_evento: e.target.value })}
                className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <input
                placeholder="URL do vídeo (YouTube etc.)"
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
            </div>
            {msg && <p className="text-sm font-bold text-green-700">{msg}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D97706] text-white font-black border-2 border-[#0F1E36] shadow-[3px_3px_0_#0F1E36]"
            >
              Publicar no mural
            </button>
          </form>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-black mb-3">Fixados</h2>
          {loading ? (
            <p className="text-sm">Carregando...</p>
          ) : fixados.length === 0 ? (
            <p className="text-sm opacity-70">Nenhum recado fixado no momento.</p>
          ) : (
            <ul className="space-y-3">
              {fixados.map((r) => (
                <li
                  key={r.id}
                  className="bg-[#FFF8DB] border-[3px] border-[#0F1E36] rounded-2xl p-5 shadow-[4px_4px_0_#F4B41A]"
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#0F1E36] text-white rounded">
                      {r.tipo}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#F4B41A] border border-[#0F1E36] rounded">
                      Fixado
                    </span>
                  </div>
                  <h3 className="font-black text-lg">{r.titulo}</h3>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{r.conteudo}</p>
                  {(r.data_evento || r.hora_evento) && (
                    <p className="text-xs font-bold mt-2 opacity-80">
                      {r.data_evento} {r.hora_evento}
                    </p>
                  )}
                  {r.video_url && (
                    <a
                      href={r.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-xs font-black text-[#2554C7] underline"
                    >
                      Assistir vídeo →
                    </a>
                  )}
                  {role === "ADMIN" && (
                    <button
                      type="button"
                      onClick={() => apagar(r.id)}
                      className="block mt-2 text-xs font-bold text-red-600 underline"
                    >
                      Remover
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black mb-3">Outros comunicados</h2>
          {demais.length === 0 ? (
            <p className="text-sm opacity-70">Nada publicado além dos fixados.</p>
          ) : (
            <ul className="space-y-3">
              {demais.map((r) => (
                <li
                  key={r.id}
                  className="bg-white border-2 border-[#0F1E36] rounded-xl p-4 shadow-[2px_2px_0_#0F1E36]"
                >
                  <span className="text-[10px] font-black uppercase opacity-60">{r.tipo}</span>
                  <h3 className="font-black">{r.titulo}</h3>
                  <p className="text-sm mt-1">{r.conteudo}</p>
                  {role === "ADMIN" && (
                    <button
                      type="button"
                      onClick={() => apagar(r.id)}
                      className="mt-2 text-xs font-bold text-red-600 underline"
                    >
                      Remover
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
