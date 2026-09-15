# Gestão de Atendimento, Operação e Modernização de Iluminação Pública

**Plataforma comercial multi-tenant para prefeituras e gestores municipais**

---

## 📋 Visão Geral

Sistema profissional de gestão de iluminação pública que permite:

- ✅ **Gestão de Atendimentos** - Registro rápido via PLAQUETA
- ✅ **Mapas em Tempo Real** - Visualização espacial de problemas
- ✅ **Despacho Inteligente** - Seleção por polígono e geração KML
- ✅ **Modernização Controlada** - Histórico com detecção de reserviço
- ✅ **Indicadores** - Dashboard com gráficos operacionais
- ✅ **Multi-Tenant** - Suporte a múltiplas prefeituras
- ✅ **Segurança** - RLS no Supabase, isolamento total de dados

---

## 🛠️ Stack Tecnológico

| Componente | Tecnologia |
|-----------|-----------|
| Frontend | Next.js 14.2.3 + React 18.3.1 + Tailwind CSS |
| Backend | Supabase (PostgreSQL) + API Routes |
| Autenticação | Supabase Auth |
| Mapas | Mapbox GL JS |
| Estado | Zustand 4.4.1 |
| Hosting | Vercel (Serverless) |
| Upload | Excel (XLSX) |
| Export | KML para Google Earth |

---

## 📁 Estrutura de Diretórios

```
projeto/
├── pages/                          # Páginas Next.js
│   ├── _app.js                    # Context e Auth
│   ├── _document.js               # HTML template
│   ├── index.js                   # Login
│   ├── dashboard.js               # Dashboard
│   ├── atendimentos.js            # Gestão de atendimentos
│   ├── mapa-atendimento.js        # Mapa com pontos de atendimento
│   ├── mapa-geral.js              # Mapa com todo o censo
│   ├── base-censo.js              # Upload e gerenciamento do censo
│   ├── modernizacao.js            # Modernização de pontos
│   ├── equipes.js                 # Gestão de equipes
│   ├── despachos.js               # Gestão de despachos
│   ├── indicadores.js             # Relatórios e indicadores
│   ├── historico.js               # Histórico completo
│   ├── usuarios.js                # Gestão de usuários
│   ├── configuracoes.js           # Configurações da prefeitura
│   ├── admin/                     # Painel Master
│   │   ├── dashboard.js
│   │   ├── prefeituras.js
│   │   └── usuarios.js
│   └── api/                       # API Routes (Serverless)
│
├── components/                     # Componentes React reutilizáveis
│   ├── Layout.js                  # Layout principal com sidebar
│   ├── MapComponent.js            # Componente de mapa
│   ├── Table.js                   # Tabela genérica
│   └── ... (outros componentes)
│
├── lib/                            # Utilitários
│   ├── supabase.js                # Cliente e funções Supabase
│   ├── auth.js                    # Autenticação
│   └── kml.js                     # Geração KML
│
├── database/                       # Schemas SQL
│   └── schema.sql                 # Definição de tabelas
│
├── styles/                         # CSS
│   └── globals.css                # Estilos globais
│
├── public/                         # Assets estáticos
│
├── package.json                   # Dependências
├── next.config.js                 # Config Next.js
├── tailwind.config.js             # Config Tailwind
├── tsconfig.json                  # Config TypeScript
├── vercel.json                    # Config Vercel
├── .env.example                   # Variáveis de exemplo
└── README.md                      # Este arquivo
```

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Conta Supabase
- Conta Vercel
- Git + GitHub

### 1. Setup Local

```bash
# Clone repositório
git clone https://github.com/gestaodeatendimentopr-cell/gestao-prefeitura.git
cd gestao-prefeitura

# Instale dependências
npm install

# Crie .env.local com suas credenciais Supabase
cp .env.example .env.local
# Edite .env.local com suas chaves
```

### 2. Configurar Supabase

Execute no SQL Editor do seu projeto Supabase:

```sql
-- Ver arquivo INSTRUÇOES_SETUP.md para SQL completo
```

### 3. Executar Localmente

```bash
# Desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build de produção
npm run build

# Servir produção
npm start
```

### 4. Deploy para Vercel

```bash
# Adicione variables de ambiente no Vercel Dashboard:
# - supabase_url
# - supabase_anon_key

# Faça push para GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Vercel fará deploy automaticamente
# Ou faça redeploy manual no dashboard
```

---

## 🔐 Configuração de Segurança

### Row Level Security (RLS)

Todas as tabelas têm RLS ativado:

```sql
-- Usuários só veem dados da sua prefeitura
CREATE POLICY "isolamento_prefeitura" ON atendimentos
  FOR SELECT USING (
    prefeitura_id IN (
      SELECT id FROM prefeituras WHERE admin_id = auth.uid()
      UNION
      SELECT prefeitura_id FROM usuarios_prefeitura WHERE user_id = auth.uid()
    )
  );
```

