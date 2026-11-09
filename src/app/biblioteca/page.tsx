"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

type Livro = {
  id: string;
  titulo: string;
  autor: string;
  categoria: string | null;
  isbn: string | null;
  exemplares: number;
  disponiveis: number;
  localizacao: string | null;
  sinopse: string | null;
  ativo: boolean;
};

type Emprestimo = {
  id: string;
  livro_id: string;
  usuario_id: string;
  usuario_nome: string;
  data_emprestimo: string;
  data_prevista: string;
  data_devolucao: string | null;
  status: string;
  livros?: { titulo: string; autor: string } | null;
};

const DIAS_EMPRESTIMO = 14;

const CATEGORIAS = [
  "Geral",
  "Literatura",
  "Didático",
  "História",
  "Ciências",
  "Infantojuvenil",
  "Referência",
  "Outros",
];

function addDays(isoDate: string, days: number) {
  const d = new Date(isoDate + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function fmtBR(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function BibliotecaPage() {
  const { role, userId, email, loading: roleLoading, isProfessor, isAdmin } = useRole();
  const canManage = isProfessor || isAdmin;

  const [livros, setLivros] = useState<Livro[]>([]);
  const [meus, setMeus] = useState<Emprestimo[]>([]);
  const [todosEmp, setTodosEmp] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroCat, setFiltroCat] = useState("TODOS");
  const [filtroDisp, setFiltroDisp] = useState("TODOS");
  const [msg, setMsg] = useState("");
  const [aba, setAba] = useState<"catalogo" | "meus" | "gestao">("catalogo");

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    categoria: "Geral",
    isbn: "",
    exemplares: 1,
    localizacao: "",
    sinopse: "",
  });

  async function carregar() {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data: books } = await supabase
        .from("livros")
        .select("*")
        .eq("ativo", true)
        .order("titulo");
      setLivros((books as Livro[]) || []);

      if (userId) {
        const { data: mine } = await supabase
          .from("emprestimos")
          .select("*, livros(titulo, autor)")
          .eq("usuario_id", userId)
          .order("created_at", { ascending: false });
        setMeus((mine as Emprestimo[]) || []);
      }

      if (canManage) {
        const { data: all } = await supabase
          .from("emprestimos")
          .select("*, livros(titulo, autor)")
          .in("status", ["ATIVO", "ATRASADO"])
          .order("data_prevista");
        setTodosEmp((all as Emprestimo[]) || []);
      }
    } catch {
      setLivros([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!roleLoading) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleLoading, userId, canManage]);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return livros.filter((l) => {
      const matchQ =
        !q ||
        l.titulo.toLowerCase().includes(q) ||
        l.autor.toLowerCase().includes(q) ||
        (l.categoria || "").toLowerCase().includes(q);
      const matchCat = filtroCat === "TODOS" || l.categoria === filtroCat;
      const matchDisp =
        filtroDisp === "TODOS" ||
        (filtroDisp === "DISPONIVEL" && l.disponiveis > 0) ||
        (filtroDisp === "EMPRESTADO" && l.disponiveis <= 0);
      return matchQ && matchCat && matchDisp;
    });
  }, [livros, busca, filtroCat, filtroDisp]);

  async function cadastrarLivro(e: React.FormEvent) {
    e.preventDefault();
    if (!canManage) return;
    setMsg("");
    try {
      const supabase = getSupabase();
      const n = Math.max(1, Number(form.exemplares) || 1);
      const { error } = await supabase.from("livros").insert({
        titulo: form.titulo.trim(),
        autor: form.autor.trim(),
        categoria: form.categoria,
        isbn: form.isbn || null,
        exemplares: n,
        disponiveis: n,
        localizacao: form.localizacao || null,
        sinopse: form.sinopse || null,
      });
      if (error) throw error;
      setMsg("Livro cadastrado!");
      setForm({
        titulo: "",
        autor: "",
        categoria: "Geral",
        isbn: "",
        exemplares: 1,
        localizacao: "",
        sinopse: "",
      });
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro ao cadastrar");
    }
  }

  async function solicitarEmprestimo(livro: Livro) {
    if (!userId || !email) {
      setMsg("Faça login para solicitar empréstimo.");
      return;
    }
    if (livro.disponiveis <= 0) {
      setMsg("Este título não tem exemplar disponível no momento.");
      return;
    }
    const ativos = meus.filter((e) => e.status === "ATIVO" || e.status === "ATRASADO");
    if (ativos.length >= 3) {
      setMsg("Limite de 3 empréstimos ativos por aluno. Devolva um livro antes.");
      return;
    }
    if (ativos.some((e) => e.livro_id === livro.id)) {
      setMsg("Você já tem este título emprestado.");
      return;
    }

    setMsg("");
    try {
      const supabase = getSupabase();
      const hoje = new Date().toISOString().slice(0, 10);
      const prevista = addDays(hoje, DIAS_EMPRESTIMO);

      // baixa 1 exemplar disponível
      const { error: upErr } = await supabase
        .from("livros")
        .update({ disponiveis: livro.disponiveis - 1 })
        .eq("id", livro.id)
        .gt("disponiveis", 0);
      if (upErr) throw upErr;

      const { error } = await supabase.from("emprestimos").insert({
        livro_id: livro.id,
        usuario_id: userId,
        usuario_nome: email.split("@")[0],
        data_emprestimo: hoje,
        data_prevista: prevista,
        status: "ATIVO",
      });
      if (error) {
        // tenta reverter disponibilidade
        await supabase
          .from("livros")
          .update({ disponiveis: livro.disponiveis })
          .eq("id", livro.id);
        throw error;
      }

      setMsg(`Empréstimo registrado! Devolva até ${fmtBR(prevista)} (14 dias).`);
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro no empréstimo");
    }
  }

  async function devolver(emp: Emprestimo) {
    if (!canManage && emp.usuario_id !== userId) return;
    try {
      const supabase = getSupabase();
      const hoje = new Date().toISOString().slice(0, 10);

      await supabase
        .from("emprestimos")
        .update({ status: "DEVOLVIDO", data_devolucao: hoje })
        .eq("id", emp.id);

      const livro = livros.find((l) => l.id === emp.livro_id);
      if (livro) {
        await supabase
          .from("livros")
          .update({ disponiveis: Math.min(livro.exemplares, livro.disponiveis + 1) })
          .eq("id", emp.livro_id);
      }

      setMsg("Devolução registrada.");
      carregar();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Erro na devolução");
    }
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
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1B5E4A] bg-[#E6F8EF] border-2 border-[#0F1E36] px-3 py-1 rounded-lg shadow-[2px_2px_0_#0F1E36]">
          Acervo escolar
        </span>
        <h1 className="mt-3 text-3xl font-semibold font-serif">Biblioteca</h1>
        <p className="mt-2 text-sm opacity-75 max-w-2xl">
          Consulte o acervo, veja o que está disponível e registre empréstimo por até{" "}
          <strong>{DIAS_EMPRESTIMO} dias</strong>. Limite de 3 livros ativos por aluno.
        </p>

        {/* Abas */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              ["catalogo", "Catálogo"],
              ["meus", "Meus empréstimos"],
              ...(canManage ? ([["gestao", "Gestão"]] as const) : []),
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setAba(id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 border-[#0F1E36] ${
                aba === id
                  ? "bg-[#F4B41A] shadow-[2px_2px_0_#0F1E36]"
                  : "bg-white hover:bg-[#FFF8DB]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {msg && (
          <p className="mt-4 text-sm font-semibold bg-white border-2 border-[#0F1E36] rounded-xl px-4 py-2.5">
            {msg}
          </p>
        )}

        {/* CATÁLOGO */}
        {aba === "catalogo" && (
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar título, autor..."
                className="flex-1 border-2 border-[#0F1E36] rounded-xl px-3.5 py-2.5 text-sm bg-white"
              />
              <select
                value={filtroCat}
                onChange={(e) => setFiltroCat(e.target.value)}
                className="border-2 border-[#0F1E36] rounded-xl px-3 py-2.5 text-sm bg-white"
              >
                <option value="TODOS">Todas categorias</option>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={filtroDisp}
                onChange={(e) => setFiltroDisp(e.target.value)}
                className="border-2 border-[#0F1E36] rounded-xl px-3 py-2.5 text-sm bg-white"
              >
                <option value="TODOS">Todos</option>
                <option value="DISPONIVEL">Só disponíveis</option>
                <option value="EMPRESTADO">Indisponíveis</option>
              </select>
            </div>

            {loading ? (
              <p className="text-sm opacity-70">Carregando acervo...</p>
            ) : filtrados.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-[#0F1E36]/30 rounded-2xl p-8 text-center">
                <p className="font-medium opacity-70">Nenhum livro encontrado</p>
                <p className="text-sm opacity-50 mt-1">
                  {canManage
                    ? "Cadastre o primeiro título na aba Gestão."
                    : "Aguarde a biblioteca cadastrar o acervo."}
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filtrados.map((l) => {
                  const livre = l.disponiveis > 0;
                  return (
                    <li
                      key={l.id}
                      className="bg-white border-[3px] border-[#0F1E36] rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0_#0F1E36] flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#0F1E36] ${
                              livre
                                ? "bg-[#E6F8EF] text-[#15803D]"
                                : "bg-[#FFF0E5] text-[#E04F33]"
                            }`}
                          >
                            {livre
                              ? `${l.disponiveis} disponível${l.disponiveis > 1 ? "eis" : ""}`
                              : "Emprestado"}
                          </span>
                          <span className="text-[10px] font-bold uppercase opacity-50">
                            {l.categoria || "Geral"}
                          </span>
                        </div>
                        <h3 className="font-semibold font-serif text-lg leading-tight">{l.titulo}</h3>
                        <p className="text-sm opacity-70">{l.autor}</p>
                        {l.localizacao && (
                          <p className="text-xs opacity-50 mt-0.5">Local: {l.localizacao}</p>
                        )}
                        {l.sinopse && (
                          <p className="text-xs opacity-60 mt-1 line-clamp-2">{l.sinopse}</p>
                        )}
                      </div>
                      <div className="shrink-0">
                        {userId ? (
                          <button
                            type="button"
                            disabled={!livre}
                            onClick={() => solicitarEmprestimo(l)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-[#0F1E36] ${
                              livre
                                ? "bg-[#2554C7] text-white shadow-[2px_2px_0_#0F1E36]"
                                : "bg-[#E8E4D9] text-[#0F1E36]/40 cursor-not-allowed"
                            }`}
                          >
                            {livre ? "Pegar emprestado" : "Indisponível"}
                          </button>
                        ) : (
                          <span className="text-xs opacity-60">Entre para emprestar</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* MEUS EMPRÉSTIMOS */}
        {aba === "meus" && (
          <div className="mt-6">
            {!userId ? (
              <p className="text-sm opacity-70">Faça login para ver seus empréstimos.</p>
            ) : meus.length === 0 ? (
              <p className="text-sm opacity-70">Você ainda não tem empréstimos registrados.</p>
            ) : (
              <ul className="space-y-3">
                {meus.map((e) => {
                  const atrasado =
                    e.status === "ATIVO" && e.data_prevista < new Date().toISOString().slice(0, 10);
                  return (
                    <li
                      key={e.id}
                      className="bg-white border-2 border-[#0F1E36] rounded-xl p-4 shadow-[2px_2px_0_#0F1E36]"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#0F1E36] ${
                            e.status === "DEVOLVIDO"
                              ? "bg-[#E6F8EF] text-[#15803D]"
                              : atrasado
                              ? "bg-[#FFF0E5] text-[#E04F33]"
                              : "bg-[#EBF3FF] text-[#2554C7]"
                          }`}
                        >
                          {e.status === "DEVOLVIDO"
                            ? "Devolvido"
                            : atrasado
                            ? "Atrasado"
                            : "Ativo"}
                        </span>
                      </div>
                      <p className="font-semibold">
                        {e.livros?.titulo || "Livro"}{" "}
                        <span className="font-normal opacity-70 text-sm">
                          — {e.livros?.autor}
                        </span>
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        Retirada: {fmtBR(e.data_emprestimo)} · Devolver até:{" "}
                        <strong>{fmtBR(e.data_prevista)}</strong>
                        {e.data_devolucao ? ` · Devolvido em ${fmtBR(e.data_devolucao)}` : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* GESTÃO */}
        {aba === "gestao" && canManage && (
          <div className="mt-6 space-y-8">
            <form
              onSubmit={cadastrarLivro}
              className="bg-white border-[3px] border-[#0F1E36] rounded-2xl p-5 space-y-3 max-w-xl shadow-[4px_4px_0_#0F1E36]"
            >
              <h2 className="font-semibold font-serif text-lg">Cadastrar livro</h2>
              <input
                required
                placeholder="Título"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <input
                required
                placeholder="Autor"
                value={form.autor}
                onChange={(e) => setForm({ ...form, autor: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={form.exemplares}
                  onChange={(e) => setForm({ ...form, exemplares: Number(e.target.value) })}
                  className="border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
                  placeholder="Exemplares"
                />
              </div>
              <input
                placeholder="Localização (prateleira, sala...)"
                value={form.localizacao}
                onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <input
                placeholder="ISBN (opcional)"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Sinopse breve (opcional)"
                value={form.sinopse}
                onChange={(e) => setForm({ ...form, sinopse: e.target.value })}
                rows={2}
                className="w-full border-2 border-[#0F1E36] rounded-xl px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1B5E4A] text-white font-semibold border-2 border-[#0F1E36]"
              >
                Salvar no acervo
              </button>
            </form>

            <div>
              <h2 className="font-semibold font-serif text-lg mb-3">Empréstimos em aberto</h2>
              {todosEmp.length === 0 ? (
                <p className="text-sm opacity-70">Nenhum empréstimo ativo.</p>
              ) : (
                <ul className="space-y-2">
                  {todosEmp.map((e) => (
                    <li
                      key={e.id}
                      className="flex flex-wrap items-center justify-between gap-2 bg-white border-2 border-[#0F1E36] rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-sm">
                          {e.livros?.titulo} — {e.usuario_nome}
                        </p>
                        <p className="text-xs opacity-70">
                          Até {fmtBR(e.data_prevista)} · {e.status}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => devolver(e)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#E6F8EF] border-2 border-[#0F1E36]"
                      >
                        Registrar devolução
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
