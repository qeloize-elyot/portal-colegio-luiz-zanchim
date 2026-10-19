import React from "react";

// 1. FUNDO ARQUITETÔNICO CLEAN (LUZES DIFUSAS DE ESTÚDIO, SEM POLUIÇÃO VISUAL)
export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f8fafc]">
      {/* Grade geométrica ultra sutil apenas no topo */}
      <svg
        className="absolute inset-x-0 top-0 h-[550px] w-full opacity-[0.35] [mask-image:linear-gradient(to_bottom,white,transparent)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cleanGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#cbd5e1" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cleanGrid)" />
      </svg>

      {/* Luz difusa suave no canto superior esquerdo */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-blue-100/50 via-emerald-50/30 to-transparent blur-3xl" />

      {/* Luz difusa suave no canto inferior direito */}
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-orange-100/45 via-amber-50/30 to-transparent blur-3xl" />
    </div>
  );
}

// 2. BANNER PADRONIZADO DE TOPO DE PÁGINA COM FUNDO QUE VALORIZA OS SVGS
export function PageHeroBanner({
  badge,
  title,
  subtitle,
  accentColor = "#1b365d",
  softBg = "#eef4ff",
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
    <div
      className="relative overflow-hidden rounded-3xl border border-border p-6 sm:p-9 mb-8 animate-fade-in-up shadow-sm"
      style={{ backgroundColor: softBg }}
    >
      {/* Brilho decorativo de fundo para destacar a arte */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 w-72 h-72 rounded-full blur-2xl opacity-35"
        style={{ backgroundColor: accentColor }}
      />
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20"
        viewBox="0 0 400 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <circle cx="330" cy="40" r="85" stroke={accentColor} strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="330" cy="40" r="125" stroke={accentColor} strokeWidth="1.5" />
        <path d="M180 200 C250 110, 310 135, 400 50" stroke={accentColor} strokeWidth="2" />
      </svg>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 bg-white border border-border/80 shadow-2xs"
            style={{ color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            {badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-muted text-sm sm:text-[15px] leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="shrink-0">{illustration}</div>
      </div>
    </div>
  );
}

// 3. LOGO OFICIAL COM MOLDURA ANIMADA (Para Login e Home, sem SVG brega)
export function SchoolLogoShowcase({ size = 148 }: { size?: number }) {
  return (
    <div className="relative inline-flex items-center justify-center my-2">
      <svg
        className="w-48 h-48 sm:w-56 sm:h-56 svg-spin opacity-65"
        viewBox="0 0 220 220"
        fill="none"
      >
        <circle
          cx="110"
          cy="110"
          r="100"
          stroke="#e6b422"
          strokeWidth="2.5"
          strokeDasharray="10 8"
        />
        <circle
          cx="110"
          cy="110"
          r="88"
          stroke="#ffffff"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-white p-2.5 shadow-xl ring-4 ring-[#e6b422]/50 svg-float">
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

// Alias caso algum lugar importe HomeHeroIllustration
export function HomeHeroIllustration() {
  return <SchoolLogoShowcase size={140} />;
}

// 4. ILUSTRAÇÃO DA CANTINA / CARDÁPIO (Com fundo escuro contrastante que valoriza o lanche, suco e vapor!)
export function CantinaIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <defs>
          <linearGradient id="cantinaBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1b365d" />
            <stop offset="100%" stopColor="#2f6f4e" />
          </linearGradient>
        </defs>
        {/* Fundo contrastante escuro que destaca as cores quentes da comida */}
        <circle cx="120" cy="120" r="98" fill="url(#cantinaBg)" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" className="svg-spin" />

        {/* Vapores brancos/dourados super visíveis no fundo escuro */}
        <path className="svg-steam-1" d="M84 74 C80 58, 90 48, 84 34" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-2" d="M114 68 C110 52, 120 42, 114 28" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-3" d="M144 74 C140 58, 150 48, 144 34" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />

        {/* Bandeja / Prato Brilhante */}
        <ellipse cx="120" cy="172" rx="76" ry="15" fill="#e2e8f0" />
        <ellipse cx="120" cy="169" rx="64" ry="10" fill="#ffffff" />

        {/* Hambúrguer Artesanal Bem Desenhado */}
        {/* Pão de cima */}
        <path d="M58 134 C58 98, 130 98, 130 134 Z" fill="#f59e0b" />
        {/* Gergelim */}
        <ellipse cx="80" cy="114" rx="3" ry="1.8" fill="#fef3c7" />
        <ellipse cx="95" cy="109" rx="3" ry="1.8" fill="#fef3c7" />
        <ellipse cx="110" cy="115" rx="3" ry="1.8" fill="#fef3c7" />
        <ellipse cx="94" cy="120" rx="3" ry="1.8" fill="#fef3c7" />
        {/* Alface verdinha */}
        <path d="M54 135 Q68 143 82 135 T110 135 T134 135" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
        {/* Tomate e Queijo derretido */}
        <rect x="62" y="138" width="64" height="6" rx="3" fill="#ef4444" />
        <polygon points="60,141 128,141 118,150 70,150" fill="#facc15" />
        {/* Hamburguer e Pão de baixo */}
        <rect x="56" y="145" width="76" height="11" rx="5.5" fill="#78350f" />
        <rect x="60" y="155" width="68" height="10" rx="5" fill="#d97706" />

        {/* Copo de Suco de Laranja com Canudo */}
        <path d="M164 88 L176 68 L190 68" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="142,96 184,96 177,164 149,164" fill="#fb923c" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" />
        <line x1="145" y1="110" x2="181" y2="110" stroke="#ffffff" strokeWidth="3" />
        {/* Rodela de laranja no copo */}
        <circle cx="182" cy="96" r="10" fill="#facc15" stroke="#ea580c" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

// 5. ILUSTRAÇÃO DE MATERIAIS DE APOIO (Caderno Universitário Aberto + Lápis + Luminária + Estrelas em fundo contrastante)
export function MateriaisIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <defs>
          <linearGradient id="matBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1b365d" />
          </linearGradient>
        </defs>
        {/* Fundo Azul Profundo que faz o caderno branco e o lápis amarelo saltarem aos olhos */}
        <circle cx="120" cy="120" r="98" fill="url(#matBg)" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#60a5fa" strokeWidth="2" strokeDasharray="7 6" className="svg-spin" />

        {/* Caderno / Livro Aberto em Perspectiva */}
        <path
          d="M52 92 C75 84, 102 86, 120 96 C138 86, 165 84, 188 92 V166 C165 158, 138 160, 120 170 C102 160, 75 158, 52 166 Z"
          fill="#f8fafc"
          stroke="#93c5fd"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Capa inferior do livro */}
        <path
          d="M48 166 C74 158, 102 160, 120 172 C138 160, 166 158, 192 166"
          stroke="#f59e0b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line x1="120" y1="96" x2="120" y2="170" stroke="#cbd5e1" strokeWidth="3" />

        {/* Linhas de estudo na página esquerda */}
        <line x1="66" y1="110" x2="106" y2="110" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="66" y1="124" x2="102" y2="124" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <line x1="66" y1="136" x2="96" y2="136" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <line x1="66" y1="148" x2="104" y2="148" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

        {/* Gráfico/Fórmula na página direita */}
        <rect x="134" y="106" width="40" height="24" rx="4" fill="#dbeafe" />
        <path d="M140 124 L148 114 L156 120 L166 110" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="134" y1="142" x2="174" y2="142" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <line x1="134" y1="152" x2="162" y2="152" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

        {/* Marcador de Página Vermelho */}
        <polygon points="154,162 166,162 166,188 160,181 154,188" fill="#ef4444" />

        {/* Lápis / Caneta Flutuando Escrevendo */}
        <g className="svg-float-rev" transform="rotate(-28 150 75)">
          <rect x="120" y="54" width="64" height="14" rx="3" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="176" y="54" width="12" height="14" rx="2" fill="#f472b6" />
          <polygon points="120,54 104,61 120,68" fill="#fde68a" />
          <polygon points="110,58.5 104,61 110,63.5" fill="#1e293b" />
        </g>

        {/* Estrelas de Destaque */}
        <g className="svg-pulse">
          <polygon points="68,54 71,62 80,62 73,67 75,75 68,70 61,75 63,67 56,62 65,62" fill="#facc15" />
          <circle cx="186" cy="68" r="5" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
}

// 6. ILUSTRAÇÃO DA FEIRA DE TROCAS (Mochila + Livros + Caixa de Doação/Troca Solidária — Sem camiseta estranha!)
export function FeiraIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <defs>
          <linearGradient id="feiraBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="100%" stopColor="#2f6f4e" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="120" r="98" fill="url(#feiraBg)" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#86efac" strokeWidth="2" strokeDasharray="8 6" className="svg-spin" />

        {/* Setas Circulares Dinâmicas de Troca no Topo */}
        <g className="svg-pulse">
          <path d="M82 64 C102 46, 138 46, 158 64" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="163,69 149,66 158,55" fill="#facc15" />
        </g>

        {/* Livros Coloridos e Material saindo da Caixa Solidária */}
        {/* Livro Azul */}
        <rect x="68" y="84" width="38" height="48" rx="5" transform="rotate(-10 68 84)" fill="#38bdf8" stroke="#ffffff" strokeWidth="2.5" />
        {/* Livro Laranja */}
        <rect x="102" y="76" width="38" height="52" rx="5" fill="#fb923c" stroke="#ffffff" strokeWidth="2.5" />
        {/* Régua / Esquadro Amarelo */}
        <rect x="136" y="82" width="34" height="46" rx="5" transform="rotate(12 136 82)" fill="#facc15" stroke="#ffffff" strokeWidth="2.5" />

        {/* Caixa de Feira / Doação e Troca Estudantil */}
        <polygon points="56,122 184,122 172,176 68,176" fill="#f59e0b" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" />
        {/* Abas da caixa */}
        <polygon points="56,122 44,136 74,136 82,122" fill="#fbbf24" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="184,122 196,136 166,136 158,122" fill="#fbbf24" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Etiqueta com Símbolo de Troca / Coração Solidário na Caixa */}
        <rect x="92" y="138" width="56" height="26" rx="8" fill="#ffffff" />
        <path
          d="M108 148 H130 L125 143 M132 155 H110 L115 160"
          stroke="#15803d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// 7. ILUSTRAÇÃO DO PAINEL DO GRÊMIO
export function GremioIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="98" fill="#1b365d" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#facc15" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <g className="svg-pulse">
          <polygon points="188,62 192,72 203,72 194,79 197,89 188,83 179,89 182,79 173,72 184,72" fill="#facc15" />
          <polygon points="56,60 59,67 66,67 60,72 62,79 56,75 50,79 52,72 46,67 53,67" fill="#fb923c" />
        </g>

        <g transform="rotate(-14 120 120)">
          <path className="svg-pulse" d="M174 94 Q190 115 174 136" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
          <path className="svg-pulse" d="M188 80 Q212 115 188 150" stroke="#fb923c" strokeWidth="5" strokeLinecap="round" />
          <polygon points="72,102 154,68 154,162 72,128" fill="#3b82f6" />
          <polygon points="104,89 154,68 154,162 104,141" fill="#60a5fa" />
          <ellipse cx="154" cy="115" rx="8" ry="47" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
          <rect x="54" y="101" width="20" height="28" rx="6" fill="#facc15" />
          <path d="M80 128 L90 164 C92 170 80 174 75 166 L66 128 Z" fill="#f59e0b" />
        </g>
      </svg>
    </div>
  );
}

// 8. ILUSTRAÇÃO DE ENQUETES
export function EnquetesIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="98" fill="#1e293b" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#fb923c" strokeWidth="2" strokeDasharray="8 8" className="svg-spin" />

        <rect x="52" y="64" width="136" height="114" rx="18" fill="#ffffff" stroke="#e2e8f0" strokeWidth="4" />

        <rect x="76" y="122" width="22" height="38" rx="6" fill="#facc15" />
        <rect x="109" y="84" width="22" height="76" rx="6" fill="#c45c26" className="svg-pulse" />
        <rect x="142" y="102" width="22" height="58" rx="6" fill="#2f6f4e" />

        <g className="svg-float-rev">
          <circle cx="176" cy="72" r="24" fill="#22c55e" stroke="#ffffff" strokeWidth="4" />
          <path d="M166 72 L173 79 L187 65" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 9. ILUSTRAÇÃO DE SUGESTÕES / OUVIDORIA
export function SugestoesIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="98" fill="#1b365d" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#34d399" strokeWidth="2" strokeDasharray="6 6" className="svg-spin" />

        <g className="svg-pulse" stroke="#facc15" strokeWidth="5" strokeLinecap="round">
          <line x1="120" y1="28" x2="120" y2="44" />
          <line x1="58" y1="54" x2="70" y2="66" />
          <line x1="182" y1="54" x2="170" y2="66" />
          <line x1="42" y1="110" x2="56" y2="110" />
          <line x1="198" y1="110" x2="184" y2="110" />
        </g>

        <path
          d="M120 54 C88 54 68 78 68 106 C68 126 82 140 92 154 L148 154 C158 140 172 126 172 106 C172 78 152 54 120 54 Z"
          fill="#facc15"
        />
        <path d="M90 94 C90 78 104 68 118 68" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />

        <rect x="94" y="156" width="52" height="12" rx="6" fill="#94a3b8" />
        <rect x="100" y="170" width="40" height="10" rx="5" fill="#64748b" />

        <g className="svg-float-rev">
          <rect x="140" y="132" width="58" height="40" rx="12" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
          <polygon points="152,172 142,184 164,172" fill="#10b981" />
          <circle cx="158" cy="152" r="3.5" fill="#ffffff" />
          <circle cx="169" cy="152" r="3.5" fill="#ffffff" />
          <circle cx="180" cy="152" r="3.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// 10. ILUSTRAÇÃO DA CALCULADORA DE NOTAS
export function CalculadoraIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="98" fill="#1e293b" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#facc15" strokeWidth="2.5" strokeDasharray="6 6" className="svg-spin" />

        <rect x="74" y="52" width="92" height="136" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3.5" />
        <rect x="86" y="66" width="68" height="28" rx="6" fill="#dcfce7" />
        <text x="146" y="86" textAnchor="end" fill="#15803d" fontSize="16" fontWeight="bold" fontFamily="monospace">
          10.0
        </text>

        <rect x="86" y="106" width="18" height="16" rx="4" fill="#e2e8f0" />
        <rect x="111" y="106" width="18" height="16" rx="4" fill="#e2e8f0" />
        <rect x="136" y="106" width="18" height="16" rx="4" fill="#fb923c" />

        <rect x="86" y="128" width="18" height="16" rx="4" fill="#e2e8f0" />
        <rect x="111" y="128" width="18" height="16" rx="4" fill="#e2e8f0" />
        <rect x="136" y="128" width="18" height="16" rx="4" fill="#facc15" />

        <rect x="86" y="150" width="43" height="18" rx="4" fill="#2f6f4e" />
        <rect x="136" y="150" width="18" height="18" rx="4" fill="#c45c26" />

        <g className="svg-float-rev">
          <circle cx="176" cy="74" r="22" fill="#c45c26" stroke="#ffffff" strokeWidth="3.5" />
          <text x="176" y="80" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">
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
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="98" fill="#1b365d" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#facc15" strokeWidth="2" strokeDasharray="8 6" className="svg-spin" />

        <g className="svg-sway">
          <rect x="56" y="64" width="84" height="68" rx="18" fill="#c45c26" stroke="#ffffff" strokeWidth="3" />
          <polygon points="76,132 64,148 92,132" fill="#c45c26" />
          <text x="98" y="112" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="bold">
            ?
          </text>
        </g>

        <g className="svg-float-rev">
          <rect x="114" y="108" width="76" height="62" rx="16" fill="#22c55e" stroke="#ffffff" strokeWidth="3.5" />
          <polygon points="168,170 180,184 154,170" fill="#22c55e" />
          <text x="152" y="152" textAnchor="middle" fill="#ffffff" fontSize="36" fontWeight="bold">
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
      <svg className="w-44 h-44 sm:w-52 sm:h-52 svg-float drop-shadow-md" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="98" fill="#1b365d" stroke="#ffffff" strokeWidth="5" />
        <circle cx="120" cy="120" r="86" stroke="#facc15" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        <path
          d="M120 52 L176 74 V122 C176 160 150 188 120 202 C90 188 64 160 64 122 V74 L120 52 Z"
          fill="#2f6f4e"
          stroke="#facc15"
          strokeWidth="4"
        />
        <circle cx="120" cy="122" r="32" fill="#ffffff" />
        <path d="M106 122 L116 132 L136 110" stroke="#15803d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 13. DIVISOR DE ONDAS SUAVES
export function WaveDivider({ color = "#2f6f4e" }: { color?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none mt-8 pointer-events-none">
      <svg className="relative block w-full h-10 sm:h-14" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill={color}
          fillOpacity="0.16"
        />
      </svg>
    </div>
  );
}

// 14. ILUSTRAÇÃO DE ESTADO VAZIO
export function EmptyStateIllustration({ label = "Nenhum item encontrado no momento." }: { label?: string }) {
  return (
    <div className="border border-dashed border-border bg-card/70 rounded-3xl p-8 text-center my-4">
      <svg className="w-24 h-24 mx-auto mb-3 svg-float" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="46" fill="#eef4ff" />
        <rect x="34" y="42" width="52" height="40" rx="8" fill="#ffffff" stroke="#1b365d" strokeWidth="2.5" />
        <path d="M44 56 H76" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 66 H64" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="38" r="10" fill="#e6b422" />
        <path d="M77 38 H83 M80 35 V41" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="text-muted text-sm font-medium">{label}</p>
    </div>
  );
}
