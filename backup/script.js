$(document).ready(function () {
    // --- jQuery Element Selectors ---
    const $province = $("#provinceSelect");
    const $district = $("#districtSelect");
    const $commune = $("#communeSelect");
    const $village = $("#villageSelect");
    const $codeInput = $("#codeInput");
    const $lookupButton = $("#lookupButton");
    const $addressContent = $("#addressContent");
    const $codeContent = $("#codeContent");
    const $copyAddressButton = $("#copyAddressButton");
    const $copyCodeButton = $("#copyCodeButton");
    const $outputContainer = $(".final-output-container");

    // ✅ NEW: Audio Elements and State
    const audioElement = document.getElementById('backgroundMusic'); // Vanilla JS element
    const $musicToggleIcon = $("#musicToggleIcon");
    let isMusicPlaying = false; 

    // Set initial volume and state (volume 50% by default)
    audioElement.volume = 0.5; 

    // --- Constants & State ---
    const DEFAULT_ADDRESS_TEXT = "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";
    const DEFAULT_CODE_TEXT = "N/A";

    let provinces = [];
    let districts = [];
    let communes = [];
    let villages = [];
    
    // Flag to ignore dropdown change events when they are triggered by the lookup function
    let isProgrammaticSelection = false; 

    // =========================================================================
    // ---- MUSIC CONTROL LOGIC ----
    // =========================================================================

    function toggleMusic() {
        if (isMusicPlaying) {
            // Stop the music
            audioElement.pause();
            $musicToggleIcon.text("🔈"); // Speaker off icon
            isMusicPlaying = false;
        } else {
            // Try to play the music
            const playPromise = audioElement.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Playback started successfully
                    $musicToggleIcon.text("🔊"); // Speaker ON icon
                    isMusicPlaying = true;
                }).catch(error => {
                    // Autoplay failed (Browser policy requires user interaction)
                    console.warn("Audio playback blocked by browser.", error);
                    $musicToggleIcon.text("🚫"); // Temporary error icon
                    setTimeout(() => {
                        $musicToggleIcon.text("🔈");
                    }, 1500);
                    isMusicPlaying = false;
                });
            }
        }
    }


    // =========================================================================
    // ---- UTILITY HELPERS (from ui_utils.js) ----
    // =========================================================================

    function isNumericString(s) {
        return typeof s === "string" && /^\d+$/.test(s);
    }

    function toStr(v) {
        if (v === null || v === undefined) return "";
        return String(v);
    }

    // pad with zeros on left (e.g., 1 -> "01")
    function padLeft(s, length) {
        s = toStr(s);
        while (s.length < length) s = "0" + s;
        return s;
    }

    // derive parent ids from an id string by slicing prefixes (returns padded IDs)
    function deriveParentsFromId(idStr) {
        const s = toStr(idStr);
        const res = {};
        if (s.length >= 2) res.provinceId = padLeft(s.slice(0, 2), 2);
        if (s.length >= 4) res.districtId = padLeft(s.slice(0, 4), 4);
        if (s.length >= 6) res.communeId = padLeft(s.slice(0, 6), 6);
        return res;
    }

    function setupSelect2($select) {
        // Destroy existing Select2 instance if present
        if ($select.hasClass("select2-hidden-accessible")) {
            $select.select2("destroy");
        }
        const placeholder = $select.find("option:first").text();
        $select.select2({
            placeholder: placeholder,
            allowClear: true,
            width: "resolve",
            dropdownParent: $(document.body),
        });
        // Ensure placeholder is shown initially if no value is set
        if (!$select.val()) {
             $select.val(null).trigger("change.select2");
        }
    }

    function copyTextToClipboard($button, textToCopy) {
        if (!textToCopy || $button.prop("disabled") || textToCopy === DEFAULT_CODE_TEXT || textToCopy === DEFAULT_ADDRESS_TEXT) return;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = $button.text();
                $button.text("ចម្លងរួចរាល់");
                setTimeout(() => { $button.text(originalText); }, 1500);
            }).catch(() => {
                fallbackCopy(textToCopy, $button);
            });
        } else {
            fallbackCopy(textToCopy, $button);
        }

        function fallbackCopy(text, $btn) {
            const tempTextarea = $("<textarea>")
                .val(text)
                .appendTo("body")
                .select();

            try {
                document.execCommand("copy");
                const originalText = $btn.text();
                $btn.text("ចម្លងរួចរាល់");
                setTimeout(function () {
                    $btn.text(originalText);
                }, 1500);
            } finally {
                tempTextarea.remove();
            }
        }
    }


    // =========================================================================
    // ---- DATA & INITIALIZATION (from data_loader.js) ----
    // =========================================================================

    async function loadDataAndInitialize() {
        try {
            const [
                khetResponse, srokResponse, khumResponse, phumResponse,
            ] = await Promise.all([
                fetch("data/khet_data.json"),
                fetch("data/srok_data.json"),
                fetch("data/khum_data.json"),
                fetch("data/phum_data.json"),
            ]);

            const khetData = await khetResponse.json();
            const srokData = await srokResponse.json();
            const khumData = await khumResponse.json();
            const phumData = await phumResponse.json();

            // --- Normalize Provinces ---
            provinces = khetData.map((item) => {
                const rawId = toStr(item.id);
                const id2 = isNumericString(rawId) ? padLeft(rawId, 2) : rawId;
                return { id: id2, name: item.khmer_name || item.english_name || `Province ${rawId}` };
            });

            // --- Normalize Districts ---
            districts = srokData.map((item) => {
                const rawId = toStr(item.id);
                const parents = deriveParentsFromId(rawId);
                return { id: rawId, name: item.khmer_name || item.english_name || `District ${rawId}`,
                    provinceId: parents.provinceId || padLeft(item.class, 2), };
            });

            // --- Normalize Communes ---
            communes = khumData.map((item) => {
                const rawId = toStr(item.id);
                const parents = deriveParentsFromId(rawId);
                return { id: rawId, name: item.khmer_name || item.english_name || `Commune ${rawId}`,
                    districtId: parents.districtId || padLeft(item.class, 4), };
            });

            // --- Normalize Villages ---
            villages = phumData.map((item) => {
                const rawId = toStr(item.id);
                const parents = deriveParentsFromId(rawId);
                return { id: rawId, name: item.khmer_name || item.english_name || `Village ${rawId}`,
                    communeId: parents.communeId || padLeft(item.class, 6), };
            });

        } catch (error) {
            console.error("Failed to load geographical data:", error);
            $addressContent.text(`បរាជ័យក្នុងការផ្ទុកទិន្នន័យ (ពិនិត្យ Console សម្រាប់ Error: ${error.message})`);
            $codeContent.text(DEFAULT_CODE_TEXT);
            $copyAddressButton.prop("disabled", true);
            $copyCodeButton.prop("disabled", true);
            $outputContainer.removeClass("hidden");
            return;
        }

        // --- Populate Province Dropdown (Standard Select - No Select2 applied here) ---
        $province.empty().append(new Option("សូមជ្រើសរើសរាជធានី / ខេត្ត", ""));
        provinces.forEach((item) => {
            $province.append(new Option(item.name, item.id));
        });
        
        // initialize the dependent selects (These ARE initialized with Select2)
        setupSelect2($district);
        setupSelect2($commune);
        setupSelect2($village);
        
        $province.val(null).trigger("change"); // Standard HTML change event
        $lookupButton.prop("disabled", true); 
        updateFullAddress(); 
    }


    // =========================================================================
    // ---- CORE LOGIC & EVENTS (from logic.js) ----
    // =========================================================================

    // ---- Dropdown Filtering Helpers ----

    function loadDistrictsOptions(provinceId, $select) {
        const filtered = districts.filter(d => d.provinceId === provinceId);
        filtered.forEach(d => $select.append(new Option(d.name, d.id)));
        setupSelect2($select);
    }

    function loadCommunesOptions(districtId, $select) {
        const filtered = communes.filter(c => c.districtId === districtId);
        filtered.forEach(c => $select.append(new Option(c.name, c.id)));
        setupSelect2($select);
    }

    function loadVillagesOptions(communeId, $select) {
        const filtered = villages.filter(v => v.communeId === communeId);
        filtered.forEach(v => $select.append(new Option(v.name, v.id)));
        setupSelect2($select);
    }

    function clearDropdowns() {
        isProgrammaticSelection = true;
        
        // Clear province with standard HTML change event
        $province.val(null).trigger("change"); 

        // Clear dependents with Select2 change event
        $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", "")).val(null).trigger("change.select2");
        $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", "")).val(null).trigger("change.select2");
        $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", "")).val(null).trigger("change.select2");
        
        isProgrammaticSelection = false;
    }


    // ---- Programmatic Selection (Lookup result population) ----

    function selectAddressInDropdowns(provinceId, districtId, communeId, villageId) {
        isProgrammaticSelection = true;
        
        // 1. Province: Set value on the standard HTML select element first
        $province.val(provinceId); 
        $province.trigger("change"); 

        // FIX: Only initialize Select2 on $province now that the value is set 
        if (!$province.hasClass("select2-hidden-accessible")) {
             setupSelect2($province);
        }
        // Set value one final time and trigger Select2 update
        $province.val(provinceId).trigger("change.select2"); 
        
        // Use a delay to ensure the Province's visual update completes before cascading
        setTimeout(() => {
            // 2. District (Load and select)
            $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
            loadDistrictsOptions(provinceId, $district);
            $district.val(districtId).trigger("change.select2");
            
            // 3. Commune (Load and select)
            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
            loadCommunesOptions(districtId, $commune);
            $commune.val(communeId).trigger("change.select2");

            // 4. Village (Load and select)
            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", ""));
            if (communeId) {
                 loadVillagesOptions(communeId, $village);
            }
            $village.val(villageId).trigger("change.select2");
            
            isProgrammaticSelection = false;
        }, 100); 
    }


    // ---- Address Display Logic ----

    function updateFullAddress() {
        const inputCode = $codeInput.val().trim();
        
        if (isProgrammaticSelection || inputCode !== "") {
            $outputContainer.addClass("hidden");
            $lookupButton.prop("disabled", !inputCode); 
            return;
        }

        const provinceText = $province.val() ? $province.find("option:selected").text() : null;
        const districtText = $district.val() ? $district.find("option:selected").text() : null;
        const communeText = $commune.val() ? $commune.find("option:selected").text() : null;
        const villageText = $village.val() ? $village.find("option:selected").text() : null;

        const provinceId = $province.val();
        const districtId = $district.val();
        const communeId = $commune.val();
        const villageId = $village.val();

        let addressParts = [];
        let codeParts = []; 
        
        if (villageText && villageId) { addressParts.push(villageText); codeParts.push(villageId); }
        if (communeText && communeId) { addressParts.push(communeText); if (codeParts.length === 0) codeParts.push(communeId); }
        if (districtText && districtId) { addressParts.push(districtText); if (codeParts.length === 0) codeParts.push(districtId); }
        if (provinceText && provinceId) { addressParts.push(provinceText); if (codeParts.length === 0) codeParts.push(provinceId); }
        
        if (addressParts.length > 0) {
            const fullAddress = addressParts.join(', '); 
            const finalCode = codeParts[0];

            $addressContent.text(fullAddress);
            $codeContent.text(finalCode);
            $copyAddressButton.prop("disabled", false);
            $copyCodeButton.prop("disabled", false);
            $outputContainer.removeClass("hidden");
        } else {
            $addressContent.text(DEFAULT_ADDRESS_TEXT);
            $codeContent.text(DEFAULT_CODE_TEXT);
            $copyAddressButton.prop("disabled", true);
            $copyCodeButton.prop("disabled", true);
            $outputContainer.addClass("hidden");
        }
    }


    // ---- Code Lookup Logic ----

    function findAddressByCode(code) {
        const normalizedInput = code.trim();
        
        // Check for Village (8 digits)
        const matchedVillage = villages.find(v => v.id === normalizedInput);
        if (matchedVillage) {
            const matchedCommune = communes.find(c => c.id === matchedVillage.communeId);
            const matchedDistrict = districts.find(d => d.id === matchedCommune?.districtId);
            const matchedProvince = provinces.find(p => p.id === matchedDistrict?.provinceId);
            if (matchedCommune && matchedDistrict && matchedProvince) {
                const fullAddress = `${matchedVillage.name}, ${matchedCommune.name}, ${matchedDistrict.name}, ${matchedProvince.name}`;
                return { fullAddress, fullCode: normalizedInput, pId: matchedProvince.id, dId: matchedDistrict.id, cId: matchedCommune.id, vId: normalizedInput };
            }
        }
        
        // Check for Commune (6 digits)
        const matchedCommune = communes.find((c) => c.id === normalizedInput);
        if (matchedCommune) {
            const matchedDistrict = districts.find((d) => d.id === matchedCommune.districtId);
            const matchedProvince = provinces.find((p) => p.id === matchedDistrict?.provinceId);
            if (matchedDistrict && matchedProvince) {
                const fullAddress = `${matchedCommune.name}, ${matchedDistrict.name}, ${matchedProvince.name}`;
                return { fullAddress, fullCode: normalizedInput, pId: matchedProvince.id, dId: matchedDistrict.id, cId: normalizedInput, vId: null };
            }
        }

        // Check for District (4 digits)
        const matchedDistrict = districts.find((d) => d.id === normalizedInput);
        if (matchedDistrict) {
            const matchedProvince = provinces.find((p) => p.id === matchedDistrict.provinceId);
            if (matchedProvince) {
                const fullAddress = `${matchedDistrict.name}, ${matchedProvince.name}`;
                return { fullAddress, fullCode: normalizedInput, pId: matchedProvince.id, dId: normalizedInput, cId: null, vId: null };
            }
        }

        // Check for Province (2 digits)
        const matchedProvince = provinces.find((p) => p.id === normalizedInput);
        if (matchedProvince) {
            const fullAddress = `${matchedProvince.name}`;
            return { fullAddress, fullCode: normalizedInput, pId: normalizedInput, dId: null, cId: null, vId: null };
        }
        
        return null;
    }

    function lookupCode() {
        const inputCode = $codeInput.val().trim();
        $codeInput.css("border", "1px solid #e0e0e0");
        $outputContainer.addClass("hidden");

        if (!inputCode) {
            $addressContent.text("សូមបញ្ចូលលេខកូដ (ឧ. 23040101, 230401, 2304, ឬ 23)");
            $codeContent.text(DEFAULT_CODE_TEXT);
            $copyAddressButton.prop("disabled", true);
            $copyCodeButton.prop("disabled", true);
            $lookupButton.prop("disabled", true); 
            return;
        }

        if (!isNumericString(inputCode) || inputCode.length > 8 || inputCode.length < 2 || inputCode.length % 2 !== 0) {
              $addressContent.text(`លេខកូដ "${inputCode}" មិនត្រឹមត្រូវតាមទម្រង់។ ត្រូវតែជាលេខ ២, ៤, ៦, ឬ ៨ ខ្ទង់។`);
              $codeContent.text(DEFAULT_CODE_TEXT);
              $codeInput.css("border", "1px solid red");
              $lookupButton.prop("disabled", false); 
              return;
        }

        const result = findAddressByCode(inputCode);
        clearDropdowns();

        if (result) {
            $addressContent.text(result.fullAddress);
            $codeContent.text(result.fullCode);
            $copyAddressButton.prop("disabled", false);
            $copyCodeButton.prop("disabled", false);
            $outputContainer.removeClass("hidden");
            
            selectAddressInDropdowns(result.pId, result.dId, result.cId, result.vId);

        } else {
            $addressContent.text(`អាសយដ្ឋាន ឬលេខកូដ "${inputCode}" មិនត្រឹមត្រូវ ឬរកមិនឃើញ`);
            $codeContent.text(DEFAULT_CODE_TEXT);
            $copyAddressButton.prop("disabled", true);
            $copyCodeButton.prop("disabled", true);
            $codeInput.css("border", "1px solid red");
        }
    }


    // ---- Event Handlers Setup ----

    function attachEventHandlers() {
        // Dropdown handlers (Province, District, Commune, Village)
        $province.off("change").on("change", function () {
            if (isProgrammaticSelection) return;
            const selectedProvinceId = $(this).val();
            if (!$province.hasClass("select2-hidden-accessible")) {
                 setupSelect2($province);
            }
            $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", "")).val(null);
            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", "")).val(null);
            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", "")).val(null);
            if (selectedProvinceId) { loadDistrictsOptions(selectedProvinceId, $district); }
            setupSelect2($district); setupSelect2($commune); setupSelect2($village);
            $codeInput.val(""); $codeInput.css("border", "1px solid #e0e0e0"); updateFullAddress();
        });

        $district.off("change").on("change", function () {
            if (isProgrammaticSelection) return;
            const selectedDistrictId = $(this).val();
            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", "")).val(null);
            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", "")).val(null);
            if (selectedDistrictId) { loadCommunesOptions(selectedDistrictId, $commune); }
            setupSelect2($village); $codeInput.val(""); $codeInput.css("border", "1px solid #e0e0e0"); updateFullAddress();
        });

        $commune.off("change").on("change", function () {
            if (isProgrammaticSelection) return;
            const selectedCommuneId = $(this).val();
            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", "")).val(null);
            if (selectedCommuneId) { loadVillagesOptions(selectedCommuneId, $village); }
            $codeInput.val(""); $codeInput.css("border", "1px solid #e0e0e0"); updateFullAddress();
        });

        $village.off("change").on("change", function() {
            if (isProgrammaticSelection) return;
            $codeInput.val(""); $codeInput.css("border", "1px solid #e0e0e0"); updateFullAddress();
        });

        // Lookup Handlers
        $lookupButton.off("click").on("click", lookupCode);
        $codeInput.off("keypress").on("keypress", function (e) {
            if (e.which === 13) { e.preventDefault(); lookupCode(); }
        });
        $codeInput.off("input").on("input", function () {
            const inputVal = $(this).val().trim();
            $lookupButton.prop("disabled", !inputVal); 
            if (inputVal === "") { updateFullAddress(); $codeInput.css("border", "1px solid #e0e0e0"); }
        });

        // Copy Handlers
        $copyAddressButton.off("click").on("click", function () {
            const textToCopy = $addressContent.text().trim();
            copyTextToClipboard($(this), textToCopy);
        });

        $copyCodeButton.off("click").on("click", function () {
            const textToCopy = $codeContent.text().trim();
            if (textToCopy && textToCopy !== DEFAULT_CODE_TEXT) { copyTextToClipboard($(this), textToCopy); }
        });

        // ✅ NEW: Music Control Handler
        $musicToggleIcon.off("click").on("click", toggleMusic); 
    }

    // Run Initialization and attach events
    attachEventHandlers(); 
    loadDataAndInitialize();
});