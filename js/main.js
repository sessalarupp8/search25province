// js/main.js
import { loadGeographicalData } from "./modules/data_loader.js";
import { isNumericString, copyTextToClipboard } from "./modules/ui_utils.js";
import { setupMusicPlayer } from "./modules/audio_controller.js";

$(document).ready(async function () {
  // --- Selectors ---
  const $province = $("#provinceSelect"),
    $district = $("#districtSelect"),
    $commune = $("#communeSelect"),
    $village = $("#villageSelect"),
    $codeInput = $("#codeInput"),
    $lookupButton = $("#lookupButton"),
    $addressContent = $("#addressContent"),
    $codeContent = $("#codeContent"),
    $copyAddressButton = $("#copyAddressButton"),
    $copyCodeButton = $("#copyCodeButton"),
    $outputContainer = $(".final-output-container"),
    $musicToggleIcon = $("#musicToggleIcon");

  const DEFAULT_ADDRESS_TEXT = "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";
  const DEFAULT_CODE_TEXT = "N/A";
  let db = { provinces: [], districts: [], communes: [], villages: [] };
  let isProgrammaticSelection = false;

  // --- Audio ---
  const toggleMusic = setupMusicPlayer(
    document.getElementById("backgroundMusic"),
    $musicToggleIcon
  );
  $musicToggleIcon.on("click", toggleMusic);

  // --- Helpers ---
  function resetSelect($el, placeholderText) {
    $el.empty().append(new Option(placeholderText, ""));
    $el.val(null).trigger("change.select2");
  }

  function setupSelect2($select) {
    if ($select.hasClass("select2-hidden-accessible"))
      $select.select2("destroy");
    $select.select2({
      placeholder: $select.find("option:first").text(),
      allowClear: true,
      width: "100%",
      dropdownParent: $(document.body),
    });
  }

  function formatNameWithClass(item) {
    if (!item) return "";
    const className = item.class ? item.class.trim() : "";
    const itemName = (item.khmer_name || item.name || "").trim();
    return `${className} ${itemName}`.trim();
  }

  // --- Logic: Update Result UI & Sync ID ---
  function updateFullAddress() {
    if (isProgrammaticSelection) return;

    let parts = [],
      finalCode = DEFAULT_CODE_TEXT;
    const pVal = $province.val(),
      dVal = $district.val(),
      cVal = $commune.val(),
      vVal = $village.val();

    if (vVal) {
      const item = db.villages.find((i) => i.id === vVal);
      parts.push(formatNameWithClass(item));
      finalCode = vVal;
    }
    if (cVal) {
      const item = db.communes.find((i) => i.id === cVal);
      parts.push(formatNameWithClass(item));
      if (finalCode === DEFAULT_CODE_TEXT) finalCode = cVal;
    }
    if (dVal) {
      const item = db.districts.find((i) => i.id === dVal);
      parts.push(formatNameWithClass(item));
      if (finalCode === DEFAULT_CODE_TEXT) finalCode = dVal;
    }
    if (pVal) {
      const item = db.provinces.find((i) => i.id === pVal);
      parts.push(formatNameWithClass(item));
      if (finalCode === DEFAULT_CODE_TEXT) finalCode = pVal;
    }

    if (parts.length > 0 && pVal) {
      // FIXED: Changed join(", ") to join(" ")
      $addressContent.text(parts.join(" "));
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
    $province.empty().append(new Option("សូមជ្រើសរើស រាជធានី / ខេត្ត", ""));
    db.provinces.forEach((p) =>
      $province.append(new Option(formatNameWithClass(p), p.id))
    );
    [$province, $district, $commune, $village].forEach(setupSelect2);
    attachHandlers();
  } catch (e) {
    console.error("Load Error:", e);
  }

  function attachHandlers() {
    [$province, $district, $commune, $village].forEach(($el) => {
      $el.on("select2:clear", function () {
        setTimeout(() => {
          const id = $el.attr("id");
          $codeInput.val("");
          if (id === "provinceSelect") {
            resetSelect($district, "សូមជ្រើសរើស ក្រុង / ស្រុក / ខណ្ឌ");
            resetSelect($commune, "សូមជ្រើសរើស ឃុំ / សង្កាត់");
            resetSelect($village, "សូមជ្រើសរើស ភូមិ");
          } else if (id === "districtSelect") {
            resetSelect($commune, "សូមជ្រើសរើស ឃុំ / សង្កាត់");
            resetSelect($village, "សូមជ្រើសរើស ភូមិ");
          } else if (id === "communeSelect") {
            resetSelect($village, "សូមជ្រើសរើស ភូមិ");
          }
          updateFullAddress();
        }, 10);
      });
    });

    $province.on("change", function () {
      if (isProgrammaticSelection) return;
      $codeInput.val("");
      const pid = $(this).val();
      resetSelect($district, "សូមជ្រើសរើសស្រុក / ខណ្ឌ");
      resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
      resetSelect($village, "សូមជ្រើសរើសភូមិ");
      if (pid)
        db.districts
          .filter((d) => d.provinceId === pid)
          .forEach((d) =>
            $district.append(new Option(formatNameWithClass(d), d.id))
          );
      setupSelect2($district);
      updateFullAddress();
    });

    $district.on("change", function () {
      if (isProgrammaticSelection) return;
      $codeInput.val("");
      const did = $(this).val();
      resetSelect($commune, "សូមជ្រើសរើសឃុំ / សង្កាត់");
      resetSelect($village, "សូមជ្រើសរើសភូមិ");
      if (did)
        db.communes
          .filter((c) => c.districtId === did)
          .forEach((c) =>
            $commune.append(new Option(formatNameWithClass(c), c.id))
          );
      setupSelect2($commune);
      updateFullAddress();
    });

    $commune.on("change", function () {
      if (isProgrammaticSelection) return;
      $codeInput.val("");
      const cid = $(this).val();
      resetSelect($village, "សូមជ្រើសរើសភូមិ");
      if (cid)
        db.villages
          .filter((v) => v.communeId === cid)
          .forEach((v) =>
            $village.append(new Option(formatNameWithClass(v), v.id))
          );
      setupSelect2($village);
      updateFullAddress();
    });

    $village.on("change", function () {
      if (isProgrammaticSelection) return;
      $codeInput.val("");
      updateFullAddress();
    });

    $lookupButton.on("click", lookupCode);
    $codeInput.on("input", function () {
      if (!$(this).val()) {
        $outputContainer.addClass("hidden");
        updateFullAddress();
      }
    });

    $copyAddressButton.on("click", function () {
      copyTextToClipboard($(this), $addressContent.text(), DEFAULT_ADDRESS_TEXT, DEFAULT_CODE_TEXT);
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
      db.districts
        .filter((d) => d.provinceId === res.pId)
        .forEach((d) => $district.append(new Option(formatNameWithClass(d), d.id)));
      $district.val(res.dId).trigger("change.select2");

      $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
      if (res.dId)
        db.communes
          .filter((c) => c.districtId === res.dId)
          .forEach((c) => $commune.append(new Option(formatNameWithClass(c), c.id)));
      $commune.val(res.cId).trigger("change.select2");

      $village.empty().append(new Option("សូមជ្រើសរើសភូមិ", ""));
      if (res.cId)
        db.villages
          .filter((v) => v.communeId === res.cId)
          .forEach((v) => $village.append(new Option(formatNameWithClass(v), v.id)));
      if (res.vId) $village.val(res.vId).trigger("change.select2");

      $addressContent.text(res.fullAddress);
      $codeContent.text(code);
      $outputContainer.removeClass("hidden");
      isProgrammaticSelection = false;
    }
  }

  function findInDb(code) {
    const v = db.villages.find((i) => i.id === code);
    if (v) {
      const c = db.communes.find((i) => i.id === v.communeId);
      const d = db.districts.find((i) => i.id === c?.districtId);
      const p = db.provinces.find((i) => i.id === d?.provinceId);
      return {
        // FIXED: Using only spaces
        fullAddress: `${formatNameWithClass(v)} ${formatNameWithClass(c)} ${formatNameWithClass(d)} ${formatNameWithClass(p)}`,
        pId: p.id, dId: d.id, cId: c.id, vId: v.id,
      };
    }

    const c = db.communes.find((i) => i.id === code);
    if (c) {
      const d = db.districts.find((i) => i.id === c.districtId);
      const p = db.provinces.find((i) => i.id === d?.provinceId);
      return {
        fullAddress: `${formatNameWithClass(c)} ${formatNameWithClass(d)} ${formatNameWithClass(p)}`,
        pId: p.id, dId: d.id, cId: c.id, vId: null,
      };
    }

    const d = db.districts.find((i) => i.id === code);
    if (d) {
      const p = db.provinces.find((i) => i.id === d.provinceId);
      return {
        fullAddress: `${formatNameWithClass(d)} ${formatNameWithClass(p)}`,
        pId: p.id, dId: d.id, cId: null, vId: null,
      };
    }

    const p = db.provinces.find((i) => i.id === code);
    if (p) return { fullAddress: formatNameWithClass(p), pId: p.id, dId: null, cId: null, vId: null };
    return null;
  }
});