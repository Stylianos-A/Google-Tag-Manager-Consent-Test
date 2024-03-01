// Function to hide the cookie consent banner
function hideBanner() {
    document.getElementById('cookie-consent-banner').style.display = 'none';
}

// Checking if consent mode is already stored in local storage
if(localStorage.getItem('consentMode') === null) {
    // Event listener for accepting all cookies
    document.getElementById('btn-accept-all').addEventListener('click', function() {
        setConsent({
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true,
            ad_user_data: true,
            ad_personalization: true
        });
        hideBanner(); // Hides the banner after setting the consent
    });
    
    // Event listener for accepting selected cookies
    document.getElementById('btn-accept-some').addEventListener('click', function() {
        setConsent({
            necessary: document.getElementById('consent-necessary').checked,
            analytics: document.getElementById('consent-analytics').checked,
            preferences: document.getElementById('consent-preferences').checked,
            marketing: document.getElementById('consent-marketing').checked,
            ad_user_data: document.getElementById('consent-ad-user-data').checked,
            ad_personalization: document.getElementById('consent-ad-personalization').checked,
        });
        hideBanner(); // Hides the banner after setting the consent
    });
    
    // Event listener for rejecting all cookies
    document.getElementById('btn-reject-all').addEventListener('click', function() {
        setConsent({
            necessary: false,
            analytics: false,
            preferences: false,
            marketing: false,
            ad_user_data: false, // Add ad_user_data
            ad_personalization: false // Add ad_personalization
        });
        hideBanner(); // Hides the banner after setting the consent
    });
    
    // Display the cookie consent banner
    document.getElementById('cookie-consent-banner').style.display = 'block';
}

// Function to set the consent mode
function setConsent(consent) {
    const consentMode = {
        'functionality_storage': consent.necessary ? 'granted' : 'denied',
        'security_storage': consent.necessary ? 'granted' : 'denied',
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'personalization_storage': consent.preferences ? 'granted' : 'denied',
        'ad_user_data': consent.ad_user_data ? 'granted' : 'denied',
        'ad_personalization': consent.ad_personalization ? 'granted' : 'denied'
    };
    gtag('consent', 'update', consentMode);  // Update consent using Google Analytics gtag
    localStorage.setItem('consentMode', JSON.stringify(consentMode)); // Store consent mode in local storage
}
