export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Gestão de Iluminação</h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 text-slate-300 hover:text-white transition-colors">
            Entrar
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-lg transition-all">
            Cadastro
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Gestão Inteligente de Iluminação Pública
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Plataforma completa para prefeituras gerenciarem, modernizarem e otimizarem sua iluminação pública.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                🔓 Entrar na Plataforma
              </button>
              <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all">
                Criar Conta
              </button>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-white font-semibold mb-2">Gestão de Atendimentos</h3>
                  <p className="text-slate-300">Sistema completo para gerenciar solicitações de reparo e manutenção.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-white font-semibold mb-2">Modernização e Otimização</h3>
                  <p className="text-slate-300">Acompanhe projetos de LED, controladores inteligentes e economia de energia.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-white font-semibold mb-2">Equipes em Campo</h3>
                  <p className="text-slate-300">Coordenação de despachos e acompanhamento em tempo real das operações.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-white font-semibold mb-2">Indicadores e KPIs</h3>
                  <p className="text-slate-300">Relatórios detalhados com análise de performance e economia obtida.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Recursos Principais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Mapeamento de Pontos</h3>
            <p className="text-slate-300">Cadastro e localização de todos os pontos de iluminação com histórico de versões.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Atendimentos Prioritários</h3>
            <p className="text-slate-300">Priorização de serviços por urgência e acompanhamento completo do fluxo.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Gerenciamento de Equipes</h3>
            <p className="text-slate-300">Organização de equipes e despacho otimizado de serviços.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Modernização LED</h3>
            <p className="text-slate-300">Acompanhamento de projetos de substituição e economia de energia.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Relatórios Avançados</h3>
            <p className="text-slate-300">Indicadores de performance, KPIs e análise de dados em tempo real.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Segurança Garantida</h3>
            <p className="text-slate-300">Autenticação segura e isolamento de dados por prefeitura.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Pronto para Começar?</h2>
          <p className="text-xl text-sky-100 mb-8">
            Transforme a gestão de iluminação pública da sua prefeitura hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-slate-50 transition-all">
              Criar Conta Gratuita
            </button>
            <button className="px-8 py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg transition-all">
              Já tenho conta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 py-12 border-t border-slate-700 text-center text-slate-400">
        <p>© 2024 Gestão de Iluminação Pública. Todos os direitos reservados. | Desenvolvido por Eficiente Comércio e Serviços Ltda</p>
      </footer>
    </div>
  );
}