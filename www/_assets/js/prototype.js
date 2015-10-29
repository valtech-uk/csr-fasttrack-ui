// --------------- Not to be used in production -------------- //

$(function() {

  function gup( name )
  {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return null;
    else
      return results[1];
  }

  var storedFirstName = $.jStorage.get('firstName'),
      storedLastName = $.jStorage.get('lastName'),
      storedEmail = $.jStorage.get('emailAddress'),
      storedPrefName = $.jStorage.get('preferredName'),
      storedDobDay = ("00" + new Number($.jStorage.get('dobDay'))).substr(-2,2),
      storedDobMonth = ("00" + new Number($.jStorage.get('dobMonth'))).substr(-2,2),
      storedDobYear = $.jStorage.get('dobYear'),
      storedAddress01 = $.jStorage.get('address01'),
      storedAddress02 = $.jStorage.get('address02'),
      storedAddress03 = $.jStorage.get('address03'),
      storedAddress03b = $.jStorage.get('address03b'),
      storedAddress04 = $.jStorage.get('address04'),
      storedMobNumber = $.jStorage.get('mob-number'),
      storedLandNumber = $.jStorage.get('land-number'),
      storedSchoolName = $.jStorage.get('schoolName'),
      storedAlevel = $.jStorage.get('aLevels'),
      storedFirstLoc = $.jStorage.get('first-storageLocation'),
      storedFirstFrame1 = $.jStorage.get('first-storageFirstFramework'),
      storedFirstFrame2 = $.jStorage.get('first-storageSecondFramework'),
      storedSecondLoc = $.jStorage.get('second-storageLocation'),
      storedSecondFrame1 = $.jStorage.get('second-storageFirstFramework'),
      storedSecondFrame2 = $.jStorage.get('second-storageSecondFramework'),
      storedAltLocation = $.jStorage.get('considerAltLocation'),
      storedAltFramework = $.jStorage.get('considerAltFramework'),
      longMonths = {'01':'January', '02':'February', '03':'March', '04':'April', '05':'May', '06':'June', '07':'July', '08':'August', '09':'September', '10':'October', '11':'November', '12':'December'},
      shortMonths = {'01':'Jan', '02':'Feb', '03':'Mar', '04':'Apr', '05':'May', '06':'June', '07':'July', '08':'Aug', '09':'Sept', '10':'Oct', '11':'Nov', '12':'Dec'};

  $('#createAccountBtn').on('click', function() {
    $.jStorage.set('firstName', $('#first-name').val());
    $.jStorage.set('lastName', $('#last-name').val());
    $.jStorage.set('emailAddress', $('#email-input').val());
  });

  if($('#personalDetailsHeading').length && storedFirstName != undefined) {
    $('#first-name').val(storedFirstName);
    $('#last-name').val(storedLastName);
    $('#preferredName').val(storedFirstName);
  }

  $('#detailsContinue').on('click', function() {
    $.jStorage.set('preferredName', $('#preferredName').val());

    $.jStorage.set('dobDay', $('#dob-day').val());
    $.jStorage.set('dobMonth', $('#dob-month').val());
    $.jStorage.set('dobYear', $('#dob-year').val());

    $.jStorage.set('address01', $('#address1').val());
    $.jStorage.set('address02', $('#address2').val());
    $.jStorage.set('address03', $('#address3').val());
    $.jStorage.set('address03b', $('#address3b').val());
    $.jStorage.set('address04', $('#address4').val());

    $.jStorage.set('mob-number', $('#phone-input').val());
    $.jStorage.set('land-number', $('#phone-input2').val());

    $.jStorage.set('schoolName', $('#schoolName').val());

    if($('#alevel-yes').is(':checked')) {
      $.jStorage.set('aLevels', true);
    } else {
      $.jStorage.set('aLevels', false);
    }
  });

  //------------- Set personal details

  if($('#dob-day').length && gup('continue') == 'true') {
    $('#dob-day').val(storedDobDay);
    $('#dob-month').val(storedDobMonth);
    $('#dob-year').val(storedDobYear);

    $('#address1').val(storedAddress01);
    $('#address2').val(storedAddress02);
    $('#address3').val(storedAddress03);
    $('#address3b').val(storedAddress03b);
    $('#address4').val(storedAddress04);

    $('#phone-input').val(storedMobNumber);
    $('#phone-input2').val(storedLandNumber);

    $('#schoolName').val(storedSchoolName);

    if(storedAlevel == false ) {
      $('#alevel-no').attr('checked', true).parent().addClass('selected');
    } else {
      $('#alevel-yes').attr('checked', true).parent().addClass('selected');
    }

    $('#detailsContinue').attr('href', $('#detailsContinue').attr('href') + '?continue=true');
  }

  if($('#checkApplicationHeading').length && storedFirstName != undefined) {
    $('#fullName').text(storedFirstName + ' ' + storedLastName);

    $('#preferredName').text(storedPrefName);

    $('#dateOfBirth').text(storedDobDay + ' ' + longMonths[storedDobMonth] + ' ' + storedDobYear);

    $('#address1').text(storedAddress01);
    $('#address2').text(storedAddress02);
    $('#address3').text(storedAddress03);
    $('#address3b').text(storedAddress03b);
    $('#address4').text(storedAddress04);

    $('#phone-input').text(storedMobNumber);
    $('#phone-input2').text(storedLandNumber);

    $('#schoolName').text(storedSchoolName);

    if(storedAlevel == false ) {
      $('#minGCSEs').removeClass('hidden');
      $('#minAlevels').addClass('hidden');
    } else {
      $('#minGCSEs').addClass('hidden');
      $('#minAlevels').removeClass('hidden');
    }

    $('#firstPreference').text(storedFirstLoc + ' (' + storedFirstFrame1 + ', ' + storedFirstFrame2 + ')');

    if(storedSecondLoc != null) {
      $('#secondPreference').text(storedSecondLoc + ' (' + storedSecondFrame1 + ', ' + storedSecondFrame2 + ')');
    } else {
      $('#noSecondPreference').removeClass('hidden');
      $('#secondPreference').addClass('hidden');
    }

    $('#considerAltLocation').text(storedAltLocation);

    $('#considerAltFramework').text(storedAltFramework);

  }

  if($('#choosePrefLocFramHeading').length && gup('continue') == 'true') {
    $('.svg-map').attr('class', 'svg-map disabled');
    $('.map-control, #chooseLocationAndFramework, #secondPreferenceControls').hide();


    if(storedSecondLoc != null) {
      $('#second-chosenLocation').text(storedSecondLoc);
      $('#second-chosenFrameworks').text(storedSecondFrame1 + ', ' + storedSecondFrame2);
      $('#second-choiceInfo').removeClass('hidden');
    }

    $('#chosenLocation').text(storedFirstLoc);
    $('#chosenFrameworks').text(storedFirstFrame1 + ', ' + storedFirstFrame2);
    $('#choiceInfo, #locFramContinueSaved').removeClass('hidden');

  }

  if($('#SuccessMessageText').length && storedEmail) {
    $('#emailAddress').text(storedEmail);
  }

  if($('#nameOnHome').length && storedFirstName) {
    $('#nameOnHome').text(storedFirstName + ' ' + storedLastName);
  }


  //-- Find address mock behaviour

  $('#findAddressBtn').on('click', function(e) {
    e.preventDefault();

    $('#addressSelectContainer').show();

  });

  $('#addressSelect').on('change', function() {
    var $thisVal = $(this).val();

    $('#addressManualInput').removeClass('disabled');

    if($thisVal !== 'void') {
      $('#address1').val($thisVal);
      $('#address2').val('Windsor');
      $('#address4').val($('#post-code').val());
    }
  });

  $('#addressManualLink').on('click', function(e) {
    e.preventDefault();

    $('#addressManualInput').removeClass('disabled');
    $('#address1').focus();
  });


  //-- Errors on pattern library page

  $('#errorButton').on('click', function() {
    $('.validation-summary-errors').toggle();
    $('.has-an-error').toggleClass('input-validation-error');
    $('.has-an-error').find('.has-error').text('Oh no, you need to enter something in there');
  });

  //-- Banner sign in

  $('#btnSignIn').on('click', function() {
    $.cookie('signedIn', true, {path: '/'});
  });

  $('#btnSignOut, #withdrawApplication').on('click', function() {
    $.removeCookie('signedIn', { path: '/' });
    $.jStorage.flush();
  });

  if($('#signedOut').length && gup('Status') == 'signout') {
    $('#signedOut').show();
  }

  if($('#signedOut').length && gup('Status') == 'withdrawn') {
    $('#withdrawnApplication').show();
  }


  $('#hideIEMessage').on('click', function() {
    $.cookie('hideMessage', true, {path: '/'});
  });

  if($.cookie('hideMessage')) {
    $('html').addClass('message-hidden');
  }

  if($.cookie('signedIn')) {
    $('#bannerSignedOut').hide();
    $('#bannerSignedIn').show();
    if(storedFirstName != null) {
      $('#bannerUserName').text(storedFirstName + ' ' + storedLastName);
    }
  } else {
    $('#bannerSignedOut').show();
    $('#bannerSignedIn').hide();
  }

  $("#Password").keyup(function () {
    initializeStrengthMeter();
  });

  function initializeStrengthMeter() {
    $("#pass_meter").pwStrengthManager({
        password: $("#Password").val(),
        minChars: 8
    });
  }

  $('.pw-masktoggle').on("click", function () {
    changePassType();
    toggleShowHide();

    return false;
  });

  function changePassType() {
    var password = document.getElementById('Password');
    if (password.type == 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
  }

  function toggleShowHide() {
    var showOrHide = $('.pw-masktoggle').text();
    if (showOrHide == 'Show') {
        $('.pw-masktoggle').text('Hide');
    } else {
        $('.pw-masktoggle').text('Show');
    }
  }

// --------------- Not to be used in production -------------- //
});