export default function Footer() {
  return (
    <footer className="relative bg-secondary text-white mt-auto overflow-hidden">
      {/* Onda superior sutil integrada ao rodapé */}
      <div className="w-full overflow-hidden leading-none bg-background">
        <svg className="relative block w-full h-8 sm:h-11" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill="#2f6f4e"
          />
        </svg>
      </div>

      {/* Brasão / Estrela Decorativa de Fundo */}
      <svg
        className="pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 opacity-10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="85" stroke="#e6b422" strokeWidth="4" strokeDasharray="10 8" />
        <polygon
          points="100,25 118,75 170,75 128,106 144,158 100,126 56,158 72,106 30,75 82,75"
          fill="#e6b422"
        />
      </svg>

      <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-2 text-[13px] text-accent flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
              </svg>
              Instituição
            </h3>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Colégio Estadual Cívico-Militar
              <br />
              Vereador Luiz Zanchim
              <br />
              <span className="text-white/70">Governo do Estado do Paraná · CCMPR</span>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-[13px] text-accent flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
              Sobre este espaço
            </h3>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Portal de uso exclusivo da comunidade escolar.
              Criado para facilitar o dia a dia, os estudos e o diálogo.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-[13px] text-accent flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Precisa de ajuda?
            </h3>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Fale com a secretaria ou com a coordenação
              pedagógica da unidade escolar.
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-5 text-center text-[11px] text-white/65">
          © {new Date().getFullYear()} Colégio Estadual Cívico-Militar Vereador
          Luiz Zanchim · CCMPR
        </div>
      </div>
    </footer>
  );
}
