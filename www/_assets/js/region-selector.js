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


//   function selectRegion(regionContainer, regionElement) {
//     var regionName = regionElement.find('.region-name').text(),
//     selectedLocationLinks = [];

//     $selectedRegion = regionContainer;
//     $selectedRegionMap = regionElement;

//     $('#selectLocationBlurb').hide().attr('aria-hidden', true);
//     $('#locationSelectedContainer').removeClass('hidden').attr('aria-hidden', false);
//     regionContainer.attr('class', 'region-container selected');

//     $('#hoveredRegionName, #regionNameHeading').text(regionName);
//     $selectedRegionName = regionName;

//     $('#regionLocations').html('');
//     $('#regionLocationBlurb').html('');
//     selectedRegionLocations = [];


//     $('#regionLocationBlurb').append(selectedLocationLinks.join(', '));

//     $('.map-region').not($selectedRegionMap).hide();
//     $('.region-container').not($selectedRegion).attr('class', 'region-container');
//   }

// });


function selectRegion(regionContainer, regionElement) {
    var regionName = regionElement.attr('label');

    $selectedRegion = regionContainer;
    $selectedRegionMap = regionElement;

    $('#selectLocationBlurb').hide().attr('aria-hidden', true);
    $('#locationSelectedContainer').removeClass('hidden').attr('aria-hidden', false);
    regionContainer.attr('class', 'region-container selected');

    $('#hoveredRegionName').text(regionName);
    $selectedRegionName = regionName;

    $('.region-container').not($selectedRegion).attr('class', 'region-container');

    regionElement.removeClass('hidden').find('option').show();
    $('[data-optregion]').not(regionElement).addClass('hidden').find('option').hide();

    $('#regionSelect').trigger("chosen:updated");
  }

});

















