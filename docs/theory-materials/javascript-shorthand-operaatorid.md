# JavaScript – Shorthand operaatorid algajatele

## Mis see on?

**Shorthand** tähendab lühikirjutust — sama asja saab kirjutada lühemalt ja loetavamalt.

Selles materjalis käsitleme kahte väga levinud shorthand'i, mida näed tihti Vue koodis:

1. **Ternary operaator** `? :`
2. **Nullish coalescing operaator** `??`

---

## 1. Ternary operaator `? :`

### Mis see on?

Ternary on **lühike if-else** — ühe reaga.

```
tingimus ? väärtus_kui_tõene : väärtus_kui_väär
```

### Päriselust analoogia

Kujutle, et küsid sõbralt: _"Kas on vihma? Siis võtan vihmavarju, muidu mitte."_

```
on_vihma ? "võtan vihmavarju" : "ei võta vihmavarju"
```

### Näide tavalise if-else-ga vs ternary-ga

```js
// Pikk versioon
let pealkiri
if (locationId) {
  pealkiri = 'Muuda asukoha infot'
} else {
  pealkiri = 'Lisa asukoht'
}

// Lühike versioon (ternary)
let pealkiri = locationId ? 'Muuda asukoha infot' : 'Lisa asukoht'
```

Mõlemad teevad täpselt sama asja.

### Vue template'is

Ternary töötab ka otse HTML-i sees `{{ }}` vahel:

```html
<h1>{{ locationId ? 'Muuda asukoha infot' : 'Lisa asukoht' }}</h1>
```

Vue kuvab pealkirja vastavalt sellele, kas `locationId` on olemas või mitte.

### Kuidas lugeda?

```
locationId ? 'Muuda asukoha infot' : 'Lisa asukoht'
    ^               ^                       ^
 tingimus      kui tõene               kui väär
```

---

## 2. Nullish coalescing operaator `??`

### Mis see on?

`??` tähendab: _"Kasuta seda väärtust — aga kui see on `null` või `undefined`, kasuta selle asemel vaikevaärtust."_

```
väärtus ?? vaikeväärtus
```

### Päriselust analoogia

Kujutle, et lähed kohvikusse ja ütled: _"Tahan kohvi — aga kui kohvi pole, siis teed."_

```
kohv ?? tee
```

### Näide

```js
// Kui $route.query.successMessage on olemas, kasuta seda
// Kui pole (null/undefined), kasuta tühja stringi ''
this.successMessage = this.$route.query.successMessage ?? ''
```

### Erinevus `||`-st

`||` käsitleb ka tühja stringi `''` ja `0` väärena — `??` mitte:

```js
'' || 'vaikimisi'    // → 'vaikimisi'  (sest '' on falsy)
'' ?? 'vaikimisi'    // → ''           (sest '' ei ole null/undefined)

0 || 42              // → 42           (sest 0 on falsy)
0 ?? 42              // → 0            (sest 0 ei ole null/undefined)
```

---

## 3. Koos kasutamine

Sageli kasutatakse neid koos, nagu siin Vue koodis:

```js
this.locationId = this.$route.query.locationId
  ? Number(this.$route.query.locationId)
  : null
```

Loe seda nii:
- **Kui** `this.$route.query.locationId` on olemas (mitte tühi/null)...
- **siis** teisenda see arvuks: `Number(...)`
- **muidu** kasuta `null`

### Miks `Number()` siin?

URL query parameetrid on alati **stringid** — nt `"12"` mitte `12`.  
`Number("12")` teisendab stringi pärisarvuks, mida saab API päringutes kasutada.

```js
typeof "12"          // → "string"
typeof Number("12")  // → "number"
```

---

## Visuaalne skeem

```
┌─────────────────────────────────────────────────────┐
│              TERNARY  a ? b : c                     │
│                                                     │
│   a on tõene?  ──── JAH ──→  tagasta b              │
│                └─── EI  ──→  tagasta c              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           NULLISH COALESCING  a ?? b                │
│                                                     │
│   a on null/undefined? ─ JAH ──→  tagasta b         │
│                         └ EI  ──→  tagasta a        │
└─────────────────────────────────────────────────────┘
```

---

## Kokkuvõte

| Operaator | Süntaks | Kasutatakse kui |
|-----------|---------|-----------------|
| Ternary | `tingimus ? a : b` | Vaja lühikest if-else't |
| Nullish coalescing | `väärtus ?? vaikimisi` | Vaja kaitset `null`/`undefined` vastu |

---

## Järgmised sammud

- Vaata, kus veel Vue koodis ternary't kasutatakse (nt `v-if` asemel inline)
- Uuri `Optional chaining` operaatorit `?.` — sageli kasutatakse koos `??`-ga
- Proovi ternary asendada `v-if` / `v-else`-ga ja võrdle, kumb on loetavam
