# [FEB-13] Pangaautomaadi asukoha info muutmine

**Staatus:** Done
**Prioriteet:** Medium
**Reporter:** Rain
**Vanem task:** [FEB-3] Asukoha vaade

---

## Kirjeldus

Täienda `/atms` ja `/location` vaateid, et admin-kasutaja saaks muuta olemasoleva pangaautomaadi asukoha infot.

---

## Nõuded

### 1. `/atms` vaade — edit-ikoon tabelis

- Lisa `LocationsTable.vue`-sse uus veerg edit-ikoonidega
- Ikoon on nähtav **ainult admin-kasutajale** (`AuthService.getLoggedInUserRoleName() === 'ADMIN'`)
- Edit-ikooniks kasuta Phosphor Icons komponenti: `<PhPencilSimpleLine :size="32" />`
- Ikooni peale klõpsates suunatakse kasutaja `/location?locationId={locationId}` vaatele

### 2. `/location` vaade — asukoha muutmine

- Vaate URL: `/location?locationId=12`
- `locationId` loetakse URL-i query parameetrist
- Kui `locationId` on olemas, on tegemist **muutmise** vaaatega (mitte lisamise)

**Andmete laadimine:**

```
GET /api/atm/location?locationId={locationId}
```

Vastuse näide:
```json
{
  "cityId": 2,
  "locationName": "Sikupilli Prisma",
  "numberOfAtms": 5,
  "imageData": "",
  "transactionTypes": [
    { "transactionTypeId": 1, "transactionTypeName": "raha sisse", "isAvailable": true },
    { "transactionTypeId": 2, "transactionTypeName": "raha välja", "isAvailable": true },
    { "transactionTypeId": 3, "transactionTypeName": "maksed", "isAvailable": false }
  ]
}
```

Saadud andmed pannakse otse `data()` objekti `location` — vorm täitub automaatselt, kuna kõik väljad on juba `location`-ga seotud.

**Salvestamine:**

```
PUT /api/atm/location?locationId={locationId}
```

Request body (sama struktuur mis GET vastus):
```json
{
  "cityId": 0,
  "locationName": "string",
  "numberOfAtms": 1,
  "imageData": "string",
  "transactionTypes": [
    { "transactionTypeId": 0, "transactionTypeName": "string", "isAvailable": true }
  ]
}
```

- Peale edukat salvestamist suunatakse kasutaja tagasi `/atms` lehele — kasuta `NavigationService.navigateToAtmsView()`
- `/atms` lehel kuvatakse success-sõnum: **"Pangaautomaadi askoha info on edukalt muudetud"**

**Tagasi nupp:**

- "Tagasi" nuppu vajutades suunatakse kasutaja tagasi `/atms` lehele (ilma salvestamiseta) — kasuta `NavigationService.navigateToAtmsView()`

---

## Wireframe-kirjeldus

**`/atms` tabel admin-vaates (uus veerg punasega):**

```
| Linn    | Asukoht          | Teenused              | [edit] |
|---------|------------------|-----------------------|--------|
| Tallinn | Mustamäe Prisma  | sularaha sisse/välja  |   ✏️   |
| Tallinn | Sikupilli Prisma | sularaha sisse/välja  |   ✏️   |
```

**`/location?locationId=12` vaade:**

```
        Muuda asukoha infot

[Tallinn ▼]   Asukoht [Sikupilli Prisma]   [pilt]
              Automaatide arv [5]

              ☑ sularaha sisse
              ☑ sularaha välja
              ☑ maksed

              [Vali pilt...]

         [Tagasi]   [Salvesta]
```

---

## Arendusülesanded

### `/atms` — `LocationsTable.vue`
- [x] Lisa tabelisse uus veerg edit-ikooniga
- [x] Ikoon nähtav ainult adminile (`AuthService.getLoggedInUserRoleName() === 'ADMIN'`)
- [x] Klõpsul navigeeri `NavigationService.navigateToLocationView(locationId)`

### `/location` — `LocationView.vue`
- [x] Loe `locationId` URL query parameetrist (`this.$route.query.locationId`)
- [x] Kui `locationId` on olemas, päri andmed `GET /api/atm/location?locationId=xxx` ja täida väljad
- [x] Muuda pealkiri "Lisa asukoht" → "Muuda asukoha infot" (kui muutmise vaade)
- [x] Lisa `Salvesta` nupp, mis saadab `PUT /api/atm/location?locationId=xxx`
- [x] Peale edukat `PUT`-i navigeeri `/atms`-i, kuva success-sõnum
- [x] "Tagasi" nupp navigeerib `/atms`-i

### `LocationService.js`
- [x] Lisa meetod `sendPutAtmLocation(locationId, location)`

---

## Seotud failid

| Fail | Kirjeldus |
|------|-----------|
| `src/views/AtmsView.vue` | Pangaautomaatide lehevaade (`/atms`) |
| `src/views/LocationView.vue` | Asukoha vaade — olemas, tuleb täiendada muutmise toega |
| `src/components/location/LocationsTable.vue` | Tabel — lisa edit-ikoon admin-kasutajale |
| `src/api-services/LocationService.js` | Lisa `sendPutAtmLocation(locationId, location)` |
| `src/auth/AuthService.js` | Admin kontrolli jaoks: `getLoggedInUserRoleName()` |
| `src/navigation/NavigationService.js` | Navigeerimiseks: `navigateToAtmsView()` |
| `src/components/location/LocationForm.vue` | Olemasolev vorm — taaskasutada muutmises |
| `src/components/AtmImage.vue` | Olemasolev pildikomponent — taaskasutada |
| `src/components/alerts/AlertSuccess.vue` | Success-sõnumi kuvamiseks `/atms`-is |
