# Setup e Build Automatizado
# Execute este script no PowerShell como administrador

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  SETUP GESTAO ILUMINACAO" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 1. Navegar para o repositório
$repo = "C:\projetos\gestao-iluminacao"
Write-Host "📁 Acessando repositório: $repo" -ForegroundColor Yellow
cd $repo

# 2. Criar pasta public se não existir
Write-Host "📁 Criando pasta public..." -ForegroundColor Yellow
if (!(Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
    Write-Host "✅ Pasta public criada" -ForegroundColor Green
} else {
    Write-Host "✅ Pasta public já existe" -ForegroundColor Green
}

# 3. Verificar se .env.local existe
Write-Host "📝 Verificando .env.local..." -ForegroundColor Yellow
if (!(Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local NÃO ENCONTRADO!" -ForegroundColor Red
    Write-Host "   Você precisa criar este arquivo com suas credenciais Supabase" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Crie um arquivo '.env.local' com este conteúdo:" -ForegroundColor Cyan
    Write-Host "   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co" -ForegroundColor Gray
    Write-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Depois execute este script novamente" -ForegroundColor Yellow
    Write-Host ""
    exit 1
} else {
    Write-Host "✅ .env.local encontrado" -ForegroundColor Green
}

# 4. Instalar dependências
Write-Host ""
Write-Host "📦 Instalando dependências (npm install)..." -ForegroundColor Yellow
Write-Host "   ⏳ Isto pode demorar 2-5 minutos..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install falhou!" -ForegroundColor Red
    Write-Host "   Tentando limpar cache..." -ForegroundColor Yellow
    rm -r .next, node_modules, package-lock.json -ErrorAction SilentlyContinue
    npm cache clean --force
    npm install
}
Write-Host "✅ npm install concluído" -ForegroundColor Green

# 5. Testar build
Write-Host ""
Write-Host "🔨 Testando build (npm run build)..." -ForegroundColor Yellow
Write-Host "   ⏳ Isto pode demorar 1-2 minutos..." -ForegroundColor Gray
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ npm run build falhou!" -ForegroundColor Red
    Write-Host "   Verifique se .env.local tem as credenciais corretas" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Build testado com sucesso!" -ForegroundColor Green

# 6. Sucesso
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  ✅ SETUP COMPLETO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. npm run dev       (para testar localmente)" -ForegroundColor Gray
Write-Host "  2. git add ." -ForegroundColor Gray
Write-Host "  3. git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "Depois siga as instruções em DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""
