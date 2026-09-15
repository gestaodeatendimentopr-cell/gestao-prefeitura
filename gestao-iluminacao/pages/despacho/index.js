import Layout from '../../components/Layout';
import { Truck, MapPin, Clock, Users, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Despacho() {
  const [despachos] = useState([
    {
      id: 1,
      numero: 'DEP-001',
      locais: 5,
      equipe: 'Equipe A',
      status: 'Em Rota',
      saida: '08:00',
      previsao: '12:00',
      progresso: 60,
    },
    {
      id: 2,
      numero: 'DEP-002',
      locais: 3,
      equipe: 'Equipe B',
      status: 'Iniciado',
      saida: '09:30',
      previsao: '13:30',
      progresso: 30,
    },
    {
      id: 3,
      numero: 'DEP-003',
      locais: 4,
      equipe: 'Equipe C',
      status: 'Aguardando',
      saida: '14:00',
      previsao: '18:00',
      progresso: 0,
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'Em Rota': 'bg-blue-50 text-blue-700 border-blue-200',
      'Iniciado': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Aguardando': 'bg-slate-50 text-slate-700 border-slate-200',
      'Concluído': 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const stats = [
    { label: 'Despachos Hoje', value: '12', icon: Truck, color: 'text-sky-600' },
    { label: 'Em Execução', value: '5', icon: Clock, color: 'text-yellow-600' },
    { label: 'Equipes Ativas', value: '8', icon: Users, color: 'text-purple-600' },
    { label: 'Pontos Atendidos', value: '34', icon: MapPin, color: 'text-green-600' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Despacho</h1>
            <p className="text-slate-600 mt-1">Gerenciamento de equipes e rotas</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium">
            <Plus size={18} />
            Novo Despacho
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

        {/* Despachos Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Despachos do Dia</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Despacho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Equipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Locais
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Horário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Progresso
                  </th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((desp) => (
                  <tr key={desp.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900">{desp.numero}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{desp.equipe}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-900">{desp.locais} pontos</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {desp.saida} - {desp.previsao}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(desp.status)}`}>
                        {desp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-sky-600 h-2 rounded-full transition-all"
                          style={{ width: `${desp.progresso}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600 mt-1">{desp.progresso}%</span>
                    </td>
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
