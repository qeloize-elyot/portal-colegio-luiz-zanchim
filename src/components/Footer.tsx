export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Instituição</h3>
            <p className="text-blue-100 leading-relaxed">
              Colégio Estadual Cívico-Militar
              <br />
              Vereador Luiz Zanchim
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Portal Interno</h3>
            <p className="text-blue-100 leading-relaxed">
              Ferramenta de uso exclusivo da comunidade escolar.
              <br />
              Não substitui canais oficiais de comunicação.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Acesso</h3>
            <p className="text-blue-100 leading-relaxed">
              Em caso de problemas de acesso, procure a secretaria
              ou a coordenação pedagógica.
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 pt-4 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} Colégio Estadual Cívico-Militar Vereador
          Luiz Zanchim. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
