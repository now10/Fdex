document.addEventListener('DOMContentLoaded', function() {
    setPageLanguage();
    
    // Set copyright year
    document.getElementById('copyright').textContent = 
        `© ${new Date().getFullYear()} DHL International GmbH · ${t('All Rights Reserved')}`;
    
    // Display current language
    document.getElementById('currentLanguage').textContent = 
        detectLanguage().toUpperCase();
    
    // Load and display tracking data
    loadTrackingData();
});

async function loadTrackingData() {
    const trackingData = JSON.parse(sessionStorage.getItem('trackingData'));
    const resultsContainer = document.getElementById('trackingResults');
    
    if (!trackingData) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <h2>${t('No tracking data found')}</h2>
                <p>${t('Please return to the tracking page and enter a valid tracking number')}</p>
                <a href="trackItNowPublic.html" class="dhl-button">${t('Back to Tracking')}</a>
            </div>
        `;
        return;
    }
    
    try {
        // Get fresh data in case status changed
        const freshData = await getTrackingData(trackingData.number);
        
        // Display tracking information
        displayTrackingInfo(resultsContainer, freshData);
        
    } catch (error) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <h2>${t('Tracking Error')}</h2>
                <p>${error.message}</p>
                <a href="trackItNowPublic.html" class="dhl-button">${t('Try Again')}</a>
            </div>
        `;
    }
}

function displayTrackingInfo(container, data) {
    const delivered = data.currentStatus.includes("Delivered");
    const statusClass = delivered ? "status-delivered" : "status-in-transit";
    const statusText = delivered ? t('delivered') : t('inTransit');
    
    const deliveryDate = new Date(data.estimatedDelivery);
    const deliveryDateStr = deliveryDate.toLocaleDateString(detectLanguage(), { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    container.innerHTML = `
        <div class="tracking-summary">
            <div class="tracking-number">${t('trackingNumber')}: <strong>${data.number}</strong></div>
            <div class="status-badge ${statusClass}">${statusText}</div>
            
            <div class="shipment-overview">
                <div class="origin-destination">
                    <div class="location">
                        <div class="location-label">${t('origin')}</div>
                        <div class="location-value">${data.origin}</div>
                    </div>
                    <div class="location-arrow">→</div>
                    <div class="location">
                        <div class="location-label">${t('destination')}</div>
                        <div class="location-value">${data.destination}</div>
                    </div>
                </div>
                
                <div class="shipment-details">
                    <div class="detail">
                        <span class="detail-label">${t('service')}:</span>
                        <span class="detail-value">${data.service}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">${t('weight')}:</span>
                        <span class="detail-value">${data.weight}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">${t('dimensions')}:</span>
                        <span class="detail-value">${data.dimensions}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">${t('estimatedDelivery')}:</span>
                        <span class="detail-value">${deliveryDateStr}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tracking-map">
            <img src="assets/map-placeholder.jpg" alt="Shipment route map">
            <div class="map-overlay">
                <div class="map-origin">${data.origin.split(',')[0]}</div>
                <div class="map-destination">${data.destination.split(',')[0]}</div>
            </div>
        </div>
        
        <div class="tracking-timeline">
            <h3>${t('history')}</h3>
            <div class="timeline-container">
                ${generateTimeline(data.history)}
            </div>
        </div>
        
        <div class="help-section">
            <h3>${t('helpTopics')}</h3>
            <ul>
                <li><a href="#">${t('expectedDelivery')}</a></li>
                <li><a href="#">${t('trackingUpdate')}</a></li>
                <li><a href="#">${t('missingPackage')}</a></li>
            </ul>
            
            <a href="mailto:dhlworldwide@outlook.com" class="dhl-button">${t('contactSupport')}</a>
        </div>
    `;
}

function generateTimeline(history) {
    const now = new Date();
    let html = '';
    
    history.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const isPast = eventDate <= now;
        const isCurrent = isPast && (index === history.length - 1 || new Date(history[index + 1].date) > now);
        
        const timeStr = eventDate.toLocaleTimeString(detectLanguage(), { hour: '2-digit', minute: '2-digit' });
        const dateStr = eventDate.toLocaleDateString(detectLanguage(), { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
        
        html += `
            <div class="timeline-event ${isPast ? 'past-event' : 'future-event'} ${isCurrent ? 'current-event' : ''}">
                <div class="event-time">
                    <div class="event-date">${dateStr}</div>
                    <div class="event-hour">${timeStr}</div>
                </div>
                <div class="event-dot"></div>
                <div class="event-details">
                    <div class="event-status">${event.status}</div>
                    <div class="event-location">${event.location}</div>
                    ${event.details ? `<div class="event-description">${event.details}</div>` : ''}
                </div>
            </div>
        `;
    });
    
    return html;
}
