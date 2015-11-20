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
        $target = $this.parent().attr('data-target'),
        $disTarget = $this.parent().attr('data-distarget');

    $('input:not(:checked)').parent().removeClass('selected');
    $('input:checked').parent().addClass('selected');

    if($target == undefined) {
      $this.closest('.form-group').next('.toggle-content').hide().attr('aria-hidden', true);
      $this.closest('.form-group').find('[aria-expanded]').attr('aria-expanded', false);
    } else {
      $('#' + $target).show();

      if($this.closest('.form-group').hasClass('blocklabel-single')) {

        $this.closest('.blocklabel-single-container').find('.blocklabel-content').not('#' + $target).hide();
      }
    }

    // if($disTarget == undefined) {
    //   $this.closest('.form-group').find('[aria-expanded]').attr('aria-expanded', false);
    // } else {
    //   $('#' + $target).show();

    //   if($this.closest('.form-group').hasClass('blocklabel-single')) {

    //     $this.closest('.blocklabel-single-container').find('.blocklabel-content').not('#' + $target).hide();
    //   }
    // }

  });

  $('.selectWithOptionTrigger').on('change', function() {
    var optionTrigger = $(this).find('.optionTrigger'),
        optionTarget = $('#' + optionTrigger.attr('data-optiontrigger'));

    if(optionTrigger.is(':selected')) {
      optionTarget.show();
    } else {
      optionTarget.hide();
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

  //------- Password meter

  if($('.new-password').length) {

    $('.new-password').after('<p class="form-hint text strength-indicator hide-nojs">Password strength: <span id="pass_meter"></span></p>')

    $('body').append('<script src="//cdnjs.cloudflare.com/ajax/libs/zxcvbn/2.0.2/zxcvbn.min.js" type="text/javascript"></script>');

    $(".new-password").keyup(function () {
      initializeStrengthMeter();
    });

    function initializeStrengthMeter() {
        $("#pass_meter").pwStrengthManager({
            password: $(".new-password").val(),
            minChars: 8
        });
    }
  }



  //------- Inline details toggle

  $('.summary-style').on('click', function() {
    $this = $(this);

    $this.toggleClass('open');

    $this.next('.detail-content').toggle();
  });

  if($('html').hasClass('no-touch')) {
    $('.chosen-select').chosen({width: '100%'});
  } else {
    $('.chosen-select').each(function() {
      $(this).find('.placeholder-option').text('Select an option')
    });
  }

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
  if($('#choosePrefLocFramHeading').length ) {
    var $selectedRegion = '',
        $selectedRegionName = '',
        $regionSelectClone = $('#regionSelect >').clone();

    if(!$('.map-legend-container').hasClass('disabled') && !$('#regionSelect option[selected]').length) {
      // Animate map after 2 seconds
      setTimeout(function() {
        $('.svg-map-container').addClass('hvr-back-pulse');
        $('.map-legend').show();
        $('#hoveredRegionName').text('Choose a region to filter the locations');
      }, 1000);

      // Stop animation and remove hint
      setTimeout(function() {
        $('.svg-map-container').removeClass('hvr-back-pulse');
        $('.map-legend').fadeOut('slow');
        $('#chooseRegionContainer').fadeIn('slow');
      }, 3000);
    }

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

    $('#viewListOfLocations').on('click', function(e) {
      $('#listOfLocationsContainer').removeClass('toggle-content');

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

      $('#selectLocationBlurb, #selectSecondLocationBlurb, #locationSelectedText, #locationSelectedContainer')
        .addClass('toggle-content').attr('aria-hidden', true);

      $("#schemePref1 option, #schemePref2 option").attr('selected', false);
      $("#schemePref1, #schemePref2").trigger("chosen:updated");

      $('#chosenRegionBlurb')
        .removeClass('toggle-content')
        .attr('aria-hidden', false)
        .find('b').text(regionName);

      $('#listOfLocationsContainer').removeClass('toggle-content');

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

    function hideBlurb() {
      $('#locationSelectedContainer').removeClass('toggle-content').attr('aria-hidden', false);

      $('.map-control').hide();

      $('#chosenRegionBlurb, #selectLocationBlurb').addClass('toggle-content').attr('aria-hidden', true);
      $('#locationSelectedText').removeClass('toggle-content').attr('aria-hidden', false);

    }

    if($('#regionSelect option[selected]').length) {
      $('#listOfLocationsContainer, #choiceSave').removeClass('toggle-content').attr('aria-hidden', false);
      hideBlurb();
    }

    // Choosing a location affects schemes
    $("#regionSelect").on('change', function() {
      hideBlurb();
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


    $('#clearMap').on('click', function() {
      window.location.reload();
    });

  }

});











;$(function() {

  //-- Faking details behaviour

  $('.no-details').on('click keypress', 'summary', function(e) {
    var $this = $(this);
    if (e.which === 13 || e.type === 'click') {
      $this.parent().toggleClass('open');
    }
  });

});