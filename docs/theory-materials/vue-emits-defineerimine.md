# Vue – `emits` defineerimine komponendis

## Mis see on?

Kui child komponent saadab sündmuse parent-ile (`$emit`), saab Vue-le **ette öelda**, milliseid sündmusi see komponent välja saadab.

Seda tehakse `emits` võtmesõnaga komponendi `<script>` plokis.

---

## Miks on seda üldse vaja?

See on **vabatahtlik**, aga väga kasulik kolmel põhjusel:

### 1. Dokumentatsioon — "mida see komponent teeb?"

Kui avad võõra komponendi faili, näed kohe mis sündmusi see välja saadab — ei pea kogu template'i läbi lugema.

```js
emits: ['event-new-city-selected']
```

→ Koheselt selge: "See komponent emiteerib ühe sündmuse"

---

### 2. Kaitseb `v-on` atribuutide "läbikukkumise" eest

Vue-s on reegel: kui child komponent saab `v-on` kuulaja (nt `@click`), mida ta ise ei deklareeri, **pärandatakse see automaatselt** juurele HTML elemendile.

Kui **ei deklareeri** `emits`:
```html
<!-- Parent kasutab komponenti -->
<CitiesDropdown @event-new-city-selected="handleChange" />
```
Vue võib proovida seda `@event-new-city-selected` kuulajat `<select>` elemendile lisada — mis tekitab topelt-käivitamise probleemi.

Kui **deklareerid** `emits`:
```js
emits: ['event-new-city-selected']
```
Vue teab: "See on komponendi enda sündmus, mitte DOM sündmus" → ei pärandata automaatselt.

---

### 3. Valideerimine — "kas sündmus saadeti õigete andmetega?"

Objekti süntaksiga saad kontrollida, et emiteeritud väärtus on õiget tüüpi.

---

## Kaks süntaksit

### Massiivi süntaks — lihtne, ilma valideerimiseta

```js
emits: ['event-new-city-selected']
```

- Loend sündmuste nimedest
- Ei kontrolli, mis andmeid saadetakse
- Hea kiireks kasutamiseks

---

### Objekti süntaks — koos valideerimisega

```js
emits: {
  'event-new-city-selected': (cityId) => {
    return Number.isInteger(cityId)
  }
}
```

- Võti = sündmuse nimi
- Väärtus = funktsioon, mis saab kätte emiteeritud andmed
- Funktsioon tagastab `true` (ok) või `false` (hoiatus konsoolis)

Kui `cityId` pole täisarv, näitab Vue konsoolis **hoiatuse** — aga ei blokeeri sündmust.

---

## Meie näide: CitiesDropdown

```html
<!-- Template -->
<select @change="$emit('event-new-city-selected', Number($event.target.value))">
```

```js
// Script
emits: {
  'event-new-city-selected': (cityId) => {
    return Number.isInteger(cityId)
  }
}
```

**Mis juhtub samm-sammult:**
1. Kasutaja valib dropdown-ist linna
2. `@change` käivitub
3. `$emit('event-new-city-selected', 5)` saadetakse (nt cityId = 5)
4. Vue kontrollib: kas `5` on täisarv? → `Number.isInteger(5)` = `true` → ok
5. Parent komponent saab sündmuse kätte

---

## Null — kui valideerimist ei soovi, aga soovid deklareerida

```js
emits: {
  'event-new-city-selected': null
}
```

`null` tähendab: "See sündmus eksisteerib, aga ma ei valideeri seda."

---

## ASCII skeem

```
CitiesDropdown (child)
┌─────────────────────────────────────────┐
│  emits: {                               │
│    'event-new-city-selected': (id) =>   │
│      Number.isInteger(id)               │
│  }                                      │
│                                         │
│  Kasutaja valib → $emit('...', 5)  ───────────→  Parent komponent
└─────────────────────────────────────────┘         saab sündmuse
```

---

## Kokkuvõte

| Süntaks | Näide | Millal kasutada |
|---|---|---|
| Massiiv | `emits: ['sündmus']` | Kiire, lihtsam kood |
| Objekt ilma valideerimiseta | `emits: { 'sündmus': null }` | Dokumenteerimiseks |
| Objekt valideerimisega | `emits: { 'sündmus': (val) => typeof val === 'number' }` | Vigade varajane avastamine |

---

## Järgmised sammud

- Loe materjali **vue-parent-child-andmevoog.md** — kuidas props ja emits koos toimivad
- Uuri `defineEmits()` — sama asi Composition API (`<script setup>`) süntaksis
- Proovi lisada valideerimine ja vaata, mis hoiatus ilmub, kui saadad vale tüüpi andmeid
