# ✅ ARQUIVOS COPIADOS COM SUCESSO

Todos os 23 arquivos foram copiados para: `C:\projetos\gestao-iluminacao\`

---

## PRÓXIMAS ETAPAS (Siga nessa ordem)

### 1️⃣ Criar pasta `public` (vazia)

Abra o File Explorer e:
```
C:\projetos\gestao-iluminacao\
└─ Criar nova pasta
   └─ Renomear para: public
```

**Ou via PowerShell:**
```powershell
cd C:\projetos\gestao-iluminacao
mkdir public
```

---

### 2️⃣ Criar arquivo `.env.local` (IMPORTANTE!)

Abra o Notepad e crie um arquivo chamado `.env.local` na raiz do repositório com este conteúdo:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Substitua:**
- `YOUR-PROJECT-ID` → ID do seu projeto Supabase
- `your-anon-key-here` → Chave anon do Supabase
- `your-mapbox-token` → Token do Mapbox (opcional por enquanto)

**Caminhos:**
- 📁 Supabase: https://app.supabase.com → Seu projeto → Settings → API
- 🗺️ Mapbox: https://account.mapbox.com → Tokens

**Salvar como:**
- Nome: `.env.local`
- Tipo: All Files
- Pasta: `C:\projetos\gestao-iluminacao\`

⚠️ **IMPORTANTE**: Este arquivo NÃO vai para GitHub (está em .gitignore)

---

### 3️⃣ Instalar Dependências

Abra PowerShell/CMD na pasta do projeto:

```powershell
cd C:\projetos\gestao-iluminacao
npm install
```

⏳ Vai demorar 2-5 minutos. Aguarde terminar sem erros.

---

### 4️⃣ Testar Build (CRÍTICO!)

```powershell
npm run build
```

**Deve terminar com:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
```

❌ **Se falhar:**
```powershell
rm -r .next node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

---

### 5️⃣ Testar Localmente

```powershell
npm run dev
```

Abra navegador: **http://localhost:3000**

Deve aparecer página de **LOGIN** (não 404!)

Para parar: `Ctrl+C`

---

### 6️⃣ Configurar Supabase

Se ainda não tem projeto Supabase:

1. Ir para: https://supabase.com
2. Sign Up / Login
3. Nova Project → Region: **São Paulo (gru1)**
4. Aguardar criação (~2 min)
5. Ir para: **SQL Editor**
6. Abrir arquivo: `INSTRUÇOES_SETUP.md` (no seu repositório)
7. Copiar TODO o código SQL
8. Colar no SQL Editor do Supabase
9. Executar
10. Anotar:
    - **Project URL**: https://xxxxx.supabase.co
    - **Anon Key**: (chave longa)

---

### 7️⃣ Atualizar `.env.local` com Supabase Real

Edite `C:\projetos\gestao-iluminacao\.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu-anon-key-real
```

Salve o arquivo.

---

### 8️⃣ Testar Novamente (com Supabase real)

```powershell
npm run dev
```

Abra: http://localhost:3000

Não deve aparecer erro de conexão com Supabase.

---

### 9️⃣ Push para GitHub

```powershell
cd C:\projetos\gestao-iluminacao
git add .
git status
git commit -m "refactor: rebuild project with correct structure and all dependencies"
git push origin main
```

Verifique no GitHub: https://github.com/gestaodeatendimentopr-cell/gestao-prefeitura

---

### 🔟 Configurar Vercel

1. Ir para: https://vercel.com
2. Projeto: `gestao-prefeitura`
3. **Settings → Environment Variables**
4. Remover variáveis antigas (se houver)
5. **Adicionar estas variáveis:**

| Nome | Valor |
|------|-------|
| `supabase_url` | `https://xxxxx.supabase.co` |
| `supabase_anon_key` | (sua chave do Supabase) |
| `mapbox_token` | (opcional por enquanto) |

⚠️ **SEM "NEXT_PUBLIC_" no nome!** (vercel.json faz o mapeamento)

---

### 1️⃣1️⃣ Redeploy no Vercel

1. Ir para: **Deployments**
2. Clicar no último deployment (deve ser seu git push)
3. Clicar nos **"..."** → **"Redeploy"**
4. Aguardar ~2-5 min até status: **"Ready"**
5. Abrir: https://gestao-prefeitura.vercel.app

Deve aparecer página de **LOGIN** (não 404!)

---

## ✅ Checklist Final

- [ ] Pasta `public/` criada
- [ ] `.env.local` criado com credenciais
- [ ] `npm install` sucesso
- [ ] `npm run build` sucesso
- [ ] `npm run dev` rodando sem erros
- [ ] Supabase projeto criado (gru1)
- [ ] Supabase tabelas criadas (SQL)
- [ ] `.env.local` atualizado com URL e Anon Key reais
- [ ] `git push origin main` sucesso
- [ ] Vercel env vars configuradas (supabase_url, supabase_anon_key)
- [ ] Vercel redeploy realizado
- [ ] https://gestao-prefeitura.vercel.app mostra LOGIN (não 404)

---

## 🆘 Se Algo Falhar

| Erro | Solução |
|------|---------|
| `npm install` falha | `npm cache clean --force` → `npm install` |
| `npm run build` falha | Verificar `.env.local` com valores corretos |
| 404 em produção | Vercel → Settings → Env Vars → Verificar nomes |
| Git não envia | `git status` → Verificar `.gitignore` |

---

## 📁 Estrutura Atual

Seu repositório agora tem:

```
C:\projetos\gestao-iluminacao\
├── .git/                    (mantido)
├── .gitignore               ✅
├── .env.example             ✅
├── .env.local               ← CRIAR com suas credenciais
├── public/                  ← CRIAR pasta vazia
│
├── pages/
│   ├── _app.js             ✅
│   ├── _document.js        ✅
│   ├── index.js            ✅
│   └── dashboard.js        ✅
│
├── components/
│   └── Layout.js           ✅
│
├── lib/
│   └── supabase.js         ✅
│
├── styles/
│   └── globals.css         ✅
│
├── package.json            ✅
├── next.config.js          ✅
├── vercel.json             ✅ (CRÍTICO)
├── tailwind.config.js      ✅
├── postcss.config.js       ✅
├── tsconfig.json           ✅
│
└── Documentação/
    ├── README.md                      ✅
    ├── LEIA_PRIMEIRO.md              ✅
    ├── INSTRUÇOES_SETUP.md           ✅
    ├── DEPLOYMENT.md                 ✅
    ├── SUMARIO_COMPLETO.md           ✅
    └── PROJETO_REFEITO_PLANO.md      ✅
```

---

## ➡️ PRÓXIMA AÇÃO

1. ✅ Leia este arquivo (você está aqui)
2. 👉 Crie a pasta `public/`
3. 👉 Crie o arquivo `.env.local`
4. 👉 Execute: `npm install`
5. 👉 Execute: `npm run build`

Assim que completar estes passos, me avise! 🚀

---

**Bom trabalho! Você está perto de ter a aplicação rodando.** 💪
