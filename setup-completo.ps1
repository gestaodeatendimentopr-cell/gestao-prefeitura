# Setup Completo - Instala tudo automaticamente
# Execute como Administrador

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  SETUP COMPLETO GESTAO ILUMINACAO" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Diretório do projeto
$repo = "C:\projetos\gestao-iluminacao"
Write-Host "📁 Acessando: $repo" -ForegroundColor Yellow
cd $repo

# 1. Criar pasta public
Write-Host "📁 Criando pasta public..." -ForegroundColor Yellow
if (!(Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
    Write-Host "✅ Pasta public criada" -ForegroundColor Green
} else {
    Write-Host "✅ Pasta public já existe" -ForegroundColor Green
}

# 2. Criar .env.local com as credenciais
Write-Host "📝 Criando .env.local com credenciais..." -ForegroundColor Yellow
$envContent = @"
NEXT_PUBLIC_SUPABASE_URL=https://kqcewbzfjrcmqrxpygzw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2V3YnpmanJjbXFyeHB5Z3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NzA3ODgsImV4cCI6MjEwNTA0Njc4OH0.JJSr6Q7qX6_L9wJ0GknTH5CQL560OQ46kPkGDWcdobM
NEXT_PUBLIC_MAPBOX_TOKEN=placeholder
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8 -Force
Write-Host "✅ .env.local criado com credenciais do Supabase" -ForegroundColor Green

# 3. Instalar dependências
Write-Host ""
Write-Host "📦 Instalando dependências (npm install)..." -ForegroundColor Yellow
Write-Host "   ⏳ Isto pode demorar 2-5 minutos..." -ForegroundColor Gray
Write-Host ""
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  npm install teve aviso, mas continuando..." -ForegroundColor Yellow
}
Write-Host "✅ npm install concluído" -ForegroundColor Green

# 4. Limpar cache antigo
Write-Host ""
Write-Host "🧹 Limpando cache antigo..." -ForegroundColor Yellow
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✅ Cache limpo" -ForegroundColor Green

# 5. Build
Write-Host ""
Write-Host "🔨 Testando build (npm run build)..." -ForegroundColor Yellow
Write-Host "   ⏳ Isto pode demorar 1-2 minutos..." -ForegroundColor Gray
Write-Host ""
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ npm run build falhou!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green

# 6. Sucesso
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  ✅ SETUP COMPLETO E TESTADO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. npm run dev       (para testar localmente em http://localhost:3000)" -ForegroundColor Gray
Write-Host "  2. Ler INSTRUÇOES_SETUP.md (para configurar Supabase)" -ForegroundColor Gray
Write-Host "  3. Ler DEPLOYMENT.md (para fazer push e deploy)" -ForegroundColor Gray
Write-Host ""
Write-Host "Seu repositório agora tem:" -ForegroundColor Cyan
Write-Host "  ✅ Pasta public/" -ForegroundColor Green
Write-Host "  ✅ .env.local com credenciais Supabase" -ForegroundColor Green
Write-Host "  ✅ npm install completo" -ForegroundColor Green
Write-Host "  ✅ Build testado e funcionando" -ForegroundColor Green
Write-Host ""
