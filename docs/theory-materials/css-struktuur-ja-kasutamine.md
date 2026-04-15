# CSS – Struktuur ja kasutamine algajatele

## Mis on CSS?

**CSS** (Cascading Style Sheets) on keel, millega sa ütled brauserile, **kuidas** asjad välja näevad.

Kui HTML on maja **struktuur** (seinad, aknad, uksed), siis CSS on **sisekujundus** (värvid, mööbel, valgustus).

```
HTML  →  Mis miski ON         (pealkiri, lõik, nupp)
CSS   →  Kuidas miski NÄEB välja  (punane, suur, keskel)
```

Päriselu analoogia: kujuta ette, et HTML on toores betoonmaja ja CSS on see, mis maja ilusaks teeb — värvib seinad, paneb kardinad ette, valib põrandakatted.

---

## Kuidas CSS HTML-iga ühendada?

On kolm viisi. **Parim viis** on eraldi fail.

### 1. Eraldi CSS-fail (soovitatav)

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="stiilid.css" />
</head>
```

```css
/* stiilid.css */
h1 {
  color: blue;
}
```

### 2. `<style>` tagi sees HTML-failis

```html
<head>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
```

### 3. Otse elemendil (inline) — väldi seda!

```html
<h1 style="color: blue;">Pealkiri</h1>
```

> Inline stiili kasutamine muudab koodi raskesti hooldatavaks. Kasuta seda ainult erandjuhtudel.

---

## CSS-i ülesehitus (süntaks)

```
selector {
  omadus: väärtus;
}
```

**Selgitus:**

```
h1 {
↑
Selector — KELLELE reegel kehtib? (h1 tagidele)

  color: blue;
  ↑      ↑
  omadus väärtus — MIS muutub ja KUIDAS?

}
```

### Näide

```css
p {
  color: red;        /* teksti värv */
  font-size: 18px;   /* teksti suurus */
  font-weight: bold; /* paks kiri */
}
```

---

## Selectorid — kellele reegel kehtib?

Selector ütleb, milliseid elemente CSS reegel mõjutab.

### Skeem — selectori tüübid

```
┌─────────────────────────────────────────────────────┐
│  SELECTOR TÜÜBID                                    │
│                                                     │
│  h1          → TAG selector  (kõik h1 elemendid)   │
│  .kaart      → CLASS selector (class="kaart")      │
│  #pealkiri   → ID selector   (id="pealkiri")       │
│  *           → kõik elemendid                      │
└─────────────────────────────────────────────────────┘
```

### Tag selector — vali elemendi tüübi järgi

```css
h1 {
  color: darkblue;
}

p {
  font-size: 16px;
}
```

Mõjutab **kõiki** `<h1>` ja `<p>` elemente lehel.

---

### Class selector — vali `.klassinime` järgi

Class on nagu **silt**, mille sa elemendile kleebid. Sama sildiga elemente võib olla mitu.

```html
<p class="tähtis">See tekst on oluline.</p>
<p class="tähtis">See on samuti oluline.</p>
<p>See on tavaline lõik.</p>
```

```css
.tähtis {
  color: red;
  font-weight: bold;
}
```

Tulemus: ainult kaks esimest lõiku saavad punase ja paksu kirja.

> Class-i nimi CSS-is algab **punktiga** (`.tähtis`), aga HTML-is mitte (`class="tähtis"`).

---

### ID selector — vali `#id` järgi

ID on unikaalne — igal elemendil peaks olema **erinev** ID.

```html
<h1 id="lehe-pealkiri">Tere tulemast!</h1>
```

```css
#lehe-pealkiri {
  font-size: 48px;
  text-align: center;
}
```

> Kasuta ID-sid harva. Class-id on paindlikumad.

---

### Class vs ID — millal kumb?

| | Class | ID |
|--|-------|-----|
| Sümbol | `.` | `#` |
| Kasutuskordade arv lehel | Mitu | Üks ainuke |
| Kasutusala | Stiilimine | Ankurlingid, JavaScript |
| Näide | `.nupp`, `.kaart` | `#navigatsioon`, `#footer` |

---

## Päriselu analoogia — sildid ja nimed

Kujuta ette, et lähed poodi:

- **Tag selector** on nagu öelda "kõik riiulid" — mõjutab kõiki samu asju
- **Class** on nagu silt "müügil" — kleebid sama sildi mitmele tootele
- **ID** on nagu unikaalne seerianumber — igal tootel on oma

---

## Levinumad CSS omadused

### Tekst ja font

```css
p {
  color: #333333;          /* teksti värv (HEX kood) */
  font-size: 16px;         /* suurus pikslites */
  font-family: Arial, sans-serif; /* font */
  font-weight: bold;       /* paksus: normal / bold */
  text-align: center;      /* joondus: left / center / right */
  text-decoration: none;   /* allajoonitus: none / underline */
  line-height: 1.5;        /* reavahe */
}
```

### Taustavärv ja raam

```css
div {
  background-color: lightblue;  /* taustavärv */
  border: 2px solid black;      /* raam: paksus, tüüp, värv */
  border-radius: 8px;           /* ümardatud nurgad */
}
```