### Variáveis de Ambiente

Sempre use environment variables para credenciais sensíveis:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

⚠️ Nunca commitar `.env.local` ou credenciais

---

## 📊 Fluxos Principais

### Fluxo de Atendimento

```
1. Munícipe liga → Atendente recebe chamado
2. Atendente digita PLAQUETA
3. Sistema busca dados automaticamente na base do censo
4. Atendente seleciona tipo de problema
5. Atendente descreve situação
6. Salvar → Atendimento aparece no mapa
7. Supervisor visualiza no mapa
8. Supervisor seleciona área (polígono)
9. Supervisor atribui para equipe
10. Sistema gera KML
11. Equipe de campo recebe KML
12. Equipe executa serviço
13. Concluir atendimento
```

### Fluxo de Modernização

```
1. Atendente acessa aba Modernização
2. Digita PLAQUETA
3. Sistema mostra dados: potência atual, endereço, etc
4. Atendente escolhe nova potência
5. Sistema verifica histórico
6. Se já foi modernizado antes → alerta de RESERVIÇO
7. Atendente confirma
8. Sistema atualiza base do censo (com segurança)
9. Registra no histórico
10. Disponibiliza download da base atualizada
```

---

## 📱 Páginas Principais

### Autenticado (Prefeitura)

| Página | Descrição |
|--------|-----------|
| Dashboard | Visão geral com cards de KPIs |
| Atendimentos | Lista completa com filtros |
| Mapa de Atendimento | Mapa com pontos que têm atendimentos |
| Mapa Geral | Mapa com todo o censo |
| Base do Censo | Upload e gerenciamento da planilha |
| Modernização | Busca e atualização de potências |
| Equipes | Cadastro e gestão de equipes |
| Despachos | Criação de despachos para equipes |
| Indicadores | Gráficos e relatórios |
| Histórico | Consulta de todas as ações |
| Usuários | Gestão de usuários da prefeitura |
| Configurações | Dados da prefeitura e preferências |

### Admin Master

| Página | Descrição |
|--------|-----------|
| Dashboard Master | Visão geral de todas as prefeituras |
| Prefeituras | CRUD de prefeituras |
| Usuários | Gestão global de usuários |
| Configurações | Configurações da plataforma |

---

## 🗝️ Conceitos-Chave

### PLAQUETA = Identificador Principal

- Cada ponto de iluminação tem uma PLAQUETA única
- PLAQUETA é a chave para buscar informações na base do censo
- Sistema NUNCA altera um ponto pela posição na linha
- Sempre busca pela PLAQUETA

### Multi-Tenant

- Uma plataforma, múltiplas prefeituras
- Cada prefeitura = isolamento total de dados
- Usuário de Prefeitura A nunca vê dados de Prefeitura B
- Master Admin gerencia tudo

### Modernização com Histórico

- Cada alteração de potência é registrada
- Histórico nunca é apagado
- Se ponto foi modernizado mais de uma vez = RESERVIÇO
- Sistema alerta sobre reserviços

---

## 📖 API Routes

A aplicação possui API Routes serverless em `/pages/api/`:

```
/api/auth/login
/api/atendimentos/[id]
/api/plaquetas/buscar
/api/modernizacoes/criar
/api/equipes/listar
```

Cada rota valida se o usuário pertence à prefeitura correta (RLS).

---

## 🎨 Design System

### Cores
- **Primária**: Azul (#0284c7)
- **Background**: Cinza claro (#f9fafb)
- **Texto**: Preto (#111827)
- **Sucesso**: Verde (#10b981)
- **Alerta**: Amarelo (#f59e0b)
- **Erro**: Vermelho (#ef4444)

### Componentes
- Cards com sombra e borda sutil
- Buttons com estados (hover, disabled)
- Badges para status
- Tabelas responsivas
- Modals para confirmação

---

## 🚨 Troubleshooting

### "supabaseUrl is required"
→ Verificar NEXT_PUBLIC_SUPABASE_URL em Environment Variables do Vercel

### 404 em Produção
→ Vercel Dashboard → Deployments → Redeploy

### Build falha
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Arquivo não é commitado
→ Verificar .gitignore

---

## 📞 Suporte

Para dúvidas ou issues:
1. Verificar este README
2. Verificar arquivo INSTRUÇOES_SETUP.md
3. Consultar logs do Vercel
4. Verificar SQL do Supabase

---

## 📄 Licença

Produto comercial. Todos os direitos reservados.

---

## 🎯 Roadmap Futuro

- [ ] Integração com SMS para notificações
- [ ] App mobile nativo
- [ ] Relatórios PDF
- [ ] Integração com sistemas legados
- [ ] Multilíngue
- [ ] Dark mode

---

**Desenvolvido com ❤️ para Gestão Pública**
