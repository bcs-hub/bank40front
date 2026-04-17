# HTML – Sissejuhatus algajatele

## Mis on HTML?

**HTML** (HyperText Markup Language) on veebilehtede ehitusplokk. See ei ole programmeerimiskeel — see on **märgenduskeel**, mis kirjeldab veebilehe struktuuri ja sisu.

Lihtsalt öeldes: HTML ütleb brauserile, **mis miski on** — mis on pealkiri, mis on lõik, mis on pilt, mis on link.

```
Sina kirjutad HTML-i  →  Brauser loeb seda  →  Kasutaja näeb veebilehte
```

---

## HTML-faili struktuur

Iga HTML-fail näeb välja umbes nii:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Minu esimene leht</title>
  </head>
  <body>
    <h1>Tere, maailm!</h1>
    <p>See on minu esimene veebileht.</p>
  </body>
</html>
```

### Skeem – HTML-faili ehitus

```
┌─────────────────────────────────────┐
│  <!DOCTYPE html>                    │  ← Ütleb brauserile: "See on HTML5"
│                                     │
│  <html>                             │  ← Kogu lehe ümbris
│  │                                  │
│  ├── <head>                         │  ← "Tagala" – kasutaja ei näe seda
│  │     <title>Pealkiri</title>      │     (aga brauser kasutab seda)
│  │   </head>                        │
│  │                                  │
│  └── <body>                         │  ← Kõik, mida kasutaja näeb
│        <h1>Pealkiri</h1>            │
│        <p>Tekst</p>                 │
│      </body>                        │
│                                     │
│  </html>                            │
└─────────────────────────────────────┘
```

---

## Mis on TAG (märgend)?

**Tag** on HTML-i põhiühik. Tag kirjutatakse nurksulgudesse `< >`.

Enamikul tagidel on **avamistag** ja **sulgemistag**:

```
<p>See on lõik.</p>
↑              ↑
avamistag    sulgemistag (kaldkriips ees)
```

### Skeem – tagi anatoomia

```
     ┌── tagi nimi
     │
  <  p  >   See on tekst.   <  /  p  >
  ↑          ↑               ↑
avav         sisu            sulgev
nurksulg                     nurksulg
```

Mõned tagid on **isesulguvad** — neil ei ole eraldi sulgemistagi:

```html
<img src="pilt.jpg" />   <!-- Pilt -->
<br />                   <!-- Reavahetuse -->
<hr />                   <!-- Horisontaaljoon -->
```

---

## Atribuudid

Tagidel võivad olla **atribuudid** — lisakirjeldused, mis annavad tagile täiendavat infot.

```html
<a href="https://google.com">Mine Google'isse</a>
    ↑
  atribuut (href = hyperlink reference)
```

```
<img  src="koer.jpg"  alt="Pruun koer"  width="300" />
       ↑               ↑                 ↑
    pildi asukoht   alternatiivtekst   laius pikslites
```

**Atribuudi ülesehitus:**

```
atribuudiNimi="väärtus"
```

---

## Kõige levinumad tagid

### Pealkirjad (`h1` – `h6`)

```html
<h1>Kõige suurem pealkiri</h1>
<h2>Alapealkiri</h2>
<h3>Ala-alapealkiri</h3>
<h4>Veel väiksem</h4>
<h5>Väga väike</h5>
<h6>Kõige väiksem pealkiri</h6>
```

Visuaalselt:

```
# Kõige suurem pealkiri      ← h1
## Alapealkiri               ← h2
### Ala-alapealkiri          ← h3
```

> Leheküljel peaks olema ainult **üks `<h1>`** — see on lehe peamine pealkiri.

---

### Lõigud ja tekst

```html
<p>See on tekstilõik. Brauser lisab automaatselt tühiku enne ja pärast.</p>

<strong>See tekst on paks (oluline).</strong>
<em>See tekst on kaldkirjas (rõhutatud).</em>
<br />  <!-- Reavahetuse ilma uue lõiguta -->
```

---

### Lingid

```html
<a href="https://google.com">Mine Google'isse</a>
<a href="kontakt.html">Kontakt</a>           <!-- Link samale saidile -->
<a href="#sektsioon">Hüppa alla</a>          <!-- Link lehel olevale ankorile -->
```

---

### Pildid

```html
<img src="pilt.jpg" alt="Kirjeldus pildist" />
```

- `src` — pildi asukoht (fail või veebiaadress)
- `alt` — tekst, mis kuvatakse kui pilt ei laadi (ka ekraanilugejatele)

---

### Nimekirjad

**Järjestamata nimekiri (täpid):**

```html
<ul>
  <li>Õun</li>
  <li>Banaan</li>
  <li>Maasikas</li>
</ul>
```

Tulemus:
- Õun
- Banaan
- Maasikas

**Järjestatud nimekiri (numbrid):**

```html
<ol>
  <li>Ava brauser</li>
  <li>Kirjuta aadress</li>
  <li>Vajuta Enter</li>
</ol>
```

Tulemus:
1. Ava brauser
2. Kirjuta aadress
3. Vajuta Enter

---

### Div ja Span – grupeerimiseks

```html
<div>
  <!-- div on plokk-element — hõivab terve rea -->
  <p>Tekst siia</p>
</div>

