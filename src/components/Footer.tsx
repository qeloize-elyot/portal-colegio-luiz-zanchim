"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="relative bg-[#0F1E36] text-[#FFFDF9] mt-16 border-t-[3px] border-[#0F1E36] overflow-hidden">
      {/* Faixa de Régua Escolar em SVG no Topo do Rodapé */}
      <div className="w-full bg-[#F4B41A] border-b-[3px] border-[#0F1E36] h-5 overflow-hidden flex items-end">
        <svg className="w-full h-4" viewBox="0 0 1200 20" preserveAspectRatio="none">
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1={i * 20}
              y1={i % 5 === 0 ? 4 : 11}
              x2={i * 20}
              y2={20}
              stroke="#0F1E36"
              strokeWidth={i % 5 === 0 ? "2.5" : "1.5"}
            />
          ))}
        </svg>
      </div>

      {/* Estrela / Brasão Giratório Discreto no Canto */}
      <svg
        className="pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 opacity-10 svg-spin"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="85" stroke="#F4B41A" strokeWidth="4" strokeDasharray="10 8" />
        <polygon
          points="100,25 118,75 170,75 128,106 144,158 100,126 56,158 72,106 30,75 82,75"
          fill="#F4B41A"
        />
      </svg>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Card 1 */}
          <div className="bg-[#162947] border-2 border-[#FFFDF9]/20 rounded-2xl p-5 shadow-[4px_4px_0px_#E04F33]">
            <h3 className="font-black mb-2 text-xs uppercase tracking-wider text-[#F4B41A] flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
              </svg>
              Instituição
            </h3>
            <p className="text-[#FFFDF9] font-bold leading-relaxed text-xs">
              Colégio Estadual Cívico-Militar
              <br />
              Vereador Luiz Zanchim
              <br />
              <span className="text-[#FFFDF9]/70 font-medium">
                Governo do Estado do Paraná · CCMPR
              </span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#162947] border-2 border-[#FFFDF9]/20 rounded-2xl p-5 shadow-[4px_4px_0px_#F4B41A]">
            <h3 className="font-black mb-2 text-xs uppercase tracking-wider text-[#F4B41A] flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
              Sobre este espaço
            </h3>
            <p className="text-[#FFFDF9]/90 leading-relaxed text-xs font-medium">
              Portal Escolar de uso exclusivo da comunidade estudantil. Criado para
              facilitar o dia a dia, os estudos e o diálogo na escola.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#162947] border-2 border-[#FFFDF9]/20 rounded-2xl p-5 shadow-[4px_4px_0px_#16A34A]">
            <h3 className="font-black mb-2 text-xs uppercase tracking-wider text-[#F4B41A] flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Precisa de ajuda?
            </h3>
            <p className="text-[#FFFDF9]/90 leading-relaxed text-xs font-medium">
              Fale com a secretaria ou com a coordenação pedagógica da unidade
              escolar durante o horário de atendimento.
            </p>
          </div>
        </div>

        <div className="border-t border-[#FFFDF9]/15 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#FFFDF9]/70 font-bold">
          <span>
            © {new Date().getFullYear()} Colégio Estadual Cívico-Militar Vereador Luiz Zanchim · CCMPR
          </span>
          <span className="bg-[#FFFDF9]/10 px-3 py-1 rounded-full text-[#F4B41A]">
            Mural Digital Estudantil
          </span>
        </div>
      </div>
    </footer>
  );
}
