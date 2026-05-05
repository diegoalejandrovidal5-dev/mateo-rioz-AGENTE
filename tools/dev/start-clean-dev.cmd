@echo off
setlocal

REM OneDrive / carpetas sincronizadas: polling evita que el watcher pierda cambios y sirva HTML viejo.
set WATCHPACK_POLLING=true

REM Kill only process bound to dev port 3010.
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3010 ^| findstr LISTENING') do (
  taskkill /F /PID %%a >nul 2>nul
)

timeout /t 1 /nobreak >nul

REM Salidas de dev (`.next`) y de build previo (`.cache/next`): limpiar ambas para no mezclar manifests.
if exist ".next" rmdir /s /q ".next"
if exist ".cache\\next" rmdir /s /q ".cache\\next"

REM npm.ps1 puede estar bloqueado en PowerShell — npm.cmd evita el error de ExecutionPolicy.
call npm.cmd run dev -- -p 3010
