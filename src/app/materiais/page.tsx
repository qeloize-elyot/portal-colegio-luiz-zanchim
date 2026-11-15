"use client";

import { useEffect, useState } from "react";
import { useRole } from "@/lib/useRole";
import {
  getMateriais,
  addMaterial,
  type DemoMaterial,
} from "@/lib/demo-auth";
import {
  PageHeroBanner,
  MateriaisIllustration,
  EmptyStateIllustration,
} from "@/components/SvgDecorations";

export default function MateriaisPage() {
  const { isProfessor, userId } = useRole();
  const [materiais, setMateriais] = useState<DemoMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("Matemática");
  const [turma, setTurma] = useState("A");
  const [ano, setAno] = useState("1");
  const [url, setUrl] = useState("");
  const [tipo, setTipo] = useState("LINK");
  const [enviando, setEnviando] = useState(false);
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroTurma, setFiltroTurma] = useState("");
  const [filtroDisc, setFiltroDisc] = useState("");

  function carregar() {
    try {
      setMateriais(getMateriais());
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function publicar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    setSucesso("");
    try {
      addMaterial({
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        disciplina,
        turma,
        ano: Number(ano),
        url: tipo === "RESUMO" ? null : url.trim() || null,
        tipo,
        professor_id: userId,
      });
      setSucesso("Material publicado!");
      setTitulo("");
      setDescricao("");
      setUrl("");
      carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao publicar.");
    } finally {
      setEnviando(false);
    }
  }

  const filtrados = materiais.filter((m) => {
    if (filtroAno && String(m.ano) !== filtroAno) return false;
    if (filtroTurma && m.turma !== filtroTurma) return false;
    if (filtroDisc && m.disciplina !== filtroDisc) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Apoio aos Estudos"
        title="Materiais de Apoio"
        subtitle="Apostilas, slides, listas e resumos por disciplina, série e turma."
        accentColor="#2554C7"
        softBg="#EBF3FF"
        illustration={<MateriaisIllustration />}
      />

      {isProfessor && (
        <form onSubmit={publicar} className="mb-10 bg-card border border-border rounded-3xl p-6 space-y-4">
          <h2 className="font-bold text-lg">Publicar novo material</h2>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Título *"
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={2}
            placeholder="Descrição"
            className="w-full border border-border rounded-xl px-3 py-2 text-sm"
          />
          <div className="grid sm:grid-cols-4 gap-3">
            <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
              {["Matemática", "Português", "História", "Geografia", "Biologia", "Física", "Química", "Inglês"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select value={turma} onChange={(e) => setTurma(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
              {["A", "B", "C", "D"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select value={ano} onChange={(e) => setAno(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
              {[1, 2, 3].map((a) => (
                <option key={a} value={a}>{a}º ano</option>
              ))}
            </select>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
              <option value="LINK">Link</option>
              <option value="ARQUIVO">Arquivo</option>
              <option value="RESUMO">Resumo</option>
            </select>
          </div>
          {tipo !== "RESUMO" && (
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-border rounded-xl px-3 py-2 text-sm"
            />
          )}
          {erro && <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">{erro}</div>}
          {sucesso && <div className="text-sm text-green-800 bg-green-50 border border-green-200 px-3 py-2 rounded-xl">{sucesso}</div>}
          <button type="submit" disabled={enviando} className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl disabled:opacity-60">
            {enviando ? "Publicando..." : "Publicar material"}
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
          <option value="">Todos os anos</option>
          <option value="1">1º ano</option>
          <option value="2">2º ano</option>
          <option value="3">3º ano</option>
        </select>
        <select value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
          <option value="">Todas as turmas</option>
          {["A", "B", "C", "D"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select value={filtroDisc} onChange={(e) => setFiltroDisc(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm">
          <option value="">Todas as disciplinas</option>
          {["Matemática", "Português", "História", "Geografia", "Biologia", "Física", "Química", "Inglês"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Carregando...</p>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-12">
          <EmptyStateIllustration />
          <p className="mt-4 text-sm text-muted">Nenhum material encontrado.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtrados.map((m) => (
            <article key={m.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold leading-snug">{m.titulo}</h3>
                <span className="shrink-0 text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-md">{m.tipo}</span>
              </div>
              {m.descricao && <p className="text-sm text-muted mb-3">{m.descricao}</p>}
              <div className="flex flex-wrap gap-2 text-[11px] text-muted mb-3">
                <span className="bg-background border border-border px-2 py-0.5 rounded-md">{m.disciplina}</span>
                <span className="bg-background border border-border px-2 py-0.5 rounded-md">{m.ano}º ano · Turma {m.turma}</span>
              </div>
              {m.url && (
                <a href={m.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary hover:underline">
                  Abrir material →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
