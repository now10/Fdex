"YOUR_NEW_TRACKING_NUMBER": {
    origin: "City, COUNTRY",
    destination: "City, COUNTRY",
    service: "DHL Express Worldwide",
    estimatedDelivery: new Date(Date.now() + X*24*60*60*1000), // X = days until delivery
    weight: "X kg",
    dimensions: "XX×XX×XX cm",
    history: generateExpressRoute("ORIGIN_COUNTRY_CODE", "DESTINATION_COUNTRY_CODE")
}