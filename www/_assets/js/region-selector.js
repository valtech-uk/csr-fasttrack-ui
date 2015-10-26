$(function() {

  var $selectedRegion = '',
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

    $('#selectLocationBlurb, #selectSecondLocationBlurb').hide().attr('aria-hidden', true);
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

$('#firstChoiceSave').on('click', function(e) {
  var locationSelected = $('#regionSelect').val(),
      firstFramework = $('#frameworkPref1').val(),
      secondFramework = $('#frameworkPref2').val();

  e.preventDefault();

  $('#firstChosenLocation').text(locationSelected);

  $('#firstChosenFrameworks').append(firstFramework + ', ' + secondFramework);

  $('#firstChoiceInfo').removeClass('hidden').attr('aria-hidden', false);

  $('#chooseLocationAndFramework').addClass('hidden').attr('aria-hidden', true);

  $('.region-container').attr('class', 'region-container');

  $selectedRegion = '';
  $selectedRegionName = '';

  $('.map-legend').hide();
  $('.svg-map').attr('class', 'svg-map disabled');

  $(this).hide();
});

$('#addSecondButton').on('click', function(e) {
  e.preventDefault();

  $('#firstChoiceInfo').addClass('hidden').attr('aria-hidden', true);

  $('#chooseHeading').text('Choose your second preferred location');
  $('#selectLocationBlurb, #chosenRegionBlurb, #locationSelectedContainer')
    .addClass('hidden')
    .attr('aria-hidden', true);

  $('#secondPreferenceContainer').addClass('toggle-content').hide();
  $('#frameworkPref2').addClass('secondChoiceSecondFramework');

  $('#selectSecondLocationBlurb').removeClass('hidden').attr('aria-hidden', false);

  $('#regionSelect option').attr('selected', false);
  $('#regionSelect').trigger("chosen:updated");

  $("#frameworkPref1 option, #frameworkPref2 option").attr('selected', false);
  $("#frameworkPref1, #frameworkPref2").trigger("chosen:updated");

  $('#chooseLocationAndFramework').removeClass('hidden').attr('aria-hidden', false);
  $('.svg-map').attr('class', 'svg-map');

});

$('.content-container').on('change', '.secondChoiceSecondFramework', function() {
  $('#secondChoiceSave').removeClass('hidden').attr('aria-hidden', false);
});

$('#secondChoiceSave').on('click', function(e) {
  var locationSelected = $('#regionSelect').val(),
      firstFramework = $('#frameworkPref1').val(),
      secondFramework = $('#frameworkPref2').val();

  e.preventDefault();

  $('#secondChosenLocation').text(locationSelected);

  $('#secondChosenFrameworks').append(firstFramework + ', ' + secondFramework);

  $('#firstChoiceInfo').removeClass('hidden').attr('aria-hidden', false);
  $('#secondChoiceInfo').removeClass('hidden').attr('aria-hidden', false);

  $('#chooseLocationAndFramework').addClass('hidden').attr('aria-hidden', true);

  $('.region-container').attr('class', 'region-container');

  $selectedRegion = '';
  $selectedRegionName = '';

  $('.map-legend').hide();
  $('.svg-map').attr('class', 'svg-map disabled');

  $(this).hide();

  $('#secondPreferenceControls').hide();

  $('#considerAlternatives').removeClass('hidden').attr('aria-hidden', false);
});














