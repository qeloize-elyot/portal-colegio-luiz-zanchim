export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-2 text-[13px] text-accent">
              Instituição
            </h3>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Colégio Estadual Cívico-Militar
              <br />
              Vereador Luiz Zanchim
              <br />
              <span className="text-white/70">Governo do Estado do Paraná</span>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-[13px] text-accent">
              Sobre este espaço
            </h3>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Portal de uso exclusivo da comunidade escolar.
              Criado para facilitar o dia a dia, os estudos e o diálogo.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-[13px] text-accent">
              Precisa de ajuda?
            </h3>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Fale com a secretaria ou com a coordenação
              pedagógica da unidade escolar.
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-5 text-center text-[11px] text-white/55">
          © {new Date().getFullYear()} Colégio Estadual Cívico-Militar Vereador
          Luiz Zanchim · CCMPR
        </div>
      </div>
    </footer>
  );
}
