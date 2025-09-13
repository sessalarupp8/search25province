$(document).ready(function () {
  const $province = $('#provinceSelect');
  const $district = $('#districtSelect');

  // Example: if you already load provinces/districts from data.js, keep that.
  // Populate provinces (if not already populated)
  if (typeof provinces !== 'undefined') {
    provinces.forEach(item => {
      // only append if not exists (prevents duplicates on reload)
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
      width: 'resolve',        // let select2 compute initial width
      dropdownParent: $(document.body) // keep dropdown attached to body for proper stacking/overflow
    });

    // When dropdown opens, align and size it exactly to the small-box
    $select.on('select2:open', function () {
      const data = $select.data('select2');
      if (!data || !data.$dropdown) return;

      const $dropdown = data.$dropdown;
      const $box = $select.closest('.small-box');

      if ($box.length === 0) return;

      // compute bounding rect and page offset
      const rect = $box[0].getBoundingClientRect();
      const left = Math.round(rect.left + window.pageXOffset);
      const width = Math.round(rect.width);

      // set width and left so dropdown matches small-box exactly
      $dropdown.css({
        width: width + 'px',
        left: left + 'px',
        // leave top to Select2 default so it picks above/below intelligently
        'box-sizing': 'border-box'
      });

      // ensure each option text is single-line ellipsis and set tooltip
      $dropdown.find('.select2-results__option').each(function () {
        const $opt = $(this);
        // set title so full text shows on hover
        $opt.attr('title', $opt.text().trim());
        // reinforce ellipsis (in case other CSS overrides)
        $opt.css({
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        });
      });

      // ensure selected rendered element also uses ellipsis
      data.$container.find('.select2-selection__rendered').css({
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis'
      });
    });

    // If window resized while dropdown is open, update alignment
    $(window).on('resize.select2-align', function () {
      // if this select has an open dropdown, realign it
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

  // Initialize both selects
  setupSelect2($province);
  setupSelect2($district);

  // Province -> District dependent dropdown
  $province.on("change", function () {
    const selectedProvinceId = $(this).val();

    // Reset district dropdown options
    $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));

    if (typeof districts !== 'undefined' && selectedProvinceId) {
      const filtered = districts.filter(d => d.provinceId === parseInt(selectedProvinceId));
      filtered.forEach(d => {
        $district.append(new Option(d.name, d.id));
      });
    }

    // Let Select2 update internally. If it's open, close it so user can re-open aligned
    $district.val(null).trigger('change');
  });

  // OPTIONAL: close any open Select2 if user scrolls the page to avoid mis-positioning
  $(window).on('scroll.select2-close', function () {
    $('.select2').each(function () {
      try { $(this).select2('close'); } catch (e) { /* ignore */ }
    });
  });
});
