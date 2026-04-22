# Java vs JavaScript – Meetodite struktuur ja ülesehitus

## Mis on meetod?

**Meetod** on nimega koodiplokk, mis teeb mingit konkreetset tööd. Sa kirjutad koodi ühe korra, annad sellele nime ja saad seda hiljem uuesti ja uuesti kasutada.

Päriselust analoogia: meetod on nagu **retsept**. Retseptil on nimi ("Koogi küpsetamine"), sisendid (koostisosad) ja tulemus (valmis kook). Sa ei kirjuta retsepti iga kord uuesti — kasutad sama retsepti ikka ja jälle.

```
Probleem ilma meetoditeta:         Probleem meetoditega:
┌──────────────────────────┐       ┌──────────────────────────┐
│ kood rida 1              │       │ meetod arvutaSumma()     │
│ kood rida 2              │       │                          │
│ kood rida 3              │       │ kasuta arvutaSumma()     │
│ sama kood uuesti rida 1  │       │ kasuta arvutaSumma()     │
│ sama kood uuesti rida 2  │       │ kasuta arvutaSumma()     │
│ sama kood uuesti rida 3  │       └──────────────────────────┘
└──────────────────────────┘       ← Lühike ja selge!
← Pikk ja kordav!
```

---

## Java meetodi struktuur

Java on **range tüübikontrolliga** keel — pead alati täpselt ütlema, mis tüüpi on sisendid ja väljund.

### Süntaks

```
[nähtavus] [tagastustüüp] [nimi]([parameetrid]) {
    // meetodi sisu
    return [väärtus]; // vajalik kui tagastustüüp ei ole void
}
```

### Näide – lihtne meetod

```java
public int liidaArvud(int a, int b) {
    int tulemus = a + b;
    return tulemus;
}
```

### Kõik osad lahti seletatult

```
public   int   liidaArvud  (int a, int b)  {  ...  }
  │       │        │              │
  │       │        │              └── Parameetrid: sisendid koos tüüpidega
  │       │        └─────────────── Nimi: mida meetod teeb (camelCase)
  │       └──────────────────────── Tagastustüüp: mis tüüpi väärtus tuleb välja
  └──────────────────────────────── Nähtavus: kes tohib seda meetodit kasutada
```

#### 1. Nähtavus (access modifier)
```java
public  // igaüks võib kasutada — teistest klassidest, pakettidest
private // ainult see sama klass võib kasutada
```
**Miks vaja?** Kaitseb koodi. `private` meetodid on "sisemised tööriistad" — teised klassid ei pea neid nägema.

#### 2. Tagastustüüp
```java
int     // tagastab täisarvu:    return 42;
String  // tagastab teksti:      return "Tere";
boolean // tagastab tõeväärtuse: return true;
void    // ei tagasta midagi:    (return puudub)
```
**Miks vaja?** Java peab kompileerimisel teadma, mis tüüpi väärtust oodata. Kui ütled `int`, ei saa tagastada `"Tere"`.

#### 3. Nimi
```java
liidaArvud()      // ✅ kirjeldab tegevust
arvuta()          // ✅ lühike ja selge
x()               // ❌ ei ütle midagi
teeMidagiIlusat() // ❌ liiga ebamäärane
```
**Miks vaja?** Hea nimi ütleb kohe, mida meetod teeb — ei pea koodi lugema.

#### 4. Parameetrid
```java
(int a, int b)   // kaks täisarvu sisendit
(String nimi)    // üks tekst sisendina
()               // pole ühtegi sisendit
```
**Miks vaja?** Parameetrid on meetodi "koostisosad" — annad meetodile andmed, millega ta töötab.

#### 5. Tagastamine (`return`)
```java
return tulemus;  // saadab väärtuse tagasi kutsujale
```
**Miks vaja?** Kui meetod arvutab midagi välja, peab ta tulemuse tagasi andma. Ilma `return`-ita kaoks tulemus.

### Täielik näide koos selgitustega

```java
public class Kalkulaator {

    // Meetod, mis tagastab väärtuse
    public int liidaArvud(int a, int b) {
        return a + b;  // tagastab tulemuse
    }

    // Meetod, mis ei tagasta midagi (void)
    public void tervita(String nimi) {
        System.out.println("Tere, " + nimi + "!");
        // return puudub — void meetodil pole tagastust
    }

    // private meetod — ainult see klass kasutab seda
    private boolean onPositiivne(int arv) {
        return arv > 0;
    }
}
```

---

## JavaScript meetodi struktuur

JavaScript on **paindliku tüübikontrolliga** keel — tüüpe pole vaja kirja panna, aga see tähendab, et pead ise rohkem tähelepanelik olema.

JavaScriptis on **kolm peamist viisi** meetodeid (funktsioone) kirjutada:

### Viis 1 – Function declaration (klassikaline)

```javascript
function liidaArvud(a, b) {
    return a + b
}
```

```
function  liidaArvud  (a, b)  {  ...  }
    │          │         │
    │          │         └── Parameetrid: nimed ilma tüüpideta
    │          └──────────── Nimi
    └─────────────────────── Märksõna: "see on funktsioon"
```

### Viis 2 – Function expression (muutujasse salvestatud)

