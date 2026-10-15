import React from "react";

// 1. FUNDO DECORATIVO GLOBAL COM FORMAS ORGÂNICAS E ESTRELAS CÍVICO-MILITARES
export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-45">
      <svg className="absolute -top-24 -left-24 w-96 h-96 svg-float" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="lzGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c45c26" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e6b422" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path
          fill="url(#lzGrad1)"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.2C64.8,55.2,53.8,66.6,40.3,74.1C26.8,81.6,10.8,85.2,-4.6,83.9C-20,82.6,-34.8,76.4,-48.3,68.2C-61.8,60,-74,49.8,-81.2,36.5C-88.4,23.2,-90.6,6.8,-88.1,-8.5C-85.6,-23.8,-78.4,-38,-68.1,-49.2C-57.8,-60.4,-44.4,-68.6,-30.5,-75.8C-16.6,-83,-2.2,-89.2,12.2,-87.8C26.6,-86.4,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg className="absolute top-1/3 -right-28 w-[420px] h-[420px] svg-float-rev" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="lzGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2f6f4e" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#1b365d" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          fill="url(#lzGrad2)"
          d="M39.9,-65.7C54.1,-60.5,69.5,-54,77.9,-42.2C86.3,-30.4,87.7,-13.3,85.4,2.8C83.1,18.9,77.1,34,67.7,46.7C58.3,59.4,45.5,69.7,30.9,75.8C16.3,81.9,-0.1,83.8,-15.8,80.7C-31.5,77.6,-46.5,69.5,-58.5,57.8C-70.5,46.1,-79.5,30.8,-82.9,14.1C-86.3,-2.6,-84.1,-20.7,-76.3,-35.1C-68.5,-49.5,-55.1,-60.2,-40.8,-65.4C-26.5,-70.6,-11.3,-70.3,1.8,-73.1C14.9,-75.9,25.7,-70.9,39.9,-65.7Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg className="absolute -bottom-24 left-1/4 w-80 h-80 svg-float" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="70" fill="#e6b422" fillOpacity="0.12" />
        <circle cx="100" cy="100" r="52" stroke="#c45c26" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>
    </div>
  );
}

