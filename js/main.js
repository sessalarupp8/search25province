// js/main.js
import { loadGeographicalData } from './modules/data_loader.js';
import { isNumericString, copyTextToClipboard } from './modules/ui_utils.js';
import { setupMusicPlayer } from './modules/audio_controller.js';

$(document).ready(async function () {
    // --- Selectors ---
    const $province = $("#provinceSelect"), $district = $("#districtSelect"),
          $commune = $("#communeSelect"), $village = $("#villageSelect"),
          $codeInput = $("#codeInput"), $lookupButton = $("#lookupButton"),
          $addressContent = $("#addressContent"), $codeContent = $("#codeContent"),
          $copyAddressButton = $("#copyAddressButton"), $copyCodeButton = $("#copyCodeButton"),
          $outputContainer = $(".final-output-container"), $musicToggleIcon = $("#musicToggleIcon");

    const DEFAULT_ADDRESS_TEXT = "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";
    const DEFAULT_CODE_TEXT = "N/A";
    let db = { provinces: [], districts: [], communes: [], villages: [] };
    let isProgrammaticSelection = false; 

    // --- Audio ---
    const toggleMusic = setupMusicPlayer(document.getElementById('backgroundMusic'), $musicToggleIcon);
    $musicToggleIcon.on("click", toggleMusic);

    // --- Helper: Reset Select2 State & Clear Search ---
    function resetSelect($el, placeholderText) {
        $el.empty().append(new Option(placeholderText, ""));
        $el.val(null).trigger("change.select2"); 
    }

    // --- Helper: Initialize Select2 ---
    function setupSelect2($select) {
        if ($select.hasClass("select2-hidden-accessible")) $select.select2("destroy");
        $select.select2({
            placeholder: $select.find("option:first").text(),
            allowClear: true,
            width: "100%",
            dropdownParent: $(document.body)
        });
    }

    // --- Logic: Update Result UI & Sync ID ---
    function updateFullAddress() {
        // If we are currently populating via the "Search" button, don't clear the input
        if (isProgrammaticSelection) return;
        
        let parts = [], finalCode = DEFAULT_CODE_TEXT;
        const pVal = $province.val(), dVal = $district.val(), 
              cVal = $commune.val(), vVal = $village.val();

        // Check values bottom-up to determine the most specific current ID
        if (vVal) { parts.push($village.find("option:selected").text()); finalCode = vVal; }
        if (cVal) { parts.push($commune.find("option:selected").text()); if (finalCode === DEFAULT_CODE_TEXT) finalCode = cVal; }
        if (dVal) { parts.push($district.find("option:selected").text()); if (finalCode === DEFAULT_CODE_TEXT) finalCode = dVal; }
        if (pVal) { parts.push($province.find("option:selected").text()); if (finalCode === DEFAULT_CODE_TEXT) finalCode = pVal; }

        if (parts.length > 0 && pVal) {
            $addressContent.text(parts.join(', '));
            $codeContent.text(finalCode);
            $outputContainer.removeClass("hidden");
        } else {
            $addressContent.text(DEFAULT_ADDRESS_TEXT);
            $codeContent.text(DEFAULT_CODE_TEXT);
            $outputContainer.addClass("hidden");
        }
    }

    // --- Data Load & Init ---
    try {
        db = await loadGeographicalData();
        $province.empty().append(new Option("សូមជ្រើសរើសរាជធានី / ខេត្ត", ""));
        db.provinces.forEach(p => $province.append(new Option(p.name, p.id)));
        [$province, $district, $commune, $village].forEach(setupSelect2);
        attachHandlers();
    } catch (e) { console.error("Load Error:", e); }

    function attachHandlers() {
        // --- 1. HANDLE "X" DELETE ON ALL 4 BOXES ---
        [$province, $district, $commune, $village].forEach($el => {
            $el.on("select2:clear", function () {
                setTimeout(() => {
                    const id = $el.attr('id');
                    // Reset the search input immediately when any "X" is pressed
                    $codeInput.val(""); 

                    if (id === 'provinceSelect') {
                        resetSelect($district, "សូមជ្រើសរើសស្រុក / ខណ្ឌ");
                        resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
                        resetSelect($village, "សូមជ្រើសរើសភូមិ / ក្រុម");
                    } else if (id === 'districtSelect') {
                        resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
                        resetSelect($village, "សូមជ្រើសរើសភូមិ / ក្រុម");
                    } else if (id === 'communeSelect') {
                        resetSelect($village, "សូមជ្រើសរើសភូមិ / ក្រុម");
                    }
                    updateFullAddress();
                }, 10);
            });
        });

        // --- 2. HANDLE NEW CHOICE IN ALL 4 BOXES ---
        $province.on("change", function() {
            if (isProgrammaticSelection) return;
            $codeInput.val(""); // Reset Search ID on new choice
            const pid = $(this).val();
            resetSelect($district, "សូមជ្រើសរើសស្រុក / ខណ្ឌ");
            resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
            resetSelect($village, "សូមជ្រើសរើសភូមិ / ក្រុម");
            if (pid) db.districts.filter(d => d.provinceId === pid).forEach(d => $district.append(new Option(d.name, d.id)));
            setupSelect2($district);
            updateFullAddress();
        });

        $district.on("change", function() {
            if (isProgrammaticSelection) return;
            $codeInput.val(""); // Reset Search ID on new choice
            const did = $(this).val();
            resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
            resetSelect($village, "សូមជ្រើសរើសភូមិ / ក្រុម");
            if (did) db.communes.filter(c => c.districtId === did).forEach(c => $commune.append(new Option(c.name, c.id)));
            setupSelect2($commune);
            updateFullAddress();
        });

        $commune.on("change", function() {
            if (isProgrammaticSelection) return;
            $codeInput.val(""); // Reset Search ID on new choice
            const cid = $(this).val();
            resetSelect($village, "សូមជ្រើសរើសភូមិ / ក្រុម");
            if (cid) db.villages.filter(v => v.communeId === cid).forEach(v => $village.append(new Option(v.name, v.id)));
            setupSelect2($village);
            updateFullAddress();
        });

        $village.on("change", function() {
             if (isProgrammaticSelection) return;
             $codeInput.val(""); // Reset Search ID on new choice
             updateFullAddress();
        });

        // --- 3. SEARCH LOGIC ---
        $lookupButton.on("click", lookupCode);
        $codeInput.on("input", function() { 
            if (!$(this).val()) {
                $outputContainer.addClass("hidden");
                updateFullAddress();
            }
        });
        
        $copyAddressButton.on("click", function() { copyTextToClipboard($(this), $addressContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT); });
        $copyCodeButton.on("click", function() { copyTextToClipboard($(this), $codeContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT); });
    }

    function lookupCode() {
        const code = $codeInput.val().trim();
        if (!isNumericString(code) || code.length < 2) return;
        const res = findInDb(code);
        if (res) {
            isProgrammaticSelection = true;
            // Populate all dropdowns based on the search ID
            $province.val(res.pId).trigger("change.select2");
            
            $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
            db.districts.filter(d => d.provinceId === res.pId).forEach(d => $district.append(new Option(d.name, d.id)));
            $district.val(res.dId).trigger("change.select2");

            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
            if (res.dId) db.communes.filter(c => c.districtId === res.dId).forEach(c => $commune.append(new Option(c.name, c.id)));
            $commune.val(res.cId).trigger("change.select2");

            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", ""));
            if (res.cId) db.villages.filter(v => v.communeId === res.cId).forEach(v => $village.append(new Option(v.name, v.id)));
            if (res.vId) $village.val(res.vId).trigger("change.select2");
            
            $addressContent.text(res.fullAddress);
            $codeContent.text(code);
            $outputContainer.removeClass("hidden");
            isProgrammaticSelection = false;
        }
    }

    function findInDb(code) {
        const v = db.villages.find(i => i.id === code);
        if (v) {
            const c = db.communes.find(i => i.id === v.communeId);
            const d = db.districts.find(i => i.id === c?.districtId);
            const p = db.provinces.find(i => i.id === d?.provinceId);
            return { fullAddress: `${v.name}, ${c.name}, ${d.name}, ${p.name}`, pId: p.id, dId: d.id, cId: c.id, vId: v.id };
        }
        const c = db.communes.find(i => i.id === code);
        if (c) {
            const d = db.districts.find(i => i.id === c.districtId);
            const p = db.provinces.find(i => i.id === d?.provinceId);
            return { fullAddress: `${c.name}, ${d.name}, ${p.name}`, pId: p.id, dId: d.id, cId: c.id, vId: null };
        }
        const d = db.districts.find(i => i.id === code);
        if (d) {
            const p = db.provinces.find(i => i.id === d.provinceId);
            return { fullAddress: `${d.name}, ${p.name}`, pId: p.id, dId: d.id, cId: null, vId: null };
        }
        const p = db.provinces.find(i => i.id === code);
        if (p) return { fullAddress: p.name, pId: p.id, dId: null, cId: null, vId: null };
        return null;
    }
});