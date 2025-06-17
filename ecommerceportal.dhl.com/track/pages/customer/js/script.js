document.addEventListener('DOMContentLoaded', function() {
    const trackButton = document.getElementById('trackItNowForm:searchSkuBtn');
    
    if (trackButton) {
        // Completely replace the onclick handler
        trackButton.onclick = async function(e) {
            e.preventDefault();
            
            const trackingInput = document.querySelector('input[name$="trackingNumberInput"]') || 
                                 document.querySelector('input[type="text"]');
            
            if (!trackingInput || !trackingInput.value) {
                alert("Please enter a tracking number");
                return false;
            }
            
            const trackingNumber = trackingInput.value.trim().toUpperCase();
            
            // Show loading state
            trackButton.disabled = true;
            const originalText = trackButton.querySelector('.ui-button-text').textContent;
            trackButton.querySelector('.ui-button-text').textContent = "Tracking...";
            
            try {
                // Get tracking data (simulated API call)
                const trackingData = await getTrackingData(trackingNumber);
                
                // Store data for results page
                sessionStorage.setItem('trackingData', JSON.stringify({
                    number: trackingNumber,
                    data: trackingData
                }));
                
                // Redirect to results page
                window.location.href = 'results.html';
                
            } catch (error) {
                alert(error.message);
                trackButton.disabled = false;
                trackButton.querySelector('.ui-button-text').textContent = originalText;
            }
            
            return false;
        };
        
        // Also prevent the form submission
        const form = document.querySelector('form[name="trackItNowForm"]');
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                return false;
            };
        }
    }
});