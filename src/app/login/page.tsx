"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";

function isEmailGov(email: string) {
  return email.trim().toLowerCase().endsWith(".gov.br");
}

export default function LoginPage() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [role, setRole] = useState("ALUNO");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      if (!isEmailGov(email)) {
        setErro("Apenas e-mails institucionais (.gov.br) podem acessar este portal.");
        setCarregando(false);
        return;
      }

      const supabase = getSupabase();

      if (modo === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: senha,
        });
        if (error) throw error;
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: senha,
        options: {
          data: {
            full_name: nome,
            role: role,
          },
        },
      });
      if (error) throw error;

      if (data.session) {
        window.location.href = "/";
        return;
      }

      alert("Conta criada! Agora faça login com o mesmo e-mail e senha.");
      setModo("login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao autenticar.";
      setErro(message);
    } finally {
      setCarregando(false);
    }
  }

  function irParaCadastro() {
    setErro("");
    setModo("cadastro");
  }

  function irParaLogin() {
    setErro("");
    setModo("login");
  }

  const titulo = modo === "login" ? "Bem-vindo de volta" : "Criar sua conta";
  const subtitulo =
    modo === "login"
      ? "Entre com seu e-mail institucional (@escola.pr.gov.br)"
      : "Use um e-mail institucional terminado em .gov.br";
  const textoBotao =
    carregando ? "Aguarde..." : modo === "login" ? "Entrar no portal" : "Criar conta";

  return (
    <div className="min-h-screen bg-[#faf6f1] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Lado Esquerdo: Identidade Institucional com a Logo Oficial da Escola */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 bg-gradient-to-br from-[#1b365d] via-[#1e4640] to-[#2f6f4e] text-white relative overflow-hidden">
        <svg
          className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 opacity-15"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="85" stroke="#e6b422" strokeWidth="3" strokeDasharray="10 8" />
        </svg>
        <svg
          className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 opacity-15"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="85" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="6 6" />
        </svg>

        <div className="max-w-md text-center relative z-10 flex flex-col items-center">
          <SchoolLogoShowcase size={156} />

          <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-widest bg-white/15 border border-white/25 px-3.5 py-1 rounded-full text-[#fde68a]">
            Portal Escolar Oficial
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight">
            Colégio Estadual Cívico-Militar Vereador Luiz Zanchim
          </h2>

          <p className="mt-4 text-white/85 text-[15px] leading-relaxed">
            Materiais de apoio, cardápio da cantina, grêmio estudantil, enquetes, feira de trocas e ouvidoria em um ambiente seguro para a nossa escola.
          </p>
        </div>
      </div>

      {/* Lado Direito: Formulário de Acesso */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative z-10">
        <div className="w-full max-w-[410px]">
          <div className="lg:hidden mb-6 text-center flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Logo do Colégio"
              className="w-20 h-20 rounded-full shadow-md mb-3 ring-2 ring-[#c45c26]/30 bg-white p-1"
            />
            <p className="text-base font-bold text-[#2c2416]">Portal Escolar</p>
            <p className="text-xs font-medium text-[#6b5b4b]">Colégio Cívico-Militar Vereador Luiz Zanchim</p>
          </div>

          <div className="bg-white border border-[#e8d5c4] rounded-3xl p-7 sm:p-8 shadow-sm">
            <h1 className="text-xl font-bold text-[#2c2416] mb-1">{titulo}</h1>
            <p className="text-sm text-[#6b5b4b] mb-6">{subtitulo}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modo === "cadastro" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2416] mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      className="w-full border border-[#e8d5c4] rounded-xl px-3.5 py-2.5 text-sm bg-[#faf6f1] focus:outline-none focus:ring-2 focus:ring-[#c45c26]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2c2416] mb-1">
                      Você é
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full border border-[#e8d5c4] rounded-xl px-3.5 py-2.5 text-sm bg-[#faf6f1] focus:outline-none focus:ring-2 focus:ring-[#c45c26]/40"
                    >
                      <option value="ALUNO">Aluno</option>
                      <option value="PROFESSOR">Professor</option>
                      <option value="ADMIN">Administração / Direção</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#2c2416] mb-1">
                  E-mail institucional
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu.nome@escola.pr.gov.br"
                  className="w-full border border-[#e8d5c4] rounded-xl px-3.5 py-2.5 text-sm bg-[#faf6f1] focus:outline-none focus:ring-2 focus:ring-[#c45c26]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2c2416] mb-1">Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-[#e8d5c4] rounded-xl px-3.5 py-2.5 text-sm bg-[#faf6f1] focus:outline-none focus:ring-2 focus:ring-[#c45c26]/40"
                />
              </div>

              {erro ? (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl">
                  {erro}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-[#c45c26] text-white font-semibold py-3 rounded-xl hover:bg-[#9a4520] transition-colors disabled:opacity-60 shadow-sm"
              >
                {textoBotao}
              </button>
            </form>

            <p className="text-sm text-center text-[#6b5b4b] mt-6">
              {modo === "login" ? (
                <span>
                  Ainda não tem conta?{" "}
                  <button
                    type="button"
                    onClick={irParaCadastro}
                    className="text-[#c45c26] font-semibold underline"
                  >
                    Criar conta
                  </button>
                </span>
              ) : (
                <span>
                  Já tem conta?{" "}
                  <button
                    type="button"
                    onClick={irParaLogin}
                    className="text-[#c45c26] font-semibold underline"
                  >
                    Fazer login
                  </button>
                </span>
              )}
            </p>
          </div>

          <p className="text-center text-[11px] text-[#6b5b4b]/80 mt-6">
            Colégio Estadual Cívico-Militar Vereador Luiz Zanchim · CCMPR
          </p>
        </div>
      </div>
    </div>
  );
}
