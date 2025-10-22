@echo off
echo ========================================
echo   PORTFOLIO WEBSITE - GITHUB PUSH
echo   Lander Verbiest
echo ========================================
echo.

echo Wat is je GitHub gebruikersnaam?
set /p username="Gebruikersnaam: "

echo.
echo Wat wil je de repository noemen? (standaard: portfolio-website)
set /p reponame="Repository naam (druk Enter voor standaard): "

if "%reponame%"=="" set reponame=portfolio-website

echo.
echo ========================================
echo   INSTELLINGEN
echo ========================================
echo GitHub gebruikersnaam: %username%
echo Repository naam: %reponame%
echo Repository URL: https://github.com/%username%/%reponame%.git
echo.

echo Is dit correct? (J/N)
set /p confirm="Bevestig: "

if /i not "%confirm%"=="J" (
    echo.
    echo Setup geannuleerd.
    pause
    exit
)

echo.
echo ========================================
echo   STAP 1: Remote toevoegen
echo ========================================
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/%reponame%.git
echo Remote toegevoegd!

echo.
echo ========================================
echo   STAP 2: Branch naar main hernoemen
echo ========================================
git branch -M main
echo Branch hernoemd naar 'main'!

echo.
echo ========================================
echo   STAP 3: Pushen naar GitHub
echo ========================================
echo Let op: Je wordt mogelijk gevraagd in te loggen met je GitHub account.
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   ERROR: Push mislukt!
    echo ========================================
    echo.
    echo Mogelijke oorzaken:
    echo 1. Repository bestaat nog niet op GitHub
    echo    - Ga naar https://github.com/new
    echo    - Maak een repository aan met naam: %reponame%
    echo    - Zorg dat de repository LEEG is (geen README, .gitignore, etc.)
    echo.
    echo 2. Verkeerde gebruikersnaam of repository naam
    echo    - Controleer je GitHub gebruikersnaam
    echo    - Controleer de repository naam
    echo.
    echo 3. Authenticatie probleem
    echo    - Log in met je GitHub account wanneer gevraagd
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS!
echo ========================================
echo.
echo Je portfolio website staat nu op GitHub!
echo.
echo Repository URL:
echo https://github.com/%username%/%reponame%
echo.
echo Om GitHub Pages te activeren (gratis hosting):
echo 1. Ga naar: https://github.com/%username%/%reponame%/settings/pages
echo 2. Bij "Source" selecteer "main" branch
echo 3. Klik "Save"
echo 4. Je website is live op: https://%username%.github.io/%reponame%
echo.
echo ========================================
pause
