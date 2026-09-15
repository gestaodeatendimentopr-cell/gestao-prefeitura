import Layout from '../../components/Layout';
import { Settings, Lock, Bell, Users } from 'lucide-react';
import { useState } from 'react';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('geral');
  const [formData, setFormData] = useState({
    nomePrefeitura: 'Prefeitura de Exemplo',
    cnpj: '12.345.678/0001-90',
    email: 'admin@prefeitura.com.br',
    telefone: '(11) 9999-9999',
    endereco: 'Rua das Flores, 123',
    notificacoes: true,
    relatorios: true,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Configurações salvas com sucesso!');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'seguranca', label: 'Segurança', icon: Lock },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'usuarios', label: 'Usuários', icon: Users },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-600 mt-1">Gerencie as configurações da sua prefeitura</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 border-b-2 transition-colors font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-sky-600 text-sky-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'geral' && (
              <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome da Prefeitura
                  </label>
                  <input
                    type="text"
                    value={formData.nomePrefeitura}
                    onChange={(e) => setFormData({ ...formData, nomePrefeitura: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">CNPJ</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email de Contato
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Endereço</label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'seguranca' && (
              <div className="space-y-6 max-w-2xl">
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Alterar Senha</h3>
                  <p className="text-sm text-slate-600 mb-4">Atualize sua senha regularmente para manter sua conta segura</p>
                  <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium text-sm">
                    Alterar Senha
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Autenticação de Dois Fatores</h3>
                  <p className="text-sm text-slate-600 mb-4">Adicione uma camada extra de segurança à sua conta</p>
                  <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium text-sm">
                    Ativar 2FA
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Sessões Ativas</h3>
                  <p className="text-sm text-slate-600 mb-4">Gerencie seus acessos ativos em diferentes dispositivos</p>
                  <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium text-sm">
                    Ver Sessões
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notificacoes' && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-900">Notificações por Email</h3>
                    <p className="text-sm text-slate-600 mt-1">Receba atualizações sobre novos atendimentos</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notificacoes}
                      onChange={(e) => setFormData({ ...formData, notificacoes: e.target.checked })}
                      className="w-5 h-5 text-sky-600 rounded"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-900">Relatórios Automáticos</h3>
                    <p className="text-sm text-slate-600 mt-1">Receba relatórios mensais de desempenho</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.relatorios}
                      onChange={(e) => setFormData({ ...formData, relatorios: e.target.checked })}
                      className="w-5 h-5 text-sky-600 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'usuarios' && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Membros da Equipe</h3>
                  <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium text-sm">
                    + Adicionar Usuário
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'João Silva', email: 'joao@prefeitura.com', role: 'Administrador' },
                    { name: 'Maria Santos', email: 'maria@prefeitura.com', role: 'Supervisor' },
                    { name: 'Pedro Costa', email: 'pedro@prefeitura.com', role: 'Atendente' },
                  ].map((user, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-600">{user.email}</p>
                        <p className="text-xs text-slate-500 mt-1">{user.role}</p>
                      </div>
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
