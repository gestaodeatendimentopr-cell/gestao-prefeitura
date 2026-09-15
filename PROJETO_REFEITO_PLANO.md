# Plano Completo - Refazenda do Projeto GESTÃO DE ILUMINAÇÃO PÚBLICA

## Objetivo
Refazer o projeto do zero evitando todos os erros anteriores e seguindo rigorosamente a especificação.

## Erros a Evitar
1. ❌ Arquivos em subdirectórios - Tudo deve estar na **RAIZ** do repositório
2. ❌ Variáveis de ambiente não configuradas - Configurar ANTES do primeiro push
3. ❌ Build não testado localmente - Testar npm run build localmente
4. ❌ Não fazer redeploy no Vercel - Fazer redeploy manual após push

## Stack Tecnológico
- **Frontend**: Next.js 14.2.3 + React 18.3.1 + TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Database**: Supabase (PostgreSQL) com Row Level Security
- **State Management**: Zustand 4.4.1
- **Authentication**: Supabase Auth
- **Maps**: Mapbox GL JS
- **File Upload**: xlsx para Census (Excel)
- **Export**: KML para Equipes de Campo
- **Hosting**: Vercel (Serverless)
- **CI/CD**: GitHub Actions

## Estrutura de Diretórios (RAIZ)
```
projeto/
├── pages/                    # Páginas Next.js
│   ├── _app.js
│   ├── _document.js
│   ├── index.js             # Landing / Login
│   ├── dashboard.js
│   ├── atendimentos.js
│   ├── mapa-atendimento.js
│   ├── mapa-geral.js
│   ├── base-censo.js
│   ├── modernizacao.js
│   ├── equipes.js
│   ├── despachos.js
│   ├── indicadores.js
│   ├── historico.js
│   ├── usuarios.js
│   ├── configuracoes.js
│   ├── admin/
│   │   ├── dashboard.js     # Admin Master Dashboard
│   │   ├── prefeituras.js
│   │   └── usuarios.js
│   └── api/                 # API Routes (Serverless)
│       ├── auth/
│       ├── plaquetas/
│       ├── atendimentos/
│       ├── equipes/
│       └── modernizacoes/
├── components/              # Componentes React
├── lib/                      # Utilitários
│   ├── supabase.js          # Client Supabase
│   ├── auth.js              # Autenticação
│   └── kml.js               # Geração KML
├── database/                # Schemas Supabase
├── styles/                  # CSS
├── public/                  # Assets estáticos
├── package.json             # Dependências
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vercel.json              # Configuração Vercel
├── .env.example
├── .env.local               # Variáveis locais (não commit)
├── .gitignore
├── README.md
└── DEPLOYMENT.md
```

## Etapas de Implementação

### 1. Setup Inicial
- [ ] Criar repositório GitHub (ou usar existente limpo)
- [ ] Criar projeto Vercel
- [ ] Criar projeto Supabase
- [ ] Configurar variáveis de ambiente no Vercel

### 2. Banco de Dados (Supabase)
- [ ] Criar tabelas principais
- [ ] Configurar Row Level Security (RLS)
- [ ] Criar índices
- [ ] Criar funções PL/pgSQL

### 3. Código Next.js
- [ ] Setup básico (package.json, configs)
- [ ] Autenticação (Supabase Auth)
- [ ] Páginas principais
- [ ] Componentes reutilizáveis
- [ ] Integração com API

### 4. Funcionalidades
- [ ] Multi-tenant com isolamento de dados
- [ ] Gestão de Atendimentos
- [ ] Mapas (Mapbox)
- [ ] Upload de Census (Excel)
- [ ] Modernizações com histórico
- [ ] Geração KML
- [ ] Indicadores e Gráficos

### 5. Testes e Deployment
- [ ] Testar localmente (npm run dev)
- [ ] Build localmente (npm run build)
- [ ] Push para GitHub
- [ ] Redeploy manual no Vercel
- [ ] Testar em produção

## Configurações Críticas

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "NEXT_PUBLIC_MAPBOX_TOKEN": "@mapbox_token"
  },
  "regions": ["gru1"],
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

### Variáveis de Ambiente (Vercel Settings → Environment Variables)
- `supabase_url`: https://YOUR-PROJECT.supabase.co
- `supabase_anon_key`: Chave anônima do Supabase
- `mapbox_token`: Token Mapbox (opcional)

## Próximos Passos
1. Criar estrutura de diretórios
2. Gerar código de exemplo
3. Configurar Supabase
4. Configurar Vercel
5. Testar localmente
6. Deploy para produção
