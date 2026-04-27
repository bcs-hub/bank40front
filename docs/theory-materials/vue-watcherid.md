# Vue – Watcherid (jälgijad)

## Mis see on?

**Watcher** on Vue mehhanism, mis **jälgib** mõne andmeväärtuse muutumist ja **käivitab koodi**, kui see muutub.

Lihtsamalt öeldes: "Kui _see_ muutub, tee _see_."

---

## Päriselust analoogia

Kujutle, et sul on **valvur ukse juures**:

- Valvur **jälgib** ust
- Kui uks **avaneb** (väärtus muutub), valvur **teeb midagi** — heliseb kell, logib sisse külalise nime vms
- Valvur ei tee midagi, kui uks suletud jääb

Watcher on täpselt sama: ta lihtsalt ootab ja reageerib muutusele.

---

## Millal kasutada watcherit?

| Olukord | Lahendus |
|--------|---------|
| Arvutad uue väärtuse teisest väärtusest | `computed` (parem valik) |
| Pead käivitama **kõrvalefekti** (API päring, DOM muutus, emit) | `watch` ✓ |
| Pead **reageerima prop'i muutusele** | `watch` ✓ |
| Lihtsalt kuvad andmeid template'is | `data` + `computed` |

---

## Süntaks

```vue
<script>
export default {
  data() {
    return {
      nimi: 'Mari'
    }
  },
  watch: {
    // jälgitav andmeväli: funktsioon mis käivitub muutumisel
    nimi(uusVäärtus, vanVäärtus) {
      console.log(`Nimi muutus: ${vanVäärtus} → ${uusVäärtus}`)
    }
  }
}
</script>
```

Watcher saab **kaks argumenti**:
- `uusVäärtus` — mis see väärtus nüüd on
- `vanVäärtus` — mis see oli enne muutumist

---

## Meie näide: ImageInput.vue

```
src/components/ImageInput.vue
```

```vue
<template>
  <div class="mb-3">
    <input
      ref="fileInput"
      class="form-control"
      type="file"
      @change="handleImage"
      accept="image/x-png,image/jpeg,image/gif"
    >
  </div>
</template>

<script>
export default {
  name: 'ImageInput',

  props: {
    resetFileInput: Boolean   // parent saadab: kas pildivalik tuleb nullida?
  },

  watch: {
    // Jälgime prop'i "resetFileInput"
    // Kui parent muudab selle true-ks, tühjendame failivälja
    resetFileInput(newValue) {
      if (newValue) {
        this.clearFileInput()
      }
    }
  },

  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0]
      this.emitBase64(selectedImage)
    },

    emitBase64(fileObject) {
      const reader = new FileReader()
      reader.onload = () => {
        this.$emit('event-new-image-selected', reader.result)
      }
      reader.readAsDataURL(fileObject)
    },

    clearFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''                      // tühjenda failiväli
        this.$emit('event-reset-image-select-complete')      // teata parentile: tehtud!
      }
    }
  }
}
</script>
```

---

## Andmevoo diagramm: ImageInput reset

```
══════════════════════════════════════════════════════════════════
  FAAS 1: Kasutaja valib pildi
══════════════════════════════════════════════════════════════════

  ParentKomponent                    ImageInput (child)
  ┌──────────────────────┐          ┌──────────────────────────┐
  │  :resetFileInput=false│─────────►│ prop: resetFileInput=false│
  │                      │          │                           │
  │                      │          │  Kasutaja klikib "Vali"   │
  │                      │          │  @change → handleImage()  │
  │                      │          │  → emitBase64()           │
  │◄─────────────────────┼──────────┤  $emit('event-new-image') │
  │  saab base64 pildi   │          └──────────────────────────┘
  └──────────────────────┘


══════════════════════════════════════════════════════════════════
  FAAS 2: Parent soovib failivälja tühjendada
══════════════════════════════════════════════════════════════════

  ParentKomponent                    ImageInput (child)
  ┌──────────────────────┐          ┌──────────────────────────┐
  │  resetFileInput = true│─────────►│ prop: resetFileInput=true │
  │                      │          │                           │
  │                      │          │ WATCHER märkab muutust!   │
  │                      │          │   resetFileInput(newValue) │
  │                      │          │   newValue = true         │
  │                      │          │   → clearFileInput()      │
  │                      │          │   → input.value = ''      │
  │◄─────────────────────┼──────────┤   $emit('event-reset-     │
  │  teab: reset tehtud  │          │    image-select-complete') │
  └──────────────────────┘          └──────────────────────────┘
```

