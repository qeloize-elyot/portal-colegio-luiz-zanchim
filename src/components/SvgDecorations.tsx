import React from "react";

// 1. FUNDO DE FOLHA DE CADERNO PONTILHADA + ANIMAÇÕES GLOBAIS DOS SVGS
export function BackgroundBlobs() {
  return (
    <>
      <style>{`
        @keyframes svgFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(1.5deg); }
        }
        @keyframes svgFloatRev {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(6px) rotate(-2deg); }
        }
        @keyframes svgSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes svgPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.75; }
        }
        @keyframes svgSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes svgSteam {
          0%, 100% { transform: translateY(0px); opacity: 0.9; }
          50% { transform: translateY(-8px); opacity: 0.25; }
        }
        .svg-float { animation: svgFloat 3.8s ease-in-out infinite; transform-origin: center; }
        .svg-float-rev { animation: svgFloatRev 3.2s ease-in-out infinite; transform-origin: center; }
        .svg-spin { animation: svgSpin 20s linear infinite; transform-origin: center; }
        .svg-pulse { animation: svgPulse 2.2s ease-in-out infinite; transform-origin: center; }
        .svg-sway { animation: svgSway 3s ease-in-out infinite; transform-origin: center; }
        .svg-steam-1 { animation: svgSteam 2.2s ease-in-out infinite; }
        .svg-steam-2 { animation: svgSteam 2.2s ease-in-out 0.6s infinite; }
        .svg-steam-3 { animation: svgSteam 2.2s ease-in-out 1.2s infinite; }
      `}</style>

      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          backgroundColor: "#F7F3E8",
          backgroundImage: "radial-gradient(#0F1E36 1.15px, transparent 1.15px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Margem vermelha clássica de caderno escolar no canto esquerdo */}
        <div className="hidden 2xl:block absolute top-0 bottom-0 left-14 w-[2px] bg-[#E04F33]/35" />
        <div className="hidden 2xl:block absolute top-0 bottom-0 left-16 w-[1px] bg-[#E04F33]/20" />
      </div>
    </>
  );
}

