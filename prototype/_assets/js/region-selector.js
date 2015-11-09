$.fn.triggerAll = function(events) {
    if(!events) return this; //don't blow up if .triggerAll() without params
    var self = this;         //keep a reference
    $.each(events.split(" "), function(i, e) { self.trigger(e); });
    return this;
};

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
    $('#locationSelectedContainer').addClass('toggle-content').attr('aria-hidden', true);

    $("#schemePref1 option, #schemePref2 option").attr('selected', false);
    $("#schemePref1, #schemePref2").trigger("chosen:updated");

    $('#chosenRegionBlurb')
      .removeClass('toggle-content')
      .attr('aria-hidden', false)
      .find('b').text(regionName);

    regionContainer.attr('class', 'region-container selected');

    $('#hoveredRegionName').text(regionName);
    $selectedRegionName = regionName;

    $('.region-container')
      .not($selectedRegion)
      .attr('class', 'region-container');

    regionElement.removeClass('toggle-content').find('option').show();

    $('[data-optregion]')
      .not(regionElement)
      .addClass('toggle-content')
      .find('option')
      .attr('selected', false)
      .hide();

    $('#regionSelect').trigger("chosen:updated");

    setTimeout(function() {
      $('#regionSelect_chosen').trigger('mousedown');
    }, 200);

    $('#chooseRegionText').hide();
    $('#clearMap').show();
  }

  $("#regionSelect").on('change', function() {
    var $regionElement = $(this).find('option:selected').parent(),
        $regionContainer = $('#' + $regionElement.attr('data-optregion'));

    $('#locationSelectedContainer').removeClass('toggle-content').attr('aria-hidden', false);

    // selectRegion($regionContainer, $regionElement);

    $('.map-control').hide();

  });


  $('#schemePref1').on('change', function() {
    var $thisVal = $(this).val();

    $('#secondPreferenceContainer').show();

    $('#schemePref2').find('option[value="' + $thisVal + '"]').attr('disabled', true);
    $('#schemePref2').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);

    $("#schemePref2").trigger("chosen:updated");
  });

  $('#schemePref2').on('change', function() {
    var $thisVal = $(this).val();

    $('#schemePref1').find('option[value="' + $thisVal + '"]').attr('disabled', true);
    $('#schemePref1').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);

    $("#schemePref1").trigger("chosen:updated");

    $('#choiceSave').removeClass('toggle-content');
  });

  $('#choiceSave').on('click', function(e) {
    var locationSelected = $('#regionSelect').val(),
        firstScheme = $('#schemePref1').val(),
        secondScheme = $('#schemePref2').val();

    e.preventDefault();

    $('#chosenLocation').text(locationSelected);
    $('#chosenSchemes').append(firstScheme + ', ' + secondScheme);

    $('#choiceInfo').removeClass('toggle-content').attr('aria-hidden', false);

    $('#chooseLocationAndScheme').addClass('toggle-content').attr('aria-hidden', true);

    $('.region-container').attr('class', 'region-container');

    $selectedRegion = '';
    $selectedRegionName = '';

    $('.map-legend').hide();
    $('.svg-map').attr('class', 'svg-map disabled');

    $(this).hide();

  });

  $('.first-choice-btn').on('click', function() {
    var locationSelected = $('#regionSelect').val(),
        firstScheme = $('#schemePref1').val(),
        secondScheme = $('#schemePref2').val();

    $.jStorage.set('first-storageLocation', locationSelected);
    $.jStorage.set('first-storageFirstScheme', firstScheme);
    $.jStorage.set('first-storageSecondScheme', secondScheme);

    $("html, body").animate({ scrollTop: 0 }, 300);

  });

  $('.second-choice-btn').on('click', function() {
    var locationSelected = $('#regionSelect').val(),
        firstScheme = $('#schemePref1').val(),
        secondScheme = $('#schemePref2').val();

    $.jStorage.set('second-storageLocation', locationSelected);
    $.jStorage.set('second-storageFirstScheme', firstScheme);
    $.jStorage.set('second-storageSecondScheme', secondScheme);

    $('#firstChoiceInfo').removeClass('toggle-content').attr('aria-hidden', false);
    $('#considerAlternatives').removeClass('toggle-content').attr('aria-hidden', false);

  });

  $('#locFramContinue').on('click', function() {

    $.jStorage.set('considerAltLocation', $('[name="altregion"]:checked').parent().text());
    $.jStorage.set('considerAltScheme', $('[name="altscheme"]:checked').parent().text());

  });

  if($('#firstChosenLocation').length) {
    var locationSelected = $.jStorage.get('first-storageLocation'),
        firstScheme = $.jStorage.get('first-storageFirstScheme'),
        secondScheme = $.jStorage.get('first-storageSecondScheme');

    $('option[value="' + locationSelected +'"]').attr('disabled', true);
    $('#regionSelect').trigger("chosen:updated");

    $('#firstChosenLocation').text(locationSelected);
    $('#firstChosenSchemes').text(firstScheme + ', ' + secondScheme);
  }

  $('#noSecondPreference').on('click', function(e) {
    e.preventDefault();

    $('#considerAlternatives').removeClass('toggle-content').attr('aria-hidden', false);
    $.jStorage.deleteKey('second-storageLocation');
    $.jStorage.deleteKey('second-storageFirstScheme');
    $.jStorage.deleteKey('second-storageSecondScheme');

  });

  $('#clearMap').on('click', function() {
    window.location.reload();
  });

});











