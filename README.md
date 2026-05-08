# Eksamenoppgaver

Dette prosjektet er en enkel nettside med profil-side og en liten Node.js-server som lagrer data i MySQL.

## Hva prosjektet gjør

- `Profil.HTML` viser en profil-side med bio og interesser
- `Server.js` kjører en Express-server på `http://localhost:3000`
- Serveren bruker MySQL for å lagre data
- `GET /profile` henter lagret profil fra MySQL-databasen
- `POST /profile` sender og lagrer ny bio og interesser i MySQL-databasen

## Hvordan sette det opp

1. Installer MySQL på maskinen din hvis du ikke allerede har det.
2. Åpne terminal eller kommandolinje i prosjektmappen.
3. Pass på at du står i mappen som inneholder `package.json` og `Server.js`.
4. Kopier `.env`-filen eller oppdater de riktige verdiene:
   - `DB_HOST` (som regel `localhost`)
   - `DB_USER` (for eksempel `root`)
   - `DB_PASSWORD`
   - `DB_NAME` (for eksempel `eksamenoppgaver`)
   - `DB_PORT` (standard `3306`)
5. Installer avhengigheter:
   ```bash
   npm install
   ```
6. Start serveren:
   ```bash
   npm start
   ```
7. Åpne siden i nettleseren:
   - `http://localhost:3000/`

> Hvis `npm start` gir "Missing script: \"start\"", betyr det at du ikke er i riktig prosjektmappe eller at `package.json` mangler i mappen.
## Hvordan bruke profilen

- Trykk `Edit` for å vise redigeringsfeltet
- Skriv inn ny tekst i bio
- Velg interesser (maks 3)
- Trykk `Lagre` for å sende data til serveren

## Filer i prosjektet

- `Server.js` – Express-serveren med GET/POST-endepunkter og MySQL-lagring
- `Profil.HTML` – profil-siden som bruker JavaScript for å hente/lagre data
- `Profil.css` – stilark for profilen
- `package.json` – prosjektmetadata og startskript
- `.gitignore` – filer som ikke skal legges på GitHub
- `.env` – miljøvariabler og private innstillinger

## GitHub og private filer

Det er lurt å ikke laste opp disse filene til GitHub:

- `node_modules/`
- `database.db`
- `.env`
- `*.log`

Bruk `.gitignore` for å utelate dem

## Tips

- Hvis du endrer `Server.js`, må du stoppe serveren (`Ctrl+C`) og starte den på nytt med `npm start`
- Åpne siden via `http://localhost:3000/`, ikke ved å dobbeltklikke på `Profil.HTML`

## Mulige videre forbedringer

- Legge til brukerautentisering
- Sette opp flere tabeller eller relasjoner i databasen
- Lage en startside (`hjem.html`) som også returneres fra `/`

