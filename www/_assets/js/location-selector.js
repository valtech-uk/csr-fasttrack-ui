$(function() {
  if($('#choosePrefLocFramHeading').length ) {
    var $selectedRegion = '',
        $selectedRegionName = '',
        $regionSelectClone = $('#regionSelect >').clone();

    // Animate map after 2 seconds
    setTimeout(function() {
      $('.svg-map-container').addClass('hvr-back-pulse');
      $('.map-legend').show();
      $('#hoveredRegionName').text('Choose a region to filter the locations');
    }, 2000);

    // Stop animation and remove hint
    setTimeout(function() {
      $('.svg-map-container').removeClass('hvr-back-pulse');
      $('.map-legend').fadeOut('slow');
      $('#chooseRegionContainer').fadeIn('slow');
    }, 4000);

    // On hover highlight the region on the map and show region name
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

    // Remove the legend if no region selected
    $('.svg-map').on('mouseleave', function() {
      if($selectedRegionName == '') {
        $('.map-legend').fadeOut();
      } else {
        $('.map-legend').addClass('disabled');
      }
    });

    // Clicking region will fire the region selection panel
    $('.region-container').on('click', function(e) {
      var $this = $(this),
          $regionNameID = $this.attr('id'),
          $regEl = $('#regionSelect optgroup[data-optregion="' + $regionNameID + '"]');

      selectRegion($this, $regEl);

      e.preventDefault();
    });

    function scrollToTop() {
      $('html, body').animate({
        scrollTop: $("#containingGridPreference").offset().top - 20
      }, 1000);
    }

    function selectRegion(regionContainer, regionElement) {
      var regionName = regionElement.attr('label');

      $selectedRegion = regionContainer;

      $('#selectLocationBlurb, #selectSecondLocationBlurb, #locationSelectedText').addClass('toggle-content').attr('aria-hidden', true);
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

      if($('html').hasClass('touch')) {
        var $regionSelect = $('#regionSelect'),
            $placeholderOption = $regionSelect.find('.placeholder-option');

        $regionSelect.val('');
        $regionSelect.html($regionSelectClone)

        setTimeout(function() {
          $regionSelect.prepend(regionElement);
          $regionSelect.prepend($placeholderOption);
          $regionSelect.find('.placeholder-option:nth-child(n+2)').remove();
        }, 500);

        $('html, body').animate({
          scrollTop: $("#containingGridPreference").offset().top - 20
        }, 1000, function() {
          $regionSelect.focus();
        });
      }

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

    // Choosing a location affects schemes
    $("#regionSelect").on('change', function() {
      var $regionElement = $(this).find('option:selected').parent(),
          $regionContainer = $('#' + $regionElement.attr('data-optregion'));

      $('#locationSelectedContainer').removeClass('toggle-content').attr('aria-hidden', false);

      $('.map-control').hide();

      $('#chosenRegionBlurb, #selectLocationBlurb').addClass('toggle-content').attr('aria-hidden', true);
      $('#locationSelectedText').removeClass('toggle-content').attr('aria-hidden', false);

    });

    // Scheme preference 1
    $('#schemePref1').on('change', function() {
      var $thisVal = $(this).val();

      $('#schemePref2').find('option[value="' + $thisVal + '"]').attr('disabled', true);
      $('#schemePref2').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);

      $("#schemePref2").trigger("chosen:updated");

      if($('#schemePref2').val() !== '') {
        $('#choiceSave').removeClass('toggle-content');
      }
    });

    // Scheme preference 2
    $('#schemePref2').on('change', function() {
      var $thisVal = $(this).val();

      $('#schemePref1').find('option[value="' + $thisVal + '"]').attr('disabled', true);
      $('#schemePref1').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);

      $("#schemePref1").trigger("chosen:updated");

      if($('#schemePref1').val() !== '') {
        $('#choiceSave').removeClass('toggle-content');
      }
    });

    // Saving location and scheme shows it on page
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

      scrollToTop();

    });

    $('.second-choice-btn').on('click', function() {

      $('#firstChoiceInfo').removeClass('toggle-content').attr('aria-hidden', false);
      $('#considerAlternatives').removeClass('toggle-content').attr('aria-hidden', false);

    });

    $('#noSecondPreference').on('click', function(e) {
      e.preventDefault();

      $('#considerAlternatives').removeClass('toggle-content').attr('aria-hidden', false);

      scrollToTop();

    });

    $('#clearMap').on('click', function() {
      window.location.reload();
    });

  }

});











