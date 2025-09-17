$(document).ready(function () {
  const $province = $('#provinceSelect');
  const $district = $('#districtSelect');
  const $commune = $('#communeSelect');

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

  // Initialize all three selects
  setupSelect2($province);
  setupSelect2($district);
  setupSelect2($commune);

  // Province -> District -> Commune dependent dropdown
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
  });

  // OPTIONAL: close any open Select2 if user scrolls the page
  $(window).on('scroll.select2-close', function () {
    $('.select2').each(function () {
      try { $(this).select2('close'); } catch (e) { /* ignore */ }
    });
  });
});