---

## Miks watcher siin, mitte midagi muud?

Failivälja (`<input type="file">`) ei saa Vue abil otse tühjendada template'ist — see on **DOM element**, mida Vue ei kontrolli täielikult. Lahendus:

1. Parent muudab prop'i `resetFileInput` väärtust `true`-ks
2. **Watcher** märkab muutust
3. Watcher kutsub välja `clearFileInput()` meetodi
4. `clearFileInput()` läheb otse DOM elemendile (`this.$refs.fileInput.value = ''`)

Ilma watcherita peaks parent kuidagi otse child'i meetodit kutsuma — see poleks Vue parimates tavades.

---

## `watch` vs `computed` — peamine erinevus

```
computed                          watch
────────────────────              ────────────────────
Arvutab väärtuse                  Käivitab koodi (kõrvalefekt)
Tagastab midagi                   Ei tagasta midagi
Kasutad template'is               Kasutad kõrvalefektideks
Automaatne, deklaratiivne         Manuaalne, imperatiivne

Näide: täisnimi = eesnimi + perenimi    Näide: kui prop muutub → emit
```

---

## Watcher koos `immediate: true`

Tavaliselt käivitub watcher ainult siis, kui väärtus **muutub**. Kui soovid, et see käivituks ka **kohe komponendi loomisel**, lisa `immediate`:

```vue
watch: {
  resetFileInput: {
    handler(newValue) {    // "handler" on funktsiooni nimi immediate-variandis
      if (newValue) {
        this.clearFileInput()
      }
    },
    immediate: true        // käivitu kohe, ärge oota esimest muutust
  }
}
```

---

## Watcher koos `deep: true`

Kui jälgid **objekti** (mitte lihtsat väärtust), peab lisama `deep: true`, et Vue märkaks objekti **seest** tulevaid muutusi:

```vue
data() {
  return {
    kasutaja: { nimi: 'Mari', vanus: 25 }
  }
},
watch: {
  kasutaja: {
    handler(newValue) {
      console.log('Kasutaja muutus:', newValue)
    },
    deep: true   // jälgi ka kasutaja.nimi, kasutaja.vanus jne
  }
}
```

Ilma `deep: true` ei reageeriks watcher, kui muutub `kasutaja.nimi`.

---

## Võtmemõistete tabel

| Mõiste | Selgitus | Meie näide |
|--------|----------|-----------|
| `watch` | Plokk, kus defineered jälgijad | `watch: { resetFileInput(...) {} }` |
| `newValue` | Väärtuse uus olek pärast muutust | `true` (reset käivitatud) |
| `oldValue` | Väärtuse eelmine olek | `false` (reset polnud aktiivne) |
| `immediate: true` | Käivitu kohe, mitte oodata muutust | — |
| `deep: true` | Jälgi objekti sügavust | Kasulik, kui jälgid `{...}` objekti |
| `handler` | Funktsiooni nimi `immediate`/`deep` konfiguratsioonis | `handler(newValue) {}` |

---

## Järgmised sammud

- **`computed`** — õpi vahet: millal `computed`, millal `watch`
- **`$refs`** — kuidas ligi pääseda DOM elementidele (`this.$refs.fileInput`)
- **Vue elutsükkel** — `mounted`, `beforeUnmount` ja nende seos watcheritega
- **Vue 3 Composition API** — sama loogika `watch()` ja `watchEffect()` funktsioonidega `<script setup>` sees