// 2. BANNER PADRONIZADO DE TOPO DE PÁGINA COM ARTE SVG RICA
export function PageHeroBanner({
  badge,
  title,
  subtitle,
  accentColor = "#c45c26",
  softBg = "#fdf0e6",
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
      className="relative overflow-hidden rounded-3xl border border-border p-6 sm:p-8 mb-8 animate-fade-in-up shadow-sm"
      style={{ backgroundColor: softBg }}
    >
      {/* Padrão geométrico sutil de fundo */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20"
        viewBox="0 0 400 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <circle cx="340" cy="30" r="90" stroke={accentColor} strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="340" cy="30" r="130" stroke={accentColor} strokeWidth="1.5" />
        <path d="M200 200 C260 120, 320 140, 400 60" stroke={accentColor} strokeWidth="2" />
      </svg>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 bg-white/90 border border-border shadow-2xs"
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

// 3. ILUSTRAÇÃO DA HOME (Brasão Estudantil CCMPR + Livros + Conquista)
export function HomeHeroIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-52 h-52 sm:w-64 sm:h-64 svg-float" viewBox="0 0 260 260" fill="none">
        {/* Aura circular giratória */}
        <circle cx="130" cy="130" r="108" fill="#ffffff" fillOpacity="0.65" />
        <circle
          cx="130"
          cy="130"
          r="98"
          stroke="#c45c26"
          strokeWidth="2"
          strokeDasharray="8 6"
          className="svg-spin"
        />
        <circle cx="130" cy="130" r="82" fill="#e8f3ec" />

        {/* Escudo Cívico-Militar Estilizado */}
        <path
          d="M130 46 L186 68 V126 C186 168 158 198 130 212 C102 198 74 168 74 126 V68 L130 46 Z"
          fill="#1b365d"
          stroke="#e6b422"
          strokeWidth="4"
        />
        <path
          d="M130 56 L176 74 V124 C176 159 152 184 130 197 C108 184 84 159 84 124 V74 L130 56 Z"
          fill="#2f6f4e"
        />

        {/* Livro Aberto no Centro do Brasão */}
        <path
          d="M95 108 C108 102, 122 104, 130 112 C138 104, 152 102, 165 108 V152 C152 146, 138 148, 130 156 C122 148, 108 146, 95 152 Z"
          fill="#faf6f1"
          stroke="#1b365d"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line x1="130" y1="112" x2="130" y2="156" stroke="#c45c26" strokeWidth="3" />
        <line x1="104" y1="120" x2="122" y2="120" stroke="#c45c26" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="104" y1="130" x2="120" y2="130" stroke="#2f6f4e" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="138" y1="120" x2="156" y2="120" stroke="#c45c26" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="138" y1="130" x2="154" y2="130" stroke="#2f6f4e" strokeWidth="2.5" strokeLinecap="round" />

        {/* Estrelas Douradas no Topo */}
        <g className="svg-pulse">
          <polygon
            points="130,68 134,78 145,78 136,84 139,94 130,88 121,94 124,84 115,78 126,78"
            fill="#e6b422"
          />
          <circle cx="54" cy="78" r="7" fill="#c45c26" />
          <circle cx="208" cy="84" r="6" fill="#e6b422" />
          <polygon
            points="205,172 208,180 216,180 210,185 212,193 205,188 198,193 200,185 194,180 202,180"
            fill="#e6b422"
          />
          <polygon
            points="56,175 58,181 65,181 60,185 62,191 56,187 50,191 52,185 47,181 54,181"
            fill="#2f6f4e"
          />
        </g>

        {/* Faixa LZ */}
        <rect x="92" y="172" width="76" height="22" rx="11" fill="#c45c26" stroke="#ffffff" strokeWidth="2.5" />
        <text x="130" y="187" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
          COLÉGIO LZ
        </text>
      </svg>
    </div>
  );
}

// 4. ILUSTRAÇÃO DA CANTINA / CARDÁPIO (Bandeja, Lanche, Maçã, Suco e Vapor Quentinho)
export function CantinaIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#2f6f4e" strokeWidth="2" strokeDasharray="6 6" className="svg-spin" />

        {/* Vapores */}
        <path className="svg-steam-1" d="M86 72 C82 58, 92 48, 86 34" stroke="#c45c26" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-2" d="M116 66 C112 52, 122 42, 116 28" stroke="#e6b422" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-3" d="M146 72 C142 58, 152 48, 146 34" stroke="#2f6f4e" strokeWidth="4" strokeLinecap="round" />

        {/* Bandeja */}
        <ellipse cx="120" cy="170" rx="78" ry="16" fill="#e8d5c4" />
        <ellipse cx="120" cy="166" rx="68" ry="11" fill="#faf6f1" />

        {/* Sanduíche / Pão com Queijo */}
        <path d="M62 136 C62 104, 130 104, 130 136 Z" fill="#e6b422" />
        <circle cx="82" cy="120" r="2.5" fill="#ffffff" />
        <circle cx="98" cy="115" r="2.5" fill="#ffffff" />
        <circle cx="112" cy="122" r="2.5" fill="#ffffff" />
        <path d="M58 137 Q72 144 86 137 T114 137 T134 137" stroke="#2f6f4e" strokeWidth="6" strokeLinecap="round" />
        <polygon points="64,141 128,141 120,149 72,149" fill="#fbbf24" />
        <rect x="60" y="145" width="72" height="10" rx="5" fill="#9a4520" />
        <rect x="62" y="154" width="68" height="10" rx="5" fill="#c45c26" />

        {/* Copo de Suco Natural com Canudo */}
        <path d="M164 92 L176 72 L190 72" stroke="#2f6f4e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="144,98 184,98 178,162 150,162" fill="#c45c26" stroke="#ffffff" strokeWidth="3" />
        <line x1="146" y1="112" x2="182" y2="112" stroke="#fdf0e6" strokeWidth="3" />
        <circle cx="164" cy="134" r="7" fill="#e6b422" />
      </svg>
    </div>
  );
}

