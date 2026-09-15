@echo off
REM Script para executar setup-completo.ps1 como Administrador
REM Clique 2x para executar

cls
echo.
echo ================================
echo   GESTAO ILUMINACAO - SETUP
echo ================================
echo.
echo Executando setup-completo.ps1...
echo.

cd /d "C:\projetos\gestao-iluminacao"

REM Executar PowerShell script
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '.\setup-completo.ps1'"

pause
