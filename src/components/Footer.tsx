export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-[13px] uppercase tracking-wide">
              Instituição
            </h3>
            <p className="text-blue-100/90 leading-relaxed text-[13px]">
              Colégio Estadual Cívico-Militar
              <br />
              Vereador Luiz Zanchim
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[13px] uppercase tracking-wide">
              Sobre o portal
            </h3>
            <p className="text-blue-100/90 leading-relaxed text-[13px]">
              Ferramenta de uso exclusivo da comunidade escolar.
              Não substitui os canais oficiais de comunicação da rede.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[13px] uppercase tracking-wide">
              Suporte
            </h3>
            <p className="text-blue-100/90 leading-relaxed text-[13px]">
              Em caso de dificuldades de acesso, procure a secretaria
              ou a coordenação pedagógica da unidade.
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 mt-7 pt-4 text-center text-[11px] text-blue-200/80">
          © {new Date().getFullYear()} Colégio Estadual Cívico-Militar Vereador
          Luiz Zanchim · Governo do Estado do Paraná
        </div>
      </div>
    </footer>
  );
}
