import Layout from '../../components/Layout';
import { useAuthStore, useAtendimentoStore } from '../../lib/store';
import { BarChart3, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { atendimentos, filtros, setFiltros } = useAtendimentoStore();
  const [stats, setStats] = useState({
    total: 0,
    novo: 0,
    emAnalise: 0,
    despachado: 0,
    concluido: 0,
    taxa: 0,
  });

  // Calculate statistics
  useEffect(() => {
    const calculations = {
      total: atendimentos.length,
      novo: atendimentos.filter(a => a.status === 'Novo').length,
      emAnalise: atendimentos.filter(a => a.status === 'Em análise').length,
      despachado: atendimentos.filter(a => a.status === 'Despachado').length,
      concluido: atendimentos.filter(a => a.status === 'Concluído').length,
      taxa: atendimentos.length > 0
        ? Math.round((atendimentos.filter(a => a.status === 'Concluído').length / atendimentos.length) * 100)
        : 0,
    };
    setStats(calculations);
  }, [atendimentos]);

  const statCards = [
    {
      label: 'Total de Atendimentos',
      value: stats.total,
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-600',
      trend: '+12% vs mês anterior',
    },
    {
      label: 'Novo',
      value: stats.novo,
      icon: AlertCircle,
      color: 'bg-red-50 text-red-600',
      trend: 'Aguardando análise',
    },
    {
      label: 'Em Análise',
      value: stats.emAnalise,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600',
      trend: 'Em processamento',
    },
    {
      label: 'Concluído',
      value: stats.concluido,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600',
      trend: `${stats.taxa}% de conclusão`,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Bem-vindo, {user?.email?.split('@')[0]}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium">
              Exportar
            </button>
            <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium">
              Novo Atendimento
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">{card.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
                    <p className="text-xs text-slate-500 mt-2">{card.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filtros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={filtros.status || ''}
                onChange={(e) => setFiltros({ ...filtros, status: e.target.value || null })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              >
                <option value="">Todos</option>
                <option value="Novo">Novo</option>
                <option value="Em análise">Em análise</option>
                <option value="Despachado">Despachado</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bairro</label>
              <input
                type="text"
                placeholder="Filtrar por bairro..."
                value={filtros.bairro || ''}
                onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value || null })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Período</label>
              <select
                value={filtros.periodo}
                onChange={(e) => setFiltros({ ...filtros, periodo: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              >
                <option value="ultimos-7-dias">Últimos 7 dias</option>
                <option value="ultimos-30-dias">Últimos 30 dias</option>
                <option value="ultimos-3-meses">Últimos 3 meses</option>
                <option value="ultimo-ano">Último ano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Atendimentos Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Atendimentos Recentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    ID
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
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      Nenhum atendimento encontrado
                    </td>
                  </tr>
                ) : (
                  atendimentos.slice(0, 5).map((att, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-900 font-semibold">#{att.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{att.bairro}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {att.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{att.data}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-sky-600 hover:text-sky-700 font-medium">
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