// 2. BANNER PADRONIZADO DE TOPO DE PÁGINA (ESTILO CADERNO DE ESTUDOS COM ESPIRAL E STICKER)
export function PageHeroBanner({
  badge,
  title,
  subtitle,
  accentColor = "#1b365d",
  softBg = "#FFF8DB",
  illustration,
}: {
  badge: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  softBg?: string;
  illustration: React.ReactNode;
}) {
  return (
    <div className="relative mb-9 pt-3">
      {/* Fita adesiva segurando o banner no topo */}
      <div className="w-28 h-6 bg-[#FFFDF9]/90 border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] -rotate-2 mx-auto -mb-3 relative z-20 pointer-events-none" />

      <div
        className="relative overflow-hidden rounded-[28px] border-[3px] border-[#0F1E36] p-6 sm:p-9 shadow-[7px_7px_0px_#0F1E36]"
        style={{ backgroundColor: softBg }}
      >
        {/* Grade de caderno sutil no fundo do banner */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bannerNotebookGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke={accentColor} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bannerNotebookGrid)" />
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5 bg-[#FFFDF9] border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] -rotate-1"
              style={{ color: "#0F1E36" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-[#0F1E36]"
                style={{ backgroundColor: accentColor }}
              />
              {badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F1E36] mb-2.5 tracking-tight">
              {title}
            </h1>
            <p className="text-[#0F1E36]/80 text-sm sm:text-base font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
          <div className="shrink-0">{illustration}</div>
        </div>
      </div>
    </div>
  );
}

// 3. LOGO OFICIAL COM MOLDURA ESTILO CARIMBO ESCOLAR
export function SchoolLogoShowcase({ size = 148 }: { size?: number }) {
  return (
    <div className="relative inline-flex items-center justify-center my-2">
      <svg
        className="w-48 h-48 sm:w-56 sm:h-56 svg-spin"
        viewBox="0 0 220 220"
        fill="none"
      >
        <circle
          cx="110"
          cy="110"
          r="102"
          stroke="#F4B41A"
          strokeWidth="3.5"
          strokeDasharray="12 8"
        />
        <circle cx="110" cy="8" r="5" fill="#E04F33" />
        <circle cx="212" cy="110" r="5" fill="#F4B41A" />
        <circle cx="110" cy="212" r="5" fill="#E04F33" />
        <circle cx="8" cy="110" r="5" fill="#F4B41A" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-[#FFFDF9] p-3 border-[3px] border-[#0F1E36] shadow-[5px_5px_0px_#0F1E36] svg-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Logo Colégio Estadual Cívico-Militar Vereador Luiz Zanchim"
            style={{ width: size, height: size }}
            className="rounded-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function HomeHeroIllustration() {
  return <SchoolLogoShowcase size={140} />;
}

// 4. ILUSTRAÇÃO DA CANTINA / CARDÁPIO
export function CantinaIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#1B5E4A" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <path className="svg-steam-1" d="M84 74 C80 58, 90 48, 84 34" stroke="#F4B41A" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-2" d="M114 68 C110 52, 120 42, 114 28" stroke="#FFFDF9" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-3" d="M144 74 C140 58, 150 48, 144 34" stroke="#F4B41A" strokeWidth="4" strokeLinecap="round" />

        <ellipse cx="120" cy="172" rx="74" ry="14" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3.5" />

        {/* Hambúrguer estilo Sticker */}
        <path d="M58 134 C58 98, 130 98, 130 134 Z" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3.5" strokeLinejoin="round" />
        <ellipse cx="82" cy="114" rx="3" ry="1.8" fill="#FFFDF9" />
        <ellipse cx="96" cy="109" rx="3" ry="1.8" fill="#FFFDF9" />
        <ellipse cx="110" cy="115" rx="3" ry="1.8" fill="#FFFDF9" />
        <path d="M54 135 Q68 143 82 135 T110 135 T134 135" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
        <rect x="56" y="143" width="76" height="12" rx="6" fill="#78350F" stroke="#0F1E36" strokeWidth="3" />
        <rect x="60" y="154" width="68" height="11" rx="5" fill="#E04F33" stroke="#0F1E36" strokeWidth="3" />

        {/* Copo de Suco */}
        <path d="M164 88 L176 68 L190 68" stroke="#E04F33" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="142,96 184,96 177,164 149,164" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3.5" strokeLinejoin="round" />
        <circle cx="182" cy="96" r="10" fill="#E04F33" stroke="#0F1E36" strokeWidth="3" />
      </svg>
    </div>
  );
}

// 5. ILUSTRAÇÃO DE MATERIAIS DE APOIO
export function MateriaisIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#2554C7" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#FFFDF9" strokeWidth="2.5" strokeDasharray="7 6" className="svg-spin" />

        <path
          d="M52 92 C75 84, 102 86, 120 96 C138 86, 165 84, 188 92 V166 C165 158, 138 160, 120 170 C102 160, 75 158, 52 166 Z"
          fill="#FFFDF9"
          stroke="#0F1E36"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <line x1="120" y1="96" x2="120" y2="170" stroke="#0F1E36" strokeWidth="3.5" />

        <line x1="66" y1="112" x2="106" y2="112" stroke="#E04F33" strokeWidth="4" strokeLinecap="round" />
        <line x1="66" y1="126" x2="102" y2="126" stroke="#0F1E36" strokeWidth="3" strokeLinecap="round" />
        <line x1="66" y1="140" x2="96" y2="140" stroke="#0F1E36" strokeWidth="3" strokeLinecap="round" />

        <rect x="134" y="106" width="40" height="26" rx="4" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
        <line x1="134" y1="144" x2="174" y2="144" stroke="#0F1E36" strokeWidth="3" strokeLinecap="round" />

        <polygon points="154,162 166,162 166,188 160,181 154,188" fill="#E04F33" stroke="#0F1E36" strokeWidth="2.5" />

        <g className="svg-float-rev" transform="rotate(-25 150 75)">
          <rect x="118" y="52" width="64" height="15" rx="3" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3" />
          <polygon points="118,52 102,59.5 118,67" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 6. ILUSTRAÇÃO DA FEIRA DE TROCAS
export function FeiraIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#15803D" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <rect x="68" y="84" width="38" height="48" rx="5" transform="rotate(-10 68 84)" fill="#2554C7" stroke="#0F1E36" strokeWidth="3" />
        <rect x="102" y="76" width="38" height="52" rx="5" fill="#E04F33" stroke="#0F1E36" strokeWidth="3" />
        <rect x="136" y="82" width="34" height="46" rx="5" transform="rotate(12 136 82)" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3" />

        <polygon points="56,122 184,122 172,176 68,176" fill="#F4B41A" stroke="#0F1E36" strokeWidth="4" strokeLinejoin="round" />
        <rect x="92" y="136" width="56" height="26" rx="8" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3" />
        <path d="M108 146 H130 L125 141 M132 153 H110 L115 158" stroke="#0F1E36" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 7. ILUSTRAÇÃO DO PAINEL DO GRÊMIO
export function GremioIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#E04F33" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#FFFDF9" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <g transform="rotate(-14 120 120)" className="svg-sway">
          <path className="svg-pulse" d="M174 94 Q190 115 174 136" stroke="#F4B41A" strokeWidth="5" strokeLinecap="round" />
          <path className="svg-pulse" d="M188 80 Q212 115 188 150" stroke="#FFFDF9" strokeWidth="5" strokeLinecap="round" />
          <polygon points="72,102 154,68 154,162 72,128" fill="#F4B41A" stroke="#0F1E36" strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="154" cy="115" rx="8" ry="47" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="4" />
          <rect x="52" y="101" width="20" height="28" rx="6" fill="#2554C7" stroke="#0F1E36" strokeWidth="3.5" />
          <path d="M80 128 L90 164 C92 170 80 174 75 166 L66 128 Z" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3.5" />
        </g>
      </svg>
    </div>
  );
}

// 8. ILUSTRAÇÃO DE ENQUETES
export function EnquetesIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#5B3FD9" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="8 8" className="svg-spin" />

        <rect x="52" y="64" width="136" height="114" rx="18" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="4" />
        <rect x="76" y="122" width="22" height="38" rx="5" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3" />
        <rect x="109" y="84" width="22" height="76" rx="5" fill="#E04F33" stroke="#0F1E36" strokeWidth="3" className="svg-pulse" />
        <rect x="142" y="102" width="22" height="58" rx="5" fill="#16A34A" stroke="#0F1E36" strokeWidth="3" />

        <g className="svg-float-rev">
          <circle cx="176" cy="72" r="24" fill="#F4B41A" stroke="#0F1E36" strokeWidth="4" />
          <path d="M166 72 L173 79 L187 65" stroke="#0F1E36" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 9. ILUSTRAÇÃO DE SUGESTÕES / OUVIDORIA
export function SugestoesIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#1B5E4A" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="6 6" className="svg-spin" />

        <path
          d="M120 54 C88 54 68 78 68 106 C68 126 82 140 92 154 L148 154 C158 140 172 126 172 106 C172 78 152 54 120 54 Z"
          fill="#F4B41A"
          stroke="#0F1E36"
          strokeWidth="4"
        />
        <rect x="94" y="154" width="52" height="16" rx="6" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3.5" />

        <g className="svg-float-rev">
          <rect x="136" y="130" width="62" height="42" rx="12" fill="#E04F33" stroke="#0F1E36" strokeWidth="3.5" />
          <circle cx="155" cy="151" r="3.5" fill="#FFFDF9" />
          <circle cx="167" cy="151" r="3.5" fill="#FFFDF9" />
          <circle cx="179" cy="151" r="3.5" fill="#FFFDF9" />
        </g>
      </svg>
    </div>
  );
}

