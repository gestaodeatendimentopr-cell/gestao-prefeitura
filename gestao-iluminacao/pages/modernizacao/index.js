import Layout from '../../components/Layout';
import { Zap, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function Modernizacao() {
  const [modernizacoes] = useState([
    {
      id: 1,
      plaqueta: 'PL-001',
      endereco: 'Rua das Flores, 123',
      tipo: 'Substituição LED',
      status: 'Concluído',
      data: '15/09/2024',
      economia: '45%',
    },
    {
      id: 2,
      plaqueta: 'PL-002',
      endereco: 'Av. Central, 456',
      tipo: 'Controlador Inteligente',
      status: 'Em Execução',
      data: '20/09/2024',
      economia: '30%',
    },
    {
      id: 3,
      plaqueta: 'PL-003',
      endereco: 'Rua das Pedras, 789',
      tipo: 'Sensor de Movimento',
      status: 'Planejado',
      data: '25/09/2024',
      economia: '35%',
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'Concluído': 'bg-green-50 text-green-700 border-green-200',
      'Em Execução': 'bg-blue-50 text-blue-700 border-blue-200',
      'Planejado': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const stats = [
    { label: 'Total Modernizado', value: '234', icon: Zap, color: 'text-sky-600' },
    { label: 'Economia Mensal', value: '1.2M kWh', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Redução de CO²', value: '450 t/mês', icon: AlertTriangle, color: 'text-emerald-600' },
    { label: 'Taxa de Sucesso', value: '98%', icon: CheckCircle, color: 'text-blue-600' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Modernização</h1>
            <p className="text-slate-600 mt-1">Histórico de modernizações de iluminação</p>
          </div>
          <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium">
            + Planejamento
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  </div>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Projetos Recentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Plaqueta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Endereço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Economia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {modernizacoes.map((mod) => (
                  <tr key={mod.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900">{mod.plaqueta}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mod.endereco}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">{mod.tipo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(mod.status)}`}>
                        {mod.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-600">{mod.economia}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mod.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
