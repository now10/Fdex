// Real-world shipping routes database
const shippingRoutes = {
    // US to France (5-7 business days)
    "USFR78901234": {
        origin: "New York, UNITED STATES",
        destination: "Paris, FRANCE",
        service: "DHL Express Worldwide",
        estimatedDelivery: new Date(Date.now() + 6*24*60*60*1000), // 6 days from now
        weight: "2.5 kg",
        dimensions: "30×20×15 cm",
        history: generateExpressRoute("US", "FR")
    },
    // Germany to Japan (4-6 business days)
    "DEJP45678901": {
        origin: "Berlin, GERMANY",
        destination: "Tokyo, JAPAN",
        service: "DHL Express Worldwide",
        estimatedDelivery: new Date(Date.now() + 5*24*60*60*1000),
        weight: "5.1 kg",
        dimensions: "40×30×25 cm",
        history: generateExpressRoute("DE", "JP")
    },
    // UK to Australia (6-8 business days)
    "GBAU34567890": {
        origin: "London, UNITED KINGDOM",
        destination: "Sydney, AUSTRALIA",
        service: "DHL Express Worldwide",
        estimatedDelivery: new Date(Date.now() + 7*24*60*60*1000),
        weight: "1.8 kg",
        dimensions: "25×15×10 cm",
        history: generateExpressRoute("GB", "AU")
    }
};

// Generate realistic route based on origin/destination countries
function generateExpressRoute(originCountry, destCountry) {
    const now = new Date();
    const history = [];
    let hoursElapsed = 0;
    
    // Standard route progression
    const steps = [
        { status: "Shipment information received", location: originCountry },
        { status: "Processed at origin facility", location: originCountry, hoursAfter: 2 },
        { status: "Departed origin facility", location: originCountry, hoursAfter: 6 },
        { status: "Arrived at international hub", location: getMajorHub(originCountry), hoursAfter: 12 },
        { status: "Processed for international departure", location: getMajorHub(originCountry), hoursAfter: 2 },
        { status: "Departed international hub", location: getMajorHub(originCountry), hoursAfter: 4 },
        { status: "Arrived at destination country", location: getMajorHub(destCountry), hoursAfter: getFlightHours(originCountry, destCountry) },
        { status: "Customs clearance processing", location: destCountry, hoursAfter: 3 },
        { status: "Customs clearance completed", location: destCountry, hoursAfter: 6 },
        { status: "Processed at destination facility", location: getMajorHub(destCountry), hoursAfter: 4 },
        { status: "Out for delivery", location: getNearbyCity(destCountry), hoursAfter: 8 },
        { status: "Delivered", location: getNearbyCity(destCountry), hoursAfter: 2 }
    ];

    steps.forEach(step => {
        hoursElapsed += (step.hoursAfter || 0);
        const timestamp = new Date(now.getTime() + hoursElapsed * 60 * 60 * 1000);
        
        history.push({
            date: timestamp,
            status: step.status,
            location: step.location,
            details: getStatusDetails(step.status)
        });
    });

    return history;
}

// Helper functions
function getMajorHub(countryCode) {
    const hubs = {
        "US": "Cincinnati Hub, UNITED STATES",
        "FR": "Paris Charles de Gaulle, FRANCE",
        "DE": "Leipzig Hub, GERMANY",
        "JP": "Narita International Airport, JAPAN",
        "GB": "East Midlands Airport, UNITED KINGDOM",
        "AU": "Sydney Gateway Facility, AUSTRALIA"
    };
    return hubs[countryCode] || "Major Distribution Center";
}

function getNearbyCity(countryCode) {
    const cities = {
        "US": "New York",
        "FR": "Paris",
        "DE": "Berlin",
        "JP": "Tokyo",
        "GB": "London",
        "AU": "Sydney"
    };
    return cities[countryCode];
}

function getFlightHours(origin, destination) {
    // Approximate flight hours between major hubs
    const routes = {
        "US-FR": 8,  // NY to Paris
        "DE-JP": 12, // Berlin to Tokyo
        "GB-AU": 22  // London to Sydney
    };
    return routes[`${origin}-${destination}`] || 12;
}

function getStatusDetails(status) {
    const details = {
        "Shipment information received": "Electronic data received, awaiting package",
        "Processed at origin facility": "Package scanned at sorting facility",
        "Departed origin facility": "En route to international hub", 
        "Arrived at international hub": "Package reached main distribution center",
        "Processed for international departure": "Cleared for international transport",
        "Departed international hub": "Loaded onto international flight",
        "Arrived at destination country": "Landed at destination airport",
        "Customs clearance processing": "Undergoing customs inspection",
        "Customs clearance completed": "Cleared for domestic distribution",
        "Processed at destination facility": "Sorted for final delivery",
        "Out for delivery": "With local delivery courier",
        "Delivered": "Successfully delivered to recipient"
    };
    return details[status];
}

// API function to get tracking data
function getTrackingData(trackingNumber) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = shippingRoutes[trackingNumber];
            if (data) {
                // Update status based on current time
                const now = new Date();
                const activeHistory = data.history.filter(event => event.date <= now);
                data.currentStatus = activeHistory.length > 0 ? 
                    activeHistory[activeHistory.length - 1].status : 
                    "Shipment information received";
                
                resolve(data);
            } else {
                reject(new Error("Tracking number not found"));
            }
        }, 800); // Simulate API delay
    });
}
