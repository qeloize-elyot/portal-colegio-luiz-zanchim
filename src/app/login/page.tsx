"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

function isEmailGov(email: string) {
  return email.trim().toLowerCase().endsWith(".gov.br");
}

function IllustracaoLivro() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-[220px] mx-auto" aria-hidden>
      <ellipse cx="100" cy="140" rx="70" ry="12" fill="#e8d5c4" opacity="0.5" />
      <path d="M40 50 L100 30 L160 50 L160 110 L100 130 L40 110 Z" fill="#c45c26" />
      <path d="M100 30 L100 130" stroke="#faf6f1" strokeWidth="3" />
      <path d="M55 60 L90 48" stroke="#fdf0e6" strokeWidth="4" strokeLinecap="round" />
      <path d="M55 75 L90 63" stroke="#fdf0e6" strokeWidth="4" strokeLinecap="round" />
      <path d="M55 90 L85 78" stroke="#fdf0e6" strokeWidth="4" strokeLinecap="round" />
      <path d="M110 48 L145 60" stroke="#fdf0e6" strokeWidth="4" strokeLinecap="round" />
      <path d="M110 63 L145 75" stroke="#fdf0e6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="155" cy="40" r="18" fill="#e6b422" />
      <path d="M148 40 L153 45 L163 33" fill="none" stroke="#2c2416" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllustracaoPessoas() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[200px] mx-auto" aria-hidden>
      <circle cx="60" cy="40" r="18" fill="#2f6f4e" />
      <ellipse cx="60" cy="85" rx="28" ry="22" fill="#2f6f4e" />
      <circle cx="140" cy="40" r="18" fill="#c45c26" />
      <ellipse cx="140" cy="85" rx="28" ry="22" fill="#c45c26" />
      <circle cx="100" cy="50" r="16" fill="#e6b422" />
      <ellipse cx="100" cy="92" rx="24" ry="18" fill="#e6b422" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
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
        router.push("/");
        router.refresh();
      } else {
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
          router.push("/");
          router.refresh();
          return;
        }

        alert("Conta criada! Agora faça login com o mesmo e-mail e senha.");
        setModo("login");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao autenticar.";
      setErro(message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#faf6f1] overflow-y-auto">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#c45c26]/12 blur-2xl" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-[#2f6f4e]/10 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#e6b422]/15 blur-2xl" />
      </div>

      <div className="relative min-h-full flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 bg-gradient-to-br from-[#c45c26] to-[#9a4520] text-white">
          <div className="max-w-sm text-center">
            <IllustracaoLivro />
            <h2 className="mt-8 text-2xl font-bold leading-tight">
              Portal da nossa comunidade escolar
            </h2>
            <p className="mt-3 text-white/85 text-[15px] leading-relaxed">
              Materiais, cardápio, grêmio, enquetes e um canal de escuta — tudo em
              um espaço seguro, só para quem faz parte da escola.
            </p>
            <div className="mt-10">
              <IllustracaoPessoas />
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[400px]">
            <div className="lg:hidden mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c45c26] text-white text-xl font-bold mb-3">
                LZ
              </div>
              <p className="text-sm text-[#6b5b4b]">Colégio Cívico-Militar · Paraná</p>
            </div>

            <div className="bg-white border border-[#e8d5c4] rounded-3xl p-7 sm:p-8 shadow-sm">
              <h1 className="text-xl font-bold text-[#2c2416] mb-1">
                {modo === "login" ? "Bem-vindo de volta" : "Criar sua conta"}
              </h1>
              <p className="text-sm text-[#6b5b4b] mb-6">
                {modo === "login"
                  ? "Entre com seu e-mail institucional"
                  : "Use um e-mail terminado em .gov.br"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {modo === "cadastro" && (
                  <>
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
                  </>
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
                  <label className="block text-sm font-medium text-[#2c2416] mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    minLength={6}
                    className="w-full border border-[#e8d5c4] rounded-xl px-3.5 py-2.5 text-sm bg-[#faf6f1] focus:outline-none focus:ring-2 focus:ring-[#c45c26]/40"
                  />
                </div>

                {erro && (
                  <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl">
                    {erro}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full bg-[#c45c26] text-white font-semibold py-3 rounded-xl hover:bg-[#9a4520] transition-colors disabled:opacity-60 shadow-sm"
                >
                  {carregando
                    ? "Aguarde..."
                    : modo === "login"
                    ? "Entrar no portal"
                    : "Criar conta"}
                </button>
              </form>

              <p className="text-sm text-center text-[#6b5b4b] mt-6">
                {modo === "login" ? (
                  <>
                    Ainda não tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setErro("");
                        setModo("cadastro");
                      }}
                      className="text-[#c45c26] font-semibold underline"
                    >
                      Criar conta
                    </button>
                  </>
                ) : (
                  <>
                    Já tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setErro("");
                        setModo("login");
                      }}
                      className="text-[#c45c26] font-semibold underline"
                    >
                      Fazer login
                    </button>
                  </>
                )}
              </p>
            </div>

            <p className="text-center text-[11px] text-[#6b5b4b]/80 mt-6">
              Colégio Estadual Cívico-Militar Vereador Luiz Zanchim
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