```javascript
const liidaArvud = function(a, b) {
    return a + b
}
```

### Viis 3 – Arrow function (nool-funktsioon, kaasaegne)

```javascript
const liidaArvud = (a, b) => {
    return a + b
}

// Kui on ainult üks rida, saab veelgi lühemalt:
const liidaArvud = (a, b) => a + b
```

### Kõik osad lahti seletatult

#### 1. Märksõna `function` (või `const` + `=>`)
```javascript
function tervita() { ... }          // klassikaline
const tervita = () => { ... }       // nool-funktsioon
```
**Miks vaja?** JavaScript peab teadma, et see koodiplokk on funktsioon, mitte lihtsalt käsud.

#### 2. Nimi
```javascript
function arvutaSumma() { ... }   // ✅ kirjeldav
function a() { ... }             // ❌ ebainformatiivne
```
**Miks vaja?** Sama põhjus mis Javas — hea nimi = loetav kood.

#### 3. Parameetrid (ilma tüüpideta!)
```javascript
function tervita(nimi) { ... }         // üks parameeter
function liida(a, b) { ... }           // kaks parameetrit
function teeMiddagi() { ... }          // null parameetrit
```
**Erinevus Javast:** ei kirjuta `String nimi`, vaid lihtsalt `nimi`. JavaScript ei kontrolli tüüpe.

#### 4. Tagastamine (`return`)
```javascript
function liida(a, b) {
    return a + b   // tagastab tulemuse
}

function tervita(nimi) {
    console.log('Tere, ' + nimi)
    // return puudub — tagastab automaatselt undefined
}
```
**Miks vaja?** Sama mis Javas — ilma `return`-ita tulemus kaob.

### Vue komponendis meetodid

Kui kirjutad Vue komponenti (nagu selles projektis), pannakse meetodid `methods` plokki:

```javascript
export default {
    data() {
        return {
            nimi: 'Mari'
        }
    },
    methods: {
        tervita() {
            console.log('Tere, ' + this.nimi)  // this viitab komponendi andmetele
        },

        liidaArvud(a, b) {
            return a + b
        }
    }
}
```

---

## Java vs JavaScript – kõrvuti võrdlus

```
┌─────────────────────────────────────────────────────────────────┐
│                    SAMA MEETOD, KAKS KEELT                      │
├──────────────────────────┬──────────────────────────────────────┤
│          JAVA            │          JAVASCRIPT                  │
├──────────────────────────┼──────────────────────────────────────┤
│ public int liida(        │ function liida(                      │
│   int a,                 │   a,                                 │
│   int b                  │   b                                  │
│ ) {                      │ ) {                                  │
│   return a + b;          │   return a + b                       │
│ }                        │ }                                    │
└──────────────────────────┴──────────────────────────────────────┘
```

### Võrdlustabel

| Osa | Java | JavaScript |
|-----|------|------------|
| Nähtavus | `public` / `private` (kohustuslik) | puudub (kõik on "avalik") |
| Tagastustüüp | `int`, `String`, `void` jne (kohustuslik) | puudub (kirjutatakse lihtsalt `function`) |
| Parameetrite tüübid | `int a, String b` (kohustuslik) | `a, b` (tüüp puudub) |
| `return` | kohustuslik kui tüüp ei ole `void` | vabatahtlik (ilma = tagastab `undefined`) |
| Klass | meetod peab olema klassis | võib olla eraldiseisev |
| Semikoolon | kohustuslik `;` | vabatahtlik (selles projektis ei kasutata) |

---

## Levinud vead algajatel

### Java
```java
// ❌ Viga: tagastustüüp ja tegelik tagastus ei klapi
public int tervita() {
    return "Tere";  // String ei sobi int-i asemele!
}

// ✅ Õige
public String tervita() {
    return "Tere";
}
```

### JavaScript
```javascript
// ❌ Viga: unustasid return
function liida(a, b) {
    a + b  // arvutab, aga ei tagasta midagi!
}
console.log(liida(2, 3))  // undefined

// ✅ Õige
function liida(a, b) {
    return a + b
}
console.log(liida(2, 3))  // 5
```

---

## Kokkuvõte

| Mõiste | Selgitus |
|--------|----------|
| **Meetod / funktsioon** | Nimega koodiplokk, mida saab uuesti kasutada |
| **Parameeter** | Sisend, mida meetod vajab töötamiseks |
| **Tagastustüüp** | Java-s: mis tüüpi väärtus tuleb välja |
| **`return`** | Saadab väärtuse meetodist välja tagasi kutsujale |
| **`void`** | Java märksõna: meetod ei tagasta midagi |
| **`public` / `private`** | Java: kes tohib meetodit kasutada |
| **Arrow function** | JavaScripti lühike funktsioonisüntaks `() => {}` |

---

## Järgmised sammud

- **Java:** uuri klassid ja objektid — meetodid elavad klasside sees
- **JavaScript:** uuri `this` märksõna — Vue meetodites on see oluline
- **Mõlemas:** uuri, kuidas meetodid üksteist kutsuvad (meetodite aheldamine)
- **Praktika:** kirjuta ise 3–5 meetodit, mis teevad lihtsat arvutust või tekstitöötlust
