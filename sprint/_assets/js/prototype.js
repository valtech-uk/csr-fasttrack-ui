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

  //------------- Copy details from registration

  $('#createAccountBtn').on('click', function(){
    $firstName  = $('#first-name').val(),
    $lastName   = $('#last-name').val(),
    $fullName   = $firstName + ' ' + $lastName,
    $dobDay     = $('#dob-day').val(),
    $dobMonth   = $('#dob-month').val(),
    $dobYear    = $('#dob-year').val(),
    $dobFull    = $dobDay + '/' + $dobMonth + '/' + $dobYear,
    $address1   = $('#address1').val(),
    $address2   = $('#address2').val(),
    $address3   = $('#address3').val(),
    $address3b  = $('#address3b').val(),
    $address4   = $('#address4').val(),
    $emailInput = $('#email-input').val(),
    $phoneInput = $('#phone-input').val();

    $.jStorage.set('fullName', $fullName);
    $.jStorage.set('dobFull', $dobFull);
    $.jStorage.set('address1', $address1);
    $.jStorage.set('address2', $address2);
    $.jStorage.set('address3', $address3);
    $.jStorage.set('address3b', $address3b);
    $.jStorage.set('address4', $address4);
    $.jStorage.set('emailInput', $emailInput);
    $.jStorage.set('phoneInput', $phoneInput);

  });

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