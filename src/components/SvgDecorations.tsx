import React from "react";

// 1. FUNDO DECORATIVO COM FORMAS FLUTUANTES (Pode usar em todas as páginas!)
export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-35">
      <svg className="absolute -top-20 -left-20 w-96 h-96 svg-float" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.2C64.8,55.2,53.8,66.6,40.3,74.1C26.8,81.6,10.8,85.2,-4.6,83.9C-20,82.6,-34.8,76.4,-48.3,68.2C-61.8,60,-74,49.8,-81.2,36.5C-88.4,23.2,-90.6,6.8,-88.1,-8.5C-85.6,-23.8,-78.4,-38,-68.1,-49.2C-57.8,-60.4,-44.4,-68.6,-30.5,-75.8C-16.6,-83,-2.2,-89.2,12.2,-87.8C26.6,-86.4,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg className="absolute top-1/3 -right-24 w-96 h-96 svg-float-rev" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad2)"
          d="M39.9,-65.7C54.1,-60.5,69.5,-54,77.9,-42.2C86.3,-30.4,87.7,-13.3,85.4,2.8C83.1,18.9,77.1,34,67.7,46.7C58.3,59.4,45.5,69.7,30.9,75.8C16.3,81.9,-0.1,83.8,-15.8,80.7C-31.5,77.6,-46.5,69.5,-58.5,57.8C-70.5,46.1,-79.5,30.8,-82.9,14.1C-86.3,-2.6,-84.1,-20.7,-76.3,-35.1C-68.5,-49.5,-55.1,-60.2,-40.8,-65.4C-26.5,-70.6,-11.3,-70.3,1.8,-73.1C14.9,-75.9,25.7,-70.9,39.9,-65.7Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

// 2. ILUSTRAÇÃO DA CANTINA / CARDÁPIO (Prato quente com vapor + Lanche + Bebida)
export function CantinaIllustration() {
  return (
    <div className="flex justify-center items-center my-4">
      <svg className="w-48 h-48 md:w-56 md:h-56 svg-float" viewBox="0 0 240 240" fill="none">
        {/* Círculo de fundo */}
        <circle cx="120" cy="120" r="95" fill="#FEF3C7" opacity="0.7" />
        <circle cx="120" cy="120" r="80" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" className="svg-spin" />

        {/* Vapores saindo da comida */}
        <path className="svg-steam-1" d="M90 75 C85 60, 95 50, 90 35" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-2" d="M120 70 C115 55, 125 45, 120 30" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path className="svg-steam-3" d="M150 75 C145 60, 155 50, 150 35" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

        {/* Bandeja / Prato */}
        <ellipse cx="120" cy="165" rx="75" ry="18" fill="#E5E7EB" />
        <ellipse cx="120" cy="162" rx="65" ry="12" fill="#D1D5DB" />

        {/* Hambúrguer / Lanche */}
        <path d="M70 135 C70 105, 135 105, 135 135 Z" fill="#F59E0B" />
        <circle cx="90" cy="120" r="2.5" fill="#FEF3C7" />
        <circle cx="105" cy="115" r="2.5" fill="#FEF3C7" />
        <circle cx="118" cy="122" r="2.5" fill="#FEF3C7" />
        {/* Alface e Queijo */}
        <path d="M66 136 Q78 142 90 136 T114 136 T139 136" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
        <polygon points="72,140 133,140 125,147 80,147" fill="#FBBF24" />
        {/* Carne e Pão de baixo */}
        <rect x="68" y="143" width="69" height="10" rx="5" fill="#78350F" />
        <rect x="70" y="152" width="65" height="10" rx="5" fill="#D97706" />

        {/* Copo de Suco com Canudo */}
        <path d="M165 95 L178 75 L192 75" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="145,100 185,100 179,160 151,160" fill="#FB923C" stroke="#FFF" strokeWidth="3" />
        <line x1="147" y1="112" x2="183" y2="112" stroke="#FFF" strokeWidth="3" />
      </svg>
    </div>
  );
}

