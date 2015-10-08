  $(function() {

    var $mostRecentRegion = '',
        $selectedRegion = '',
        $selectedRegionMap = '',
        $selectedRegionName = '',
        $selectedRegionLocations = [];

    $('.region-container').not($selectedRegion).hover(function() {
      var $this = $(this),
          $regionNameID = $this.attr('id'),
          $regEl = $('.map-region[data-region="' + $regionNameID + '"]'),
          $regionName = $regEl.find('.region-name').text();

      $regEl.show();
      $('.map-legend').show();
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
        $('#regionLocations').append($selectedRegionLocations);
      }

    });



    $('.region-container').on('click', function() {
      var $this = $(this),
          $regionNameID = $this.attr('id'),
          $regEl = $('.map-region[data-region="' + $regionNameID + '"]'),
          $regionName = $regEl.find('.region-name').text(),
          $selectedLocationLinks = [];

      $selectedRegion = $this;
      $selectedRegionMap = $regEl;

      $regEl.show();
      $('#selectLocationBlurb').hide();
      $('#locationSelectedContainer').removeClass('hidden');
      $this.attr('class', 'region-container selected');

      $('#hoveredRegionName, #regionNameHeading').text($regionName);
      $selectedRegionName = $regionName;

      $('#regionLocations').html('');
      $('#regionLocationBlurb').html('');
      $selectedRegionLocations = [];

      $regEl.find('.region-city').each(function() {
        var $locationName = $.trim($(this).text());

        $('#regionLocations').append('<li>' + $locationName + '</li>');
        $selectedRegionLocations.push('<li>' + $locationName + '</li>');
        $selectedLocationLinks.push('<a href="https://maps.google.com" target="_blank">' + $locationName + '</a>');

      });

      $('#regionLocationBlurb').append($selectedLocationLinks.join(', '));

      $('.map-region').not($selectedRegionMap).hide();
      $('.region-container').not($selectedRegion).attr('class', 'region-container');

    });


  });