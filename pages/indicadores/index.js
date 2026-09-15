import Layout from '../../components/Layout';
import { BarChart3, TrendingUp, Target, AlertCircle } from 'lucide-react';

export default function Indicadores() {
  const kpis = [
    {
      label: 'Taxa de Resolução',
      value: '87%',
      target: '90%',
      icon: Target,
      trend: '+5% vs mês anterior',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Tempo Médio',
      value: '3.2 dias',
      target: '2.5 dias',
      icon: TrendingUp,
      trend: '-0.8 dias vs mês anterior',
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Satisfação',
      value: '4.5/5',
      target: '4.7/5',
      icon: BarChart3,
      trend: '+0.2 vs mês anterior',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Custos Evitados',
      value: 'R$ 125K',
      target: 'R$ 150K',
      icon: AlertCircle,
      trend: '+15% vs mês anterior',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  const monthlyData = [
    { month: 'Jan', atendimentos: 145, concluidos: 120, resolvidos: 115 },
    { month: 'Fev', atendimentos: 168, concluidos: 145, resolvidos: 138 },
    { month: 'Mar', atendimentos: 192, concluidos: 165, resolvidos: 158 },
    { month: 'Abr', atendimentos: 156, concluidos: 135, resolvidos: 128 },
    { month: 'Mai', atendimentos: 189, concluidos: 162, resolvidos: 154 },
    { month: 'Jun', atendimentos: 204, concluidos: 178, resolvidos: 168 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Indicadores</h1>
            <p className="text-slate-600 mt-1">Análise de desempenho e métricas</p>
          </div>
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm">
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
            <option>Último ano</option>
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">{kpi.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{kpi.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${kpi.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600">Meta: {kpi.target}</p>
                  <p className="text-xs font-medium text-green-600">{kpi.trend}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Tendência Mensal</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyData.map((data, idx) => {
                const maxValue = 204;
                const height = (data.atendimentos / maxValue) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-200 rounded-t-lg" style={{ height: `${height}%`, minHeight: '20px' }}>
                      <div
                        className="w-full h-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg"
                        style={{ height: '100%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-600">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Distribuição de Status</h2>
            <div className="space-y-4">
              {[
                { label: 'Concluído', value: 68, color: 'bg-green-500' },
                { label: 'Em Execução', value: 18, color: 'bg-blue-500' },
                { label: 'Aguardando', value: 10, color: 'bg-yellow-500' },
                { label: 'Novo', value: 4, color: 'bg-red-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Desempenho por Mês</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Mês
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Atendimentos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Concluídos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Resolvidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Taxa
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, idx) => {
                  const taxa = Math.round((data.resolvidos / data.atendimentos) * 100);
                  return (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{data.month}</td>
                      <td className="px-6 py-4 text-slate-600">{data.atendimentos}</td>
                      <td className="px-6 py-4 text-slate-600">{data.concluidos}</td>
                      <td className="px-6 py-4 text-slate-600">{data.resolvidos}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                          {taxa}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
