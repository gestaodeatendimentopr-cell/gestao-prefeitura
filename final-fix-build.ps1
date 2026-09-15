# Script final para remover geojson e compilar

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  REMOVER GEOJSON E COMPILAR" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$repo = "C:\projetos\gestao-iluminacao"
Set-Location $repo

# 1. Remover geojson do package.json
Write-Host "Removendo geojson do package.json..." -ForegroundColor Yellow
$content = Get-Content "package.json" -Raw

# Remover a linha de geojson (com espaço antes e depois)
$content = $content -replace '    "geojson": "[^"]+",\s*', ''

# Salvar
$content | Set-Content "package.json" -Encoding ASCII -Force
Write-Host "OK - geojson removido" -ForegroundColor Green

# 2. Deletar node_modules
Write-Host ""
Write-Host "Limpando node_modules..." -ForegroundColor Yellow
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "OK - Limpo" -ForegroundColor Green

# 3. npm install
Write-Host ""
Write-Host "npm install..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: npm install falhou!" -ForegroundColor Red
    [Console]::ReadKey() | Out-Null
    exit 1
}
Write-Host "OK" -ForegroundColor Green

# 4. npm build
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
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host "  git push" -ForegroundColor Gray
Write-Host ""
[Console]::ReadKey() | Out-Null
