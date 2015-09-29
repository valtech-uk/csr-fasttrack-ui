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

  var checkedInputs = [],
      joinedInputs = '',
      selectedLabel = '';

  $('.applicantCheckbox').on('change', function() {
    if($(this).is(':checked') || $(this).closest('table').find('.applicantCheckbox').is(':checked')) {
      $('#candidatesSelected').show();
      $('#numCandSelected').html($('.applicantCheckbox:checked').length);
      if($('.applicantCheckbox:checked').length > 1) {
        $('#appsPlural').show();
      } else {
        $('#appsPlural').hide();
      }
      $('#applicantsMultiActions, #labelContainer').removeClass('disabled');
    } else {
      $('#candidatesSelected').hide();
      $('#applicantsMultiActions, #labelContainer').addClass('disabled');
      closeLabelControls();
    }
  });

  $('#labelOpener').on('click', function(e) {
    e.preventDefault();

    toggleLabelControls();

    $(this).addClass('opened').blur();

  });

  $('#finishLabelling').on('click', function(e) {
    e.preventDefault();
    toggleLabelControls();
    checkedInputs = [];

    $('[name=labelRadios]').attr('checked', false);

    // $('.applicantCheckbox').attr('checked', false);

  });

  function toggleLabelControls() {
    $('#labelControls').toggleClass('toggle-content');
    $('#labelOpener').find('.updownIcon').toggleClass('fa-caret-down fa-caret-up');
  }

  function closeLabelControls() {
    $('#labelControls').addClass('toggle-content');
    $('#labelOpener').find('.fa-caret-up').toggleClass('fa-caret-down fa-caret-up');
  }

  function openLabelControls() {
    $('#labelControls').removeClass('toggle-content');
    $('#labelOpener').find('.fa-caret-down').toggleClass('fa-caret-down fa-caret-up');
    $('#labelOpener').focus();
  }

  $('#newLabel').on('focus', function() {
    $('.label-radio').removeAttr('checked');
  });

  $('.applicantCheckbox').on('change', function() {
    if($(this).is(':checked')) {
      checkedInputs.push('#' + $(this).prop('id'));
    } else {
      checkedInputs.pop('#' + $(this).prop('id'));
    }
  });

  $('.label-radio').on('change', function() {
    selectedLabel = ($(this)[0].computedName);

    joinedInputs = checkedInputs.join(", ");

    $('' + joinedInputs + '').closest('tr').find('.applicant-add-label').hide();
    $('' + joinedInputs + '').closest('tr').find('.applicant-label').show().find('.the-label').text(selectedLabel);

  });

  $('.applicant-add-label').on('click', function(e) {
    var theCheckbox = $(this).closest('tr').find('.applicantCheckbox').attr('checked', 'checked');

    e.preventDefault();

    if($(theCheckbox).is(':checked')) {
      checkedInputs.push('#' + theCheckbox.prop('id'));
    } else {
      checkedInputs.pop('#' + theCheckbox.prop('id'));
    }

    $('#applicantsMultiActions, #labelContainer').removeClass('disabled');
    openLabelControls();

  });

  // $('#rejectCustomRadio').on('change', function() {
  //   $('#rejectionCustomMessage').show();
  // });

  // $('#rejectionRadios input[type=radio]').not('#rejectCustomRadio').change(function() {
  //   $('#rejectionCustomMessage').hide();
  // });

  // var frameworkItems = [];

  // $.getJSON( "/appdata/frameworks.json", function( data ) {
  //   // var items = [];

  //   // items = JSON.parse(data);

  //   // console.log(items);

  // });

  $('#shareVacancyButton').on('click', function(e) {
    e.preventDefault();

    $('#vacancyShared').show();
    $('#sendVacancy').val('');
    $(this).blur();
  });

  $('.edit-region-container .add-section').on('click', function(e) {
    e.preventDefault();

    $(this).hide();
    $(this).closest('.edit-region-container').find('.editmode-wrapper').show().find('input').focus();
  });

  $('.editmode-save').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.editmode-wrapper').hide();
    $(this).closest('.edit-region-container').find('.saved-region').show();
  });

  $('.edit-region-container input, .edit-region-container textarea').on('keyup', function() {
    var theValue = $(this).val();
    $(this).closest('.edit-region-container').find('.region-text').text(theValue);
  });

  $('.edit-region-container .edit-link').on('click', function(e) {
    e.preventDefault();

    var namedLabel = $(this).closest('.edit-region-container').find('.labelledtext').text();

    $(this).closest('.saved-region').hide();

    $(this).closest('.edit-region-container').find('.form-control').val(namedLabel);

    $(this).closest('.edit-region-container').find('.editmode-wrapper').show();
  });


  $('.chosen-select').chosen();

  if($('#pageManageSites').length) {
    var firstUser = gup('First'),
        newUser = gup('New');

    if(firstUser == "true") {
      $.cookie('newProvider', true, {path: '/'});
    }

    if(newUser == "true") {
      $('#providerSitesList').hide();
      $('#newProviderContinue').show();
      $('#newProviderContinueBtn').attr('href', 'add-site.html');
      $('#firstProviderMessage').hide();
      $('#newProviderMessage').show();
      $('#providerSavedName').hide();
      $('#providerNameInput').val('');
    }
  }

  if($('#userInfoPage').length) {
    var nextUser = gup('Next');

    if(nextUser == "true") {
      $('#nextProviderBanner').show();
    }
  }

  if($.cookie('newProvider')) {
    $('a[href="manage-sites.html"]').attr('href', 'manage-sites.html?First=true');

    if($('#pageManageSites').length) {
      $('#newProviderBanner').show();
      $('#newProviderContinue').show();
      $('#providerDetailsSave').hide();
    }

    if($('#userInfoPage').length) {
      $('#newProviderTerms').show();
      $('#userInfoSaveBtn').hide();
    }
  }

  $('#providerCreateBtn').on('click', function() {
    $.cookie('newProvider', null, { path: '/', expires: -5 });
  });

  $('#userInfoSaveBtnClick').on('click', function(e) {
    e.preventDefault();

    $('#userInfoSaved').show();
  });

  $('#searchTrainingNameBtn').on('click', function(e) {
    e.preventDefault();

    $('#trainingSiteResults').show();
  });

// --------------- Remove for live code -------------- //
});