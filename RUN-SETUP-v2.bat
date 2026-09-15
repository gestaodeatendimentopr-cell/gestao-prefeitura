@echo off
REM Script para executar setup-completo-v2.ps1
REM Clique 2x para executar

chcp 65001 >nul
cd /d "C:\projetos\gestao-iluminacao"
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '.\setup-completo-v2.ps1'"
pause
