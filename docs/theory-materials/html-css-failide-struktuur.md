# HTML ja CSS ühendamine – Kuidas failid omavahel töötavad

## Miks on HTML ja CSS eraldi failides?

Algajad küsivad tihti: miks mitte kirjutada kõik ühte faili?

Päriselu analoogia:
> Kujuta ette, et ehitad maja. **Ehitusplaan** (HTML) ja **sisekujunduse plaan** (CSS) on kaks eraldi dokumenti. Nii saab sama maja kujundust muuta ilma ehitusplaani puutumata — ja sama kujundust saab kasutada mitme maja jaoks.

```
index.html  →  "Mis on lehel"     (struktuur)
style.css   →  "Kuidas see näeb välja"  (kujundus)
```

---

## `<link>` tag — sild kahe faili vahel

```html
<link rel="stylesheet" href="src/assets/style.css">
```

See üks rida HTML-is ütleb brauserile: **"Laadi see CSS fail ja rakenda seda lehele."**

### Iga osa selgitatud

```
<link   rel="stylesheet"      href="src/assets/style.css"  >
  ↑           ↑                          ↑
link-tag   "see on CSS"         CSS-faili tee/asukoht
```

| Osa | Selgitus |
|-----|----------|
| `<link>` | Isesulguv tag — ei vaja `</link>` |
| `rel="stylesheet"` | **rel**ationship — suhe lingitud faili ja HTML-i vahel |
| `href="..."` | **H**ypertext **Ref**erence — faili asukoht |

> `<link>` tag käib alati `<head>` sektsiooni — mitte `<body>` sisse!

---

## Failitee (href) — kuidas see töötab?

`href` ütleb brauserile, kust CSS-fail leida. Tee on **suhteline** — see algab `index.html` asukohast.

### Näide — selle projekti struktuur

```
project/
├── index.html          ← brauser avab selle esimesena
└── src/
    └── assets/
        └── style.css   ← CSS fail on siin
```

```html
<link rel="stylesheet" href="src/assets/style.css">
```

Brauser loeb seda nii:
```
Alustan index.html asukohast
→ lähen kausta "src"
→ lähen kausta "assets"
→ laen faili "style.css"
```

### Erinevad tee tüübid

```html
<!-- Suhteline tee (relative) — algab praegusest asukohast -->
<link href="style.css">              <!-- sama kaust -->
<link href="css/style.css">          <!-- alamkaust -->
<link href="../style.css">           <!-- üks kaust ülespoole -->
<link href="src/assets/style.css">   <!-- mitu kausta sügavamale -->

<!-- Absoluutne tee (absolute) — algab domeeni juurest -->
<link href="/style.css">             <!-- saidi juur -->
```

---

## Kuidas brauser seda töödeleb?

```
┌─────────────────────────────────────────────────────┐
│  1. Kasutaja avab index.html                        │
│           ↓                                         │
│  2. Brauser loeb HTML-i ülevalt alla                │
│           ↓                                         │
│  3. Leiab <link rel="stylesheet" href="...">        │
│           ↓                                         │
│  4. Brauser laeb CSS-faili                          │
│           ↓                                         │
│  5. Rakendab CSS reeglid HTML elementidele          │
│           ↓                                         │
│  6. Kuvab kasutajale kujundatud lehe               │
└─────────────────────────────────────────────────────┘
```

Kui CSS-faili ei leita (vale tee), kuvatakse leht **ilma kujunduseta** — kõik on must tekst valgel taustal. Brauser ei kuva veateadet kasutajale, aga arendajatööriistades (F12) on see näha.

---

## Mitu CSS-faili

Ühel HTML-lehel võib olla **mitu** `<link>` tagi — nt üks üldine stiil ja üks lehespetsiifiline:

```html
<head>
  <link rel="stylesheet" href="src/assets/style.css">      <!-- üldine -->
  <link rel="stylesheet" href="src/assets/pangaleht.css">  <!-- lehespetsiifiline -->
</head>
```

Reeglid rakendatakse **järjekorras** — hilisem fail võib varasema reegleid üle kirjutada.

---

## Üks CSS-fail, mitu HTML-lehte

Sama CSS-faili saab kasutada mitmel lehel:

```
project/
├── index.html       ← <link href="src/assets/style.css">
├── kontakt.html     ← <link href="src/assets/style.css">
├── meist.html       ← <link href="src/assets/style.css">
└── src/
    └── assets/
        └── style.css  ← üks fail, kolm lehte kasutavad seda
```

Nii piisab ühest muudatusest CSS-failis, et kõik lehed uueneksid korraga.

---

## Täielik näide

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Minu pank</title>
    <link rel="stylesheet" href="src/assets/style.css">  <!-- ← siin -->
  </head>
  <body>
    <h1>Tere tulemast!</h1>
    <p>See tekst saab stiili CSS-failist.</p>
  </body>
</html>
```

```css
/* src/assets/style.css */

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: darkblue;
}
```

---

## Levinud viga — vale failitee

```html
<!-- VALE — fail ei ole selles kohas -->
<link href="style.css">

<!-- ÕIGE — fail on src/assets/ kaustas -->
<link href="src/assets/style.css">
```

Kuidas kontrollida? Vajuta brauseris **F12** → **Console** — seal näed, kui fail ei laaditud:

```
GET http://localhost/style.css  404 (Not Found)
```

---

## Kokkuvõte

| Mõiste | Selgitus |
|--------|----------|
| `<link>` | HTML tag, mis ühendab välise faili |
| `rel="stylesheet"` | Ütleb, et lingitud fail on CSS |
| `href="..."` | Tee CSS-failini |
| Suhteline tee | Algab HTML-faili asukohast |
| Absoluutne tee | Algab saidi juurest (`/`) |
| `<head>` | `<link>` kuulub alati siia |

---

## Järgmised sammud

1. **CSS selektorid ja omadused** — kuidas reegleid kirjutada
2. **CSS Flexbox** — elementide paigutus lehel
3. **Brauseri arendajatööriistad (F12)** — kuidas näha, milliseid CSS reegleid rakendatakse
