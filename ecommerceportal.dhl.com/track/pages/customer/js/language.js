// Language support with auto-detection
const translations = {
    en: {
        trackingNumber: "Tracking Number",
        status: "Status",
        estimatedDelivery: "Estimated Delivery",
        origin: "Origin",
        destination: "Destination",
        service: "Service",
        weight: "Weight",
        dimensions: "Dimensions",
        history: "Shipment History",
        delivered: "Delivered",
        inTransit: "In Transit",
        lastUpdate: "Last Update",
        date: "Date",
        time: "Time",
        location: "Location",
        activity: "Activity",
        details: "Details",
        contactSupport: "Contact Customer Support",
        helpTopics: "Help Topics",
        expectedDelivery: "When should I expect delivery?",
        trackingUpdate: "When will my tracking update?",
        missingPackage: "What if I haven't received my package?"
    },
    fr: {
        trackingNumber: "Numéro de suivi",
        status: "Statut",
        estimatedDelivery: "Livraison estimée",
        origin: "Origine",
        destination: "Destination",
        service: "Service",
        weight: "Poids",
        dimensions: "Dimensions",
        history: "Historique d'expédition",
        delivered: "Livré",
        inTransit: "En transit",
        lastUpdate: "Dernière mise à jour",
        date: "Date",
        time: "Heure",
        location: "Lieu",
        activity: "Activité",
        details: "Détails",
        contactSupport: "Contacter le support client",
        helpTopics: "Sujets d'aide",
        expectedDelivery: "Quand dois-je m'attendre à la livraison?",
        trackingUpdate: "Quand ma mise à jour de suivi?",
        missingPackage: "Et si je n'ai pas reçu mon colis?"
    },
    de: {
        trackingNumber: "Sendungsnummer",
        status: "Status",
        estimatedDelivery: "Voraussichtliche Zustellung",
        origin: "Herkunft",
        destination: "Ziel",
        service: "Service",
        weight: "Gewicht",
        dimensions: "Abmessungen",
        history: "Sendungsverlauf",
        delivered: "Zugestellt",
        inTransit: "Unterwegs",
        lastUpdate: "Letzte Aktualisierung",
        date: "Datum",
        time: "Zeit",
        location: "Standort",
        activity: "Aktivität",
        details: "Einzelheiten",
        contactSupport: "Kundendienst kontaktieren",
        helpTopics: "Hilfethemen",
        expectedDelivery: "Wann soll ich mit der Lieferung rechnen?",
        trackingUpdate: "Wann wird meine Sendungsverfolgung aktualisiert?",
        missingPackage: "Was, wenn ich mein Paket nicht erhalten habe?"
    }
};

// Detect user language from browser or IP
function detectLanguage() {
    // First try browser language
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) return browserLang;
    
    // Default to English
    return 'en';
}

// Get translated text
function t(key) {
    const lang = detectLanguage();
    return translations[lang][key] || translations['en'][key] || key;
}

// Set page language
function setPageLanguage() {
    document.documentElement.lang = detectLanguage();
}