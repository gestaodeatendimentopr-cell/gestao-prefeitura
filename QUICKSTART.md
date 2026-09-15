# Quick Start - Gestão de Iluminação Pública

Guia rápido para começar com a aplicação em 5 minutos.

## ⚡ Início Rápido (Local)

### 1. Configurar Variáveis de Ambiente

```bash
# Copiar template
cp .env.example .env.local

# Editar com suas credenciais Supabase
# (Obter em https://app.supabase.com → Project Settings → API)
nano .env.local
```

Adicione:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 2. Instalar e Executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

### 3. Criar Conta de Teste

1. Na página de login, clique em "Cadastro"
2. Preencha com e-mail e senha
3. Sistema criará conta automaticamente

## 🗄️ Configurar Banco de Dados

### Via Supabase CLI (Recomendado)

```bash
# Instalar CLI
npm install -g supabase

# Conectar ao projeto
supabase link --project-ref seu-projeto-ref

# Executar schema
supabase db push
```

### Via Console Supabase

1. Acesse https://app.supabase.com
2. Vá para **SQL Editor**
3. Nova query
4. Cole conteúdo de `database/schema.sql`
5. Execute

## 🚀 Deploy no Vercel

### 1. Fazer Push para GitHub

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

### 2. Conectar Vercel

1. Acesse https://vercel.com
2. "New Project"
3. Selecione seu repositório
4. Na aba "Environment Variables", adicione:

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anonima
NEXT_PUBLIC_API_URL = https://seu-dominio.vercel.app/api
```

5. Deploy!

## 📝 Próximos Passos

### Essencial
- [ ] Testar login/cadastro
- [ ] Verificar conexão com Supabase
- [ ] Criar primeiro atendimento
- [ ] Acessar dashboard

### Recomendado
- [ ] Configurar equipes
- [ ] Criar despacho de teste
- [ ] Personalizar configurações
- [ ] Adicionar usuários adicionais

### Futuros
- [ ] Integrar mapa
- [ ] Implementar upload de fotos
- [ ] Relatórios exportáveis
- [ ] App mobile

## 🐛 Troubleshooting

### "Cannot find module 'zustand'"

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Supabase connection refused"

- Verifique URL e chave em .env.local
- Confirm que projeto Supabase está ativo
- Teste acesso direto: https://seu-projeto.supabase.co/auth/v1/

### "Port 3000 already in use"

```bash
# Usar porta diferente
npm run dev -- -p 3001
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

## 🎯 Arquitetura

```
Frontend (Next.js)
    ↓
Vercel (Deploy)
    ↓
API Routes (pages/api/)
    ↓
Supabase (PostgreSQL + Auth)
```

## 📊 Fluxo de Uso

```
1. Login → 2. Dashboard → 3. Criar Atendimento
   ↓
4. Selecionar Equipe → 5. Criar Despacho
   ↓
6. Equipe Executa → 7. Concluir → 8. Ver Indicadores
```

## 🔑 Credenciais de Teste

Será necessário criar sua própria conta via signup na aplicação.

## ✅ Checklist Final

- [ ] .env.local configurado
- [ ] npm install executado
- [ ] npm run dev funcionando
- [ ] Database schema importado
- [ ] Login testado
- [ ] Dashboard visível
- [ ] Pronto para desenvolvimento!

---

**Dúvidas?** Consulte `README.md` ou `DEPLOYMENT.md`

**Tempo estimado**: 5 minutos ⏱️
