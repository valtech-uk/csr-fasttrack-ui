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

  $('#createAccountBtn').on('click', function() {
    $.jStorage.set('firstName', $('#first-name').val());
    $.jStorage.set('lastName', $('#last-name').val());
    $.jStorage.set('emailAddress', $('#email-input').val());
  });

  if($('#personalDetailsHeading').length && $.jStorage.get('firstName') != undefined) {
    $('#first-name').val($.jStorage.get('firstName'));
    $('#last-name').val($.jStorage.get('lastName'));
    $('#preferredName').val($.jStorage.get('firstName'));
  }

  $('#detailsContinue').on('click', function() {
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
    $('#dob-day').val($.jStorage.get('dobDay'));
    $('#dob-month').val($.jStorage.get('dobMonth'));
    $('#dob-year').val($.jStorage.get('dobYear'));

    $('#address1').val($.jStorage.get('address01'));
    $('#address2').val($.jStorage.get('address02'));
    $('#address3').val($.jStorage.get('address03'));
    $('#address3b').val($.jStorage.get('address03b'));
    $('#address4').val($.jStorage.get('address04'));

    $('#phone-input').val($.jStorage.get('mob-number'));
    $('#phone-input2').val($.jStorage.get('land-number'));

    $('#schoolName').val($.jStorage.get('schoolName'));

    if($.jStorage.get('aLevels') == false ) {
      $('#alevel-no').attr('checked', true).parent().addClass('selected');
    } else {
      $('#alevel-yes').attr('checked', true).parent().addClass('selected');
    }

    $('#detailsContinue').attr('href', $('#detailsContinue').attr('href') + '?continue=true');

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
    $('.has-an-error').toggleClass('input-validation-error')
  });

  //-- Banner sign in

  $('#btnSignIn').on('click', function() {
    $.cookie('signedIn', true, {path: '/'});
  });

  $('#btnSignOut, #btnDeleteAccount').on('click', function() {
    $.removeCookie('signedIn', { path: '/' });
  });

  if($.cookie('signedIn')) {
    $('#bannerSignedOut').hide();
    $('#bannerSignedIn').show();
    $('.details-apply').show();
    $('.details-signIn').hide();
    $('#beforeApply').hide();
  } else {
    $('#bannerSignedOut').show();
    $('#bannerSignedIn').hide();
    $('.details-apply').hide();
    $('.details-signIn').show();
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

  // // ------ Change bookmark icon on click

  // $('.bookmark-result').on('click', function() {

  //   $(this).find('.fa').toggleClass('fa-star-o fa-star');

  //   $(this).attr('title', $(this).find('.fa').hasClass('fa-star') ? 'Remove from saved':'Add to saved');

  //   if($('.fa-star').length) {
  //     $('#savedHeaderItem').removeClass('toggle-content');
  //     if($(window).scrollTop() > heightOfHeader) {
  //       addFixedHeader();
  //     }
  //   } else {
  //     $('#savedHeaderItem').addClass('toggle-content');
  //   }

  //   $('#savedCount').text($('.fa-star').length);

  //   $(this).toggleClass('filled-in');
  //   $(this).blur();

  //   if('#settingsLink')

  //   return false;

  // });


// --------------- Not to be used in production -------------- //
});