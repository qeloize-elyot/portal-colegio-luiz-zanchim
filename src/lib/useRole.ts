"use client";

import { useEffect, useState } from "react";
import { getDemoUser, type AppRole } from "@/lib/demo-auth";

export type { AppRole };

export function useRole() {
  const [role, setRole] = useState<AppRole | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getDemoUser();
    if (user) {
      setRole(user.role);
      setEmail(user.email);
      // id fictício estável baseado no e-mail
      setUserId(`demo-${btoa(user.email).replace(/=/g, "").slice(0, 12)}`);
    } else {
      setRole(null);
      setEmail(null);
      setUserId(null);
    }
    setLoading(false);
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
