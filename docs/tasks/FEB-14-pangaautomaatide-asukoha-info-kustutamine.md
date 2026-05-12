# [FEB-14] Pangaautomaatide asukoha info kustutamine

**Staatus:** Done
**Prioriteet:** Medium
**Reporter:** Rain
**Vanem task:** [FEB-2] Pangaautomaatide vaade

---

## Kirjeldus

Täienda `/atms` vaadet — lisa admin-kasutajale kustutamise võimalus.

---

## Nõuded

### 1. Delete-ikoon tabelis — `LocationsTable.vue`

- Lisa tabelisse delete-ikoon (sama veergu edit-ikooniga, FEB-13-st)
- Ikoon on nähtav **ainult admin-kasutajale**
- Ikooni näide: `<PhX :size="16" />`
- Ikooni peale klõpsates avaneb `LocationDeleteModal.vue` — kuvatakse asukoha info

### 2. Modal — `LocationDeleteModal.vue`

- Modali footer'isse lisada kaks nuppu: **"Sulge"** ja **"Kustuta"**
- "Sulge" sulgeb modali (olemasolev käitumine)
- "Kustuta" saadab DELETE päringu ja sulgeb modali

### 3. Kustutamine

```
DELETE /api/atm/location?locationId={locationId}
```

- Peale edukat kustutamist **jäädakse `/atms` lehele**
- Kuvatakse success-sõnum: **"Pangaautomaadi askoha info on edukalt kustutatud"** (`AlertSuccess.vue`)
- Tabel uuendatakse (kustutatud rida kaob)

---

## Wireframe-kirjeldus

**`/atms` tabel admin-vaates:**

```
| Linn    | Asukoht          | Teenused             | ✏️ | ✖️ |
|---------|------------------|----------------------|----|-----|
| Tallinn | Mustamäe Prisma  | sularaha sisse/välja | ✏️ | ✖️ |
| Tallinn | Sikupilli Prisma | sularaha sisse/välja | ✏️ | ✖️ |
```

**Modal kustutamise kinnitusega:**

```
┌──────────────────────────────┐
│ Mustamäe Prisma           [X]│
│                              │
│ Automaatide arv: 3           │
│ sularaha sisse    [pilt]     │
│ sularaha välja               │
│ maksed                       │
│                              │
│     [ Sulge ]  [ Kustuta ]   │
└──────────────────────────────┘
```

---

## Arendusülesanded

### `LocationService.js`
- [x] Lisa meetod `sendDeleteAtmLocation(locationId)`

### `LocationsTable.vue`
- [x] Lisa delete-ikoon `PhX` edit-ikooniga samasse veergu
- [x] Ikoon nähtav ainult adminile (juba olemas `isAdmin` computed)
- [x] Klõpsul ava modal — `openDeleteModal(locationId)`

### `LocationDeleteModal.vue`
- [x] Lisa "Kustuta" nupp footer'isse
- [x] "Kustuta" nupp emitib evendi `event-location-deleted`

### `LocationsTable.vue` (modal sulgemisel)
- [x] Kuula `event-location-deleted` eventi
- [x] Saada `DELETE /api/atm/location?locationId=xxx`
- [x] Peale edukat vastust emiti `event-location-deleted` üles `AtmsView.vue`-sse

---

## Seotud failid

| Fail | Kirjeldus |
|------|-----------|
| `src/views/AtmsView.vue` | Success-sõnumi kuvamine (`AlertSuccess.vue`) |
| `src/components/location/LocationsTable.vue` | Lisa delete-ikoon, kuula kustutamise eventi |
| `src/components/location/LocationDeleteModal.vue` | Lisa "Kustuta" nupp footer'isse |
| `src/components/BaseModal.vue` | Baas-modal (olemasolev) |
| `src/api-services/LocationService.js` | Lisa `sendDeleteAtmLocation(locationId)` |
| `src/auth/AuthService.js` | Admin kontroll — `isAdmin` computed juba olemas |
