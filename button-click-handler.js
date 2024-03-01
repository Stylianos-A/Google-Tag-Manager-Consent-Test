document.addEventListener("DOMContentLoaded", function() {
    // Custom button event listener
    var customButton = document.getElementById("custom_button");

    // Event listener for the custom button
    customButton.addEventListener("click", function() {
        
        // Retrieve the string from localStorage and parse it into an object
        const consentMode = JSON.parse(localStorage.consentMode);
        
        // Check if consent has been granted for necessary features
        var consentAnalytics = consentMode.analytics_storage;
        var consentAdPersonalization = consentMode.ad_personalization;
        var consentAdUserData = consentMode.ad_user_data;

        // Check if all necessary consents are granted
        if (consentAnalytics == "granted" && consentAdPersonalization == "granted" && consentAdUserData == "granted") {
            // If consent granted, send event to Google Tag Manager
            window.dataLayer.push({
                'event': 'gtm.click',
                'button_id': 'custom_button',
                'consent_mode': true
            });

            // Push consent mode as false
            window.dataLayer.push({
                'consent_mode': false
            });
        } else {
            // If consent not granted, do nothing
            console.log("Consent not granted for all necessary features.");
        }
    });
});
