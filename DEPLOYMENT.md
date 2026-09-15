# GUIA COMPLETO DE DEPLOYMENT

## ⚠️ ORDEM CRÍTICA - SIGA EXATAMENTE ISSO

Não pule nenhuma etapa. Erros ocorrem quando etapas são invertidas.

---

## FASE 1: PREPARAÇÃO (Sem Push Ainda)

### ✅ Etapa 1: Verificar GitHub

```bash
# Ir para repositório local
cd C:\projetos\gestao-iluminacao

# Verificar status
git status

# Verificar remote
git remote -v
# Deve mostrar: https://github.com/gestaodeatendimentopr-cell/gestao-prefeitura.git

# Sincronizar com remoto
git fetch origin
git reset --hard origin/main
git clean -fd
```

### ✅ Etapa 2: Copiar Todos os Arquivos

Copiar estes arquivos gerados para a raiz do repositório:

**Arquivos de Config:**
- [ ] package.json
- [ ] next.config.js
- [ ] tailwind.config.js
- [ ] postcss.config.js
- [ ] tsconfig.json
- [ ] vercel.json
- [ ] .env.example
- [ ] .gitignore

**Diretórios:**
- [ ] pages/ (com _app.js, _document.js, index.js, dashboard.js, etc.)
- [ ] components/ (Layout.js, etc.)
- [ ] lib/ (supabase.js, etc.)
- [ ] styles/ (globals.css)
- [ ] public/ (criar vazio se não existir)

**Documentação:**
- [ ] README.md
- [ ] INSTRUÇOES_SETUP.md
- [ ] DEPLOYMENT.md

### ✅ Etapa 3: Criar .env.local (LOCAL APENAS)

```bash
cd C:\projetos\gestao-iluminacao

# Criar arquivo .env.local (NÃO commitar)
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EOF
```

**Edite com seus valores reais do Supabase**

### ✅ Etapa 4: Instalar Dependências

```bash
# Na raiz do projeto
npm install

# Verificar se instalou sem erros
npm list supabase
npm list next
```

### ✅ Etapa 5: Testar BUILD Localmente

**ISTO É CRÍTICO - Se falhar aqui, não faça push**

```bash
# Tentar build
npm run build

# Deve terminar com:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
```

Se falhar:
```bash
# Limpar cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### ✅ Etapa 6: Testar Aplicação Localmente

```bash
# Rodear em dev
npm run dev

# Abrir navegador: http://localhost:3000
# Deve aparecer página de login (não erro 404)

# Parar: Ctrl+C
```

---

## FASE 2: CONFIGURAÇÃO SUPABASE (Antes de Push)

### ✅ Etapa 7: Criar Projeto Supabase

1. Ir para https://supabase.com
2. Criar novo projeto
3. **Region**: São Paulo (gru1) ← IMPORTANTE
4. Anotar:
   - **Project URL**: https://xxxxx.supabase.co
   - **Anon Key**: chave longa

### ✅ Etapa 8: Criar Tabelas no Supabase

Ir para SQL Editor e executar:

```sql
-- Tabela de Prefeituras
CREATE TABLE prefeituras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  nome TEXT NOT NULL,
  logo_url TEXT,
  ativa BOOLEAN DEFAULT true,
  admin_id uuid NOT NULL REFERENCES auth.users(id)
);

-- Tabela de Usuários
CREATE TABLE usuarios_prefeitura (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  prefeitura_id uuid NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  papel TEXT NOT NULL CHECK (papel IN ('admin', 'supervisor', 'atendente', 'campo')),
  ativo BOOLEAN DEFAULT true
);

-- Tabela Base do Censo
CREATE TABLE base_censo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  prefeitura_id uuid NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  numero_plaqueta TEXT NOT NULL,
  endereco TEXT,
  bairro TEXT,
  municipio TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),
  tipo_lampada TEXT,
  potencia_original INTEGER,
  potencia_atual INTEGER,
  localizacao TEXT,
  modernizado BOOLEAN DEFAULT false,
  data_ultima_modernizacao timestamp,
  quantidade_modernizacoes INTEGER DEFAULT 0,
  UNIQUE(prefeitura_id, numero_plaqueta)
);

-- Tabela Atendimentos
CREATE TABLE atendimentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  prefeitura_id uuid NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  plaqueta_id uuid REFERENCES base_censo(id),
  numero_atendimento TEXT NOT NULL,
  numero_plaqueta TEXT,
  endereco TEXT,
  bairro TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),
  tipo_problema TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'analise', 'aguardando_despacho', 'despachado', 'execucao', 'concluido', 'cancelado')),
  atendente_id uuid REFERENCES auth.users(id),
  equipe_id uuid,
  data_criacao timestamp DEFAULT now(),
  data_conclusao timestamp,
  responsavel_conclusao TEXT
);

-- Tabela Equipes
CREATE TABLE equipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  prefeitura_id uuid NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  identificacao TEXT,
  observacao TEXT,
  ativa BOOLEAN DEFAULT true
);

-- Tabela Modernizações
CREATE TABLE modernizacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  prefeitura_id uuid NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  plaqueta_id uuid NOT NULL REFERENCES base_censo(id) ON DELETE CASCADE,
  numero_plaqueta TEXT NOT NULL,
  potencia_anterior INTEGER NOT NULL,
  potencia_nova INTEGER NOT NULL,
  data_modernizacao timestamp DEFAULT now(),
  usuario_id uuid REFERENCES auth.users(id),
  equipe_id uuid,
  observacao TEXT
);

