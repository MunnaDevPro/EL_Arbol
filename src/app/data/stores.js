// src/app/data/stores.js

export const stores = [{
        id: 1,
        slug: 'mostoles-centro',
        name: 'El Árbol — Móstoles Centro',
        shortName: 'Móstoles Centro',
        address: 'Calle del Pintor Velázquez, 12',
        city: '28933 Móstoles, Madrid',
        fullAddress: 'Calle del Pintor Velázquez, 12, 28933 Móstoles, Madrid',
        phone: '+34 912 345 678',
        openTime: '08:30',
        closeTime: '21:00',
        hours: '08:30 — 21:00',
        lat: 40.3217,
        lng: -3.8654,
        features: ['leftoverPack', 'clickCollect'],
        availability: ['Fruits', 'Veg', 'Bread', 'Cheese'],
        provenance: 'from Almería',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80',
        leftoverPacks: [{
                id: 1,
                name: 'Organic Harvest Box',
                description: 'Mixed seasonal produce',
                price: 5.50,
                image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=320&q=80',
            },
            {
                id: 2,
                name: 'Daily Bakery Surprise',
                description: 'Fresh bread & pastries',
                price: 3.90,
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=320&q=80',
            },
            {
                id: 3,
                name: 'The Cheesemonger Pack',
                description: 'Cuts from the deli counter',
                price: 8.00,
                image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=320&q=80',
            },
        ],
    },
    {
        id: 2,
        slug: 'chamberi',
        name: 'El Árbol — Chamberí',
        shortName: 'Chamberí',
        address: 'Calle de Fuencarral, 122',
        city: '28010 Madrid',
        fullAddress: 'Calle de Fuencarral, 122, 28010 Madrid',
        phone: '+34 912 456 789',
        openTime: '09:00',
        closeTime: '21:00',
        hours: '09:00 — 21:00',
        lat: 40.4322,
        lng: -3.7015,
        features: ['leftoverPack'],
        availability: ['Fruits', 'Veg', 'Dairy'],
        provenance: 'from Valencia',
        image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=900&q=80',
        leftoverPacks: [{
            id: 1,
            name: 'Garden Medley Box',
            description: 'Seasonal greens & roots',
            price: 4.50,
            image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=320&q=80',
        }, ],
    },
    {
        id: 3,
        slug: 'salamanca-district',
        name: 'El Árbol — Salamanca District',
        shortName: 'Salamanca',
        address: 'Calle de Serrano, 52',
        city: '28001 Madrid',
        fullAddress: 'Calle de Serrano, 52, 28001 Madrid',
        phone: '+34 913 567 890',
        openTime: '08:00',
        closeTime: '22:00',
        hours: '08:00 — 22:00',
        lat: 40.4267,
        lng: -3.6875,
        features: ['clickCollect'],
        availability: ['Fruits', 'Veg', 'Cheese', 'Wine'],
        provenance: 'from Murcia',
        image: 'https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=80',
        leftoverPacks: [],
    },
    {
        id: 4,
        slug: 'alcorcon-norte',
        name: 'El Árbol — Alcorcón Norte',
        shortName: 'Alcorcón Norte',
        address: 'Av. de Leganés, 34',
        city: '28921 Alcorcón, Madrid',
        fullAddress: 'Av. de Leganés, 34, 28921 Alcorcón, Madrid',
        phone: '+34 914 678 901',
        openTime: '08:30',
        closeTime: '20:30',
        hours: '08:30 — 20:30',
        lat: 40.3489,
        lng: -3.8245,
        features: ['leftoverPack'],
        availability: ['Fruits', 'Bread'],
        provenance: 'from Andalucía',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&q=80',
        leftoverPacks: [{
            id: 1,
            name: 'Morning Harvest Pack',
            description: 'Seasonal fruits & fresh veg',
            price: 6.00,
            image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=320&q=80',
        }, ],
    },
    {
        id: 5,
        slug: 'leganes-market',
        name: 'El Árbol — Leganés Market',
        shortName: 'Leganés Market',
        address: 'Calle Mayor, 78',
        city: '28914 Leganés, Madrid',
        fullAddress: 'Calle Mayor, 78, 28914 Leganés, Madrid',
        phone: '+34 914 789 012',
        openTime: '08:00',
        closeTime: '21:00',
        hours: '08:00 — 21:00',
        lat: 40.3281,
        lng: -3.7642,
        features: ['leftoverPack', 'clickCollect'],
        availability: ['Fruits', 'Veg', 'Bread', 'Dairy'],
        provenance: 'from Castilla',
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=900&q=80',
        leftoverPacks: [{
            id: 1,
            name: 'Evening Veg Bundle',
            description: 'Mixed end-of-day vegetables',
            price: 3.50,
            image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=320&q=80',
        }, ],
    },
]

// ─── Helpers ─────────────────────────────────────────────

/** Haversine distance in km between two lat/lng pairs */
export function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Find store by slug */
/** Find store by slug */
export function getStoreBySlug(slug) {
    if (!stores) return null;
    const store = stores.find((s) => s.slug === slug);
    return store ? store : null;
}

/** Check if store is currently open */
export function isStoreOpen(store) {
    if (!store || !store.openTime || !store.closeTime) return false;

    const now = new Date();
    const [openH, openM] = store.openTime.split(':').map(Number);
    const [closeH, closeM] = store.closeTime.split(':').map(Number);
    const nowMins = now.getHours() * 60 + now.getMinutes();

    return nowMins >= openH * 60 + openM && nowMins < closeH * 60 + closeM;
}
/** Return stores sorted by distance from user, closest first */
export function sortStoresByDistance(storeList, userLat, userLng) {
    return [...storeList].sort((a, b) => {
        const dA = haversineDistance(userLat, userLng, a.lat, a.lng)
        const dB = haversineDistance(userLat, userLng, b.lat, b.lng)
        return dA - dB
    })
}

/** Format km distance for display */
export function formatDistance(km) {
    if (km == null) return null
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}

export const FEATURE_LABELS = {
    leftoverPack: 'LEFTOVER PACK',
    clickCollect: 'CLICK & COLLECT',
}