// 10. ILUSTRAÇÃO DA CALCULADORA DE NOTAS
export function CalculadoraIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#0F766E" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="6 6" className="svg-spin" />

        <rect x="74" y="50" width="92" height="140" rx="16" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="4" />
        <rect x="86" y="64" width="68" height="30" rx="6" fill="#D1FAE5" stroke="#0F1E36" strokeWidth="3" />
        <text x="148" y="85" textAnchor="end" fill="#0F1E36" fontSize="16" fontWeight="900" fontFamily="monospace">
          180
        </text>

        <rect x="86" y="104" width="18" height="18" rx="4" fill="#EBF3FF" stroke="#0F1E36" strokeWidth="2.5" />
        <rect x="111" y="104" width="18" height="18" rx="4" fill="#EBF3FF" stroke="#0F1E36" strokeWidth="2.5" />
        <rect x="136" y="104" width="18" height="18" rx="4" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />

        <rect x="86" y="128" width="18" height="18" rx="4" fill="#EBF3FF" stroke="#0F1E36" strokeWidth="2.5" />
        <rect x="111" y="128" width="18" height="18" rx="4" fill="#EBF3FF" stroke="#0F1E36" strokeWidth="2.5" />
        <rect x="136" y="128" width="18" height="18" rx="4" fill="#E04F33" stroke="#0F1E36" strokeWidth="2.5" />

        <rect x="86" y="152" width="68" height="20" rx="5" fill="#16A34A" stroke="#0F1E36" strokeWidth="2.5" />

        <g className="svg-float-rev">
          <circle cx="176" cy="72" r="22" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3.5" />
          <text x="176" y="78" textAnchor="middle" fill="#0F1E36" fontSize="15" fontWeight="900">
            A+
          </text>
        </g>
      </svg>
    </div>
  );
}

