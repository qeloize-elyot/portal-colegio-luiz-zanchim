"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

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
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setRole(profile?.role ?? "ALUNO");
      }

      const { data, error } = await supabase
        .from("materiais")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setErro(error.message);
      else setMateriais(data || []);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar materiais.");
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
        url: url.trim() || null,
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

  const podePublicar = role === "PROFESSOR" || role === "ADMIN";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start gap-4 mb-6">
        <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0" aria-hidden>
          <rect x="8" y="12" width="48" height="40" rx="6" fill="#c45c26" />
          <path d="M32 12 V52" stroke="#faf6f1" strokeWidth="2" />
          <path d="M16 24 H28" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 34 H28" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 24 H48" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Materiais de Apoio</h1>
          <p className="text-muted text-sm">
            Links, textos, PDFs (via link do Drive) e imagens. Professores publicam; alunos consultam.
          </p>
        </div>
      </div>

      {podePublicar && (
        <form onSubmit={publicar} className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-4">
          <h2 className="font-bold text-foreground flex items-center gap-2">
            <span className="text-lg">✏️</span> Publicar material
          </h2>

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

          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white" placeholder="Ex: Lista de equações" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Texto / descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white" placeholder="Pode colar o conteúdo aqui ou explicar o material" />
          </div>

          {tipo !== "TEXTO" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Link (Google Drive, PDF, foto, site…)
              </label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required={tipo !== "TEXTO"} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white" placeholder="https://..." />
              <p className="text-xs text-muted mt-1">Para PDF ou foto: envie no Drive e cole o link público.</p>
            </div>
          )}

          {erro && <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl">{erro}</div>}
          {sucesso && <div className="bg-secondary-soft border border-border text-secondary text-sm px-4 py-3 rounded-xl">{sucesso}</div>}

          <button type="submit" disabled={enviando} className="bg-primary text-white font-medium px-5 py-2.5 rounded-xl hover:bg-primary-dark disabled:opacity-60">
            {enviando ? "Publicando..." : "Publicar material"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm bg-white">
          <option value="">Todos os anos</option>
          <option value="1">1º Ano</option>
          <option value="2">2º Ano</option>
          <option value="3">3º Ano</option>
        </select>
        <select value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm bg-white">
          <option value="">Todas as turmas</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <select value={filtroDisc} onChange={(e) => setFiltroDisc(e.target.value)} className="border border-border rounded-xl px-3 py-2 text-sm bg-white">
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
        <div className="border border-dashed border-border rounded-2xl p-10 text-center">
          <p className="text-3xl mb-2">📚</p>
          <p className="text-muted text-sm">Nenhum material ainda. Professores podem publicar pelo formulário acima.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtrados.map((m) => (
            <article key={m.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="text-[11px] font-semibold bg-primary-soft text-primary px-2 py-0.5 rounded-full">{m.disciplina}</span>
                  <span className="text-[11px] text-muted">{m.ano}º Ano · Turma {m.turma}</span>
                  <span className="text-[11px] text-secondary font-medium">{m.tipo}</span>
                </div>
                <h3 className="font-bold text-foreground">{m.titulo}</h3>
                {m.descricao && <p className="text-sm text-muted mt-0.5 whitespace-pre-wrap">{m.descricao}</p>}
              </div>
              {m.url && (
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary underline shrink-0">
                  Abrir
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
