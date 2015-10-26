$(function() {

  var $mostRecentRegion = '',
      $selectedRegion = '',
      $selectedRegionMap = '',
      $selectedRegionName = '';



  $('.region-container').not($selectedRegion).hover(function() {
    var $this = $(this),
        $regionID = $this.attr('id'),
        $regionOption = $('#regionSelect optgroup[data-optregion="' + $regionID + '"]'),
        $regionName = $regionOption.attr('label');

    $('.map-legend').show().removeClass('disabled');
    $('#hoveredRegionName').text($regionName);

  }, function() {

    if($selectedRegionName != '') {
      $('#hoveredRegionName').text($selectedRegionName);
    }

  });



  $('.svg-map').on('mouseleave', function() {
    if($selectedRegionName == '') {
      $('.map-legend').fadeOut();
    } else {
      $('.map-legend').addClass('disabled');
    }
  });




  $('.region-container').on('click', function() {
    var $this = $(this),
        $regionNameID = $this.attr('id'),
        $regEl = $('#regionSelect optgroup[data-optregion="' + $regionNameID + '"]');

    selectRegion($this, $regEl);
  });


function selectRegion(regionContainer, regionElement) {
    var regionName = regionElement.attr('label');

    $selectedRegion = regionContainer;
    $selectedRegionMap = regionElement;

    $('#selectLocationBlurb').hide().attr('aria-hidden', true);
    $('#locationSelectedContainer').addClass('hidden').attr('aria-hidden', true);

    $("#frameworkPref1 option, #frameworkPref2 option").attr('selected', false);
    $("#frameworkPref1, #frameworkPref2").trigger("chosen:updated");

    $('#chosenRegionBlurb')
      .removeClass('hidden')
      .attr('aria-hidden', false)
      .find('b').text(regionName);

    regionContainer.attr('class', 'region-container selected');

    $('#hoveredRegionName').text(regionName);
    $selectedRegionName = regionName;

    $('.region-container')
      .not($selectedRegion)
      .attr('class', 'region-container');

    regionElement.removeClass('hidden').find('option').show();

    $('[data-optregion]')
      .not(regionElement)
      .addClass('hidden')
      .find('option')
      .attr('selected', false)
      .hide();

    $('#regionSelect').trigger("chosen:updated");
  }

  $("#regionSelect").on('change', function() {
    $('#locationSelectedContainer').removeClass('hidden').attr('aria-hidden', false);
  });


  $('#frameworkPref1').on('change', function() {
    var $thisVal = $(this).val();

    $('#secondPreferenceContainer').show();

    $('#frameworkPref2').find('option[value="' + $thisVal + '"]').attr('disabled', true);
    $('#frameworkPref2').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);

    $("#frameworkPref2").trigger("chosen:updated");
  });

  $('#frameworkPref2').on('change', function() {
    var $thisVal = $(this).val();

    $('#frameworkPref1').find('option[value="' + $thisVal + '"]').attr('disabled', true);
    $('#frameworkPref1').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);

    $("#frameworkPref1").trigger("chosen:updated");

    $('#firstChoiceSave').removeClass('hidden');
  });

});

















