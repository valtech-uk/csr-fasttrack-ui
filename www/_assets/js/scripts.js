$(function() {

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any()) {
    FastClick.attach(document.body);

    $('input[autofocus]').removeAttr('autofocus');
  }

  function isAndroid() {
    var nua = navigator.userAgent,
        isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
    if (isAndroid) {
      $('html').addClass('android-browser');
    }
  }

  isAndroid();

  $('.menu-trigger').on('click', function() {
    $(this).next('.menu').toggleClass('menu-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.mob-collpanel-trigger').on('click', function() {
    $(this).next('.mob-collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.collpanel-trigger').on('click', function() {
    $(this).next('.collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.button-toggler').on('click', function() {
    var $this = $(this),
        $target = $this.attr('data-target');

    $('#' + $target).toggleClass('toggle-content');

    return false;
  });

  // Create linked input fields (For using email address as username)
  $('.linked-input-master').on('keyup blur', function() {
    var masterVal = $(this).val();
    $('.linked-input-slave').val(masterVal);
    $('.linked-input-slave').removeClass('hidden').text(masterVal);
    if($(this).val() == '') {
      $('.linked-input-slave').addClass('hidden');
    }
  });

  $(".block-label").each(function(){
    var $target = $(this).attr('data-target');

    // Add focus
    $(".block-label input").focus(function() {
      $("label[for='" + this.id + "']").addClass("add-focus");
      }).blur(function() {
      $("label").removeClass("add-focus");
    });
    // Add selected class
    $('input:checked').parent().addClass('selected');

    if($(this).hasClass('selected')) {
      $('#' + $target).show();
    }
  });

  // Add/remove selected class
  $('.block-label').on('click', 'input[type=radio], input[type=checkbox]', function() {
    var $this   = $(this),
        $target = $this.parent().attr('data-target');

    $('input:not(:checked)').parent().removeClass('selected');
    $('input:checked').parent().addClass('selected');

    if($target == undefined) {
      $this.closest('.form-group').next('.toggle-content').hide().attr('aria-hidden', true);
      $this.closest('.form-group').find('[aria-expanded]').attr('aria-expanded', false);
    } else {
      $('#' + $target).show();

      if($this.closest('.form-group').hasClass('blocklabel-single')) {

        console.log('merp');
        $this.closest('.blocklabel-single-container').find('.blocklabel-content').not('#' + $target).hide();
      }
    }

  });

  $('.amend-answers').on('click', function() {
    $(this).closest('.form-group').toggleClass('expanded');
    return false;
  });

  $('.update-answers').on('click', function() {
    $(this).closest('.form-group').toggleClass('expanded');
  });

  $('.summary-trigger').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.summary-close').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.inpage-focus').on('click', function() {
    var $this      = $(this),
        $target    = $this.attr('href'),
        $targetFor = $($target).attr('for');

    $('#' + $targetFor).focus();
  });


  //--------Max character length on textareas

  $('textarea').on('keyup', function() {
    characterCount(this);
  });

  $('textarea:not(:empty)').each(function() {
    characterCount(this);
  });

  setTimeout(function() {
    $('textarea[data-value]').each(function() {
      characterCount(this);
    });
  }, 1000);

  function characterCount(that) {
    var $this         = $(that),
        $maxLength    = $this.attr('data-val-length-max'),
        $enteredText  = $this.val(),
        $lineBreaks   = ($enteredText.match(/\n/g) || []).length,
        $lengthOfText = $enteredText.length + $lineBreaks,
        $characterCount = Math.abs($maxLength - $lengthOfText),
        $charCountEl  = $this.closest('.form-group').find('.maxchar-count'),
        $charTextEl   = $this.closest('.form-group').find('.maxchar-text'),
        $thisAria     = $this.closest('.form-group').find('.aria-limit');

    if($maxLength) {
        $charCountEl.text($characterCount);
    }

    if($lengthOfText > $maxLength) {
        $charCountEl.parent().addClass('has-error');
        $charTextEl.text(' characters over the limit');
        $thisAria.text("Character limit has been reached, you must type fewer than " + $maxLength + " characters");
        if ($characterCount == 1) {
            $charTextEl.text(' character over the limit');
        } else {
            $charTextEl.text(' characters over the limit');
        }
    } else {
        $charCountEl.parent().removeClass('has-error');
        $charTextEl.text(' characters remaining');
        $thisAria.text("");
        if ($characterCount == 1) {
            $charTextEl.text(' character remaining');
        } else {
            $charTextEl.text(' characters remaining');
        }
    }
  }

  //--------Expanding tables

  $('.tbody-3rows').each(function() {
    var $this       = $(this),
        $rowLength  = $this.find('tr').length,
        $expandRows = $this.next('.tbody-expandrows'),
        $after3Rows = $this.find('tr:nth-of-type(3)').nextAll(),
        $after6Rows = $this.find('tr:nth-of-type(6)').nextAll();

    if($rowLength > 3 && !$this.hasClass('tbody-withReasons')) {
      $expandRows.show();
      $after3Rows.hide().attr('aria-hidden', true);
    } else if($rowLength > 6 && $this.hasClass('tbody-withReasons')) {
      $expandRows.show();
      $after6Rows.hide().attr('aria-hidden', true);
    }

  });

  $('.btnExpandRows').on('click', function() {
    var $this        = $(this),
        $tbodyExpand = $this.closest('.tbody-expandrows');
        $tbody3Rows   = $tbodyExpand.prev('.tbody-3rows').find('tr:nth-of-type(3)').nextAll(),
        $tbodyWithReasons  = $tbodyExpand.prev('.tbody-withReasons').find('tr:nth-of-type(6)').nextAll();


    if(!$tbodyExpand.prev('.tbody-withReasons').length > 0) {
      $tbody3Rows.toggle();
    } else if($tbodyExpand.prev('.tbody-withReasons').length > 0) {
      $tbodyWithReasons.toggle();
    }

    $this.closest('table').toggleClass('opened');

    if($this.text().indexOf('More') > -1) {
      $this.html('<i class="fa fa-angle-up"></i>Less');
      $this.attr('aria-expanded', false);
      if(!$tbodyExpand.prev('.tbody-withReasons').length > 0){
        $tbody3Rows.attr('aria-hidden', false);
      } else if ($tbodyExpand.prev('.tbody-withReasons').length > 0) {
        $tbodyWithReasons.attr('aria-hidden', false);
      }
    } else {
      $this.html('<i class="fa fa-angle-down"></i>More');
      $this.attr('aria-expanded', true);
      if(!$tbodyExpand.prev('.tbody-withReasons').length > 0){
        $tbody3Rows.attr('aria-hidden', true);
      } else if ($tbodyExpand.prev('.tbody-withReasons').length > 0) {
        $tbodyWithReasons.attr('aria-hidden', true);
      }
    }

    return false;

  });

  //----------Details > Summary ARIA

  $('[aria-expanded]').on('click', function() {
    var $this = $(this),
        $controls = $(this).attr('aria-controls');

    if(!$this.parent().hasClass('selected')) {
      if($this.is('[aria-expanded="false"]')) {
        $('#' + $controls).attr('aria-hidden', false);
        $this.attr('aria-expanded', true);
      } else {
        $('#' + $controls).attr('aria-hidden', true);
        $this.attr('aria-expanded', false);
      }
    }

  });

  $('[aria-hidden]').each(function() {
    var $controlID = $(this).attr('id');

    if($(this).is(':visible')) {
      $(this).attr('aria-hidden', false);
      $('[aria-controls="' + $controlID + '"]').attr('aria-expanded', true);
    }
  });

  //----------Radio expanding lists IE8

  if($('html').hasClass('lt-ie9')) {
     $('.list-checkradio input[type=radio]:checked').siblings('details').addClass('ie8-details');

     $('.list-checkradio > li').on('click', function () {
       var $this = $(this),
           $thisDetails = $this.find('details');

       $('.list-checkradio input[type=radio]').not(':checked').siblings('details').removeClass('ie8-details');

       $thisDetails.addClass('ie8-details');

     });
   }

  //----------Tabbed content

  $('.tabbed-tab').attr('href', "#");

  $('.tabbed-tab').on('click', function() {
      var $this = $(this),
          $tabId = $this.attr('tab');

      $this.addClass('active');

      $('.tabbed-tab').not($('[tab="' + $tabId + '"]')).removeClass('active');

      if ($($tabId).length) {
          $($tabId).show();

          $('.tabbed-content').not($tabId).hide();
      } else {
          var $tabClass = '.' + $tabId.substr(1);

          $('.tabbed-element' + $tabClass).show();
          $('.tabbed-element').not($tabClass).hide();
      }

      return false;
  });

  //------- Select to inject content to text input

  $('.select-inject').on('change', function () {
      var $this = $(this),
          $selectedOption = $this.find('option:selected'),
          $thisOptionText = $selectedOption.text(),
          $theInput = $this.closest('.form-group').find('.select-injected'),
          $selectedVal = $selectedOption.val();

      $theInput.val($thisOptionText);

      $('.selfServe').each(function() {
        if($(this).prop('id') == $selectedVal) {
          $(this).show();
          $('.selfServe').not($(this)).hide();
        }
      });

      if($('#' + $selectedVal).length == 0) {
        $('.selfServe').hide();
      }

      if ($selectedVal == "noSelect") {
          $theInput.val("");
      }

      $theInput.focusout();
  });

  //------- Inline details toggle

  $('.summary-style').on('click', function() {
    $this = $(this);

    $this.toggleClass('open');

    $this.next('.detail-content').toggle();
  });


});;/*
 *  jQuery Password Strength - v0.0.1
 *
 *  Made by Henry Charge
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "pwStrengthManager",
				defaults = {
  				password: "",
          blackList : [],
          minChars : "",
          maxChars : "",
          advancedStrength : false
		    };

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
        this.info = "";
        this.className = "";
		}

		Plugin.prototype = {
				init: function() {
          if (zxcvbn) {
            var zxLoaded = true;
          }

          var errors = this.customValidators();

          if ("" == this.settings.password && zxLoaded) {
            this.info = "Cannot be empty";
            this.className = "strength-weak";
          } else if (errors == 0 && zxLoaded) {
            var strength = zxcvbn(this.settings.password, this.settings.blackList),
                upperCase = new RegExp('[A-Z]'),
                lowerCase = new RegExp('[a-z]'),
                numbers = new RegExp('[0-9]');

            if (strength.score >= 3 && this.settings.password.match(upperCase) && this.settings.password.match(lowerCase) && this.settings.password.match(numbers)) {
              this.info = "Very strong";
              this.className = "strength-strong";
            } else if (this.settings.password.match(upperCase) && this.settings.password.match(lowerCase) && this.settings.password.match(numbers)) {
              this.info = "Strong";
              this.className = "strength-strong";
            } else {
              this.info = "Too weak";
              this.className = "strength-weak";
            }

          }

          $(this.element).html(this.info).removeClass().addClass(this.className);
        },
				minChars: function() {
          if (this.settings.password.length < this.settings.minChars) {
            this.info = "At least " + this.settings.minChars + " characters";
            return false;
          } else {
            return true;
          }
        },
        customValidators: function() {
          var err = 0;

          if (this.settings.minChars != "") {
            if (!this.minChars()) {
              err++;
            }
          }

          return err;
        }
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function (options) {
      this.each(function() {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      });
      return this;
    };

})( jQuery, window, document );
;$(function() {
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
});;$(function() {

  //-- Faking details behaviour

  $('.no-details').on('click keypress', 'summary', function(e) {
    var $this = $(this);
    if (e.which === 13 || e.type === 'click') {
      $this.parent().toggleClass('open');
    }
  });

});;$(function () {
  if($('.fixedsticky').length > 0) {

    var sortControl = $('.float-right-wrap');
    var secondToLast = $('.search-results__item:nth-last-child(2)');
    var origPosition = '23px';
    var posNumber = 23;

    stickySidebar();

    $(window).scroll(stickySidebar);

    $(window).resize(stickySidebar);

    function stickySidebar() {
      var sortOffset = sortControl.offset(),
          secondOffset = secondToLast.offset(),
          sortTopPos = sortOffset.top - $(window).scrollTop(),
          secLastTopPos = secondOffset.top - $(window).scrollTop();

      if(sortTopPos < posNumber) {
        $('.fixedsticky').addClass('sticky');
      } else {
        $('.fixedsticky').removeClass('sticky');
      }

      if(secLastTopPos < 0) {
        $('.fixedsticky').css('top', secLastTopPos + posNumber + 'px');
      } else {
        $('.fixedsticky').css('top', origPosition);
      }
    }
  }


});

