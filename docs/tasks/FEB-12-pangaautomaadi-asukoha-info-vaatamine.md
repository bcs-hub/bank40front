# [FEB-12] Pangaautomaadi asukoha info vaatamine

**Staatus:** To Do
**Prioriteet:** Medium
**Reporter:** Rain
**Vanem task:** [FEB-3] Asukoha vaade

---

## Kirjeldus

Täienda vaadet `/atms` — asukoha veergu tuleb lisada klikitav link, mis avab modali konkreetse pangaautomaadi asukoha infoga.

---

## Nõuded

### 1. Asukoha nimi klikitava lingina

- `/atms` vaate asukoha veerus kuvatakse asukoha nimi lingina
- Link on nähtav **kõigile kasutajatele**, olenemata sisselogimise olekust

### 2. Modal — `LocationInfoBaseModal.vue`

- Lingi peale klõpsates avaneb eraldi komponent **`LocationInfoBaseModal.vue`**
- Modal kuvatakse keskel, taust on halliks tehtud (overlay)
- Modali sisu näitab konkreetse asukoha infot (nt asukoha nimi, automaatide arv, teenused, pilt)
- Modal suletakse kas **"Sulge"** nuppu või paremas ülanurgas olevat **"X"** nuppu vajutades

### 3. Andmete laadimine

Andmed saadakse backendist:

```
GET /api/atm/location?locationId={locationId}
```

- Query parameetrina tuleb kaasa anda `locationId`
- Proksi kaudu suunatakse `http://localhost:8080/api/atm/location?locationId=xxx`

---

## Wireframe-kirjeldus

**Tabel `/atms` vaates:**

| # | Linn | Asukoht | Teenused |
|---|------|---------|----------|
| 14 | Tallinn | [Mustamäe Prisma](#) | sularaha sisse, sularaha välja, maksed |
| 12 | Tallinn | [Sikupilli Prisma](#) | sularaha sisse, sularaha välja, maksed |
| 13 | Tallinn | [Tondi Selver](#) | sularaha sisse, sularaha välja |
| 11 | Tartu | [Jõe Prisma](#) | sularaha sisse, sularaha välja |

**Modal (näide — Sikupilli Prisma):**

```
┌──────────────────────────────┐
│ Sikupilli Prisma          [X]│
│                              │
│ Automaatide arv: 5           │
│ sularaha sisse    [pilt]     │
│ sularaha välja               │
│ maksed                       │
│                              │
│           [ Sulge ]          │
└──────────────────────────────┘
```

---

## Arendusülesanded

- [ ] `src/components/location/LocationsTable.vue` — asukoha veerus muuta tekst lingiks
- [ ] Luua uus komponent `src/components/location/LocationInfoBaseModal.vue`
- [ ] Modali avamine ja sulgemine (overlay + X-nupp + Sulge-nupp)
- [ ] API päring `GET /api/atm/location?locationId=xxx` modali avamisel
- [ ] Andmete kuvamine modalis (nimi, automaatide arv, teenused, pilt — pildiks kasuta `AtmImage.vue` komponenti)

## Seotud failid

| Fail | Kirjeldus |
|------|-----------|
| `src/views/AtmsView.vue` | Pangaautomaatide lehevaade (`/atms`) |
| `src/components/location/LocationsTable.vue` | Asukohtade tabel — siin tuleb asukoha nimi lingiks muuta |
| `src/components/location/LocationInfoBaseModal.vue` | Uus modal-komponent, mis tuleb luua (kasutab `BaseModal.vue` baasi) |
| `src/components/BaseModal.vue` | Baas modal-komponent (loodud) |
| `src/api-services/LocationService.js` | API teenus — `sendGetAtmLocation(locationId)` lisatud |
| `src/components/AtmImage.vue` | Pangaautomaadi pildikomponent — taaskasutada `LocationInfoModal.vue`-s |

## LocationService — API meetod

Asukoha info pärimiseks kasuta `sendGetAtmLocation(locationId)`:

```js
LocationService.sendGetAtmLocation(locationId)
  .then((response) => this.handleGetLocationResponse(response.data))
  .catch((error) => this.handleGetLocationError(error))
  .finally()
```

Päring: `GET /api/atm/location?locationId={locationId}`

## BaseModal.vue — baaskomponent

`src/components/BaseModal.vue` on üldkasutatav baas-modal, mida saab kasutada kõikides tulevastes modalides.

Kasutab Bootstrap 5 modal-klasse (`modal`, `modal-dialog`, `modal-content`, `modal-backdrop` jne). Custom CSS lisatakse vajadusel `src/assets/style.css` faili.

**Props:**

| Prop | Tüüp | Vaikeväärtus | Kirjeldus |
|------|------|-------------|-----------|
| `isOpen` | `Boolean` | `false` | Näitab/peidab modali |

**Emits:**

| Event | Kirjeldus |
|-------|-----------|
| `event-modal-closed` | Väljastatakse, kui kasutaja vajutab X-nuppu või "Sulge" |

**Slotid:**

| Slot | Kirjeldus |
|------|-----------|
| `title` | Modali päis |
| `body` | Modali sisu |
| `footer` | Modali jalus (vaikimisi kuvab halli "Sulge" nuppu) |

**Näide:**

```vue
<Modal :isOpen="isModalOpen" @event-modal-closed="isModalOpen = false">
  <template #title>Asukoha nimi</template>
  <template #body>Sisu siia</template>
</Modal>
```
