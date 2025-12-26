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
  function formatNameKhmerOnly(item) {
    if (!item) return "";
    return `<b>${item.classKh || ""}</b> ${item.khmer_name || ""}`.trim();
  }

  function formatNameEnglishOnly(item) {
    if (!item) return "";
    return `<b>${item.classEn || ""}</b> ${item.name || ""}`.trim();
  }

  function formatNameForDropdown(item) {
    if (!item) return "";
    const kh = `${item.classKh || ""} ${item.khmer_name || ""}`.trim();
    const en = `${item.classEn || ""} ${item.name || ""}`.trim();
    return `${kh} / ${en}`;
  }

  function showCopyFeedback($btn) {
    const originalContent = $btn.html();
    $btn.html('✓ Copied!').addClass('btn-success').css('pointer-events', 'none');
    setTimeout(() => {
      $btn.html(originalContent).removeClass('btn-success').css('pointer-events', 'auto');
    }, 2000);
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
      // Both now use .join(" ") to remove all commas
      $addressContent.html(khParts.join(" "));      
      $addressContentEn.html(enParts.join(" "));   
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

    // --- Copy Buttons ---
    $copyAddressButton.on("click", function () {
      const text = $addressContent.text(); 
      if (text !== DEFAULT_ADDRESS_TEXT) {
        copyTextToClipboard($(this), text);
        showCopyFeedback($(this));
      }
    });

    $copyAddressButtonEn.on("click", function () {
      const text = $addressContentEn.text(); 
      if (text) {
        copyTextToClipboard($(this), text);
        showCopyFeedback($(this));
      }
    });

    $copyCodeButton.on("click", function () { 
      const text = $codeContent.text();
      if (text !== DEFAULT_CODE_TEXT) {
        copyTextToClipboard($(this), text);
        showCopyFeedback($(this));
      }
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
      
      $addressContent.html(res.khmerOnly);
      $addressContentEn.html(res.englishOnly);
      $codeContent.text(code);
      $outputContainer.removeClass("hidden");
      
      setTimeout(() => { isProgrammaticSelection = false; }, 100);
    }
  }

  function findInDb(code) {
    const v = db.villages.find(i => i.id === code);
    const c = v ? db.communes.find(i => i.id === v.communeId) : db.communes.find(i => i.id === code);
    
    if (c) {
      const d = db.districts.find(i => i.id === c.districtId);
      const p = db.provinces.find(i => i.id === d?.provinceId);
      const items = [v, c, d, p].filter(Boolean);

      return { 
        khmerOnly: items.map(formatNameKhmerOnly).join(" "),
        // Changed to join(" ") to remove commas
        englishOnly: items.map(formatNameEnglishOnly).join(" "),
        pId: p?.id, dId: d?.id, cId: c?.id, vId: v?.id 
      };
    }
    return null;
  }
});