<p>See on <span style="color: red;">punane sõna</span> lauses.</p>
<!-- span on reasisene element — mõjutab ainult osa tekstist -->
```

---

## HTML-i puu (DOM)

Brauser loob HTML-ist **puu struktuuri** — seda kutsutakse **DOM**-iks (Document Object Model).

```
html
├── head
│   ├── meta
│   └── title
└── body
    ├── h1
    ├── p
    ├── ul
    │   ├── li
    │   ├── li
    │   └── li
    └── img
```

Elemendid on **pesastatud** (nested) — üks element on teise sees. Välimist kutsutakse **vanemaks** (parent), sisemist **lapseks** (child).

---

## Vanem, laps ja õde-vend (Parent, Child, Sibling)

See on üks olulisemaid mõisteid HTML-is. Kui elemendid on üksteise sees, tekib nende vahel **sugulusseos** — täpselt nagu perekonnapuus.

### Mõisted

| Mõiste | Inglise keeles | Tähendus |
|--------|---------------|----------|
| **Vanem** | Parent | Element, mille **sees** teine element asub |
| **Laps** | Child | Element, mis asub **teise sees** |
| **Õde-vend** | Sibling | Elemendid, kes on **sama vanema** lapsed |
| **Esivanem** | Ancestor | Ükskõik milline element kõrgemal tasemel |
| **Järeltulija** | Descendant | Ükskõik milline element madalamal tasemel |

---

### Näide koodiga

```html
<ul>
  <li>Õun</li>
  <li>Banaan</li>
  <li>Maasikas</li>
</ul>
```

```
        <ul>              ← VANEM (parent) kõikidele li-elementidele
        /  |  \
      /    |    \
   <li>  <li>  <li>       ← LAPSED (children) — kõik kolm on ul lapsed
   Õun  Banaan Maasikas     ja omavahel ÕED-VENNAD (siblings)
```

- `<ul>` on **vanem** — ta ümbritseb kõiki `<li>` elemente
- Iga `<li>` on `<ul>` **laps** — ta asub `<ul>` sees
- `<li>Õun</li>` ja `<li>Banaan</li>` on **õed-vennad** — neil on sama vanem

---

### Mitme taseme näide

```html
<div>
  <p>See on lõik, kus on <strong>oluline sõna</strong> sees.</p>
</div>
```

```
<div>                    ← VANEM
  └── <p>                ← LAPS (div-i laps) ja VANEM (strong-i vanem)
        └── <strong>     ← LAPS (p lapse) ja JÄRELTULIJA (div-i järeltulija)
```

- `<div>` on `<p>` **vanem**
- `<p>` on `<div>` **laps**
- `<strong>` on `<p>` **laps**, aga `<div>` **järeltulija**
- `<div>` on `<strong>` **esivanem**

---

### Miks see oluline on?

1. **CSS-is** saad valida elemente nende suhte järgi:
   ```css
   ul li { color: green; }   /* Kõik li-d, mis on ul sees */
   ```

2. **JavaScriptis** saad liikuda mööda puud:
   ```js
   element.parentElement    // Vanem
   element.children         // Lapsed
   element.nextSibling      // Järgmine õde-vend
   ```

3. **HTML-i lugemisel** aitab see mõista, millised elemendid kuhu kuuluvad ja miks taane (indentation) on oluline — taane näitab visuaalselt parent-child suhet:

```html
<body>               ← vanem
  <div>              ←   laps (body laps), vanem (p-le)
    <p>Tekst</p>     ←     laps (div laps)
  </div>
</body>
```

> **Rusikareegel:** element, mis on **rohkem paremale nihutatud** (sügavam taane), on **laps** sellest, mis on tema kohal vähem nihutatud.

---

## Näide – lihtne veebileht kokku

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Minu hobid</title>
  </head>
  <body>

    <h1>Minu hobid</h1>

    <p>Tere! Minu nimi on <strong>Mari</strong> ja siin on minu lemmiktegevused.</p>

    <h2>Sportimine</h2>
    <ul>
      <li>Jooksmine</li>
      <li>Ujumine</li>
      <li>Jalgrattasõit</li>
    </ul>

    <h2>Lemmikfilm</h2>
    <p>Mulle meeldib film <em>Interstellar</em>.</p>
    <img src="interstellar.jpg" alt="Interstellari filmiplakat" />

    <h2>Kasulik link</h2>
    <a href="https://developer.mozilla.org">MDN veebidokumentatsioon</a>

  </body>
</html>
```

---

## Kokkuvõte

| Mõiste | Selgitus |
|--------|----------|
| **HTML** | Märgenduskeel, mis kirjeldab veebilehe struktuuri |
| **Tag** | HTML-i põhiühik, kirjutatakse `<nurksulgudesse>` |
| **Atribuut** | Lisainfo tagile, nt `href="..."` või `src="..."` |
| **`<head>`** | Lehe metainfo (pealkiri, lingid, skriptid) |
| **`<body>`** | Kõik nähtav sisu |
| **DOM** | Puu-struktuur, mille brauser HTML-ist loob |

---

## Järgmised sammud

Kui HTML on selge, siis edasi tasub õppida:

1. **CSS** — kuidas leht välja näeb (värvid, fondid, paigutus)
2. **JavaScript** — kuidas leht käitub (nupud, animatsioonid, loogika)