// 5. ILUSTRAÇÃO DO PAINEL DO GRÊMIO (Megafone + Ondas Sonoras + Estrelas)
export function GremioIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#e6b422" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        {/* Estrelas de Destaque */}
        <g className="svg-pulse">
          <polygon points="190,62 194,72 205,72 196,79 199,89 190,83 181,89 184,79 175,72 186,72" fill="#e6b422" />
          <polygon points="54,58 57,65 64,65 58,70 60,77 54,73 48,77 50,70 44,65 51,65" fill="#c45c26" />
          <circle cx="186" cy="158" r="6" fill="#2f6f4e" />
          <circle cx="56" cy="152" r="7" fill="#e6b422" />
        </g>

        {/* Megafone Estudantil */}
        <g transform="rotate(-14 120 120)">
          <path className="svg-pulse" d="M174 94 Q190 115 174 136" stroke="#c45c26" strokeWidth="5" strokeLinecap="round" />
          <path className="svg-pulse" d="M188 80 Q212 115 188 150" stroke="#e6b422" strokeWidth="5" strokeLinecap="round" />
          <polygon points="72,102 154,68 154,162 72,128" fill="#1b365d" />
          <polygon points="104,89 154,68 154,162 104,141" fill="#c45c26" />
          <ellipse cx="154" cy="115" rx="8" ry="47" fill="#fdf0e6" stroke="#c45c26" strokeWidth="3" />
          <rect x="54" y="101" width="20" height="28" rx="6" fill="#e6b422" />
          <path d="M80 128 L90 164 C92 170 80 174 75 166 L66 128 Z" fill="#2f6f4e" />
        </g>
      </svg>
    </div>
  );
}

// 6. ILUSTRAÇÃO DE ENQUETES (Painel de Gráficos + Voto Confirmado)
export function EnquetesIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#c45c26" strokeWidth="2" strokeDasharray="8 8" className="svg-spin" />

        {/* Painel de Votação */}
        <rect x="52" y="64" width="136" height="114" rx="18" fill="#faf6f1" stroke="#c45c26" strokeWidth="4" />

        {/* Barras de Resultado */}
        <rect x="76" y="122" width="22" height="38" rx="6" fill="#e6b422" />
        <rect x="109" y="84" width="22" height="76" rx="6" fill="#c45c26" className="svg-pulse" />
        <rect x="142" y="102" width="22" height="58" rx="6" fill="#2f6f4e" />

        {/* Selo Check */}
        <g className="svg-float-rev">
          <circle cx="176" cy="72" r="24" fill="#2f6f4e" stroke="#ffffff" strokeWidth="4" />
          <path d="M166 72 L173 79 L187 65" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 7. ILUSTRAÇÃO DE SUGESTÕES / OUVIDORIA (Lâmpada de Ideia + Balão de Diálogo Seguro)
export function SugestoesIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#2f6f4e" strokeWidth="2" strokeDasharray="6 6" className="svg-spin" />

        {/* Raios de Luz */}
        <g className="svg-pulse" stroke="#e6b422" strokeWidth="5" strokeLinecap="round">
          <line x1="120" y1="28" x2="120" y2="44" />
          <line x1="58" y1="54" x2="70" y2="66" />
          <line x1="182" y1="54" x2="170" y2="66" />
          <line x1="42" y1="110" x2="56" y2="110" />
          <line x1="198" y1="110" x2="184" y2="110" />
        </g>

        {/* Lâmpada */}
        <path
          d="M120 54 C88 54 68 78 68 106 C68 126 82 140 92 154 L148 154 C158 140 172 126 172 106 C172 78 152 54 120 54 Z"
          fill="#e6b422"
        />
        <path d="M90 94 C90 78 104 68 118 68" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />

        {/* Base da Lâmpada */}
        <rect x="94" y="156" width="52" height="12" rx="6" fill="#1b365d" />
        <rect x="100" y="170" width="40" height="10" rx="5" fill="#2c2416" />

        {/* Balão de Conversa / Escuta */}
        <g className="svg-float-rev">
          <rect x="142" y="132" width="58" height="40" rx="12" fill="#2f6f4e" stroke="#ffffff" strokeWidth="3" />
          <polygon points="154,172 144,184 166,172" fill="#2f6f4e" />
          <circle cx="160" cy="152" r="3.5" fill="#ffffff" />
          <circle cx="171" cy="152" r="3.5" fill="#ffffff" />
          <circle cx="182" cy="152" r="3.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// 8. ILUSTRAÇÃO DE MATERIAIS DE APOIO (Pilha de Livros + Capelo + Marcador)
