$(function() {

  var $mostRecentRegion = '',
      $selectedRegion = '',
      $selectedRegionMap = '',
      $selectedRegionName = '',
      selectedRegionLocations = [];




  $('.region-container').not($selectedRegion).hover(function() {
    var $this = $(this),
        $regionNameID = $this.attr('id'),
        $regEl = $('.map-region[data-region="' + $regionNameID + '"]'),
        $regionName = $regEl.find('.region-name').text();

    $regEl.show();
    $('.map-legend').show().removeClass('disabled');
    $('#hoveredRegionName').text($regionName);

    $('#regionLocations').html('');

    $regEl.find('.region-city').each(function() {
      var $locationName = $(this).text();
      $('#regionLocations').append('<li>' + $locationName + '</li>');
    });

    $mostRecentRegion = $regEl;
  }, function() {

    $mostRecentRegion.not($selectedRegionMap).hide();

    if($selectedRegionName != '') {
      $('#regionLocations').html('');

      $('#hoveredRegionName').text($selectedRegionName);
      $('#regionLocations').append(selectedRegionLocations);
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
        $regEl = $('.map-region[data-region="' + $regionNameID + '"]');

    selectRegion($this, $regEl);
  });




  $('#regionSelect').on('change', function() {
    var $this = $(this),
        $thisVal = $this.val(),
        $theAnchor = $('.map-region[data-region="' + $thisVal + '"]'),
        $theRegion = $('.region-container#' + $thisVal + '');

    selectRegion($theRegion, $theAnchor);
  });




  function selectRegion(regionContainer, regionAnchor) {
    var regionName = regionAnchor.find('.region-name').text(),
    selectedLocationLinks = [];

    $selectedRegion = regionContainer;
    $selectedRegionMap = regionAnchor;

    regionAnchor.show();
    $('#selectLocationBlurb').hide().attr('aria-hidden', true);
    $('#locationSelectedContainer').removeClass('hidden').attr('aria-hidden', false);
    regionContainer.attr('class', 'region-container selected');

    $('#hoveredRegionName, #regionNameHeading').text(regionName);
    $selectedRegionName = regionName;

    $('#regionLocations').html('');
    $('#regionLocationBlurb').html('');
    selectedRegionLocations = [];

    regionAnchor.find('.region-city').each(function() {
      var $locationName = $.trim($(this).text());

      $('#regionLocations').append('<li>' + $locationName + '</li>');
      selectedRegionLocations.push('<li>' + $locationName + '</li>');
      selectedLocationLinks.push('<a class="link-unimp" href="https://maps.google.com" target="_blank">' + $locationName + '</a>');

    });

    $('#regionLocationBlurb').append(selectedLocationLinks.join(', '));

    $('.map-region').not($selectedRegionMap).hide();
    $('.region-container').not($selectedRegion).attr('class', 'region-container');
  }

});















