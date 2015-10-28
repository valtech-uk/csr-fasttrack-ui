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

    setTimeout(function() {
      $('#regionSelect_chosen').trigger('mousedown');
    }, 200);

    $('#chooseRegionText').hide();
    $('#clearMap').show();
  }

  $("#regionSelect").on('change', function() {
    var $regionElement = $(this).find('option:selected').parent(),
        $regionContainer = $('#' + $regionElement.attr('data-optregion'));

    $('#locationSelectedContainer').removeClass('hidden').attr('aria-hidden', false);

    // selectRegion($regionContainer, $regionElement);

    $('.map-control').hide();

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

    $('#choiceSave').removeClass('hidden');
  });

  $('#choiceSave').on('click', function(e) {
    var locationSelected = $('#regionSelect').val(),
        firstFramework = $('#frameworkPref1').val(),
        secondFramework = $('#frameworkPref2').val();

    e.preventDefault();

    $('#chosenLocation').text(locationSelected);

    $('#chosenFrameworks').append(firstFramework + ', ' + secondFramework);

    $('#choiceInfo').removeClass('hidden').attr('aria-hidden', false);

    $('#chooseLocationAndFramework').addClass('hidden').attr('aria-hidden', true);

    $('.region-container').attr('class', 'region-container');

    $selectedRegion = '';
    $selectedRegionName = '';

    $('.map-legend').hide();
    $('.svg-map').attr('class', 'svg-map disabled');

    $(this).hide();

    if($(this).hasClass('second-choice')) {
      $('#firstChoiceInfo').removeClass('hidden').attr('aria-hidden', false);
      $('#considerAlternatives').removeClass('hidden').attr('aria-hidden', false);
    } else {
      $.jStorage.set('first-storageLocation', locationSelected);
      $.jStorage.set('first-storageFirstFramework', firstFramework);
      $.jStorage.set('first-storageSecondFramework', secondFramework);
    }

  });

  if($('#firstChosenLocation').length) {
    var locationSelected = $.jStorage.get('first-storageLocation'),
        firstFramework = $.jStorage.get('first-storageFirstFramework'),
        secondFramework = $.jStorage.get('first-storageSecondFramework');

    $('option[value="' + locationSelected +'"]').attr('disabled', true);
    $('#regionSelect').trigger("chosen:updated");

    $('#firstChosenLocation').text(locationSelected);
    $('#firstChosenFrameworks').text(firstFramework + ', ' + secondFramework);
  }


  $('#noSecondPreference').on('click', function(e) {
    e.preventDefault();

    $('#considerAlternatives').removeClass('hidden').attr('aria-hidden', false);

  });

  $('#saveSecondPreference').on('click', function(e) {
    var locationSelected = $('#regionSelect').val(),
        firstFramework = $('#frameworkPref1').val(),
        secondFramework = $('#frameworkPref2').val();

    $.jStorage.set('second-storageLocation', locationSelected);
    $.jStorage.set('second-storageFirstFramework', firstFramework);
    $.jStorage.set('second-storageSecondFramework', secondFramework);

  });

  $('#clearMap').on('click', function() {
    window.location.reload();
  })

});











