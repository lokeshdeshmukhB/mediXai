@echo off
echo.
echo ================================
echo   Security Verification Check
echo ================================
echo.

echo [1/4] Checking if .env is ignored...
git check-ignore backend/.env >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] .env is properly ignored
) else (
    echo [WARNING] .env might not be ignored!
)
echo.

echo [2/4] Checking for tracked .env files...
git ls-files | findstr /R "\.env$" | findstr /V ".env.example" >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] Found tracked .env files!
    git ls-files | findstr /R "\.env$" | findstr /V ".env.example"
) else (
    echo [OK] No .env files are tracked
)
echo.

echo [3/4] Verifying .gitignore configuration...
findstr /C:".env" backend\.gitignore >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] .env is in backend/.gitignore
) else (
    echo [WARNING] .env not found in backend/.gitignore
)
echo.

echo [4/4] Checking staged changes...
git diff --cached --name-only | findstr ".env" | findstr /V ".env.example" >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] .env file is staged for commit!
) else (
    echo [OK] No .env files in staged changes
)
echo.

echo ================================
echo   Verification Complete
echo ================================
echo.
echo If all checks show [OK], you're safe to push!
echo.
echo To commit and push:
echo   git commit -m "Your message"
echo   git push origin main
echo.
pause
