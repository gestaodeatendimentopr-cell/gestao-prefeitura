# Ultimo passo - instalar lucide-react e build

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  INSTALAR LUCIDE E BUILD" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$repo = "C:\projetos\gestao-iluminacao"
Set-Location $repo

# 1. Instalar lucide-react
Write-Host "Instalando lucide-react..." -ForegroundColor Yellow
npm install lucide-react

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: npm install lucide-react falhou!" -ForegroundColor Red
    [Console]::ReadKey() | Out-Null
    exit 1
}
Write-Host "OK - lucide-react instalado" -ForegroundColor Green

# 2. Build
Write-Host ""
Write-Host "npm run build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: npm run build falhou!" -ForegroundColor Red
    [Console]::ReadKey() | Out-Null
    exit 1
}

# Sucesso
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  SUCESSO! BUILD COMPLETO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Seu projeto esta 100% pronto!" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "  1. npm run dev (testar localmente)" -ForegroundColor Gray
Write-Host "  2. Ler INSTRUÇOES_SETUP.md (configurar Supabase)" -ForegroundColor Gray
Write-Host "  3. Ler DEPLOYMENT.md (fazer push e deploy)" -ForegroundColor Gray
Write-Host ""
[Console]::ReadKey() | Out-Null
