@echo off
REM Script de Deploy Completo - Gestão de Iluminação Pública
REM Executa: Git Push + Vercel Deploy + Teste

chcp 65001 >nul
color 0A

echo.
echo ============================================
echo   DEPLOY COMPLETO - FASE FINAL
echo ============================================
echo.

cd /d C:\projetos\gestao-iluminacao

REM Verificar status
echo [1/4] Verificando status do Git...
git status
echo.

REM Git add
echo [2/4] Adicionando arquivos...
git add .
echo.

REM Git commit
echo [3/4] Fazendo commit...
git commit -m "refactor: rebuild project with correct structure and all dependencies

- Setup Next.js 14 with TypeScript
- Configure Supabase client and authentication
- Create all necessary pages and components
- Add Tailwind CSS styling
- Configure environment variables
- Add comprehensive documentation"

echo.
echo [4/4] Enviando para GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo ERRO: git push falhou!
    echo Verifique suas credenciais do GitHub.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   GIT PUSH CONCLUIDO COM SUCESSO!
echo ============================================
echo.
echo.
echo PROXIMOS PASSOS:
echo.
echo 1. Aguarde 2-5 minutos para Vercel fazer build
echo 2. Acesse: https://vercel.com/gestaodeatendimentopr-cell/gestao-prefeitura
echo 3. Quando o status mudar para "Ready", a app está online!
echo.
echo URL DA APLICACAO: https://gestao-prefeitura.vercel.app
echo.
echo Pressione qualquer tecla para sair...
pause >nul
