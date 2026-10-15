"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";
import {
  PageHeroBanner,
  MateriaisIllustration,
  EmptyStateIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

type Material = {
  id: string;
  titulo: string;
  descricao: string | null;
  disciplina: string;
  turma: string;
  ano: number | null;
  url: string | null;
  tipo: string;
  created_at: string;
};

export default function MateriaisPage() {
  const { isProfessor, userId } = useRole();
  const [materiais, setMateriais] = useState<Material[]>([]);
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

  async function carregar() {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("materiais")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setErro(error.message);
      else setMateriais(data || []);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    setSucesso("");
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("materiais").insert({
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        disciplina,
        turma,
        ano: Number(ano),
        url: tipo === "TEXTO" ? null : url.trim() || null,
        tipo,
        professor_id: userId,
      });
      if (error) throw new Error(error.message);
      setSucesso("Material publicado!");
      setTitulo("");
      setDescricao("");
      setUrl("");
      await carregar();
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
        badge="Acervo Pedagógico"
        title="Materiais de Apoio"
        subtitle="Acesse apostilas, listas de exercícios, slides, PDFs e links organizados por série, turma e disciplina."
        accentColor="#c45c26"
        softBg="#fdf0e6"
        illustration={<MateriaisIllustration />}
      />

      {isProfessor && (
        <form onSubmit={publicar} className="bg-card border border-border rounded-3xl p-6 mb-8 space-y-4 shadow-2xs">
          <h2 className="font-bold text-primary">Publicar novo material</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Ano</label>
              <select value={ano} onChange={(e) => setAno(e.target.value)} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white">
                <option value="1">1º Ano</option>
                <option value="2">2º Ano</option>
                <option value="3">3º Ano</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Turma</label>
              <select value={turma} onChange={(e) => setTurma(e.target.value)} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Disciplina</label>
              <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white">
                <option>Matemática</option>
                <option>Português</option>
                <option>História</option>
                <option>Geografia</option>
                <option>Ciências</option>
                <option>Inglês</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white">
                <option value="LINK">Link</option>
                <option value="PDF">PDF (link)</option>
                <option value="IMAGEM">Imagem (link)</option>
                <option value="TEXTO">Só texto</option>
              </select>
            </div>
          </div>
          <input required value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título do conteúdo" className="w-full border border-border rounded-xl px-3 py-2 text-sm" />
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} placeholder="Texto ou descrição orientativa" className="w-full border border-border rounded-xl px-3 py-2 text-sm" />
          {tipo !== "TEXTO" && (
            <input type="url" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https:// link do Drive, PDF ou foto" className="w-full border border-border rounded-xl px-3 py-2 text-sm" />
          )}
          {erro && <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl">{erro}</div>}
          {sucesso && <div className="bg-secondary-soft text-secondary text-sm px-4 py-3 rounded-xl">{sucesso}</div>}
          <button type="submit" disabled={enviando} className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark disabled:opacity-60">
            {enviando ? "Publicando..." : "Publicar material"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)} className="border border-border rounded-xl px-3.5 py-2.5 text-sm bg-white shadow-2xs">
          <option value="">Todos os anos</option>
          <option value="1">1º Ano</option>
          <option value="2">2º Ano</option>
          <option value="3">3º Ano</option>
        </select>
        <select value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)} className="border border-border rounded-xl px-3.5 py-2.5 text-sm bg-white shadow-2xs">
          <option value="">Todas as turmas</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <select value={filtroDisc} onChange={(e) => setFiltroDisc(e.target.value)} className="border border-border rounded-xl px-3.5 py-2.5 text-sm bg-white shadow-2xs">
          <option value="">Todas as disciplinas</option>
          <option>Matemática</option>
          <option>Português</option>
          <option>História</option>
          <option>Geografia</option>
          <option>Ciências</option>
          <option>Inglês</option>
        </select>
      </div>

      {loading ? (
        <p className="text-muted text-sm">Carregando...</p>
      ) : filtrados.length === 0 ? (
        <EmptyStateIllustration label="Nenhum material encontrado para os filtros selecionados." />
      ) : (
        <div className="space-y-3">
          {filtrados.map((m) => (
            <article
              key={m.id}
              className="bg-card border border-border rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-primary/60 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold bg-primary-soft text-primary px-2.5 py-0.5 rounded-full">
                    {m.disciplina}
                  </span>
                  <span className="text-[11px] font-medium bg-background border border-border px-2.5 py-0.5 rounded-full text-muted">
                    {m.ano}º Ano · Turma {m.turma}
                  </span>
                  <span className="text-[11px] font-semibold text-secondary">
                    {m.tipo}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{m.titulo}</h3>
                {m.descricao && <p className="text-sm text-muted mt-1 whitespace-pre-wrap">{m.descricao}</p>}
              </div>
              {m.url && (
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary-soft text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors shrink-0"
                >
                  Abrir material
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      )}

      <WaveDivider color="#c45c26" />
    </div>
  );
}
