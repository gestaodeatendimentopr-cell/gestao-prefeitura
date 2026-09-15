import Layout from '../../components/Layout';
import { useAtendimentoStore } from '../../lib/store';
import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';

export default function Atendimentos() {
  const { atendimentos, setAtendimentos, filtros, setFiltros } = useAtendimentoStore();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    bairro: '',
    descricao: '',
    status: 'Novo',
    endereco: '',
    contato: '',
  });

  const filteredAtendimentos = atendimentos.filter((att) => {
    const matchesStatus = !filtros.status || att.status === filtros.status;
    const matchesBairro = !filtros.bairro || att.bairro.toLowerCase().includes(filtros.bairro.toLowerCase());
    const matchesSearch = att.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         att.bairro.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesBairro && matchesSearch;
  });

  const handleAddAtendimento = (e) => {
    e.preventDefault();
    const newAtendimento = {
      id: atendimentos.length + 1,
      status: 'Novo',
      data: new Date().toLocaleDateString('pt-BR'),
      ...formData,
    };
    setAtendimentos([...atendimentos, newAtendimento]);
    setFormData({ bairro: '', descricao: '', status: 'Novo', endereco: '', contato: '' });
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Novo': 'bg-red-50 text-red-700 border-red-200',
      'Em análise': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Aguardando despacho': 'bg-blue-50 text-blue-700 border-blue-200',
      'Despachado': 'bg-purple-50 text-purple-700 border-purple-200',
      'Em execução': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Concluído': 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Atendimentos</h1>
            <p className="text-slate-600 mt-1">{filteredAtendimentos.length} atendimentos</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />
            Novo Atendimento
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar atendimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filtros.status || ''}
              onChange={(e) => setFiltros({ ...filtros, status: e.target.value || null })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            >
              <option value="">Todos os Status</option>
              <option value="Novo">Novo</option>
              <option value="Em análise">Em análise</option>
              <option value="Aguardando despacho">Aguardando despacho</option>
              <option value="Despachado">Despachado</option>
              <option value="Em execução">Em execução</option>
              <option value="Concluído">Concluído</option>
            </select>

            {/* Bairro Filter */}
            <input
              type="text"
              placeholder="Filtrar por bairro..."
              value={filtros.bairro || ''}
              onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value || null })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            />

            {/* Period Filter */}
            <select
              value={filtros.periodo}
              onChange={(e) => setFiltros({ ...filtros, periodo: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            >
              <option value="ultimos-7-dias">Últimos 7 dias</option>
              <option value="ultimos-30-dias">Últimos 30 dias</option>
              <option value="ultimos-3-meses">Últimos 3 meses</option>
              <option value="ultimo-ano">Último ano</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Bairro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Data
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAtendimentos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <p className="text-lg font-medium">Nenhum atendimento encontrado</p>
                      <p className="text-sm mt-1">Crie um novo atendimento para começar</p>
                    </td>
                  </tr>
                ) : (
                  filteredAtendimentos.map((att) => (
                    <tr key={att.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900">#{att.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900 font-medium">{att.descricao}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{att.bairro}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(att.status)}`}>
                          {att.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{att.data}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Novo Atendimento</h2>
            <form onSubmit={handleAddAtendimento} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <input
                  type="text"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Descrição do atendimento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
                <input
                  type="text"
                  value={formData.bairro}
                  onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Bairro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contato</label>
                <input
                  type="text"
                  value={formData.contato}
                  onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Telefone ou email"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
