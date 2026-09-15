# Script para corrigir dependencias e fazer build

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  CORRIGIR E COMPILAR" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$repo = "C:\projetos\gestao-iluminacao"
Set-Location $repo

# 1. Corrigir package.json
Write-Host "Corrigindo package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw
$packageJson = $packageJson -replace '"geojson": "\^0\.5\.4"', '"geojson": "0.5.2"'
$packageJson | Set-Content "package.json" -Encoding ASCII -Force
Write-Host "OK - package.json corrigido" -ForegroundColor Green

# 2. Deletar arquivos antigos
Write-Host ""
Write-Host "Deletando arquivos antigos..." -ForegroundColor Yellow
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "OK - Arquivos antigos deletados" -ForegroundColor Green

# 3. npm install
Write-Host ""
Write-Host "Instalando dependencias (npm install)..." -ForegroundColor Yellow
Write-Host "(isto pode demorar 2-5 minutos)" -ForegroundColor Gray
Write-Host ""
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERRO: npm install falhou!" -ForegroundColor Red
    exit 1
}
Write-Host "OK - npm install concluido" -ForegroundColor Green

# 4. Build
Write-Host ""
Write-Host "Compilando (npm run build)..." -ForegroundColor Yellow
Write-Host "(isto pode demorar 1-2 minutos)" -ForegroundColor Gray
Write-Host ""
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERRO: npm run build falhou!" -ForegroundColor Red
    exit 1
}

# Sucesso
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  BUILD COMPLETO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Seu projeto esta pronto!" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "  1. npm run dev (testar em http://localhost:3000)" -ForegroundColor Gray
Write-Host "  2. git add . && git commit && git push" -ForegroundColor Gray
Write-Host ""
[Console]::ReadKey() | Out-Null