// 11. ILUSTRAÇÃO DE DÚVIDAS FREQUENTES / FAQ
export function FaqIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#2554C7" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <g className="svg-sway">
          <rect x="54" y="62" width="84" height="68" rx="18" fill="#E04F33" stroke="#0F1E36" strokeWidth="4" />
          <text x="96" y="110" textAnchor="middle" fill="#FFFDF9" fontSize="42" fontWeight="900">
            ?
          </text>
        </g>

        <g className="svg-float-rev">
          <rect x="114" y="108" width="76" height="62" rx="16" fill="#F4B41A" stroke="#0F1E36" strokeWidth="4" />
          <text x="152" y="152" textAnchor="middle" fill="#0F1E36" fontSize="38" fontWeight="900">
            !
          </text>
        </g>
      </svg>
    </div>
  );
}

// 12. ILUSTRAÇÃO DO PAINEL ADMINISTRATIVO
export function AdminIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="124" cy="124" r="96" fill="#0F1E36" />
        <circle cx="120" cy="120" r="96" fill="#1B5E4A" stroke="#0F1E36" strokeWidth="5" />
        <circle cx="120" cy="120" r="84" stroke="#F4B41A" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <path
          d="M120 52 L176 74 V122 C176 160 150 188 120 202 C90 188 64 160 64 122 V74 L120 52 Z"
          fill="#F4B41A"
          stroke="#0F1E36"
          strokeWidth="4"
        />
        <circle cx="120" cy="122" r="32" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3.5" />
        <path d="M106 122 L116 132 L136 110" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 13. DIVISOR ESCOLAR
export function WaveDivider({ color = "#0F1E36" }: { color?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none mt-8 pointer-events-none">
      <svg className="relative block w-full h-6" viewBox="0 0 1200 24" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="1200" y2="12" stroke={color} strokeWidth="3" strokeDasharray="12 8" strokeOpacity="0.25" />
      </svg>
    </div>
  );
}

// 14. ILUSTRAÇÃO DE ESTADO VAZIO (ESTILO NOTA ADESIVA / POST-IT)
export function EmptyStateIllustration({ label = "Nenhum item encontrado no momento." }: { label?: string }) {
  return (
    <div className="border-[3px] border-dashed border-[#0F1E36] bg-[#FFFDF9] rounded-3xl p-8 text-center my-4 shadow-[5px_5px_0px_#0F1E36]">
      <svg className="w-24 h-24 mx-auto mb-3 svg-float" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="46" fill="#FFF8DB" stroke="#0F1E36" strokeWidth="3" />
        <rect x="34" y="42" width="52" height="40" rx="8" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="3" />
        <path d="M44 56 H76" stroke="#0F1E36" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 66 H64" stroke="#E04F33" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="38" r="11" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
        <path d="M77 38 H83 M80 35 V41" stroke="#0F1E36" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="text-[#0F1E36] text-sm font-black">{label}</p>
    </div>
  );
}
