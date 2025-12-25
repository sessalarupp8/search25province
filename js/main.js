import { loadGeographicalData } from "./modules/data_loader.js";
import { isNumericString, copyTextToClipboard } from "./modules/ui_utils.js";
import { setupMusicPlayer } from "./modules/audio_controller.js";

$(document).ready(async function () {
  const $province = $("#provinceSelect"), $district = $("#districtSelect"),
        $commune = $("#communeSelect"), $village = $("#villageSelect"),
        $codeInput = $("#codeInput"), $lookupButton = $("#lookupButton"),
        $addressContent = $("#addressContent"), $addressContentEn = $("#addressContentEn"),
        $codeContent = $("#codeContent"),
        $copyAddressButton = $("#copyAddressButton"), $copyAddressButtonEn = $("#copyAddressButtonEn"),
        $copyCodeButton = $("#copyCodeButton"),
        $outputContainer = $(".final-output-container"), $musicToggleIcon = $("#musicToggleIcon");

  const DEFAULT_ADDRESS_TEXT = "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";
  const DEFAULT_CODE_TEXT = "N/A";
  let db = { provinces: [], districts: [], communes: [], villages: [] };
  let isProgrammaticSelection = false;

  const toggleMusic = setupMusicPlayer(document.getElementById("backgroundMusic"), $musicToggleIcon);
  $musicToggleIcon.on("click", toggleMusic);

  // --- Helpers ---
  function formatNameForDropdown(item) {
    if (!item) return "";
    const label = `${item.class || ""} ${item.khmer_name || ""}`.trim();
    return item.name ? `${label} / ${item.name}` : label;
  }

  function formatNameKhmerOnly(item) {
    if (!item) return "";
    return `${item.class || ""} ${item.khmer_name || ""}`.trim();
  }

  function formatNameEnglishOnly(item) {
    if (!item) return "";
    return (item.name || "").trim();
  }

  function resetSelect($el, placeholderText) {
    $el.empty().append(new Option(placeholderText, ""));
    $el.val(null).trigger("change.select2");
  }

  function setupSelect2($select) {
    if ($select.hasClass("select2-hidden-accessible")) $select.select2("destroy");
    $select.select2({
      placeholder: $select.find("option:first").text(),
      allowClear: true, width: "100%", dropdownParent: $(document.body)
    });
  }

  function updateFullAddress() {
    if (isProgrammaticSelection) return;

    let khParts = [], enParts = [], finalCode = DEFAULT_CODE_TEXT;
    const selections = [
      { val: $village.val(), list: db.villages },
      { val: $commune.val(), list: db.communes },
      { val: $district.val(), list: db.districts },
      { val: $province.val(), list: db.provinces }
    ];

    selections.forEach(sel => {
      if (sel.val) {
        const item = sel.list.find(i => i.id === sel.val);
        if (item) {
          khParts.push(formatNameKhmerOnly(item));
          enParts.push(formatNameEnglishOnly(item));
          if (finalCode === DEFAULT_CODE_TEXT) finalCode = sel.val;
        }
      }
    });

    if (khParts.length > 0 && $province.val()) {
      $addressContent.text(khParts.join(" "));
      $addressContentEn.text(enParts.join(" "));
      $codeContent.text(finalCode);
      $outputContainer.removeClass("hidden");
    } else {
      $addressContent.text(DEFAULT_ADDRESS_TEXT);
      $addressContentEn.text("");
      $codeContent.text(DEFAULT_CODE_TEXT);
      $outputContainer.addClass("hidden");
    }
  }

  // --- Data Load & Init ---
  try {
    db = await loadGeographicalData();
    $province.empty().append(new Option("សូមជ្រើសរើស រាជធានី / ខេត្ត", ""));
    db.provinces.forEach(p => $province.append(new Option(formatNameForDropdown(p), p.id)));
    [$province, $district, $commune, $village].forEach(setupSelect2);
    attachHandlers();
  } catch (e) { console.error("Load Error:", e); }

  function attachHandlers() {
    $province.on("change", function () {
      if (isProgrammaticSelection) return;
      const pid = $(this).val();
      resetSelect($district, "សូមជ្រើសរើសស្រុក / ខណ្ឌ");
      resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
      resetSelect($village, "សូមជ្រើសរើសភូមិ");
      if (pid) db.districts.filter(d => d.provinceId === pid).forEach(d => $district.append(new Option(formatNameForDropdown(d), d.id)));
      setupSelect2($district); updateFullAddress();
    });

    $district.on("change", function () {
      if (isProgrammaticSelection) return;
      const did = $(this).val();
      resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
      resetSelect($village, "សូមជ្រើសរើសភូមិ");
      if (did) db.communes.filter(c => c.districtId === did).forEach(c => $commune.append(new Option(formatNameForDropdown(c), c.id)));
      setupSelect2($commune); updateFullAddress();
    });

    $commune.on("change", function () {
      if (isProgrammaticSelection) return;
      const cid = $(this).val();
      resetSelect($village, "សូមជ្រើសរើសភូមិ");
      if (cid) db.villages.filter(v => v.communeId === cid).forEach(v => $village.append(new Option(formatNameForDropdown(v), v.id)));
      setupSelect2($village); updateFullAddress();
    });

    $village.on("change", updateFullAddress);
    $lookupButton.on("click", lookupCode);

    // --- Copy Buttons (Clean text, no labels) ---
    $copyAddressButton.on("click", function () {
      copyTextToClipboard($(this), $addressContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT);
    });

    $copyAddressButtonEn.on("click", function () {
      copyTextToClipboard($(this), $addressContentEn.text(), "N/A", DEFAULT_CODE_TEXT);
    });

    $copyCodeButton.on("click", function () { 
      copyTextToClipboard($(this), $codeContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT); 
    });
  }

  function lookupCode() {
    const code = $codeInput.val().trim();
    if (!isNumericString(code) || code.length < 2) return;
    const res = findInDb(code);
    if (res) {
      isProgrammaticSelection = true;
      $province.val(res.pId).trigger("change.select2");
      $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
      db.districts.filter(d => d.provinceId === res.pId).forEach(d => $district.append(new Option(formatNameForDropdown(d), d.id)));
      $district.val(res.dId).trigger("change.select2");
      $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
      if (res.dId) db.communes.filter(c => c.districtId === res.dId).forEach(c => $commune.append(new Option(formatNameForDropdown(c), c.id)));
      $commune.val(res.cId).trigger("change.select2");
      $village.empty().append(new Option("សូមជ្រើសរើសភូមិ", ""));
      if (res.cId) db.villages.filter(v => v.communeId === res.cId).forEach(v => $village.append(new Option(formatNameForDropdown(v), v.id)));
      if (res.vId) $village.val(res.vId).trigger("change.select2");
      
      $addressContent.text(res.khmerOnly);
      $addressContentEn.text(res.englishOnly);
      $codeContent.text(code);
      $outputContainer.removeClass("hidden");
      isProgrammaticSelection = false;
    }
  }

  function findInDb(code) {
    const v = db.villages.find(i => i.id === code);
    if (v) {
      const c = db.communes.find(i => i.id === v.communeId), d = db.districts.find(i => i.id === c?.districtId), p = db.provinces.find(i => i.id === d?.provinceId);
      return { 
        khmerOnly: `${formatNameKhmerOnly(v)} ${formatNameKhmerOnly(c)} ${formatNameKhmerOnly(d)} ${formatNameKhmerOnly(p)}`,
        englishOnly: `${formatNameEnglishOnly(v)} ${formatNameEnglishOnly(c)} ${formatNameEnglishOnly(d)} ${formatNameEnglishOnly(p)}`,
        pId: p.id, dId: d.id, cId: c.id, vId: v.id 
      };
    }
    const c = db.communes.find(i => i.id === code);
    if (c) {
      const d = db.districts.find(i => i.id === c.districtId), p = db.provinces.find(i => i.id === d?.provinceId);
      return { 
        khmerOnly: `${formatNameKhmerOnly(c)} ${formatNameKhmerOnly(d)} ${formatNameKhmerOnly(p)}`,
        englishOnly: `${formatNameEnglishOnly(c)} ${formatNameEnglishOnly(d)} ${formatNameEnglishOnly(p)}`,
        pId: p.id, dId: d.id, cId: c.id, vId: null 
      };
    }
    return null;
  }
});