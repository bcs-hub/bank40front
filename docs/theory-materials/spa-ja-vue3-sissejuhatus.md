# SPA ja Vue 3 – Sissejuhatus algajatele

## Mis on SPA?

**SPA** (Single-Page Application) on veebirakendus, mis laeb brauserisse **ainult ühe korra** — ja seejärel uuendab lehte dünaamiliselt, ilma et lehekülge uuesti laetaks.

Lihtsalt öeldes: kasutaja klikib nuppu, sisu muutub, aga brauser **ei tee uut päringut serverile** iga kord.

---

## Traditsiooniline leht vs SPA

### Traditsiooniline mitmeleheline rakendus (MPA)

```
Kasutaja klikib linki
        ↓
Brauser saadab päringu serverile
        ↓
Server saadab täiesti uue HTML-faili
        ↓
Brauser laeb kogu lehe uuesti
        ↓
Kasutaja näeb uut lehte (koos vilkumisega)
```

### SPA

```
Kasutaja klikib linki
        ↓
JavaScript uuendab ainult vajalikku osa lehest
        ↓
URL muutub (nt /tehingud → /profiil)
        ↓
Kasutaja näeb uut vaadet — KOHE, ilma vilkumiseta
```

### Analoogia — televisioon vs YouTube

- **Traditsiooniline leht** on nagu teler: iga kanali vahetamine = uus saade laeb algusest peale.
- **SPA** on nagu YouTube: sa vahetad videot, aga rakendus ise jääb samaks — laeb ainult uue video sisu.

---

## Millal kasutada SPA-t?

| Olukord | Sobib SPA? |
|---|---|
| Panga rakendus, kus on palju vaateid | ✅ Jah |
| Blogi, mida otsingumootorid leiavad | ⚠️ Keeruline (vajab SSR) |
| Lihtne kontaktivorm | ❌ Üle pingutatud |
| Dashboard, admin paneel | ✅ Jah |

---

## Mis on Vue 3?

**Vue 3** on JavaScript **raamistik** (framework), millega ehitatakse SPA-rakendusi. See aitab sul:

- Jagada lehe **komponentideks** (väikesteks korduvkasutatavateks tükkideks)
- Hoida **andmeid ja vaadet sünkroonis** automaatselt
- Hallata **navigeerimist** ühel lehel (Vue Router)
- Hallata **ühist andmeid** kogu rakenduses (Pinia)

### Analoogia — LEGO

- **HTML/CSS/JS** = lego klotsid eraldi
- **Vue** = lego komplekt, kus klotsid sobivad kokku loogilisel viisil ja on eelnevalt sorteeritud

---

## Vue 3 põhimõisted

### Komponent (Component)

Komponent on omaette tükk kasutajaliidesest — nagu üks klotsiplokk. Näiteks:

```
┌─────────────────────────────────┐
│  App.vue  (juurelement)         │
│  ┌─────────────┐ ┌───────────┐  │
│  │ Navbar.vue  │ │ Footer.vue│  │
│  └─────────────┘ └───────────┘  │
│  ┌───────────────────────────┐  │
│  │      RouterView           │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  TehingudView.vue   │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

Iga `.vue` fail on üks komponent ja sisaldab kolme osa:

```vue
<!-- MyComponent.vue -->

<template>
  <!-- HTML struktuur — mida kasutaja näeb -->
  <div>
    <h1>Tere, {{ nimi }}!</h1>
    <button @click="tervita">Kliki siia</button>
  </div>
</template>

<script setup>
// JavaScript loogika — mida komponent teeb
import { ref } from 'vue'

const nimi = ref('Maailm')

function tervita() {
  nimi.value = 'Vue!'
}
</script>

<style scoped>
/* CSS — kuidas komponent välja näeb */
h1 {
  color: blue;
}
</style>
```

---

### Reaktiivsus (Reactivity)

Vue **jälgib automaatselt** muutujaid ja uuendab ekraani, kui andmed muutuvad. Sa ei pea ise HTML-i uuesti kirjutama.

```
muutuja muutub  →  Vue märkab seda  →  ekraan uueneb automaatselt
```

```vue
<script setup>
import { ref } from 'vue'

const saldo = ref(1000) // reaktiivne muutuja

function lisaRaha() {
  saldo.value += 100 // Vue uuendab ekraani automaatselt
}
</script>

<template>
  <p>Saldo: {{ saldo }} €</p>
  <button @click="lisaRaha">+ 100 €</button>
