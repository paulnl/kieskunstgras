# Kieskunstgras.nl - Statische Website

Dit is de statische HTML versie van de Kieskunstgras.nl website, gehost op GitHub Pages.

## 🌐 Live Website

https://kieskunstgras.github.io

## 📁 Structuur

```
.
├── index.html              # Homepage
├── grassen/
│   └── index.html         # Kunstgrassen pagina
├── contact/
│   └── index.html         # Contact pagina
├── 404.html               # 404 foutpagina
├── css/
│   └── style.css         # Stylesheet
├── js/
│   └── grassen.js        # JSON loader voor grassen
├── data/
│   └── grass-types.json  # Kunstgras data
└── images/               # Alle afbeeldingen
```

## 🚀 Deployment

Deze website wordt automatisch gedeployed via GitHub Pages wanneer je pusht naar de main branch.

### GitHub Pages Instellingen

1. Ga naar repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Klik op Save

## ✏️ Kunstgras Data Bijwerken

Om de kunstgrassen bij te werken, bewerk het bestand `data/grass-types.json`.

Het JSON formaat:
```json
{
    "id": 1,
    "naam": "Product Naam",
    "prijs": 25.50,
    "actief": true,
    "aanbieding": false,
    "aanbiedingsprijs": null,
    "afbeelding": "/images/product.png",
    "specificaties": {
        "poolhoogte": "30 mm",
        "garantie": "8 jaar"
    }
}
```

## 📧 Contact Formulier

Het contact formulier wordt beheerd via Brevo. De embed code moet nog worden toegevoegd aan `contact/index.html`.

### TODO: Brevo Formulier Toevoegen

1. Ga naar [Brevo](https://www.brevo.com) dashboard
2. Navigeer naar Campaigns → Forms
3. Maak een nieuw formulier aan
4. Configureer velden: naam, email, telefoon, adres, plaats, onderwerp
5. Kies "Embed" als publicatiemethode
6. Kopieer de HTML embed code
7. Vervang de placeholder in `contact/index.html` met de Brevo code

## 🖼️ Afbeeldingen

Alle afbeeldingen staan in de `images/` map. Belangrijke afbeeldingen:

- `kieskunstgras_v1.png` - Logo
- `hero-img.png` - Hero afbeelding
- `about-1.png`, `about-2.png` - About sectie
- `8jaargarantie.png` - Garantie icoon
- `curled.png` - Gekrulde sprieten icoon
- `loodvrij.png` - Loodvrij icoon
- `bicolour.png` - BiColor icoon
- `ecofriendelijk.png` - Eco icoon
- `intensiefgebruik.png` - Gebruik icoon
- `*.png` - Product afbeeldingen

## 🔧 Lokale Testen

Om de website lokaal te testen:

```bash
# Python 3
python -m http.server 8000

# Of met Node.js npx
npx serve .

# Of met PHP
php -S localhost:8000
```

Ga dan naar `http://localhost:8000`

## 📝 Aanpassingen

- **CSS**: Bewerk `css/style.css`
- **Homepage**: Bewerk `index.html`
- **Grassen**: Bewerk `grassen/index.html` en `js/grassen.js`
- **Contact**: Bewerk `contact/index.html`

## 🔒 Security

- Geen gevoelige data in de repository
- JSON data is publiek toegankelijk
- Formulier data wordt verwerkt via Brevo (extern)

## 📄 Licentie

© 2024 Kieskunstgras.nl - Alle rechten voorbehouden
