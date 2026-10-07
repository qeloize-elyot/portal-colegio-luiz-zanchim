export default function MateriaisPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Materiais de Apoio</h1>
      <p className="text-muted mb-6">
        Repositório organizado por Ano, Turma e Disciplina. Em breve os
        professores poderão enviar slides, listas e resumos.
      </p>

      <div className="bg-white border border-border rounded-lg p-6">
        <p className="text-sm text-muted mb-4">
          Selecione o ano e a turma para visualizar os materiais disponíveis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Ano</label>
            <select className="w-full border border-border rounded px-3 py-2 bg-white">
              <option>1º Ano</option>
              <option>2º Ano</option>
              <option>3º Ano</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Turma</label>
            <select className="w-full border border-border rounded px-3 py-2 bg-white">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Disciplina</label>
            <select className="w-full border border-border rounded px-3 py-2 bg-white">
              <option>Todas</option>
              <option>Matemática</option>
              <option>Português</option>
              <option>História</option>
              <option>Geografia</option>
              <option>Ciências</option>
              <option>Inglês</option>
            </select>
          </div>
        </div>

        <div className="border border-dashed border-border rounded-lg p-8 text-center text-muted">
          Nenhum material disponível no momento.
          <br />
          <span className="text-sm">
            Os professores poderão fazer upload assim que a autenticação estiver
            ativa.
          </span>
        </div>
      </div>
    </div>
  );
}
