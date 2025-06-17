function getMajorHub(countryCode) {
    const hubs = {
        // Add new entries here
        "IT": "Milan Malpensa Airport, ITALY",
        "BR": "Viracopos International Airport, BRAZIL"
        // ... keep existing entries
    };
    return hubs[countryCode] || "Major Distribution Center";
}

function getNearbyCity(countryCode) {
    const cities = {
        // Add new entries here
        "IT": "Rome",
        "BR": "São Paulo"
        // ... keep existing entries
    };
    return cities[countryCode];
}

function getFlightHours(origin, destination) {
    // Add new route durations
    const routes = {
        // ... existing routes
        "IT-GB": 2.5,  // Italy to UK
        "BR-US": 10    // Brazil to USA
    };
    return routes[`${origin}-${destination}`] || 12;
}