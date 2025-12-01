$(document).ready(function () {
  const $province = $("#provinceSelect");
  const $district = $("#districtSelect");
  const $commune = $("#communeSelect");
  const $codeInput = $("#codeInput");
  const $lookupButton = $("#lookupButton");
  const $addressContent = $("#addressContent");
  const $codeContent = $("#codeContent");
  const $copyAddressButton = $("#copyAddressButton");
  const $copyCodeButton = $("#copyCodeButton");
  
  // Reference to the output container for show/hide functionality
  const $outputContainer = $(".final-output-container");

  const DEFAULT_ADDRESS_TEXT =
    "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";
  const DEFAULT_CODE_TEXT = "N/A";

  let provinces = [];
  let districts = [];
  let communes = [];
  let addressMap = {};
  let reverseAddressMap = {}; 

  // --- HELPER FUNCTION: Extracts the first segment of the code (e.g., 30202) ---
  function getCopyCodeText(fullCode) {
      if (!fullCode || fullCode === DEFAULT_CODE_TEXT) {
          return null;
      }
      return fullCode.split('-')[0];
  }

  // --- Utility Functions (setupSelect2, clearDropdowns, copyTextToClipboard) ---

  function setupSelect2($select) {
    $select.select2({
      placeholder: $select.find("option:first").text(),
      allowClear: true,
      width: "resolve",
      dropdownParent: $(document.body),
    });

    $select.on("select2:open", function () {
      const data = $select.data("select2");
      if (!data || !data.$dropdown) return;
      const $dropdown = data.$dropdown;
      const $box = $select.closest(".small-box");
      if ($box.length === 0) return;
      const rect = $box[0].getBoundingClientRect();
      const left = Math.round(rect.left + window.pageXOffset);
      const width = Math.round(rect.width);
      $dropdown.css({
        width: width + "px",
        left: left + "px",
        "box-sizing": "border-box",
      });
    });

    $(window).on("resize.select2-align", function () {
      const data = $select.data("select2");
      if (data && data.$dropdown && data.$dropdown.is(":visible")) {
        const $box = $select.closest(".small-box");
        if ($box.length === 0) return;
        const rect = $box[0].getBoundingClientRect();
        const left = Math.round(rect.left + window.pageXOffset);
        const width = Math.round(rect.width);
        data.$dropdown.css({ left: left + "px", width: width + "px" });
      }
    });
  }

  function clearDropdowns() {
    $province.val(null).trigger("change.select2");
    $district
      .empty()
      .append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""))
      .val(null)
      .trigger("change.select2");
    $commune
      .empty()
      .append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""))
      .val(null)
      .trigger("change.select2");
  }

  function copyTextToClipboard($button, textToCopy) {
    if (!textToCopy || $button.prop("disabled")) return;

    const tempTextarea = $("<textarea>")
      .val(textToCopy)
      .appendTo("body")
      .select();

    try {
      document.execCommand("copy");
      const originalText = $button.text();
      $button.text("ចម្លងរួចរាល់");
      setTimeout(function () {
        $button.text(originalText);
      }, 1500);
    } catch (err) {
      console.error("Could not copy text: ", err);
      alert(`បរាជ័យក្នុងការចម្លង។ សូមចម្លងដោយដៃ៖ ${textToCopy}`);
    } finally {
      tempTextarea.remove();
    }
  }


  // --- MODIFIED: Updates the displayed code and manages visibility ---
  function updateFullAddress() {
    if ($codeInput.val().trim() !== "") {
      return;
    }

    const provinceName = $province.val()
      ? $province.find("option:selected").text()
      : null;
    const districtName = $district.val()
      ? $district.find("option:selected").text()
      : null;
    const communeName = $commune.val()
      ? $commune.find("option:selected").text()
      : null;

    const provinceId = $province.val();
    const districtId = $district.val();
    const communeId = $commune.val();

    if (communeName && districtName && provinceName) {
      const fullAddress = `${communeName} ${districtName} ${provinceName}`;
      const fullCode = `${communeId}-${districtId}-${provinceId}`; // C-D-P format
      
      const displayCode = getCopyCodeText(fullCode); 

      $addressContent.text(fullAddress);
      $codeContent.text(displayCode); 
      
      $copyAddressButton.prop("disabled", false);
      $copyCodeButton.prop("disabled", false);
      
      // SHOW results on successful selection
      $outputContainer.removeClass('hidden'); 
    } else {
      $addressContent.text(DEFAULT_ADDRESS_TEXT);
      $codeContent.text(DEFAULT_CODE_TEXT);

      $copyAddressButton.prop("disabled", true);
      $copyCodeButton.prop("disabled", true);
      
      // HIDE results if selection is incomplete
      $outputContainer.addClass('hidden');
    }
  }
  // -------------------------------------------------------------------------


  // Event listener for the Address Copy button (copies full address text)
  $copyAddressButton.on("click", function () {
    const textToCopy = $addressContent.text().trim();
    copyTextToClipboard($(this), textToCopy);
  });

  // Event listener for Code Copy button (copies the text currently displayed in the box)
  $copyCodeButton.on("click", function () {
    // Since #codeContent only displays the short code, we copy it directly.
    const textToCopy = $codeContent.text().trim();
    
    if (textToCopy && textToCopy !== DEFAULT_CODE_TEXT) {
      copyTextToClipboard($(this), textToCopy);
    }
  });

  // --- CORE LOGIC: Dynamic Code Lookup ---

  function findAddressByCode(code) {
    const normalizedInput = code.trim().toUpperCase();

    // 1. Try reverse lookup by exact address text
    if (reverseAddressMap[normalizedInput]) {
      const pDCcode = reverseAddressMap[normalizedInput];
      const [provinceId, districtId, communeId] = pDCcode.split("-");
      const displayCode = `${communeId}-${districtId}-${provinceId}`;
      return {
        fullAddress: normalizedInput,
        fullCode: displayCode,
      };
    }

    // 2. Try exact code match (P-D-C format) in the addressMap
    if (addressMap[normalizedInput]) {
      const parts = normalizedInput.split("-");
      const [provinceId, districtId, communeId] = parts;
      const displayCode = `${communeId}-${districtId}-${provinceId}`;
      return {
        fullAddress: addressMap[normalizedInput],
        fullCode: displayCode,
      };
    }

    // 3. Try partial code match (P, D, or C ID)
    const isPartialCode = !normalizedInput.includes("-");
    if (isPartialCode) {
      const searchId = parseInt(normalizedInput);
      if (isNaN(searchId)) return null;

      const matchedCommune = communes.find((c) => c.id === searchId);
      if (matchedCommune) {
        const communeName = matchedCommune.name;
        const matchedDistrict = districts.find(
          (d) => d.id === matchedCommune.districtId
        );
        const matchedProvince = provinces.find(
          (p) => p.id === matchedDistrict?.provinceId
        );
        if (matchedDistrict && matchedProvince) {
          const fullAddress = `${communeName} ${matchedDistrict.name} ${matchedProvince.name}`;
          const reconstructedCode = `${matchedCommune.id}-${matchedDistrict.id}-${matchedProvince.id}`;
          return { fullAddress, fullCode: reconstructedCode };
        }
      }

      const matchedDistrict = districts.find((d) => d.id === searchId);
      if (matchedDistrict) {
        const matchedProvince = provinces.find(
          (p) => p.id === matchedDistrict.provinceId
        );
        if (matchedProvince) {
          const fullAddress = `${matchedDistrict.name} ${matchedProvince.name}`;
          const reconstructedCode = `${matchedDistrict.id}-${matchedProvince.id}`;
          return { fullAddress, fullCode: reconstructedCode };
        }
      }

      const matchedProvince = provinces.find((p) => p.id === searchId);
      if (matchedProvince) {
        const fullAddress = `${matchedProvince.name}`;
        const reconstructedCode = `${matchedProvince.id}`; 
        return { fullAddress, fullCode: reconstructedCode };
      }
    }

    return null; 
  }

  // --- MODIFIED: Updates the displayed code and manages visibility ---
  function lookupCode() {
    const inputCode = $codeInput.val().trim();
    clearDropdowns();
    $codeInput.css("border", "1px solid #e0e0e0");

    // HIDE container immediately on new search attempt
    $outputContainer.addClass('hidden');

    if (!inputCode) {
      $addressContent.text(
        "សូមបញ្ចូលលេខកូដ (ឧ. 230401, 2304, 23, ឬ អាសយដ្ឋានពេញលេញ)"
      );
      $codeContent.text(DEFAULT_CODE_TEXT);
      $copyAddressButton.prop("disabled", true);
      $copyCodeButton.prop("disabled", true);
      return;
    }

    const result = findAddressByCode(inputCode);

    if (result) {
      const displayCode = getCopyCodeText(result.fullCode); 

      $addressContent.text(result.fullAddress);
      $codeContent.text(displayCode); 
      $copyAddressButton.prop("disabled", false);
      $copyCodeButton.prop("disabled", false);
      
      // SHOW results on successful lookup
      $outputContainer.removeClass('hidden'); 
    } else {
      $addressContent.text(
        `អាសយដ្ឋាន ឬលេខកូដ "${inputCode}" មិនត្រឹមត្រូវ ឬរកមិនឃើញ`
      );
      $codeContent.text(DEFAULT_CODE_TEXT);
      $copyAddressButton.prop("disabled", true);
      $copyCodeButton.prop("disabled", true);
      $codeInput.css("border", "1px solid red");
      
      // HIDE results on failure
      $outputContainer.addClass('hidden'); 
    }
  }
  // -------------------------------------------------------------------------


  async function loadDataAndInitialize() {
    let data;

    try {
      const response = await fetch("datas.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
    } catch (error) {
      console.error("Failed to load datas.json:", error);
      $addressContent.text(
        `បរាជ័យក្នុងការផ្ទុកទិន្នន័យ (ពិនិត្យ Console សម្រាប់ Error: ${error.message})`
      );
      $codeContent.text(DEFAULT_CODE_TEXT);
      $copyAddressButton.prop("disabled", true);
      $copyCodeButton.prop("disabled", true);
      return;
    }

    provinces = data.provinces || [];
    districts = data.districts || [];
    communes = data.communes || [];
    addressMap = data.addressMap || {};

    for (const code in addressMap) {
      reverseAddressMap[addressMap[code].trim().toUpperCase()] = code;
    }

    provinces.forEach((item) => {
      $province.append(new Option(item.name, item.id));
    });

    $province.on("change", function () {
      const selectedProvinceId = parseInt($(this).val());
      $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
      $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
      if (selectedProvinceId) {
        const filtered = districts.filter(
          (d) => d.provinceId === selectedProvinceId
        );
        filtered.forEach((d) => {
          $district.append(new Option(d.name, d.id));
        });
      }
      $district.val(null).trigger("change.select2");
      $commune.val(null).trigger("change.select2");
      $codeInput.val("");
      $codeInput.css("border", "1px solid #e0e0e0");
      updateFullAddress();
    });

    $district.on("change", function () {
      const selectedDistrictId = parseInt($(this).val());
      $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));
      if (selectedDistrictId) {
        const filtered = communes.filter(
          (c) => c.districtId === selectedDistrictId
        );
        filtered.forEach((c) => {
          $commune.append(new Option(c.name, c.id));
        });
      }
      $commune.val(null).trigger("change.select2");
      updateFullAddress();
    });

    $commune.on("change", updateFullAddress);

    $lookupButton.on("click", lookupCode);

    $codeInput.on("keypress", function (e) {
      if (e.which === 13) {
        e.preventDefault();
        lookupCode();
      }
    });

    $codeInput.on("input", function () {
      if ($(this).val().trim() === "") {
        updateFullAddress();
        $codeInput.css("border", "1px solid #e0e0e0");
      }
    });

    setupSelect2($province);
    setupSelect2($district);
    setupSelect2($commune);
    
    // Initial check: if nothing is selected/entered, hide the output
    updateFullAddress(); 
  }

  loadDataAndInitialize();
});