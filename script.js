$(document).ready(function () {
  const $province = $('#provinceSelect');
  const $district = $('#districtSelect');
  const $commune = $('#communeSelect');
  const $addressContent = $('#addressContent');
  const $copyButton = $('#copyButton');
  const DEFAULT_ADDRESS_TEXT = "សូមជ្រើសរើស ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និង រាជធានី/ខេត្ត";

  // --- Utility Functions ---

  // Populate provinces (if not already populated)
  if (typeof provinces !== 'undefined') {
    provinces.forEach(item => {
      if ($province.find('option[value="'+item.id+'"]').length === 0) {
        $province.append(new Option(item.name, item.id));
      }
    });
  }

  // Utility: initialize a select2 on a jQuery select, with alignment logic
  function setupSelect2($select) {
    $select.select2({
      placeholder: $select.find('option:first').text(),
      allowClear: true,
      width: 'resolve',
      dropdownParent: $(document.body)
    });

    $select.on('select2:open', function () {
      const data = $select.data('select2');
      if (!data || !data.$dropdown) return;

      const $dropdown = data.$dropdown;
      const $box = $select.closest('.small-box');

      if ($box.length === 0) return;

      const rect = $box[0].getBoundingClientRect();
      const left = Math.round(rect.left + window.pageXOffset);
      const width = Math.round(rect.width);

      $dropdown.css({
        width: width + 'px',
        left: left + 'px',
        'box-sizing': 'border-box'
      });

      $dropdown.find('.select2-results__option').each(function () {
        const $opt = $(this);
        $opt.attr('title', $opt.text().trim());
        $opt.css({
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        });
      });

      data.$container.find('.select2-selection__rendered').css({
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis'
      });
    });

    $(window).on('resize.select2-align', function () {
      const data = $select.data('select2');
      if (data && data.$dropdown && data.$dropdown.is(':visible')) {
        const $box = $select.closest('.small-box');
        if ($box.length === 0) return;
        const rect = $box[0].getBoundingClientRect();
        const left = Math.round(rect.left + window.pageXOffset);
        const width = Math.round(rect.width);
        data.$dropdown.css({ left: left + 'px', width: width + 'px' });
      }
    });
  }

  // --- UPDATED CORE FUNCTION: Update Address Output (using double space) ---
  function updateFullAddress() {
    // Get the name of the selected item, or null if nothing is selected
    const provinceName = $province.val() ? $province.find('option:selected').text() : null;
    const districtName = $district.val() ? $district.find('option:selected').text() : null;
    const communeName = $commune.val() ? $commune.find('option:selected').text() : null;
    
    // Check if all three levels are selected
    if (communeName && districtName && provinceName) {
      // **THE CHANGE IS HERE: Separating with double spaces ('  ')**
      const fullAddress = `${communeName}  ${districtName}  ${provinceName}`;
      
      $addressContent.text(fullAddress);
      $copyButton.prop('disabled', false); // Enable copy button
      
    } else {
      // Display the default message and disable the button
      $addressContent.text(DEFAULT_ADDRESS_TEXT);
      $copyButton.prop('disabled', true);
    }
  }

  // --- Initialization ---

  // Initialize all three selects
  setupSelect2($province);
  setupSelect2($district);
  setupSelect2($commune);
  updateFullAddress(); // Set initial state

  // --- Dependent Dropdown Logic & Address Update ---

  // Province -> District dependent dropdown
  $province.on("change", function () {
    const selectedProvinceId = $(this).val();

    // Reset district and commune dropdowns
    $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));
    $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));

    if (typeof districts !== 'undefined' && selectedProvinceId) {
      const filtered = districts.filter(d => d.provinceId === parseInt(selectedProvinceId));
      filtered.forEach(d => {
        $district.append(new Option(d.name, d.id));
      });
    }

    $district.val(null).trigger('change');
    $commune.val(null).trigger('change');
    updateFullAddress(); // Update address output
  });

  // District -> Commune dependent dropdown
  $district.on("change", function () {
    const selectedDistrictId = $(this).val();

    // Reset commune dropdown
    $commune.empty().append(new Option("សូមជ្រើសរើសឃុំ / សង្កាត់", ""));

    if (typeof communes !== 'undefined' && selectedDistrictId) {
      const filtered = communes.filter(c => c.districtId === parseInt(selectedDistrictId));
      filtered.forEach(c => {
        $commune.append(new Option(c.name, c.id));
      });
    }

    $commune.val(null).trigger('change');
    updateFullAddress(); // Update address output
  });
  
  // Commune selection is the final trigger for a complete address
  $commune.on("change", function() {
      updateFullAddress();
  });

  // --- Copy to Clipboard Functionality ---
  
  $copyButton.on('click', function() {
    const textToCopy = $addressContent.text();
    
    if (textToCopy && !$copyButton.prop('disabled')) {
        // Use the modern navigator.clipboard API
        navigator.clipboard.writeText(textToCopy).then(function() {
            // Change button text temporarily to confirm copy
            const originalText = $copyButton.text();
            $copyButton.text('✓ ចម្លងរួចរាល់'); 
            
            setTimeout(function() {
                $copyButton.text(originalText);
            }, 1500); // Revert back after 1.5 seconds
            
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            alert('បរាជ័យក្នុងការចម្លង។ សូមចម្លងដោយដៃ។');
        });
    }
  });

  // OPTIONAL: close any open Select2 if user scrolls the page
  $(window).on('scroll.select2-close', function () {
    $('.select2').each(function () {
      try { $(this).select2('close'); } catch (e) { /* ignore */ }
    });
  });
});