"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

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
      // Opcional: restringir domínio gov (descomente se quiser forçar)
      // if (!email.endsWith("@escola.pr.gov.br") && !email.endsWith("@professor.pr.gov.br")) {
      //   setErro("Use um e-mail institucional (@escola.pr.gov.br).");
      //   setCarregando(false);
      //   return;
      // }

      if (modo === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: {
              full_name: nome,
              role: role,
            },
          },
        });
        if (error) throw error;
        setErro("");
        alert("Conta criada! Verifique seu e-mail se pedir confirmação, depois faça login.");
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
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
        <h1 className="text-xl font-bold text-foreground mb-1">
          {modo === "login" ? "Entrar no portal" : "Criar conta"}
        </h1>
        <p className="text-sm text-muted mb-6">
          {modo === "login"
            ? "Acesse com seu e-mail e senha."
            : "Preencha os dados para se cadastrar."}
        </p>

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
                <p className="text-xs text-muted mt-1">
                  Contas de Administração devem ser aprovadas pela direção.
                </p>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
              placeholder="seu.email@escola.pr.gov.br"
            />
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

        <p className="text-sm text-center text-muted mt-5">
          {modo === "login" ? (
            <>
              Ainda não tem conta?{" "}
              <button
                type="button"
                onClick={() => setModo("cadastro")}
                className="text-primary font-medium underline"
              >
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button
                type="button"
                onClick={() => setModo("login")}
                className="text-primary font-medium underline"
              >
                Faça login
              </button>
            </>
          )}
        </p>

        <p className="text-center mt-4">
          <Link href="/" className="text-sm text-muted hover:text-primary">
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
