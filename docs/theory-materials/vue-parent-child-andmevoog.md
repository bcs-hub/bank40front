# Vue – Parent ja Child komponentide andmevoog

## Mis see on?

Vue rakenduses jagad sa koodi **komponentideks** — nagu LEGO klotse. Iga komponent teeb ühte asja hästi.

Aga komponendid peavad omavahel **suhtlema**:

- **Parent** (vanem) annab andmed alla → **child** (laps) saab need kätte
- **Child** teavitab parent'i, kui midagi juhtub → **parent** reageerib

See on Vue põhiline andmevoo muster: **props alla, sündmused üles**.

---

## Päriselust analoogia

Kujutle, et oled **restoraniomanik (parent)** ja sul on **kelner (child)**:

- Sina annad kelnerile **menüü** (prop: `cities`) ja ütled, milline linn on hetkel valitud (prop: `selectedCityId`)
- Kelner näitab seda kliendile
- Kui klient valib uue linna, **kelner teatab sulle** (emit: `event-new-city-selected`)
- Sina uuendad oma andmeid ja annad kelnerile uue info

Kelner ei muuda ise menüüd — ta ainult **kuvab** ja **teavitab**.

---

## Meie näide: AtmsView + CitiesDropdown

```
src/views/AtmsView.vue       ← parent (vanem)
src/components/CitiesDropdown.vue  ← child (laps)
```

### AtmsView (parent) — lühendatult

```vue

<template>
  <CitiesDropdown
    :cities="cities"                              <!-- prop alla: linnade nimekiri -->
  :selected-city-id="selectedCityId"            <!-- prop alla: valitud linna ID -->
  @event-new-city-selected="setSelectedCityId"  <!-- kuula child sündmust üles -->
  />
</template>

<script>
  data()
  {
    return {
      selectedCityId: 0,   // algväärtus: kõik linnad (0 = filter puudub)
      cities: [],
    }
  }
  ,
  methods: {
    getSelectedCityLocations(selectedCityId)
    {
      this.selectedCityId = selectedCityId  // parent uuendab oma andmeid
    }
  ,
    getCities()
    {
      CityService.sendGetCitiesRequest()
        .then((response) => this.handleGetCitiesResponse(response))
    }
  ,
    handleGetCitiesResponse(response)
    {
      this.cities = response.data  // linnad saabuvad serverist
    }
  ,
  }
  ,
  beforeMount()
  {
    this.getCities()  // lae linnad enne kuvamist
  }
  ,
</script>
```

### CitiesDropdown (child) — lühendatult

```vue
<template>
  <select
    :value="selectedCityId"
    @change="$emit('event-new-city-selected', $event.target.value)"
  >
    <option :value="0">-- Kõik linnad --</option>
    <option v-for="city in cities" :key="city.cityId" :value="city.cityId">
      {{ city.cityName }}
    </option>
  </select>
</template>

<script>
props: {
  cities: Object,        // saab parentilt
  selectedCityId: Number // saab parentilt
}
</script>
```

---

## Täielik andmevoo diagramm

Järgnev diagramm näitab `selectedCityId` teekonda alates lehe laadimisest kuni selleni, et kasutaja valib uue linna:

