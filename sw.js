# 🌙 Fase di Raduga — PWA Sveglia

App PWA per sogni lucidi con il metodo WBTB di Michael Raduga.  
Invia una notifica all'orario programmato → il tuo Huawei Band 8 vibra.

## Come pubblicare su GitHub Pages

### 1. Crea un repository su GitHub
- Vai su [github.com](https://github.com) e fai login
- Clicca **New repository**
- Nome: `raduga-alarm`
- Spunta **"Add a README file"**
- Clicca **Create repository**

### 2. Carica i file
- Nel repository appena creato, clicca **"uploading an existing file"**
- Trascina tutti i file (`index.html`, `manifest.json`, `sw.js`)
- Crea la cartella `icons/` e carica `icon-192.png` e `icon-512.png`
- Clicca **Commit changes**

### 3. Abilita GitHub Pages
- Vai su **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main** → cartella **/ (root)**
- Clicca **Save**

### 4. Attendi 1-2 minuti
La tua app sarà disponibile su:  
`https://tuonomeutente.github.io/raduga-alarm`

## Come installare sul telefono
1. Apri Chrome Android
2. Vai all'URL della tua app
3. Menu ⋮ → **"Aggiungi a schermata home"**
4. Concedi il permesso notifiche

## Funzionamento
- Imposta l'orario (consigliato: +5.5-6h dall'orario in cui vai a letto)
- Premi **Attiva sveglia**
- La notifica push arriva al telefono → il Band 8 vibra via Bluetooth
- Rimani immobile e lasciati trasportare nella Fase!
