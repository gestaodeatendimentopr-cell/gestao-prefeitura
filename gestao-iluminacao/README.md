# Gestão de Iluminação Pública - Plataforma de Atendimento para Prefeituras

Um sistema SaaS completo para gerenciamento de serviços de iluminação pública, modernização de infraestrutura, despacho de equipes e análise de indicadores.

## 🚀 Características Principais

- **Multi-tenant SaaS**: Suporte a múltiplas prefeituras com isolamento de dados
- **Gestão de Atendimentos**: Sistema completo de service requests com rastreamento
- **PLAQUETA**: Identificação única para cada ponto de iluminação
- **Modernização Inteligente**: Histórico de intervenções e economia de energia
- **Despacho de Equipes**: Mapa interativo e gestão de rotas com KML
- **Indicadores em Tempo Real**: Dashboard com KPIs e métricas de desempenho
- **Multi-roles**: Master Admin, Admin, Supervisor, Atendente, Equipe de Campo
- **Auditoria Completa**: Histórico de todas as alterações no sistema

## 📋 Pré-requisitos

- Node.js 16+ e npm/yarn
- Conta Vercel
- Projeto Supabase (PostgreSQL)
- Conta GitHub

## 🔧 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/gestao-iluminacao.git
cd gestao-iluminacao
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Configurar Banco de Dados Supabase

1. Acesse o [console Supabase](https://app.supabase.com)
2. Crie um novo projeto
3. Vá para SQL Editor
4. Execute o arquivo `database/schema.sql`

Ou via CLI:

```bash
supabase link --project-ref seu-projeto-ref
supabase db push
```

### 5. Executar Localmente

```bash
npm run dev
```

Acesse http://localhost:3000

## 📊 Arquitetura do Banco de Dados

### Tabelas Principais

- **prefeituras**: Dados de cada prefeitura cliente
- **usuarios**: Usuários e roles do sistema
- **pontos_censo**: Cada luminária (identificada por PLAQUETA)
- **atendimentos**: Service requests do sistema
- **equipes**: Grupos de trabalho
- **membros_equipe**: Associação de usuários a equipes
- **despachos**: Designação de tarefas para equipes
- **despacho_itens**: Itens individuais de um despacho
- **modernizacoes**: Projetos de modernização
- **versoes_ponto_censo**: Histórico de mudanças em luminárias
- **historico_alteracoes**: Auditoria de todas as alterações

### Relacionamentos Key

```
Prefeitura (1) ──→ (N) Usuários
Prefeitura (1) ──→ (N) Pontos Censo
Prefeitura (1) ──→ (N) Atendimentos
Prefeitura (1) ──→ (N) Equipes
Equipe (1) ──→ (N) Membros Equipe
Equipe (1) ──→ (N) Despachos
Despacho (1) ──→ (N) Despacho Itens
Atendimento (1) ──→ (N) Despacho Itens
Ponto Censo (1) ──→ (N) Modernizações
Ponto Censo (1) ──→ (N) Versões
```

## 🎨 Estrutura de Componentes

```
components/
├── Layout.jsx          # Wrapper principal
├── Sidebar.jsx         # Navegação lateral
├── Topbar.jsx          # Barra superior
└── [Componentes futuros]

pages/
├── index.js           # Login/Home
├── dashboard/
│   └── index.js       # Dashboard principal
├── atendimentos/
│   └── index.js       # Gestão de atendimentos
├── modernizacao/
│   └── index.js       # Modernizações
├── despacho/
│   └── index.js       # Gestão de despachos
├── indicadores/
│   └── index.js       # Análise de indicadores
├── configuracoes/
│   └── index.js       # Configurações
└── api/               # Rotas API

lib/
├── supabase.js        # Cliente Supabase
└── store.js           # Zustand stores
```

## 🔐 Segurança

- Autenticação via Supabase Auth
- Row Level Security (RLS) no PostgreSQL
- Isolamento de dados por prefeitura
- Auditoria de todas as operações
- Variáveis de ambiente para credenciais

## 📱 Status dos Atendimentos

1. **Novo**: Recém-criado, não analisado
2. **Em análise**: Avaliação do problema
3. **Aguardando despacho**: Aguardando alocação de equipe
4. **Despachado**: Equipe designada
5. **Em execução**: Equipe executando
6. **Concluído**: Trabalho finalizado

## 🎯 Workflow de Despacho

1. Criar atendimento → Status "Novo"
2. Analisar → Status "Em análise"
3. Criar despacho → Atendimentos → Status "Aguardando despacho"
4. Designar equipe → Status "Despachado"
5. Equipe executa → Status "Em execução"
6. Confirmar conclusão → Status "Concluído"

## 📈 KPIs Monitorados

- Taxa de Resolução
- Tempo Médio de Resolução
- Satisfação do Cliente (1-5)
- Economia de Energia (kWh)
- Custos Evitados (R$)
- Taxa de Modernização
- Eficiência de Despacho

## 🚢 Deploy no Vercel

```bash
# Conectar repositório GitHub ao Vercel
# As variáveis de ambiente serão configuradas no dashboard Vercel

vercel deploy
```

## 📖 Documentação Complementar

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Propriedade privada - Todos os direitos reservados

## 📞 Suporte

Para suporte, entre em contato através de: gestao@iluminacao.com.br

---

**Status**: Em desenvolvimento
**Última atualização**: Setembro 2024
**Versão**: 1.0.0-beta
