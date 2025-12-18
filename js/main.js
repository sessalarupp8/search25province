// js/main.js
import { loadGeographicalData } from './modules/data_loader.js';
import { isNumericString, copyTextToClipboard } from './modules/ui_utils.js';
import { setupMusicPlayer } from './modules/audio_controller.js';

$(document).ready(async function () {
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
    const $musicToggleIcon = $("#musicToggleIcon");

    // --- Constants & State ---
    const DEFAULT_ADDRESS_TEXT = "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";
    const DEFAULT_CODE_TEXT = "N/A";
    let db = { provinces: [], districts: [], communes: [], villages: [] };
    let isProgrammaticSelection = false; 

    // --- Audio Init ---
    const toggleMusic = setupMusicPlayer(document.getElementById('backgroundMusic'), $musicToggleIcon);
    $musicToggleIcon.on("click", toggleMusic);

    // --- Select2 Helper ---
    function setupSelect2($select) {
        if ($select.hasClass("select2-hidden-accessible")) {
            $select.select2("destroy");
        }
        const placeholder = $select.find("option:first").text();
        $select.select2({
            placeholder: placeholder,
            allowClear: true,
            width: "100%", // Force to fill the card width
            dropdownParent: $(document.body),
        });
        if (!$select.val()) {
            $select.val(null).trigger("change.select2");
        }
    }

    // --- Address Logic Functions ---
    function updateFullAddress() {
        const inputCode = $codeInput.val().trim();
        if (isProgrammaticSelection || inputCode !== "") {
            $outputContainer.addClass("hidden");
            $lookupButton.prop("disabled", !inputCode); 
            return;
        }

        const pVal = $province.val();
        const dVal = $district.val();
        const cVal = $commune.val();
        const vVal = $village.val();

        let addressParts = [];
        let finalCode = DEFAULT_CODE_TEXT;

        if (vVal) { addressParts.push($village.find("option:selected").text()); finalCode = vVal; }
        if (cVal) { addressParts.push($commune.find("option:selected").text()); if (finalCode === DEFAULT_CODE_TEXT) finalCode = cVal; }
        if (dVal) { addressParts.push($district.find("option:selected").text()); if (finalCode === DEFAULT_CODE_TEXT) finalCode = dVal; }
        if (pVal) { addressParts.push($province.find("option:selected").text()); if (finalCode === DEFAULT_CODE_TEXT) finalCode = pVal; }

        if (addressParts.length > 0) {
            $addressContent.text(addressParts.join(', '));
            $codeContent.text(finalCode);
            $copyAddressButton.prop("disabled", false);
            $copyCodeButton.prop("disabled", false);
            $outputContainer.removeClass("hidden");
        } else {
            $addressContent.text(DEFAULT_ADDRESS_TEXT);
            $codeContent.text(DEFAULT_CODE_TEXT);
            $outputContainer.addClass("hidden");
        }
    }

    function lookupCode() {
        const inputCode = $codeInput.val().trim();
        $codeInput.css("border", "1px solid #e0e0e0");

        if (!isNumericString(inputCode) || inputCode.length < 2 || inputCode.length % 2 !== 0) {
            $addressContent.text("លេខកូដមិនត្រឹមត្រូវ (ត្រូវមាន ២, ៤, ៦, ឬ ៨ ខ្ទង់)");
            $codeInput.css("border", "1px solid red");
            return;
        }

        const res = findAddressInDb(inputCode);
        if (res) {
            isProgrammaticSelection = true;
            $province.val(res.pId).trigger("change");
            
            $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
            db.districts.filter(d => d.provinceId === res.pId).forEach(d => $district.append(new Option(d.name, d.id)));
            $district.val(res.dId).trigger("change.select2");

            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
            db.communes.filter(c => c.districtId === res.dId).forEach(c => $commune.append(new Option(c.name, c.id)));
            $commune.val(res.cId).trigger("change.select2");

            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", ""));
            if (res.cId) {
                db.villages.filter(v => v.communeId === res.cId).forEach(v => $village.append(new Option(v.name, v.id)));
            }
            $village.val(res.vId).trigger("change.select2");

            $addressContent.text(res.fullAddress);
            $codeContent.text(res.fullCode);
            $outputContainer.removeClass("hidden");
            isProgrammaticSelection = false;
        } else {
            $addressContent.text("រកមិនឃើញលេខកូដនេះទេ");
            $codeInput.css("border", "1px solid red");
        }
    }

    function findAddressInDb(code) {
        const v = db.villages.find(i => i.id === code);
        if (v) {
            const c = db.communes.find(i => i.id === v.communeId);
            const d = db.districts.find(i => i.id === c?.districtId);
            const p = db.provinces.find(i => i.id === d?.provinceId);
            return { fullAddress: `${v.name}, ${c.name}, ${d.name}, ${p.name}`, fullCode: code, pId: p.id, dId: d.id, cId: c.id, vId: v.id };
        }
        const c = db.communes.find(i => i.id === code);
        if (c) {
            const d = db.districts.find(i => i.id === c.districtId);
            const p = db.provinces.find(i => i.id === d?.provinceId);
            return { fullAddress: `${c.name}, ${d.name}, ${p.name}`, fullCode: code, pId: p.id, dId: d.id, cId: c.id, vId: null };
        }
        const d = db.districts.find(i => i.id === code);
        if (d) {
            const p = db.provinces.find(i => i.id === d.provinceId);
            return { fullAddress: `${d.name}, ${p.name}`, fullCode: code, pId: p.id, dId: d.id, cId: null, vId: null };
        }
        const p = db.provinces.find(i => i.id === code);
        if (p) return { fullAddress: p.name, fullCode: code, pId: p.id, dId: null, cId: null, vId: null };
        return null;
    }

    // --- Initialization ---
    try {
        db = await loadGeographicalData();
        $province.empty().append(new Option("សូមជ្រើសរើសរាជធានី / ខេត្ត", ""));
        db.provinces.forEach(p => $province.append(new Option(p.name, p.id)));
        
        // Use the defined jQuery variables
        [ $province, $district, $commune, $village ].forEach(setupSelect2);
        
        attachHandlers();
    } catch (e) { console.error("Load Error", e); }

    function attachHandlers() {
        $province.on("change", function() {
            if (isProgrammaticSelection) return;
            const pid = $(this).val();
            $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
            if (pid) db.districts.filter(d => d.provinceId === pid).forEach(d => $district.append(new Option(d.name, d.id)));
            setupSelect2($district);
            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", ""));
            updateFullAddress();
        });

        $district.on("change", function() {
            if (isProgrammaticSelection) return;
            const did = $(this).val();
            $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
            if (did) db.communes.filter(c => c.districtId === did).forEach(c => $commune.append(new Option(c.name, c.id)));
            setupSelect2($commune);
            updateFullAddress();
        });

        $commune.on("change", function() {
            if (isProgrammaticSelection) return;
            const cid = $(this).val();
            $village.empty().append(new Option("សូមជ្រើសរើសភូមិ / ក្រុម", ""));
            if (cid) db.villages.filter(v => v.communeId === cid).forEach(v => $village.append(new Option(v.name, v.id)));
            setupSelect2($village);
            updateFullAddress();
        });

        $village.on("change", updateFullAddress);
        $lookupButton.on("click", lookupCode);
        $codeInput.on("keypress", (e) => { if(e.which === 13) lookupCode(); });
        
        $copyAddressButton.on("click", function() {
            copyTextToClipboard($(this), $addressContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT);
        });
        $copyCodeButton.on("click", function() {
            copyTextToClipboard($(this), $codeContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT);
        });
    }
});