</template>
```

- `ref()` — teeb muutuja **reaktiivseks** (Vue jälgib seda)
- `{{ saldo }}` — kuvab muutuja väärtuse HTML-is
- `@click` — kuulab klikisündmust

---

### Vue Router — lehtede vahel navigeerimine

Vue Router hoolitseb selle eest, et URL muutuks ja õige komponent kuvataks — ilma lehe uuesti laadimiseta.

```
/             →  KodulehtView.vue
/tehingud     →  TehingudView.vue
/profiil      →  ProfiilView.vue
```

```vue
<!-- Navigeerimislink (nagu <a href>, aga SPA-sõbralik) -->
<RouterLink to="/tehingud">Minu tehingud</RouterLink>

<!-- Siin kuvatakse aktiivne vaade -->
<RouterView />
```

---

### Pinia — ühine andmehoidla

Kui **mitu komponenti** vajavad samu andmeid (nt sisselogitud kasutaja andmed), siis kasutatakse **Pinia store**'i — ühist andmehoidlat.

```
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│ Navbar.vue   │    │   Pinia Store    │    │ Profiil.vue  │
│              │◄──►│  kasutaja: {     │◄──►│              │
│ "Tere, Rain" │    │    nimi: 'Rain'  │    │ "Rain Tüür"  │
└──────────────┘    │  }               │    └──────────────┘
                    └──────────────────┘
```

---

## Vue 3 rakenduse struktuur

```
src/
├── main.js          ← Rakenduse käivituspunkt
├── App.vue          ← Juurelement (kõik teised on sees)
├── router/
│   └── index.js     ← URL-ide ja vaadete seosed
├── stores/
│   └── kasutaja.js  ← Pinia andmehoidla
└── views/
    ├── KodulehtView.vue
    └── TehingudView.vue
```

### Kuidas rakendus käivitub?

```
index.html
    ↓
main.js  (loob Vue rakenduse, lisab Router ja Pinia)
    ↓
App.vue  (juurelement, kuvab navigatsiooni + RouterView)
    ↓
RouterView  (kuvab õige vaate vastavalt URL-ile)
    ↓
TehingudView.vue / KodulehtView.vue / jne
```

---

## Composition API vs Options API

Vue 3-s on kaks viisi komponentide kirjutamiseks. Meie projekt kasutab **Composition API**-t `<script setup>` süntaksiga.

| | Options API | Composition API (`setup`) |
|---|---|---|
| Struktuur | `data()`, `methods`, `computed` | kõik koos `setup` funktsioonis |
| Õppimine | Lihtsam algajale | Paindlikum, tänapäevasem |
| Vue versioon | Vue 2 ja 3 | Vue 3 (soovitatav) |

```vue
<!-- Options API (vanem stiil) -->
<script>
export default {
  data() {
    return { saldo: 1000 }
  },
  methods: {
    lisaRaha() { this.saldo += 100 }
  }
}
</script>

<!-- Composition API (uuem stiil — meie kasutame seda) -->
<script setup>
import { ref } from 'vue'
const saldo = ref(1000)
const lisaRaha = () => saldo.value += 100
</script>
```

---

## Kokkuvõte

| Mõiste | Selgitus |
|---|---|
| **SPA** | Ühe lehe rakendus — laeb korra, uuendab dünaamiliselt |
| **Vue 3** | JavaScript raamistik SPA ehitamiseks |
| **Komponent** | Omaette UI tükk (`.vue` fail) |
| **`ref()`** | Teeb muutuja reaktiivseks |
| **`<template>`** | Komponendi HTML osa |
| **`<script setup>`** | Komponendi loogika (Composition API) |
| **Vue Router** | Haldab URL-põhist navigeerimist |
| **Pinia** | Ühine andmehoidla mitme komponendi vahel |
| **Reaktiivsus** | Andmete muutumisel uueneb ekraan automaatselt |

---

## Järgmised sammud

1. **Vue komponendid** — loe lähemalt `props` ja `emit` kohta (kuidas komponendid omavahel suhtlevad)
2. **Vue Router** — õpi marsruutide defineerimist ja dünaamilisi URL-e (`/kasutaja/:id`)
3. **Pinia** — ehita oma esimene store pangakontode andmete jaoks
4. **Axios + API** — kuidas Vue komponent laeb andmeid backendist
5. **Computed ja Watch** — Vue reaktiivsuse edasijõudnud tööriistad