```
══════════════════════════════════════════════════════════════════
  FAAS 1: Vaade laetakse (beforeMount)
══════════════════════════════════════════════════════════════════

  AtmsView (parent)
  ┌─────────────────────────────────────┐
  │  data:                              │
  │    selectedCityId = 0    ◄── algväärtus (kõik linnad)
  │    cities = []           ◄── tühi, server pole vastanud
  │                                     │
  │  beforeMount() käivitub             │
  │    → getCities() käivitatakse       │
  │    → HTTP päring serverisse ------->│--→ [Server]
  └─────────────────────────────────────┘         │
                                                   │ vastus: [{cityId:1, cityName:"Tallinn"}, ...]
                                                   ↓
  AtmsView (parent)
  ┌─────────────────────────────────────┐
  │  handleGetCitiesResponse() käivitub │
  │    → this.cities = response.data    │
  │                                     │
  │  data (uuendatud):                  │
  │    selectedCityId = 0               │
  │    cities = [{id:1, "Tallinn"},     │
  │              {id:2, "Tartu"}, ...]  │
  └─────────────────────────────────────┘


══════════════════════════════════════════════════════════════════
  FAAS 2: Parent saadab props alla child'ile
══════════════════════════════════════════════════════════════════

  AtmsView (parent)
  ┌─────────────────────────────────────┐
  │  :cities="cities"           ────────┼──┐  props voolavad
  │  :selected-city-id="selectedCityId" ┼──┼─ ALLA child'ile
  └─────────────────────────────────────┘  │
                                           ↓
                         CitiesDropdown (child)
                         ┌──────────────────────────────┐
                         │  props:                       │
                         │    cities = [{...Tallinn},    │
                         │              {...Tartu}, ...]  │
                         │    selectedCityId = 0         │
                         │                               │
                         │  <select :value="0">          │
                         │    ✓ "-- Kõik linnad --"      │  ← valitud (value=0)
                         │      "Tallinn"                │
                         │      "Tartu"                  │
                         │  </select>                    │
                         └──────────────────────────────┘


══════════════════════════════════════════════════════════════════
  FAAS 3: Kasutaja valib "Tartu" (cityId = 2)
══════════════════════════════════════════════════════════════════

                         CitiesDropdown (child)
                         ┌──────────────────────────────┐
                         │  Kasutaja klikib "Tartu"      │
                         │                               │
                         │  @change sündmus käivitub     │
                         │    $event.target.value = "2"  │
                         │                               │
                         │  $emit(                       │
                         │    'event-new-city-selected', │
                         │    "2"                        │
                         │  )          ──────────────────┼──┐  sündmus läheb
                         └──────────────────────────────┘  │  ÜLES parent'ile
                                                           ↓
  AtmsView (parent)
  ┌─────────────────────────────────────┐
  │  @event-new-city-selected           │
  │    → setSelectedCityId("2")         │
  │    → this.selectedCityId = "2"      │  ← parent uuendab oma andmeid
  └─────────────────────────────────────┘


══════════════════════════════════════════════════════════════════
  FAAS 4: Parent saadab uuendatud prop'i uuesti alla
══════════════════════════════════════════════════════════════════

  AtmsView (parent)
  ┌─────────────────────────────────────┐
  │  :selected-city-id="2"      ────────┼──┐  uuendatud prop
  └─────────────────────────────────────┘  │  voolab alla
                                           ↓
                         CitiesDropdown (child)
                         ┌──────────────────────────────┐
                         │  props:                       │
                         │    selectedCityId = 2         │  ← uus väärtus
                         │                               │
                         │  <select :value="2">          │
                         │      "-- Kõik linnad --"      │
                         │    ✓ "Tartu"                  │  ← nüüd valitud
                         │  </select>                    │
                         └──────────────────────────────┘
```

---

## Lühike kokkuvõte voost

```
Parent                          Child
  │                               │
  │  :cities={...}  ─────────────►│  kuvab linnad
  │  :selectedCityId=0 ──────────►│  kuvab "Kõik linnad" valituna
  │                               │
  │                               │  [kasutaja valib "Tartu"]
  │                               │
  │◄── $emit('event-new-city-selected', 2) ──│
  │                               │
  │  setSelectedCityId(2)         │
  │  selectedCityId = 2           │
  │                               │
  │  :selectedCityId=2 ──────────►│  kuvab "Tartu" valituna
```

**Reegel:** Child ei muuda kunagi prop'i otse. Ta ainult **emitib** sündmuse ja ootab, et parent prop'i uuendaks.

---

## Miks nii?

| Miks mitte child muudab ise? | Miks parent muudab? |
|------------------------------|---------------------|
| Andmed oleksid kahes kohas (parent ja child) | Üks tõeallikas (parent) |
| Raske jälgida, mis muutus | Muutused on nähtavad ja jälgitavad |
| Teised komponendid ei tea muutusest | Parent saab andmeid edasi teistele |
| Vue hoiatab prop mutatsiooni eest | Vue soovitatud muster |

---

## Võtmemõistete tabel

| Mõiste | Selgitus | Näide meie koodist |
|--------|----------|-------------------|
| **prop** | Andmed, mida parent saadab child'ile | `:selected-city-id="selectedCityId"` |
| **emit** | Sündmus, mida child saadab parent'ile | `$emit('event-new-city-selected', value)` |
| **@change** | DOM sündmus, mis käivitub select muutumisel | `@change="$emit(...)"` |
| **:value** | Ühepoolne sidumine (parent → DOM) | `:value="selectedCityId"` |
| **beforeMount** | Vue elutsükli haak — käivitub enne kuvamist | `beforeMount() { this.getCities() }` |
| **data()** | Komponendi reaktiivne olek | `selectedCityId: 0` |

---

## Järgmised sammud

- **v-model** — lühem viis kahepoolseks sidumiseks (katab `:value` + `@input` automaatselt)
- **Vue elutsükkel** — `created`, `mounted`, `updated`, `unmounted` ja millal neid kasutada
- **Pinia store** — kui andmeid jagavad paljud komponendid (mitte ainult parent-child)
- **defineEmits / defineProps** — sama loogika Vue 3 Composition API süntaksiga (`<script setup>`)
