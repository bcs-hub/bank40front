# Vue – Miks `data` on funktsioon, mitte objekt?

## Sissejuhatus

Vue komponentides näeb sageli sellist koodi:

```js
export default {
  data() {
    return {
      nimi: 'Mari',
      vanus: 25,
    }
  },
}
```

Algaja võib küsida: **miks `data` on funktsioon, mis tagastab objekti?**  
Miks mitte lihtsalt nii?

```js
// ❌ See töötab ainult juurkomponendis — mujal on see ohtlik!
export default {
  data: {
    nimi: 'Mari',
    vanus: 25,
  },
}
```

---

## Analoogia – vormi koopia vs. originaal

Kujuta ette, et sul on **blankett** (nt arsti ankeet).

- Kui kõik patsiendid täidavad **sama paberit**, siis ühe inimese andmed **kirjutatakse teiste peale**.
- Aga kui igaüks saab **oma koopia**, siis kõik on eraldi ja sõltumatud.

Vue komponendid toimivad täpselt nii:

```
Komponent = Blankett (mall)

Iga kord, kui Vue loob selle komponendi eksemplari (instance),
peab igaüks saama OMA andmete koopia — mitte jagama üht objekti.
```

---

## Probleem lihtsa objektiga

Kui `data` oleks tavaline objekt (mitte funktsioon), siis kõik sama komponendi eksemplarid **jagaksid sama mäluviita**.

```
Komponent A ──┐
              ├──→ { loendur: 0 }   ← SAMA objekt mälus!
Komponent B ──┘

Komponent A muudab loenduri → 1
Komponent B näeb ka: loendur = 1  ❌ Vale!
```

### Koodinäide — probleem

```js
// ❌ Ohtlik — kõik eksemplarid jagavad SAMA objekti
const jagitudAndmed = { loendur: 0 }

export default {
  data: jagitudAndmed,
}
```

```
KomponentA.loendur++   // → 1
KomponentB.loendur     // → 1  ← Ootamatu! Peaks olema 0.
```

---

## Lahendus — funktsioon tagastab uue objekti

Kui `data` on **funktsioon**, siis iga kord, kui Vue loob uue komponendi eksemplari, **kutsub ta funktsiooni välja** — ja funktsioon **loob täiesti uue, eraldi objekti**.

```js
// ✅ Õige — iga eksemplar saab OMA koopia
export default {
  data() {
    return {
      loendur: 0,
    }
  },
}
```

```
Vue loob Komponendi A → kutsub data() → tagastab { loendur: 0 }  ← uus objekt
Vue loob Komponendi B → kutsub data() → tagastab { loendur: 0 }  ← teine uus objekt

KomponentA.loendur++   // → 1
KomponentB.loendur     // → 0  ✅ Õige!
```

### Skeem — miks funktsioon töötab

```
                  ┌─────────────────────┐
                  │   data() {          │
                  │     return { ... }  │  ← Mall / retsept
                  │   }                 │
                  └──────────┬──────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        { loendur: 0 }  { loendur: 0 }  { loendur: 0 }
        Eksemplar A      Eksemplar B      Eksemplar C
        (oma mäluplokk)  (oma mäluplokk)  (oma mäluplokk)
```

Iga kord kutsutakse `data()` → luuakse **uus objekt** → igal eksemplaril on **oma andmed**.

---

## Miks juurkomponendis võib olla objekt?

Rakenduses on tavaliselt ainult **üks** juurkomponent (`App.vue` eksemplar). Kuna teda ei kasutata korduvalt, ei ole jagamise probleemi. Sellegipoolest on **hea tava** kasutada alati funktsiooni, et harjuda õige mustriga.

---

## Lühivorm — `data()` vs. `data: function()`

Need kaks on täpselt samaväärsed:

```js
// Lühivorm (kaasaegne JavaScript)
data() {
  return { loendur: 0 }
}

// Pikk vorm (vanem stiil, sama tulemus)
data: function() {
  return { loendur: 0 }
}
```

---

## Kokkuvõte

| Küsimus | Vastus |
|---|---|
| Mis on `data` Vue komponendis? | Funktsioon, mis tagastab objekti |
| Miks funktsioon, mitte objekt? | Et iga eksemplar saaks **oma andmete koopia** |
| Mis juhtuks objektiga? | Kõik eksemplarid **jagaksid sama andmeid** (viga!) |
| Kas juurkomponendis on erand? | Jah, aga hea tava on ikka funktsioon kasutada |
| Kas `data()` ja `data: function()` on erinevad? | Ei — need on täpselt samaväärsed |

---

## Järgmised sammud

- **`computed`** — andmetest tuletatud väärtused (automaatselt uuenev)
- **`methods`** — funktsioonid, mida saab mallist kutsuda
- **`watch`** — andmete muutuste jälgimine
- **Vue 3 Composition API `ref()` ja `reactive()`** — uuem viis andmehalduseks

> Seotud materjalid: `spa-ja-vue3-sissejuhatus.md`