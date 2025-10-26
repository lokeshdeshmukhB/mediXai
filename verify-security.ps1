# Security Verification Script
# Run this before pushing to Git

Write-Host "🔐 Running Security Checks..." -ForegroundColor Cyan
Write-Host ""

# Check 1: Verify .env is ignored
Write-Host "1️⃣ Checking if .env is properly ignored..." -ForegroundColor Yellow
$envIgnored = git check-ignore backend/.env 2>$null
if ($envIgnored -eq "backend/.env") {
    Write-Host "   ✅ .env is properly ignored" -ForegroundColor Green
} else {
    Write-Host "   ❌ WARNING: .env might not be ignored!" -ForegroundColor Red
}
Write-Host ""

# Check 2: Look for .env in tracked files
Write-Host "2️⃣ Checking for tracked .env files..." -ForegroundColor Yellow
$trackedEnv = git ls-files | Select-String "\.env$" | Where-Object { $_ -notmatch "\.env\.example" }
if ($trackedEnv) {
    Write-Host "   ❌ WARNING: Found tracked .env files:" -ForegroundColor Red
    $trackedEnv | ForEach-Object { Write-Host "      $_" -ForegroundColor Red }
} else {
    Write-Host "   ✅ No .env files are tracked" -ForegroundColor Green
}
Write-Host ""

# Check 3: Check for secrets in staged changes
Write-Host "3️⃣ Checking staged changes for potential secrets..." -ForegroundColor Yellow
$stagedChanges = git diff --cached
$hasSecrets = $false
if ($stagedChanges -match "gsk_") { $hasSecrets = $true }
if ($stagedChanges -match "mongodb.*://.*:.*@") { $hasSecrets = $true }
if ($stagedChanges -match "GROQ_API_KEY.*=.*gsk_") { $hasSecrets = $true }
if ($hasSecrets) {
    Write-Host "   ⚠️  WARNING: Potential secrets detected in staged changes!" -ForegroundColor Red
    Write-Host "   Please review your staged changes carefully." -ForegroundColor Red
} else {
    Write-Host "   ✅ No obvious secrets detected in staged changes" -ForegroundColor Green
}
Write-Host ""

# Check 4: Verify .gitignore exists and contains .env
Write-Host "4️⃣ Verifying .gitignore configuration..." -ForegroundColor Yellow
if (Test-Path "backend/.gitignore") {
    $gitignoreContent = Get-Content "backend/.gitignore"
    if ($gitignoreContent -match "\.env") {
        Write-Host "   ✅ .env is in backend/.gitignore" -ForegroundColor Green
    } else {
        Write-Host "   ❌ WARNING: .env not found in backend/.gitignore" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ WARNING: backend/.gitignore not found" -ForegroundColor Red
}
Write-Host ""

# Summary
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📋 SUMMARY" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "If all checks passed (✅), you're safe to push!" -ForegroundColor Green
Write-Host "If any checks failed (❌), fix them before pushing." -ForegroundColor Yellow
Write-Host ""
Write-Host "To commit and push safely:" -ForegroundColor Cyan
Write-Host "  git commit -m 'Your commit message'" -ForegroundColor White
Write-Host "  git push origin main" -ForegroundColor White
Write-Host ""
