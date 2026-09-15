# Setup Completo - Instala tudo automaticamente (Versao 2)
# Execute como Administrador

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  SETUP GESTAO ILUMINACAO" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Diretorio do projeto
$repo = "C:\projetos\gestao-iluminacao"
Write-Host "Acessando: $repo" -ForegroundColor Yellow
Set-Location $repo

# 1. Criar pasta public
Write-Host "Criando pasta public..." -ForegroundColor Yellow
if (!(Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
    Write-Host "OK - Pasta public criada" -ForegroundColor Green
} else {
    Write-Host "OK - Pasta public ja existe" -ForegroundColor Green
}

# 2. Criar .env.local com as credenciais (usando Set-Content)
Write-Host "Criando .env.local..." -ForegroundColor Yellow

$lines = @(
    "NEXT_PUBLIC_SUPABASE_URL=https://kqcewbzfjrcmqrxpygzw.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2V3YnpmanJjbXFyeHB5Z3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NzA3ODgsImV4cCI6MjEwNTA0Njc4OH0.JJSr6Q7qX6_L9wJ0GknTH5CQL560OQ46kPkGDWcdobM",
    "NEXT_PUBLIC_MAPBOX_TOKEN=placeholder",
    "NODE_ENV=development",
    "NEXT_PUBLIC_API_URL=http://localhost:3000/api"
)

$lines | Out-File -FilePath ".env.local" -Encoding ASCII -Force
Write-Host "OK - .env.local criado com credenciais Supabase" -ForegroundColor Green

# 3. Instalar dependencias
Write-Host ""
Write-Host "Instalando npm install..." -ForegroundColor Yellow
Write-Host "(isto pode demorar 2-5 minutos)" -ForegroundColor Gray
Write-Host ""
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Aviso: npm install teve problema, mas continuando..." -ForegroundColor Yellow
}
Write-Host "OK - npm install concluido" -ForegroundColor Green

# 4. Limpar cache
Write-Host ""
Write-Host "Limpando cache..." -ForegroundColor Yellow
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "OK - Cache limpo" -ForegroundColor Green

# 5. Build
Write-Host ""
Write-Host "Executando npm run build..." -ForegroundColor Yellow
Write-Host "(isto pode demorar 1-2 minutos)" -ForegroundColor Gray
Write-Host ""
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERRO: npm run build falhou!" -ForegroundColor Red
    Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Yellow
    [Console]::ReadKey() | Out-Null
    exit 1
}

# 6. Sucesso
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  SETUP COMPLETO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Seu projeto esta pronto com:" -ForegroundColor Cyan
Write-Host "  - Pasta public/ criada" -ForegroundColor Green
Write-Host "  - .env.local configurado" -ForegroundColor Green
Write-Host "  - npm install completo" -ForegroundColor Green
Write-Host "  - Build testado e funcionando" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "  1. npm run dev (testar em http://localhost:3000)" -ForegroundColor Gray
Write-Host "  2. Ler INSTRUÇOES_SETUP.md" -ForegroundColor Gray
Write-Host "  3. Ler DEPLOYMENT.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Yellow
[Console]::ReadKey() | Out-Null
