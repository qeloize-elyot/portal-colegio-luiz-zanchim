"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

export type AppRole = "ALUNO" | "PROFESSOR" | "ADMIN" | null;

export function useRole() {
  const [role, setRole] = useState<AppRole>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const supabase = getSupabase();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (!cancelled) {
            setRole(null);
            setUserId(null);
            setEmail(null);
            setLoading(false);
          }
          return;
        }

        const metaRole = (user.user_metadata?.role as string) || "";

        let { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        let finalRole = (profile?.role as AppRole) || null;

        // Se o cadastro foi ADMIN/PROFESSOR e o banco ficou errado, corrige
        if (
          (metaRole === "ADMIN" || metaRole === "PROFESSOR") &&
          finalRole !== metaRole
        ) {
          await supabase.from("profiles").upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "",
            role: metaRole,
          });
          finalRole = metaRole as AppRole;
        }

        if (!finalRole) {
          const novo = (metaRole as AppRole) || "ALUNO";
          await supabase.from("profiles").upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "",
            role: novo,
          });
          finalRole = novo;
        }

        if (!cancelled) {
          setUserId(user.id);
          setEmail(user.email ?? null);
          setRole(finalRole);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setRole(null);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    role,
    userId,
    email,
    loading,
    isAdmin: role === "ADMIN",
    isProfessor: role === "PROFESSOR" || role === "ADMIN",
  };
}
