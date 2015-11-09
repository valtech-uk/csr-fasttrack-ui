$(function() {
  if($('#choosePrefLocFramHeading').length ) {
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


    $('.region-container').on('click', function(e) {
      var $this = $(this),
          $regionNameID = $this.attr('id'),
          $regEl = $('#regionSelect optgroup[data-optregion="' + $regionNameID + '"]');

      selectRegion($this, $regEl);

      e.preventDefault();
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

      regionContainer.attr('class', 'region-container selected-region');

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
        .hide().removeClass('selectedLocationOptions');

      regionElement.find('option').addClass('selectedLocationOptions');

      $('#regionSelect').trigger("chosen:updated");

      setTimeout(function() {
        $('#regionSelect_chosen')
          .trigger('mousedown')
          .find('.chosen-results').scrollTop(0);
      }, 200);

      $('#chooseRegionText').hide();
      $('#clearMap').show();
    }

    $("#regionSelect").on('change', function() {
      var $regionElement = $(this).find('option:selected').parent(),
          $regionContainer = $('#' + $regionElement.attr('data-optregion'));

      $('#locationSelectedContainer').removeClass('toggle-content').attr('aria-hidden', false);

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

      $("html, body").animate({ scrollTop: 0 }, 300);

    });

    $('.second-choice-btn').on('click', function() {

      $('#firstChoiceInfo').removeClass('toggle-content').attr('aria-hidden', false);
      $('#considerAlternatives').removeClass('toggle-content').attr('aria-hidden', false);

    });

    $('#noSecondPreference').on('click', function(e) {
      e.preventDefault();

      $('#considerAlternatives').removeClass('toggle-content').attr('aria-hidden', false);

    });

    $('#clearMap').on('click', function() {
      window.location.reload();
    });

  }

});











