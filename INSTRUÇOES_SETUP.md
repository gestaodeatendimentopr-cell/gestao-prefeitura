# INSTRUÇÕES DE SETUP - Gestão de Iluminação Pública

## ⚠️ IMPORTANTE - ORDEM CORRETA

Siga esta ordem EXATAMENTE para evitar erros:

## ETAPA 1: Preparar Supabase

### 1.1 Criar Projeto Supabase
- Ir para https://supabase.com
- Criar novo projeto (Region: São Paulo/gru1)
- Anotar:
  - **Supabase URL**: https://YOUR-PROJECT.supabase.co
  - **Anon Key**: sua-chave-anonima

### 1.2 Criar Tabelas no Supabase
Execute no SQL Editor:

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

-- Tabela de Usuários por Prefeitura
CREATE TABLE usuarios_prefeitura (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  prefeitura_id uuid NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  papel TEXT NOT NULL CHECK (papel IN ('admin', 'supervisor', 'atendente', 'campo')),
  ativo BOOLEAN DEFAULT true
);

-- Tabela Base do Censo (ligada à prefeitura)
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

-- Tabela Modernizações (Histórico)
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

-- Criar índices para performance
CREATE INDEX idx_base_censo_prefeitura ON base_censo(prefeitura_id);
CREATE INDEX idx_base_censo_plaqueta ON base_censo(numero_plaqueta);
CREATE INDEX idx_atendimentos_prefeitura ON atendimentos(prefeitura_id);
CREATE INDEX idx_atendimentos_status ON atendimentos(status);
CREATE INDEX idx_modernizacoes_prefeitura ON modernizacoes(prefeitura_id);
CREATE INDEX idx_modernizacoes_plaqueta ON modernizacoes(plaqueta_id);
```

### 1.3 Configurar Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE prefeituras ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios_prefeitura ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_censo ENABLE ROW LEVEL SECURITY;
ALTER TABLE atendimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE modernizacoes ENABLE ROW LEVEL SECURITY;

-- Política básica - usuários só veem dados da sua prefeitura
CREATE POLICY "users_see_own_prefeitura" ON prefeituras
  FOR SELECT USING (
    admin_id = auth.uid() OR 
    id IN (
      SELECT prefeitura_id FROM usuarios_prefeitura 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "users_see_own_data" ON atendimentos
  FOR SELECT USING (
    prefeitura_id IN (
      SELECT id FROM prefeituras WHERE admin_id = auth.uid()
      UNION
      SELECT prefeitura_id FROM usuarios_prefeitura WHERE user_id = auth.uid()
    )
  );
```

## ETAPA 2: Preparar Vercel

### 2.1 Criar Projeto Vercel
- Ir para https://vercel.com
- Importar repositório GitHub: `gestaodeatendimentopr-cell/gestao-prefeitura`
- Region: São Paulo (gru1)

### 2.2 Configurar Environment Variables

No Vercel Dashboard → gestao-prefeitura → Settings → Environment Variables, adicionar:

**Production:**
- Nome: `supabase_url` → Valor: `https://YOUR-PROJECT.supabase.co`
- Nome: `supabase_anon_key` → Valor: (sua anon key)
- Nome: `mapbox_token` → Valor: (opcional)

**Development:**
- Mesmas variáveis com mesmo nome

⚠️ **IMPORTANTE**: Use exatamente estes nomes (sem NEXT_PUBLIC_). O vercel.json faz o mapeamento automático com @ prefix.

## ETAPA 3: Preparar GitHub

### 3.1 Clonar Repositório
```bash
git clone https://github.com/gestaodeatendimentopr-cell/gestao-prefeitura.git
cd gestao-prefeitura

# Limpar repositório anterior se necessário
git reset --hard origin/main
git clean -fd
```

### 3.2 Copiar Arquivos do Projeto

Copiar TODOS os arquivos gerados para a raiz do repositório:
- `package.json`
- `next.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `vercel.json`
- `.env.example`
- `.gitignore`
- `pages/`, `components/`, `lib/`, `styles/` (diretórios)

## ETAPA 4: Setup Local

### 4.1 Instalar Dependências
```bash
npm install
```

### 4.2 Criar .env.local
Copiar `.env.example` para `.env.local` e preencher com suas credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4.3 Testar Localmente
```bash
# Desenvolvimento
npm run dev
# Acessar: http://localhost:3000

# Build
npm run build

# Produção
npm run start
```

## ETAPA 5: Deploy

### 5.1 Fazer Push para GitHub
```bash
git add .
git commit -m "Refactor: Rebuild project with correct structure and dependencies"
git push origin main
```

### 5.2 Redeploy Manual no Vercel
1. Ir para: https://vercel.com/gestaodeatendimentopr-cell/gestao-prefeitura
2. Clicar em "Deployments"
3. Encontrar último deployment
4. Clicar em "..." e selecionar "Redeploy"
5. Aguardar build concluir

### 5.3 Testar em Produção
- Acessar: https://gestao-prefeitura.vercel.app
- Não deve mais aparecer erro 404

## ✅ Checklist Final

- [ ] Supabase project criado
- [ ] Tabelas criadas no Supabase
- [ ] RLS configurado
- [ ] Vercel environment variables configuradas (@ prefix)
- [ ] GitHub repositório atualizado
- [ ] npm install executado
- [ ] .env.local criado com credenciais
- [ ] npm run build executado com sucesso localmente
- [ ] npm run dev testado localmente
- [ ] git push realizado
- [ ] Redeploy manual do Vercel
- [ ] Aplicação testada em produção

## 🆘 Troubleshooting

**Erro: "supabaseUrl is required"**
→ Verificar NEXT_PUBLIC_SUPABASE_URL em Environment Variables do Vercel

**Erro: 404 mesmo após deploy**
→ Ir para Vercel → Deployments → Clicar em Redeploy

**Build falha localmente**
→ Executar: `rm -rf node_modules && npm install`

**Arquivo não é enviado para GitHub**
→ Verificar .gitignore - não deve estar bloqueando arquivos necessários
