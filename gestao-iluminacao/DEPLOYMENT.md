# Guia de Deployment - Gestão de Iluminação Pública

Este documento descreve o processo completo de deploy da aplicação no Vercel com Supabase como backend.

## 📋 Pré-requisitos

- ✅ Conta Vercel
- ✅ Projeto Supabase criado e configurado
- ✅ Repositório GitHub
- ✅ Node.js 16+ instalado localmente

## 🚀 Passo 1: Preparar Supabase

### 1.1 Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login e crie novo projeto
3. Anote as credenciais:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 1.2 Executar Schema do Banco de Dados

1. Vá para **SQL Editor** no console Supabase
2. Crie uma nova query
3. Copie e cole o conteúdo de `database/schema.sql`
4. Execute a query

Ou via Supabase CLI:

```bash
npm install -g supabase
supabase link --project-ref seu-projeto-ref
supabase db push
```

### 1.3 Configurar Autenticação

1. Vá para **Authentication** no console Supabase
2. Configure os provedores desejados (Email/Password, Google, GitHub, etc)
3. Configure URLs de redirecionamento:
   - Desenvolvimento: `http://localhost:3000`
   - Produção: `https://seu-dominio.com`

### 1.4 Configurar Row Level Security (RLS)

As políticas de RLS já estão no schema. Para ativá-las:

1. Vá para **Database** → **Tables**
2. Para cada tabela crítica, ative RLS no tab **Security**

## 🔧 Passo 2: Preparar Repositório GitHub

### 2.1 Inicializar Git (se necessário)

```bash
cd gestao-iluminacao
git init
git add .
git commit -m "Initial commit: Projeto Gestão de Iluminação Pública"
```

### 2.2 Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório privado
3. Siga as instruções para adicionar remote:

```bash
git remote add origin https://github.com/seu-usuario/gestao-iluminacao.git
git branch -M main
git push -u origin main
```

## 🌐 Passo 3: Deploy no Vercel

### 3.1 Conectar Vercel ao GitHub

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Selecione seu repositório `gestao-iluminacao`

### 3.2 Configurar Variáveis de Ambiente

Na tela de configuração do Vercel:

1. **Environment Variables**, adicione:

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-publica
NEXT_PUBLIC_API_URL = https://seu-dominio.vercel.app/api
```

2. Certifique-se de que estão disponíveis para:
   - Preview
   - Production
   - Development

### 3.3 Configurar Domínio (Opcional)

1. Vá para **Settings** → **Domains**
2. Adicione seu domínio customizado ou use o oferecido por Vercel

### 3.4 Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Teste a aplicação em produção

## ✅ Passo 4: Verificar Deployment

### 4.1 Testes Básicos

```bash
# Verificar se a aplicação está respondendo
curl https://seu-dominio.vercel.app/

# Verificar se a API está funcionando
curl https://seu-dominio.vercel.app/api/atendimentos \
  -H "Authorization: Bearer seu-token"
```

### 4.2 Verificar Logs

1. Vá para **Deployments** no Vercel
2. Clique no deployment atual
3. Verifique **Logs** para erros

### 4.3 Verificar Conexão Supabase

No console da aplicação (Dev Tools):

```javascript
// Verificar se o cliente Supabase está inicializado
console.log(window.supabase);
```

## 🔄 Passo 5: Pipeline de CI/CD

O Vercel automaticamente:

- ✅ Faz build em cada push para main
- ✅ Cria preview environments para PRs
- ✅ Faz deploy automático em merge

### Configuração adicional (.github/workflows/test.yml)

Opcionalmente, configure testes automáticos:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run test  # se tiver testes
```

## 🛡️ Passo 6: Segurança em Produção

### 6.1 Variáveis de Ambiente Sensíveis

- ✅ Nunca commite `.env.local`
- ✅ Use `.env.example` como template
- ✅ Configure tudo via Vercel Dashboard

### 6.2 CORS Configuration

Se a API precisar de CORS, configure em `pages/api/_middleware.js`:

```javascript
export function middleware(request) {
  const response = new Response();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}
```

### 6.3 Rate Limiting (Opcional)

Para APIs críticas, configure rate limiting. Exemplo com Upstash:

```bash
npm install @upstash/ratelimit @upstash/redis
```

## 📊 Passo 7: Monitoramento

### 7.1 Erro Tracking

Configure Sentry para tracking de erros:

```bash
npm install @sentry/nextjs
```

### 7.2 Performance Monitoring

Use o Vercel Analytics:
- Vá para **Analytics** no dashboard Vercel

### 7.3 Database Monitoring

Use o dashboard Supabase:
- **Database** → **Logs** para queries lentas
- **Database** → **Usage** para monitorar recursos

## 🔄 Passo 8: Updates e Maintenance

### Atualizações Regulares

```bash
# Atualizar dependências
npm outdated
npm update

# Atualizar Node.js
node --version
```

### Backup do Banco de Dados

Supabase faz backups automáticos. Para backups manuais:

1. Vá para **Database** → **Backups**
2. Clique em "Create backup"

## ❓ Troubleshooting

### Erro: "Cannot find module"

```bash
# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Supabase connection failed"

1. Verifique se as variáveis de ambiente estão corretas
2. Verifique se o projeto Supabase está ativo
3. Teste a conexão localmente com `npm run dev`

### Erro: "API route not found"

1. Verifique o caminho do arquivo (deve estar em `pages/api/`)
2. Verifique se exporta função default
3. Faça rebuild: `vercel rebuild`

### Lentidão em Produção

1. Verifique os **Analytics** no Vercel
2. Otimize imagens (use `next/image`)
3. Implemente code-splitting
4. Verifique se há queries N+1 no Supabase

## 📞 Suporte

- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support
- Next.js: https://nextjs.org/docs

---

**Versão**: 1.0.0
**Atualizado**: Setembro 2024
