// Base URL for the Flask API (running on port 5000)
// IMPORTANT: Using 127.0.0.1 here to match the common server binding and CORS settings.
const API_BASE_URL = 'http://127.0.0.1:5000/api'; 

// Global flag to prevent cascading dropdown change events from resetting the final output box
let isLookupTriggered = false;

// --- Utility to display temporary messages (Re-implemented here) ---
function showNotification(message, isError = false) {
    let $notif = $('#notification-box');
    if (!$notif.length) {
        // Create the notification box if it doesn't exist (assuming it should be placed after the main container)
        $notif = $('<div id="notification-box"></div>').insertAfter($('.big-box'));
    }
    
    // Use the classes defined in style.css
    $notif.text(message)
          .removeClass('bg-green-100 bg-red-100 text-green-700 text-red-700 notification-visible')
          .addClass(isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')
          .addClass('notification-visible');

    setTimeout(() => {
        $notif.removeClass('notification-visible');
        // FIX: Clear the text content completely after the notification disappears (for clean background)
        $notif.text(''); 
    }, 3000);
}

$(document).ready(function() {
    // 1. Initialize Select2 for all dropdowns
    // Initializing Select2 here allows us to use .val(null).trigger('change.select2') later
    $('#provinceSelect').select2({
        placeholder: "សូមជ្រើសរើសខេត្ត",
        allowClear: true 
    });
    $('#districtSelect').select2({
        placeholder: "សូមជ្រើសរើសស្រុក / ខណ្ឌ",
        allowClear: true
    });
    $('#communeSelect').select2({
        placeholder: "សូមជ្រើសរើសឃុំ / សង្កាត់",
        allowClear: true
    });
    $('#villageSelect').select2({
        placeholder: "សូមជ្រើសរើសភូមិ / ក្រុម",
        allowClear: true
    });

    // Load provinces immediately on document ready
    loadProvinces();

    // --- Core Data Loading Functions ---

    function loadProvinces() {
        $.ajax({
            url: `${API_BASE_URL}/provinces`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success' && response.data.length > 0) {
                    const select = $('#provinceSelect');
                    
                    // --- Start Refresh ---
                    select.select2('destroy'); // Destroy Select2 instance first
                    select.empty().append('<option value="" disabled selected>សូមជ្រើសរើសខេត្ត</option>');
                    
                    response.data.forEach(function(province) {
                        select.append(new Option(province.name, province.id));
                    });
                    
                    // --- End Refresh ---
                    select.select2({ // Re-initialize Select2 to apply styles and functionality
                        placeholder: "សូមជ្រើសរើសខេត្ត",
                        allowClear: true
                    }); 

                    // RESTORED: Show success notification upon province load
                    showNotification(`ផ្ទុកខេត្តចំនួន ${response.data.length} រួចរាល់។`);
                } else {
                    showNotification("បរាជ័យក្នុងការផ្ទុកខេត្ត។ ទិន្នន័យទទេរ។", true);
                }
            },
            error: function(xhr, status, error) {
                // Check if it's a connection refusal or CORS issue (xhr.status 0)
                if (xhr.status === 0) {
                    showNotification("បរាជ័យក្នុងការភ្ជាប់ API។ សូមពិនិត្យមើលថា Flask កំពុងដំណើរការលើ Port 5000", true);
                } else {
                    showNotification("មានបញ្ហាក្នុងការផ្ទុកខេត្ត។ សូមពិនិត្យមើល Console (F12) របស់អ្នក។", true);
                }
                console.error("Failed to load provinces:", status, error, xhr.responseText);
            }
        });
    }

    function loadDistricts(provinceId) {
        const districtSelect = $('#districtSelect');
        const communeSelect = $('#communeSelect');
        const villageSelect = $('#villageSelect'); 

        // Reset dependent dropdowns before AJAX call
        districtSelect.empty().append('<option value="" disabled selected>សូមជ្រើសរើសស្រុក / ខណ្ឌ</option>').val(null).trigger('change.select2');
        communeSelect.empty().append('<option value="" disabled selected>សូមជ្រើសរើសឃុំ / សង្កាត់</option>').val(null).trigger('change.select2');
        villageSelect.empty().append('<option value="" disabled selected>សូមជ្រើសរើសភូមិ / ក្រុម</option>').val(null).trigger('change.select2');

        // Reset output only if user manually changed dropdown
        if (!isLookupTriggered) {
             // The output is handled by the cascading updateOutput function now.
        }
        
        if (!provinceId) return;

        $.ajax({
            url: `${API_BASE_URL}/districts?province_id=${provinceId}`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // Destroy, append options, then re-initialize
                    districtSelect.select2('destroy');
                    response.data.forEach(function(district) {
                        districtSelect.append(new Option(district.name, district.id));
                    });
                    districtSelect.select2({
                        placeholder: "សូមជ្រើសរើសស្រុក / ខណ្ឌ",
                        allowClear: true
                    });
                    districtSelect.trigger('change.select2'); 
                } else {
                    showNotification(`បរាជ័យក្នុងការផ្ទុកស្រុក/ខណ្ឌ៖ ${response.message}`, true);
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to load districts:", status, error);
            }
        });
    }

    function loadCommunes(districtId) {
        const communeSelect = $('#communeSelect');
        const villageSelect = $('#villageSelect'); 
        
        // Reset dependent dropdowns before AJAX call
        communeSelect.empty().append('<option value="" disabled selected>សូមជ្រើសរើសឃុំ / សង្កាត់</option>').val(null).trigger('change.select2');
        villageSelect.empty().append('<option value="" disabled selected>សូមជ្រើសរើសភូមិ / ក្រុម</option>').val(null).trigger('change.select2');
        
        if (!districtId) return;

        $.ajax({
            url: `${API_BASE_URL}/communes?district_id=${districtId}`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // Destroy, append options, then re-initialize
                    communeSelect.select2('destroy');
                    response.data.forEach(function(commune) {
                        communeSelect.append(new Option(commune.name, commune.id));
                    });
                    communeSelect.select2({
                        placeholder: "សូមជ្រើសរើសឃុំ / សង្កាត់",
                        allowClear: true
                    });
                    communeSelect.trigger('change.select2');
                } else {
                    showNotification(`បរាជ័យក្នុងការផ្ទុកឃុំ/សង្កាត់៖ ${response.message}`, true);
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to load communes:", status, error);
            }
        });
    }

    // Function to load villages
    function loadVillages(communeId) {
        const villageSelect = $('#villageSelect');
        
        villageSelect.empty().append('<option value="" disabled selected>សូមជ្រើសរើសភូមិ / ក្រុម</option>').val(null).trigger('change.select2');
        
        if (!communeId) return;

        $.ajax({
            url: `${API_BASE_URL}/villages?commune_id=${communeId}`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // Destroy, append options, then re-initialize
                    villageSelect.select2('destroy');
                    response.data.forEach(function(village) {
                        villageSelect.append(new Option(village.name, village.id));
                    });
                    villageSelect.select2({
                        placeholder: "សូមជ្រើសរើសភូមិ / ក្រុម",
                        allowClear: true
                    });
                    villageSelect.trigger('change.select2');
                } else {
                    showNotification(`បរាជ័យក្នុងការផ្ទុកភូមិ៖ ${response.message}`, true);
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to load villages:", status, error);
            }
        });
    }
    
    // --- Output & Utility Functions ---

    /**
     * Updates the final address and code output boxes and sets up copy functionality.
     */
    function updateAddressOutput(addressText, codeText) {
        $('#addressContent').text(addressText);
        $('#codeContent').text(codeText);
        $('.final-output-container').removeClass('hidden');

        // Set up the copy functionality for the address (using temporary input as a fallback)
        $('#copyAddressButton').off('click').on('click', function() {
            copyTextToClipboard(addressText, $(this), "ចម្លង", "ចម្លងរួចរាល់!");
        });

        // Set up the copy functionality for the code
        $('#copyCodeButton').off('click').on('click', function() {
            copyTextToClipboard(codeText, $(this), "ចម្លង", "ចម្លងរួចរាល់!");
        });
    }

    /**
     * Unified clipboard copy function (using modern API with fallback).
     */
    function copyTextToClipboard(text, $button, originalText, successText) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                $button.text(successText);
                showNotification("ចម្លងរួចរាល់!");
                setTimeout(() => $button.text(originalText), 1500);
            }).catch(() => {
                // Fallback to execCommand if clipboard fails in iframe environment
                const tempInput = document.createElement('input');
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                try {
                    document.execCommand('copy');
                    $button.text(successText);
                    showNotification("ចម្លងរួចរាល់!");
                    setTimeout(() => $button.text(originalText), 1500);
                } catch (err) {
                    showNotification("បរាជ័យក្នុងការចម្លង។ សូមប្រើវិធីចម្លងដោយដៃ។", true);
                }
                document.body.removeChild(tempInput);
            });
        } else {
            // Fallback: Using execCommand is often restricted in secure contexts, but included as a last resort
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                $button.text(successText);
                showNotification("ចម្លងរួចរាល់!");
                setTimeout(() => $button.text(originalText), 1500);
            } catch (err) {
                showNotification("បរាជ័យក្នុងការចម្លង។", true);
            }
            document.body.removeChild(tempInput);
        }
    }


    /**
     * Helper function to manually set the dropdown values for Lookup feature.
     * FIX: Uses a double attempt and consistent timing to ensure Province is selected,
     * and enforces leading zero format for compatibility (01, 10, etc.).
     */
    function setDropdowns(provinceId, districtId, communeId, villageId) {
        isLookupTriggered = true; 
        
        // Reset function for dependents
        const resetDependents = (select) => {
            select.val(null).trigger('change.select2');
            select.empty().append('<option value="" disabled selected>'+ select.attr('placeholder') +'</option>');
        };
        
        // START FIX: Wrap entire cascade in a slight delay for better stability
        setTimeout(() => {
            
            // 1. Province (Set value immediately)
            if (provinceId) {
                const $provinceSelect = $('#provinceSelect');
                
                // FIX HERE: Conditional formatting based on province ID value
                let provinceIdStr = String(provinceId);
                const provinceIdInt = parseInt(provinceIdStr, 10);

                if (provinceIdInt >= 10) {
                    // For 10 and above, pad to two digits (e.g., 10 -> "10")
                    provinceIdStr = provinceIdStr.padStart(2, '0');
                } else {
                    // For 1 through 9, ensure it's just the single digit (e.g., 9 -> "9")
                    // This uses the single-digit format assumed to be in your options for 1-9
                    provinceIdStr = String(provinceIdInt); 
                }
                
                // Attempt 1: Select the value and trigger change
                $provinceSelect.val(provinceIdStr).trigger('change.select2');
                
                // Defensive Check: If selection failed, try again after a small pause
                setTimeout(() => {
                    // Attempt 2: If the value is still null/empty, try selecting it again
                    if ($provinceSelect.val() !== provinceIdStr) {
                        $provinceSelect.val(provinceIdStr).trigger('change.select2');
                    }
                    
                    // Proceed with loading districts using the corrected ID
                    loadDistricts(provinceIdStr);
                }, 5); // Very slight delay for the defensive check

            } else {
                resetDependents($('#provinceSelect'));
                isLookupTriggered = false; 
                return;
            }

            // 2. District
            setTimeout(() => {
                if (districtId) {
                    $('#districtSelect').val(String(districtId)).trigger('change.select2');
                    loadCommunes(districtId);
                } else {
                    resetDependents($('#districtSelect'));
                }

                // 3. Commune
                setTimeout(() => {
                    if (communeId) {
                        $('#communeSelect').val(String(communeId)).trigger('change.select2');
                        loadVillages(communeId);
                    } else {
                        resetDependents($('#communeSelect'));
                    }

                    // 4. Village
                    setTimeout(() => {
                        if (villageId) {
                            $('#villageSelect').val(String(villageId)).trigger('change.select2');
                        } else {
                            resetDependents($('#villageSelect'));
                        }
                        // Reset flag after cascade is complete
                        isLookupTriggered = false; 
                    }, 150); 
                }, 150);
            }, 150);
            
        }, 50); // END FIX: Initial 50ms delay for stability
    }
    
    // --- Event Listeners for Dropdown Changes ---

    $('#provinceSelect').on('change', function() {
        if(!isLookupTriggered) updateOutput();
        loadDistricts($(this).val());
    });

    $('#districtSelect').on('change', function() {
        if(!isLookupTriggered) updateOutput();
        loadCommunes($(this).val());
    });
    
    $('#communeSelect').on('change', function() {
        if(!isLookupTriggered) updateOutput();
        loadVillages($(this).val()); 
    });

    $('#villageSelect').on('change', function() {
        if(!isLookupTriggered) updateOutput();
    });
    
    // --- Manual Output Update (when user selects) ---

    function updateOutput() {
        const villageId = $('#villageSelect').val();
        const communeId = $('#communeSelect').val();
        const districtId = $('#districtSelect').val();
        const provinceId = $('#provinceSelect').val();

        let addressParts = [];
        let finalCode = 'N/A';
        
        // Start from the deepest selected unit and walk up
        if (villageId) {
            addressParts.push($('#villageSelect option:selected').text());
            finalCode = villageId;
        } 
        if (communeId) {
            addressParts.push($('#communeSelect option:selected').text());
            if (!villageId) finalCode = communeId;
        }
        if (districtId) {
            addressParts.push($('#districtSelect option:selected').text());
            if (!communeId && !villageId) finalCode = districtId;
        }
        if (provinceId) {
            addressParts.push($('#provinceSelect option:selected').text());
            if (!districtId && !communeId && !villageId) finalCode = provinceId;
        }

        if (addressParts.length > 0) {
            // Address is joined from smallest unit (first in array) to largest (last in array)
            const fullAddress = addressParts.reverse().join(', '); 
            updateAddressOutput(fullAddress, finalCode.toString());
        } else {
            // Nothing selected
            updateAddressOutput("សូមជ្រើសរើស ភូមិ ឃុំ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត", "N/A");
            $('.final-output-container').addClass('hidden');
        }
    }
    
    // --- Code Search Logic ---
    
    $('#lookupButton').on('click', function() {
        const codeInput = $('#codeInput').val().trim();
        
        // UPDATED: Check for 1 or more digits, removing the upper limit of 7.
        if (!codeInput || !/^\d+$/.test(codeInput)) {
            // UPDATED: Simple error message reflecting the removal of the digit limit.
            showNotification("សូមបញ្ចូលលេខកូដដែលជាលេខ (ឧ. 10101)", true);
            return;
        }
        
        // FIX: Corrected typo from 'abled' to 'disabled'
        $('#lookupButton').prop('disabled', true).text('កំពុងស្វែងរក...');

        $.ajax({
            url: `${API_BASE_URL}/lookup?code=${codeInput}`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                $('#lookupButton').prop('disabled', false).text('ស្វែងរក');
                
                if (response.status === 'success') {
                    showNotification(`រកឃើញអាសយដ្ឋាន៖ ${response.address}`);
                    
                    // 1. Update the output box FIRST with the correct API result
                    updateAddressOutput(response.address, response.code.toString());

                    // 2. Then, manually trigger dropdown updates
                    // Note: The village ID from the API response is used directly if the match_level is 'village'
                    const villageId = response.match_level === 'village' ? response.code.toString() : null;

                    setDropdowns(
                        response.province_id,
                        response.district_id,
                        response.commune_id,
                        villageId
                    );
                } else {
                    showNotification(response.message || "លេខកូដមិនមានក្នុងបញ្ជី", true);
                    updateAddressOutput("លេខកូដមិនមានក្នុងបញ្ជី", codeInput);
                }
            },
            error: function(xhr, status, error) {
                $('#lookupButton').prop('disabled', false).text('ស្វែងរក');
                console.error("Search failed:", status, error);
                showNotification("ការស្វែងរកបរាជ័យ។ សូមពិនិត្យមើល API របស់អ្នក។", true);
                updateAddressOutput("ការស្វែងរកបរាជ័យ", codeInput);
            }
        });
    });

});