// 3. ILUSTRAÇÃO DO PAINEL DO GRÊMIO (Megafone + Estrelas + Escudo Estudantil)
export function GremioIllustration() {
  return (
    <div className="flex justify-center items-center my-4">
      <svg className="w-48 h-48 md:w-56 md:h-56 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="95" fill="#DBEAFE" opacity="0.6" />
        <circle cx="120" cy="120" r="82" stroke="#3B82F6" strokeWidth="2" strokeDasharray="8 6" className="svg-spin" />

        {/* Estrelas animadas */}
        <g className="svg-pulse">
          <polygon points="190,65 194,75 205,75 196,82 199,92 190,86 181,92 184,82 175,75 186,75" fill="#FBBF24" />
          <polygon points="55,60 58,67 65,67 59,72 61,79 55,75 49,79 51,72 45,67 52,67" fill="#FBBF24" />
          <circle cx="185" cy="155" r="6" fill="#60A5FA" />
          <circle cx="55" cy="150" r="8" fill="#818CF8" />
        </g>

        {/* Megafone do Grêmio */}
        <g transform="rotate(-15 120 120)">
          {/* Ondas sonoras */}
          <path className="svg-pulse" d="M175 95 Q190 115 175 135" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <path className="svg-pulse" d="M190 82 Q212 115 190 148" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />

          {/* Corpo do Megafone */}
          <polygon points="75,102 155,70 155,160 75,128" fill="#2563EB" />
          <polygon points="105,90 155,70 155,160 105,140" fill="#3B82F6" />
          <ellipse cx="155" cy="115" rx="8" ry="45" fill="#93C5FD" />
          <rect x="58" y="102" width="18" height="26" rx="5" fill="#F59E0B" />
          {/* Cabo */}
          <path d="M82 128 L92 162 C94 168 82 172 78 165 L68 128 Z" fill="#1E40AF" />
        </g>
      </svg>
    </div>
  );
}

// 4. ILUSTRAÇÃO DE ENQUETES (Gráficos Dinâmicos + Urna de Votação + Check)
export function EnquetesIllustration() {
  return (
    <div className="flex justify-center items-center my-4">
      <svg className="w-48 h-48 md:w-56 md:h-56 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="95" fill="#EDE9FE" opacity="0.6" />
        <circle cx="120" cy="120" r="82" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="8 8" className="svg-spin" />

        {/* Painel de Gráfico */}
        <rect x="55" y="65" width="130" height="110" rx="16" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="4" />

        {/* Barras de votação */}
        <rect x="78" y="125" width="20" height="35" rx="5" fill="#C4B5FD" />
        <rect x="110" y="88" width="20" height="72" rx="5" fill="#8B5CF6" className="svg-pulse" />
        <rect x="142" y="105" width="20" height="55" rx="5" fill="#A78BFA" />

        {/* Medalha de Check / Voto Confirmado */}
        <g className="svg-float-rev">
          <circle cx="175" cy="75" r="24" fill="#10B981" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M165 75 L172 82 L186 68" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 5. ILUSTRAÇÃO DE SUGESTÕES (Lâmpada de Ideia Brilhando + Caixa de Ideias)
export function SugestoesIllustration() {
  return (
    <div className="flex justify-center items-center my-4">
      <svg className="w-48 h-48 md:w-56 md:h-56 svg-float" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="95" fill="#ECFDF5" opacity="0.7" />
        
        {/* Raios de luz da lâmpada */}
        <g className="svg-pulse" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round">
          <line x1="120" y1="30" x2="120" y2="45" />
          <line x1="60" y1="55" x2="72" y2="67" />
          <line x1="180" y1="55" x2="168" y2="67" />
          <line x1="42" y1="110" x2="58" y2="110" />
          <line x1="198" y1="110" x2="182" y2="110" />
        </g>

        {/* Bulbo da Lâmpada */}
        <path
          d="M120 55 C88 55 68 80 68 108 C68 128 82 142 92 155 L148 155 C158 142 172 128 172 108 C172 80 152 55 120 55 Z"
          fill="#FBBF24"
        />
        {/* Brilho interno */}
        <path d="M90 95 C90 78 105 70 118 70" stroke="#FEF3C7" strokeWidth="6" strokeLinecap="round" />

        {/* Base da lâmpada */}
        <rect x="95" y="158" width="50" height="12" rx="6" fill="#6B7280" />
        <rect x="100" y="173" width="40" height="10" rx="5" fill="#4B5563" />
        <path d="M108 185 C108 195 132 195 132 185 Z" fill="#374151" />

        {/* Balão de conversa flutuante */}
        <g className="svg-float-rev">
          <rect x="145" y="135" width="55" height="38" rx="10" fill="#10B981" />
          <polygon points="155,173 145,183 165,173" fill="#10B981" />
          <circle cx="162" cy="154" r="3.5" fill="#FFF" />
          <circle cx="173" cy="154" r="3.5" fill="#FFF" />
          <circle cx="184" cy="154" r="3.5" fill="#FFF" />
        </g>
      </svg>
    </div>
  );
}

// 6. DIVISOR DE ONDAS (Para colocar no topo de seções ou antes do Footer)
export function WaveDivider({ color = "#3B82F6" }: { color?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none my-4">
      <svg className="relative block w-full h-12 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill={color}
          fillOpacity="0.15"
        />
      </svg>
    </div>
  );
}
