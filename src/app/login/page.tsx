"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

function isEmailGov(email: string) {
  return email.trim().toLowerCase().endsWith(".gov.br");
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

        // Se a sessão já veio (confirmação de e-mail desligada), entra direto
        if (data.session) {
          router.push("/");
          router.refresh();
          return;
        }

        setErro("");
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary mb-2">
            Portal interno
          </p>
          <h1 className="text-xl font-bold text-foreground mb-1">
            {modo === "login" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="text-sm text-muted">
            Acesso exclusivo para e-mails .gov.br
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === "cadastro" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nome completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de conta</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
                >
                  <option value="ALUNO">Aluno</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="ADMIN">Administração / Direção</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">E-mail institucional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
              placeholder="seu.nome@escola.pr.gov.br"
            />
            <p className="text-xs text-muted mt-1">Somente endereços terminados em .gov.br</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
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
            className="w-full bg-primary text-white font-medium py-2.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {carregando ? "Aguarde..." : modo === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <p className="text-sm text-center text-muted mt-6">
          {modo === "login" ? (
            <>
              Ainda não tem conta?{" "}
              <button
                type="button"
                onClick={() => {
                  setErro("");
                  setModo("cadastro");
                }}
                className="text-primary font-medium underline"
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
                className="text-primary font-medium underline"
              >
                Fazer login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
