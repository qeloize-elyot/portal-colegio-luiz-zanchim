"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function EntryAnimation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Roda a animação sempre que o usuário estiver na página inicial ("/")
    if (pathname === "/") {
      setVisible(true);
      setLeaving(false);

      const leaveTimer = setTimeout(() => {
        setLeaving(true);
      }, 1800);

      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 2500);

      return () => {
        clearTimeout(leaveTimer);
        clearTimeout(removeTimer);
      };
    } else {
      setVisible(false);
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0F2442] via-[#16355D] to-[#134E4A] text-white transition-all duration-700 ease-in-out ${
        leaving
          ? "opacity-0 scale-110 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <style>{`
        @keyframes introSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes introSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes introLogoPop {
          0% { transform: scale(0.4); opacity: 0; }
          65% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes introTextUp {
          0% { transform: translateY(18px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes introProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .intro-spin { animation: introSpin 12s linear infinite; transform-origin: center; }
        .intro-spin-rev { animation: introSpinReverse 16s linear infinite; transform-origin: center; }
        .intro-logo { animation: introLogoPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .intro-text-1 { animation: introTextUp 0.6s ease-out 0.35s both; }
        .intro-text-2 { animation: introTextUp 0.6s ease-out 0.55s both; }
        .intro-bar { animation: introProgress 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>

      {/* Brilho suave de fundo */}
      <div className="pointer-events-none absolute w-96 h-96 rounded-full bg-amber-400/15 blur-3xl" />

      {/* Brasão com Órbitas em SVG */}
      <div className="relative flex items-center justify-center w-56 h-56 mb-4 intro-logo">
        <svg className="absolute inset-0 w-full h-full intro-spin" viewBox="0 0 240 240" fill="none">
          <circle
            cx="120"
            cy="120"
            r="108"
            stroke="#FBBF24"
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeDasharray="12 10"
          />
          <circle cx="120" cy="12" r="5" fill="#FBBF24" />
          <circle cx="228" cy="120" r="4" fill="#34D399" />
          <circle cx="120" cy="228" r="5" fill="#FBBF24" />
          <circle cx="12" cy="120" r="4" fill="#38BDF8" />
        </svg>

        <svg className="absolute inset-3 w-[216px] h-[216px] intro-spin-rev" viewBox="0 0 220 220" fill="none">
          <circle cx="110" cy="110" r="88" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.8" />
          <path d="M110 22 A88 88 0 0 1 198 110" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M110 198 A88 88 0 0 1 22 110" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
        </svg>

        <div className="relative w-32 h-32 rounded-full bg-white p-2.5 shadow-2xl shadow-black/30 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Logo Colégio Luiz Zanchim"
            className="w-full h-full rounded-full object-contain"
          />
        </div>
      </div>

      {/* Textos */}
      <div className="text-center px-6 space-y-2">
        <div className="intro-text-1 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-[11px] font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          Portal Escolar Oficial · CCMPR
        </div>

        <h1 className="intro-text-2 text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          Colégio Estadual Cívico-Militar{" "}
          <span className="text-amber-300">Vereador Luiz Zanchim</span>
        </h1>
      </div>

      {/* Barra de Progresso */}
      <div className="intro-text-2 mt-7 w-48 h-1.5 bg-white/15 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 rounded-full intro-bar" />
      </div>
    </div>
  );
}