### Suurus ja vahed

```css
div {
  width: 300px;      /* laius */
  height: 200px;     /* kõrgus */
  padding: 16px;     /* sisemine vaba ruum */
  margin: 24px;      /* välimine vaba ruum */
}
```

---

## Padding vs Margin — mis vahe on?

See on üks kõige olulisem CSS mõiste algajatele!

```
┌──────────────────────────────────────────────┐
│                  MARGIN                      │
│   ┌──────────────────────────────────────┐   │
│   │             BORDER (raam)            │   │
│   │   ┌──────────────────────────────┐   │   │
│   │   │           PADDING            │   │   │
│   │   │   ┌──────────────────────┐   │   │   │
│   │   │   │       SISU           │   │   │   │
│   │   │   │    (tekst, pilt)     │   │   │   │
│   │   │   └──────────────────────┘   │   │   │
│   │   └──────────────────────────────┘   │   │
│   └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

- **Padding** — ruum **elemendi sees** (sisu ja raami vahel)
- **Margin** — ruum **elemendi väljas** (kahe elemendi vahel)

Päriselu analoogia:
> Kujuta ette fotoraami. **Padding** on see valge ruum foto ja raami vahel. **Margin** on see ruum kahe eraldi raami vahel seinal.

```css
.kaart {
  padding: 16px;   /* tekst ei ole vastu äärt */
  margin: 24px;    /* kaardid ei ole üksteise vastas */
}
```

---

## Värvid CSS-is

```css
/* Värvid nime järgi */
color: red;
color: blue;
color: green;

/* HEX kood (6 märki) */
color: #ff0000;   /* punane */
color: #ffffff;   /* valge */
color: #000000;   /* must */

/* RGB (punane, roheline, sinine — 0 kuni 255) */
color: rgb(255, 0, 0);    /* punane */
color: rgb(0, 0, 255);    /* sinine */

/* RGBA (+ läbipaistvus 0.0 kuni 1.0) */
color: rgba(0, 0, 0, 0.5);  /* pool läbipaistev must */
```

---

## Kaskaad — miks CSS-i kutsutakse "kaskaadiks"?

"Cascading" tähendab, et reeglid voolavad alla nagu juga. Kui mitu reeglit kehtivad samale elemendile, võidab **spetsiifilisem** reegel.

```css
p {
  color: black;   /* kõik lõigud on mustad */
}

.eriline {
  color: red;     /* .eriline klass on spetsiifilisem → võidab */
}
```

```html
<p>Must tekst</p>
<p class="eriline">Punane tekst</p>
```

---

## Pärimine (Inheritance)

Paljud CSS omadused **pärivad** oma väärtuse vanemalt. See tähendab, et sa ei pea iga elemendi jaoks eraldi stiili kirjutama.

```css
body {
  font-family: Arial, sans-serif;
  color: #333;
}
```

Kõik elemendid `<body>` sees (pealkirjad, lõigud jne) kasutavad automaatselt seda fonti ja värvi — sa ei pea seda igale elemendile eraldi lisama.

---

## Täielik näide

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Minu leht</title>
    <link rel="stylesheet" href="stiilid.css" />
  </head>
  <body>
    <h1 id="pealkiri">Minu esimene CSS leht</h1>
    <p>See on tavaline lõik.</p>
    <p class="esiletõstetud">See lõik on esiletõstetud.</p>
    <div class="kaart">
      <p>See on kaardil olev tekst.</p>
    </div>
  </body>
</html>
```

```css
/* stiilid.css */

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#pealkiri {
  text-align: center;
  color: darkblue;
}

p {
  font-size: 16px;
  line-height: 1.6;
}

.esiletõstetud {
  color: red;
  font-weight: bold;
}

.kaart {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}
```

---

## Kokkuvõte

| Mõiste | Selgitus |
|--------|----------|
| **CSS** | Keel, mis kirjeldab, kuidas HTML elemendid välja näevad |
| **Selector** | Ütleb, millisele elemendile reegel kehtib |
| **Tag selector** | `h1 { }` — vali elemendi tüübi järgi |
| **Class selector** | `.nimi { }` — vali klassi järgi (mitu elementi) |
| **ID selector** | `#nimi { }` — vali ID järgi (üks element) |
| **Omadus** | Mis muutub (nt `color`, `font-size`) |
| **Väärtus** | Kuidas muutub (nt `red`, `16px`) |
| **Padding** | Sisemine vahe (sisu ja raami vahel) |
| **Margin** | Välimine vahe (elementide vahel) |
| **Kaskaad** | Spetsiifilisem reegel võidab üldisema üle |
| **Pärimine** | Laps pärib vanema stiiliomadused |

---

## Järgmised sammud

Nüüd, kus HTML ja CSS põhitõed on selged, võid edasi minna:

1. **CSS Flexbox** — elementide paigutus reas ja veerus
2. **CSS Grid** — keerulisem ruudustikupõhine paigutus
3. **Responsive design** — leht näeb hea välja nii arvutis kui telefonis
4. **JavaScript** — kuidas leht käitub (nupud, animatsioonid, loogika)