export function MateriaisIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#c45c26" strokeWidth="2" strokeDasharray="7 5" className="svg-spin" />

        {/* Livro Base Verde */}
        <rect x="56" y="148" width="128" height="24" rx="7" fill="#2f6f4e" />
        <rect x="64" y="153" width="114" height="14" rx="4" fill="#faf6f1" />
        <line x1="72" y1="160" x2="168" y2="160" stroke="#e8d5c4" strokeWidth="2" />

        {/* Livro do Meio Terracota */}
        <rect x="64" y="122" width="116" height="24" rx="7" fill="#c45c26" />
        <rect x="72" y="127" width="102" height="14" rx="4" fill="#faf6f1" />
        <polygon points="152,127 162,127 162,148 157,143 152,148" fill="#e6b422" />

        {/* Livro Topo Azul Marinho */}
        <rect x="72" y="96" width="100" height="24" rx="7" fill="#1b365d" />
        <rect x="80" y="101" width="86" height="14" rx="4" fill="#faf6f1" />

        {/* Capelo / Estrela do Conhecimento */}
        <g className="svg-float-rev">
          <polygon points="120,48 172,68 120,88 68,68" fill="#1b365d" stroke="#e6b422" strokeWidth="3" />
          <path d="M158 74 V98" stroke="#e6b422" strokeWidth="4" strokeLinecap="round" />
          <circle cx="158" cy="100" r="5" fill="#c45c26" />
        </g>
      </svg>
    </div>
  );
}

// 9. ILUSTRAÇÃO DA FEIRA DE TROCAS (Setas de Circulação + Livro + Camiseta de Uniforme)
export function FeiraIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#2f6f4e" strokeWidth="2.5" strokeDasharray="10 6" className="svg-spin" />

        {/* Setas Circulares de Troca */}
        <path
          d="M72 88 C92 60, 148 60, 168 88"
          stroke="#2f6f4e"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="172,94 156,88 168,74" fill="#2f6f4e" />

        <path
          d="M168 152 C148 180, 92 180, 72 152"
          stroke="#c45c26"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="68,146 84,152 72,166" fill="#c45c26" />

        {/* Camiseta Uniforme + Livro no centro */}
        <g className="svg-pulse">
          <path
            d="M84 96 L100 86 H140 L156 96 L146 114 L136 108 V146 H104 V108 L94 114 Z"
            fill="#1b365d"
            stroke="#e6b422"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="120" cy="116" r="10" fill="#e6b422" />
          <text x="120" y="120" textAnchor="middle" fill="#1b365d" fontSize="9" fontWeight="bold">
            LZ
          </text>
        </g>
      </svg>
    </div>
  );
}

