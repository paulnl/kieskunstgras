document.addEventListener('DOMContentLoaded', function() {
    loadGrassTypes();
});

async function loadGrassTypes() {
    const container = document.getElementById('grass-grid');
    
    if (!container) {
        console.error('Grass grid container not found');
        return;
    }
    
    container.innerHTML = '<div class="loading">Kunstgrassen laden...</div>';
    
    // Probeer meerdere paden voor verschillende hosting scenario's
    const possiblePaths = [
        '../data/grass-types.json',     // Lokale ontwikkeling
        './data/grass-types.json',       // Alternatief
        'data/grass-types.json',         // Vanaf root
        '/data/grass-types.json'         // Absolute pad
    ];
    
    let grassTypes = null;
    let lastError = null;
    
    for (const path of possiblePaths) {
        try {
            console.log('Proberen pad:', path);
            const response = await fetch(path);
            
            if (response.ok) {
                grassTypes = await response.json();
                console.log('JSON succesvol geladen van:', path);
                break;
            }
        } catch (error) {
            lastError = error;
            console.log('Pad mislukt:', path, error.message);
        }
    }
    
    // Als alle paden falen, probeer inline data (fallback)
    if (!grassTypes) {
        console.log('Alle paden mislukt, gebruik inline data');
        grassTypes = getInlineGrassData();
    }
    
    if (!grassTypes || grassTypes.length === 0) {
        container.innerHTML = '<div class="error-message">Geen kunstgrassen gevonden.</div>';
        return;
    }
    
    // Filter alleen actieve grassen
    const activeGrass = grassTypes.filter(grass => grass.actief);
    
    if (activeGrass.length === 0) {
        container.innerHTML = '<div class="error-message">Geen actieve kunstgrassen gevonden.</div>';
        return;
    }
    
    // Genereer HTML
    const html = activeGrass.map(grass => createGrassCard(grass)).join('');
    container.innerHTML = html;
}

function createGrassCard(grass) {
    const aanbiedingBadge = grass.aanbieding && grass.aanbiedingsprijs 
        ? '<div class="aanbieding-badge"><img src="../images/aanbieding.png" alt="Aanbieding"></div>' 
        : '';
    
    const price = grass.aanbieding && grass.aanbiedingsprijs 
        ? `<div class="grass-price"><span class="old-price">€${formatPrice(grass.prijs)}</span><span class="new-price">€${formatPrice(grass.aanbiedingsprijs)}</span> <span>/ m²</span></div>`
        : `<div class="grass-price">€${formatPrice(grass.prijs)} <span>/ m²</span></div>`;
    
    const specs = Object.entries(grass.specificaties).map(([key, value]) => {
        const label = formatLabel(key);
        return `<tr><td>${label}</td><td>${value}</td></tr>`;
    }).join('');
    
    // Fix afbeelding pad - verwijder leading slash als die er is
    const imagePath = grass.afbeelding.replace(/^\//, '');
    
    return `
        <div class="grass-card">
            <div class="grass-card-inner">
                <div class="grass-card-image">
                    ${aanbiedingBadge}
                    <img src="../${imagePath}" alt="${escapeHtml(grass.naam)}" onerror="this.src='../images/hero-img.png'">
                </div>
                <div class="grass-card-content">
                    <div class="grass-card-header">
                        <h2>${escapeHtml(grass.naam)}</h2>
                    </div>
                    <div class="grass-card-body">
                        ${price}
                        <div class="grass-specs">
                            <table>
                                <tbody>
                                    ${specs}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

function formatLabel(key) {
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inline data fallback voor als JSON niet geladen kan worden
function getInlineGrassData() {
    return [
        {
            "id": 1,
            "naam": "Havanna 30",
            "prijs": 25.50,
            "actief": true,
            "aanbieding": true,
            "aanbiedingsprijs": 21.50,
            "afbeelding": "images/havana30.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "7.600",
                "vorm": "Platte / wafel vorm",
                "productie_methode": "Getuft - 3/8\"",
                "poolhoogte": "30 mm",
                "totale_hoogte": "32 mm",
                "steken": "15.750 /m2",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 2,
            "naam": "Evergreen 30",
            "prijs": 31.00,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/evergreen30.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "16.400",
                "vorm": "Rechthoek",
                "productie_methode": "Getuft - 3/8\"",
                "poolhoogte": "30 mm",
                "totale_hoogte": "32 mm",
                "steken": "10 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 3,
            "naam": "Evergreen 40",
            "prijs": 33.50,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/evergreen40.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "16.400",
                "vorm": "Rechthoek",
                "productie_methode": "Getuft - 3/8\"",
                "poolhoogte": "40 mm",
                "totale_hoogte": "22 mm",
                "steken": "10 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 4,
            "naam": "Evergreen 50",
            "prijs": 38.50,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/evergreen50.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "16.400",
                "vorm": "Rechthoek",
                "productie_methode": "Getuft - 3/8\"",
                "poolhoogte": "50 mm",
                "totale_hoogte": "52 mm",
                "steken": "10 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 5,
            "naam": "Montana 40",
            "prijs": 32.50,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/montana40.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "20.300",
                "vorm": "C-vorm, wafel",
                "productie_methode": "Getuft - 5/8\"",
                "poolhoogte": "40 mm",
                "totale_hoogte": "42 mm",
                "steken": "16 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 6,
            "naam": "Montana 50",
            "prijs": 34.95,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/montana50.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "20.300",
                "vorm": "C-vorm, wafel",
                "productie_methode": "Getuft - 5/8\"",
                "poolhoogte": "50 mm",
                "totale_hoogte": "52 mm",
                "steken": "16 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 7,
            "naam": "Royal 35 - Eco",
            "prijs": 35.00,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/Royal45eco.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "20.300",
                "vorm": "C-vorm, wafel",
                "productie_methode": "Getuft - 3/8\"",
                "poolhoogte": "35 mm",
                "totale_hoogte": "37 mm",
                "steken": "11.5 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        },
        {
            "id": 8,
            "naam": "NaturalSupreme 40",
            "prijs": 35.50,
            "actief": true,
            "aanbieding": false,
            "aanbiedingsprijs": null,
            "afbeelding": "images/supreme40.png",
            "specificaties": {
                "poolmateriaal": "100% PE monofilament met PP wortelzone",
                "dtex": "12.100",
                "vorm": "C-vorm, wafel",
                "productie_methode": "Getuft - 3/8\"",
                "poolhoogte": "40 mm",
                "totale_hoogte": "42 mm",
                "steken": "12 per 10cm",
                "product_garantie": "8 jaar",
                "uv_stabiliteit": "> 6.000 uur"
            }
        }
    ];
}
