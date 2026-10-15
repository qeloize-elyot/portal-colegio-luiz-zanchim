export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-[13px] tracking-wide text-accent">
              Instituição
            </h3>
            <p className="text-white/85 leading-relaxed text-[13px]">
              Colégio Estadual Cívico-Militar
              <br />
              Vereador Luiz Zanchim
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[13px] tracking-wide text-accent">
              Sobre o portal
            </h3>
            <p className="text-white/85 leading-relaxed text-[13px]">
              Espaço de uso exclusivo da nossa comunidade escolar.
              Feito para facilitar a comunicação e o dia a dia.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[13px] tracking-wide text-accent">
              Precisa de ajuda?
            </h3>
            <p className="text-white/85 leading-relaxed text-[13px]">
              Em caso de dificuldades, procure a secretaria ou a
              coordenação pedagógica da unidade.
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-4 text-center text-[11px] text-white/60">
          © {new Date().getFullYear()} Colégio Estadual Cívico-Militar Vereador
          Luiz Zanchim
        </div>
      </div>
    </footer>
  );
}
