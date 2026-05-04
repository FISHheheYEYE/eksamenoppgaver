# Eksamenoppgaver

Dette prosjektet er en enkel nettside med profil-side og en liten Node.js-server som lagrer data lokalt.

## Hva prosjektet gjør

- `Profil.HTML` viser en profil-side med bio og interesser
- `Server.js` kjører en Express-server på `http://localhost:3000`
- Serveren lagrer data i `profile.json`
- `GET /profile` henter lagret profil
- `POST /profile` sender og lagrer ny bio og interesser

## Hvordan sette det opp

1. Åpne terminal i prosjektmappen:
   ```powershell
   cd C:\Users\edu5288134\Documents\Utvikling\eksamenoppgaver
   ```
2. Installer avhengigheter:
   ```powershell
   npm install
   ```
3. Start serveren:
   ```powershell
   npm start
   ```
4. Åpne siden i nettleseren:
   - `http://localhost:3000/`

## Hvordan bruke profilen

- Trykk `Edit` for å vise redigeringsfeltet
- Skriv inn ny tekst i bio
- Velg interesser (maks 3)
- Trykk `Lagre` for å sende data til serveren

## Filer i prosjektet

- `Server.js` – Express-serveren med GET/POST-endepunkter
- `Profil.HTML` – profil-siden som bruker JavaScript for å hente/lagre data
- `Profil.css` – stilark for profilen
- `package.json` – prosjektmetadata og startskript
- `profile.json` – lagrer profildata lokalt (genereres når du lagrer)
- `.gitignore` – filer som ikke skal legges på GitHub
- `.env` – miljøvariabler og private innstillinger

## GitHub og private filer

Det er lurt å ikke laste opp disse filene til GitHub:

- `node_modules/`
- `profile.json`
- `.env`
- `*.log`

Bruk `.gitignore` for å utelate dem.

## Tips

- Hvis du endrer `Server.js`, må du stoppe serveren (`Ctrl+C`) og starte den på nytt med `npm start`
- Åpne siden via `http://localhost:3000/`, ikke ved å dobbeltklikke på `Profil.HTML`

## Mulige videre forbedringer

- Legge til brukerautentisering
- Sette opp ekte database i stedet for `profile.json`
- Lage en startside (`hjem.html`) som også returneres fra `/`