// 10. ILUSTRAÇÃO DA CALCULADORA DE NOTAS (Calculadora + Símbolos Matemáticos + Nota 10)
export function CalculadoraIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#e6b422" strokeWidth="2.5" strokeDasharray="6 6" className="svg-spin" />

        {/* Corpo da Calculadora */}
        <rect x="74" y="52" width="92" height="136" rx="16" fill="#1b365d" stroke="#e6b422" strokeWidth="3.5" />
        {/* Visor */}
        <rect x="86" y="66" width="68" height="28" rx="6" fill="#e8f3ec" />
        <text x="146" y="86" textAnchor="end" fill="#2f6f4e" fontSize="16" fontWeight="bold" fontFamily="monospace">
          10.0
        </text>

        {/* Botões */}
        <rect x="86" y="106" width="18" height="16" rx="4" fill="#faf6f1" />
        <rect x="111" y="106" width="18" height="16" rx="4" fill="#faf6f1" />
        <rect x="136" y="106" width="18" height="16" rx="4" fill="#c45c26" />

        <rect x="86" y="128" width="18" height="16" rx="4" fill="#faf6f1" />
        <rect x="111" y="128" width="18" height="16" rx="4" fill="#faf6f1" />
        <rect x="136" y="128" width="18" height="16" rx="4" fill="#e6b422" />

        <rect x="86" y="150" width="43" height="18" rx="4" fill="#2f6f4e" />
        <rect x="136" y="150" width="18" height="18" rx="4" fill="#c45c26" />

        {/* Medalha A+ flutuando */}
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

// 11. ILUSTRAÇÃO DE DÚVIDAS FREQUENTES / FAQ (Bússola Escolar + Balões ? e !)
export function FaqIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#c45c26" strokeWidth="2" strokeDasharray="8 6" className="svg-spin" />

        {/* Balão de Pergunta (?) */}
        <g className="svg-sway">
          <rect x="56" y="64" width="84" height="68" rx="18" fill="#c45c26" />
          <polygon points="76,132 64,148 92,132" fill="#c45c26" />
          <text x="98" y="112" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="bold">
            ?
          </text>
        </g>

        {/* Balão de Resposta (!) */}
        <g className="svg-float-rev">
          <rect x="114" y="108" width="76" height="62" rx="16" fill="#2f6f4e" stroke="#ffffff" strokeWidth="4" />
          <polygon points="168,170 180,184 154,170" fill="#2f6f4e" />
          <text x="152" y="152" textAnchor="middle" fill="#e6b422" fontSize="36" fontWeight="bold">
            !
          </text>
        </g>
      </svg>
    </div>
  );
}

// 12. ILUSTRAÇÃO DO PAINEL ADMINISTRATIVO (Escudo de Gestão + Engrenagem + Gráficos)
export function AdminIllustration() {
  return (
    <div className="flex justify-center items-center">
      <svg className="w-40 h-40 sm:w-48 sm:h-48 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="96" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="120" cy="120" r="84" stroke="#1b365d" strokeWidth="2.5" strokeDasharray="8 6" className="svg-spin" />

        {/* Escudo de Controle */}
        <path
          d="M120 52 L176 74 V122 C176 160 150 188 120 202 C90 188 64 160 64 122 V74 L120 52 Z"
          fill="#1b365d"
          stroke="#e6b422"
          strokeWidth="4"
        />
        {/* Check de Moderação e Estrelas */}
        <circle cx="120" cy="122" r="32" fill="#2f6f4e" stroke="#faf6f1" strokeWidth="3" />
        <path d="M106 122 L116 132 L136 110" stroke="#e6b422" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 13. DIVISOR DE ONDAS SUAVES (Para transição entre seções e rodapé)
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

// 14. ILUSTRAÇÃO DE ESTADO VAZIO (Quando ainda não há itens cadastrados)
export function EmptyStateIllustration({ label = "Nenhum item encontrado no momento." }: { label?: string }) {
  return (
    <div className="border border-dashed border-border bg-card/70 rounded-3xl p-8 text-center my-4">
      <svg className="w-24 h-24 mx-auto mb-3 svg-float" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="46" fill="#fdf0e6" />
        <rect x="34" y="42" width="52" height="40" rx="8" fill="#ffffff" stroke="#c45c26" strokeWidth="2.5" />
        <path d="M44 56 H76" stroke="#e8d5c4" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 66 H64" stroke="#e8d5c4" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="38" r="10" fill="#e6b422" />
        <path d="M77 38 H83 M80 35 V41" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="text-muted text-sm font-medium">{label}</p>
    </div>
  );
}
