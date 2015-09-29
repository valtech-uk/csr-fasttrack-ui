$(function() {
  //-------- Maps on results

  if($('.search-results__item').length > 0) {
    var miles = 5,
        radiusCircle,
        theMaps = [],
        directionsDisplay = [],
        directionsService = [],
        vacancyLength = $('.vacancy-link').length,
        originLat = ($.cookie('gotLocation') ? $.jStorage.get('currentLat') : Number($('#Latitude').val())),
        originLon = ($.cookie('gotLocation') ? $.jStorage.get('currentLong') : Number($('#Longitude').val())),
        originLocation = new google.maps.LatLng(originLat,originLon);

    for (var i = 0; i < vacancyLength; i++){
      directionsDisplay[i] = new google.maps.DirectionsRenderer({suppressMarkers: true});
      directionsService[i] = new google.maps.DirectionsService();
    };

    //--- Radius map

    var radiusMapOptions = {
      center: { lat: originLat, lng: originLon},
      zoom: 10,
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      scrollwheel: false
    };

    var radiusMap = new google.maps.Map(document.getElementById('map-canvas'), radiusMapOptions);

    var distanceCircle = {
      strokeColor: '#005ea5',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#005ea5',
      fillOpacity: 0.25,
      map: radiusMap,
      center: radiusMapOptions.center,
      radius: miles * 1609.344
    }

    radiusCircle = new google.maps.Circle(distanceCircle);

    //--- Maps on each result
    $('.vacancy-link').each(function () {

      var vacancyMap = $(this).closest('.search-results__item').find('.map')[0],
          vacancyLat = $(this).attr('data-vac-lat'),
          vacancyLon = $(this).attr('data-vac-long'),
          latlng = new google.maps.LatLng(vacancyLat,vacancyLon);

      var myOptions = {
          zoom: 10,
          center: latlng,
          mapTypeControl: false,
          overviewMapControl: false,
          panControl: false,
          scaleControl: false,
          scrollwheel: false,
          streetViewControl: false,
          zoomControl: true,
          zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL
          }
      };
      var map = new google.maps.Map(vacancyMap, myOptions);

      theMaps.push(map);

      var markerIcon = new google.maps.MarkerImage(
                    '../_assets/img/icon-location.png',
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(20, 32));

      var marker = new google.maps.Marker({
          icon: markerIcon,
          position: latlng,
          map: map
      });

    });

    function calcRoute(transportMode, latLong, journeyTime, mapNumber) {

      directionsDisplay[mapNumber].setMap(theMaps[mapNumber]);

      var request = {
          origin: originLocation,
          destination: latLong,
          travelMode: google.maps.TravelMode[transportMode]
      };
      directionsService[mapNumber].route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          $(journeyTime).text(response.routes[0].legs[0].duration.text);

          directionsDisplay[mapNumber].setDirections(response);
        }
      });
    }

    $('.select-mode').on('change', function() {
      var $this = $(this),
          $thisVal = $this.val(),
          $thisVacLink = $this.closest('.search-results__item').find('.vacancy-link'),
          $thisLat = $thisVacLink.attr('data-vac-lat'),
          $thisLong = $thisVacLink.attr('data-vac-long'),
          $thisLatLong = new google.maps.LatLng($thisLat, $thisLong),
          $durationElement = $this.next('.journey-time'),
          $mapNumber = $this.closest('.search-results__item').index();

      calcRoute($thisVal, $thisLatLong, $durationElement, $mapNumber);
    });

    $('.search-results__item .summary-style').on('click', function(originLocation) {
      var $this = $(this),
          $thisVal = $this.next('.detail-content').find('.select-mode option:selected').val(),
          $thisVacLink = $this.closest('.search-results__item').find('.vacancy-link'),
          $thisMap = $this.closest('.search-results__item').find('.map'),
          $thisLat = $thisVacLink.attr('data-vac-lat'),
          $thisLong = $thisVacLink.attr('data-vac-long'),
          $thisLatLong = new google.maps.LatLng($thisLat, $thisLong),
          $durationElement = $this.next('.detail-content').find('.journey-time'),
          $mapNumber = $this.closest('.search-results__item').index();

      calcRoute($thisVal, $thisLatLong, $durationElement, $mapNumber);

    });
  }

  if($('#getLocation').length > 0) {

    function geoFindMe() {
        var output = document.getElementById("Location"),
            latVal,
            longVal;

        if (!navigator.geolocation) {
            output.placeholder = "Geolocation is not supported by your browser";
            return;
        }

        function success(position) {
            var latVal = position.coords.latitude,
                longVal = position.coords.longitude,
                url = "https://api.postcodes.io/postcodes?lon=" + longVal + "&lat=" + latVal + "&wideSearch=true",
                json;

            $.get(url)
            .done(function (data) {
                json = data;

                // console.log(json);

                output.value = json.result[0].postcode;
                output.placeholder = "";
                })
            .fail(function () {
                output.value = "Unable to retrieve postcode"
            });

        };

        function error() {
            output.placeholder = "Unable to retrieve your location";
        };

        output.placeholder = "Locating…";

        navigator.geolocation.getCurrentPosition(success, error, { maximumAge: 600000 });

    }

    $('.geolocation #geoLocateContainer').append(' or <span class="fake-link geolocater inl-block hide-nojs" id="getLocation">use current location</span>');

    $('.geolocation').on('click', '#getLocation', function () {
        geoFindMe();
    });

  }

  if($('.search-results__item').length > 0 && $.cookie('gotLocation')) {
    var locationLat = $.jStorage.get('currentLat'),
        locationLong = $.jStorage.get('currentLong'),
        locPostCode = $.jStorage.get('currentPostCode');

    $('#Latitude').val(locationLat);
    $('#Longitude').val(locationLong);
    $('#Location').val(locPostCode);

  }
});