-- Índices
CREATE INDEX idx_base_censo_prefeitura ON base_censo(prefeitura_id);
CREATE INDEX idx_base_censo_plaqueta ON base_censo(numero_plaqueta);
CREATE INDEX idx_atendimentos_prefeitura ON atendimentos(prefeitura_id);
CREATE INDEX idx_atendimentos_status ON atendimentos(status);
CREATE INDEX idx_modernizacoes_prefeitura ON modernizacoes(prefeitura_id);

-- RLS
ALTER TABLE prefeituras ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios_prefeitura ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_censo ENABLE ROW LEVEL SECURITY;
ALTER TABLE atendimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE modernizacoes ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (adicionar después para produção)
```

### ✅ Etapa 9: Atualizar .env.local

```bash
# Editar .env.local com valores reais do Supabase que você criou
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

### ✅ Etapa 10: Testar Novamente Localmente

```bash
npm run dev
# Deve funcionar sem erros de Supabase
```

---

## FASE 3: GITHUB & VERCEL

### ✅ Etapa 11: Fazer Push para GitHub

```bash
cd C:\projetos\gestao-iluminacao

# Stage todos os arquivos
git add .

# Verificar o que será commitado
git status

# Commit
git commit -m "refactor: rebuild project with correct structure and all dependencies

- Setup Next.js 14 with TypeScript
- Configure Supabase client and authentication
- Create all necessary pages and components
- Add Tailwind CSS styling
- Configure environment variables
- Add comprehensive documentation

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

# Push para main
git push origin main

# Verificar no GitHub se apareceu
```

### ✅ Etapa 12: Configurar Vercel (ANTES de Deploy)

1. Ir para https://vercel.com
2. Selecionar projeto: `gestao-prefeitura`
3. Clicar em: Settings
4. Ir em: Environment Variables

**Adicionar estas variáveis:**

| Name | Value | Environment |
|------|-------|-------------|
| `supabase_url` | `https://xxxxx.supabase.co` | Production + Preview |
| `supabase_anon_key` | (sua chave) | Production + Preview |
| `mapbox_token` | (opcional) | Production + Preview |

**⚠️ NOMES SEM "NEXT_PUBLIC_" - O vercel.json faz o mapeamento**

### ✅ Etapa 13: Redeploy Manual no Vercel

1. Ir para: https://vercel.com/gestaodeatendimentopr-cell/gestao-prefeitura
2. Clicar em: "Deployments"
3. Encontrar deployment mais recente (deve ser do seu git push)
4. Clicar nos "..." e selecionar "Redeploy"
5. Aguardar (2-5 minutos) até:
   - Status mudar para "Ready"
   - Não aparecer mais erro 404

### ✅ Etapa 14: Testar em Produção

1. Abrir: https://gestao-prefeitura.vercel.app
2. Deve aparecer página de **LOGIN**
3. **NÃO** deve aparecer **404 ERROR**

Se aparecer 404:
```
→ Voltar para Etapa 12 (verificar variáveis de ambiente)
→ Fazer novo redeploy
```

---

## ✅ CHECKLIST FINAL

### Antes de Push:
- [ ] Todos os arquivos copiados
- [ ] .env.local criado com valores do Supabase
- [ ] `npm install` executado com sucesso
- [ ] `npm run build` passou sem erros
- [ ] `npm run dev` rodou sem erros

### Supabase:
- [ ] Projeto criado em São Paulo (gru1)
- [ ] Todas as tabelas criadas
- [ ] Índices criados
- [ ] RLS habilitado
- [ ] Valores anotados (URL + Anon Key)

### GitHub:
- [ ] `git status` está limpo
- [ ] `git push origin main` sucesso
- [ ] Commits aparecem no GitHub

### Vercel:
- [ ] Variáveis de ambiente setadas (names corretos)
- [ ] Redeploy manual executado
- [ ] Status: "Ready"
- [ ] Aplicação testada: https://gestao-prefeitura.vercel.app

---

## 🚨 Se Algo Falhar

### Build falha localmente:
```bash
rm -rf .next node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

### 404 em produção:
```
1. Vercel Dashboard → gestao-prefeitura
2. Settings → Environment Variables
3. Verificar: supabase_url, supabase_anon_key
4. Deployments → Redeploy
```

### Erro de autenticação:
```
Verificar no Supabase:
1. Project Settings → API
2. Anon Key está correto?
3. Project URL está correto?
```

### Arquivo não foi para GitHub:
```bash
# Verificar .gitignore
cat .gitignore

# Se necessário, adicionar à exceção
git add arquivo -f
git commit -m "Add file"
git push origin main
```

---

## 📞 Proximos Passos Após Deploy

1. ✅ Criar primeiro usuário no Supabase Auth
2. ✅ Testar login em produção
3. ✅ Criar primeira prefeitura (Admin Master)
4. ✅ Upload de base do censo de teste
5. ✅ Criar usuários de teste
6. ✅ Fazer atendimento de teste
7. ✅ Visualizar no mapa
8. ✅ Testar modernização
9. ✅ Verificar indicadores

---

**Deployment concluído com sucesso! 🚀**
