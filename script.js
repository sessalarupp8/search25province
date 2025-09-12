$(document).ready(function () {
  const $province = $('#provinceSelect');
  const $district = $('#districtSelect');

  // Populate province dropdown using the 'provinces' array
  provinces.forEach(item => {
    $province.append(new Option(item.name, item.id));
  });

  // Init Select2 for both dropdowns
  $province.select2({
    placeholder: "សូមជ្រើសរើសខេត្ត",
    allowClear: true
  });

  $district.select2({
    placeholder: "សូមជ្រើសរើសស្រុក / ខណ្ឌ",
    allowClear: true
  });

  // Province -> District dependent dropdown
  $province.on("change", function () {
    const selectedProvinceId = $(this).val();

    // Reset the district dropdown
    $district.empty().append(new Option("សូមជ្រើសរើសស្រុក / ខណ្ឌ", ""));

    // Filter districts based on the selected province's ID
    if (selectedProvinceId) {
      const filteredDistricts = districts.filter(d => d.provinceId === parseInt(selectedProvinceId));
      
      // Populate the district dropdown with the filtered results
      filteredDistricts.forEach(d => {
        $district.append(new Option(d.name, d.id));
      });
    }

    // Trigger Select2 to update the dropdown's appearance
    $district.trigger('change');
  });
});