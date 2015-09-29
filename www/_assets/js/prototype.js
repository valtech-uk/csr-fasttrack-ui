$(function() {
// ------------ Trainee search mockup ------------ //

  $('.search-proto-input').on('keyup', function(){
    var $this   = $(this).val(),
        $input1 = $('.search-proto-input-1').val(),
        $input2 = $('.search-proto-input-2').val(),
        $index  = $.jStorage.index();

    if($this.toLowerCase().indexOf('cust') > -1){
      $('.trainee-searchbtn').attr('href', 'search-results-customer.html');
    } else if($this.toLowerCase().indexOf('admin') > -1){
      $('.trainee-searchbtn').attr('href', 'search-results-admin.html');
    }

    $.jStorage.set('input1Key', $input1);
    $.jStorage.set('input2Key', $input2);

  });

  $('.search-proto-result-input').on('keyup', function(){
    var $this   = $(this).val(),
        $input1 = $('.search-proto-result-input-1').val(),
        $input2 = $('.search-proto-result-input-2').val();

    if($this.toLowerCase().indexOf('cust') > -1){
      $('.update-results-btn').attr('href', 'search-results-customer.html');
    } else if($this.toLowerCase().indexOf('admin') > -1){
      $('.update-results-btn').attr('href', 'search-results-admin.html');
    }

    $.jStorage.set('input1Key', $input1);
    $.jStorage.set('input2Key', $input2);
  });

  function changeSearchInputs() {
    var resultInput1 = $.jStorage.get('input1Key'),
        resultInput2 = $.jStorage.get('input2Key')

    $('.search-proto-result-input-1').val(resultInput1);
    $('.search-proto-result-input-2').val(resultInput2);
  }

  changeSearchInputs();

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

  $('#enquiryButton').on('click', function(){
    var $emailInput = $('#email-input').val();

    $.jStorage.set('emailInput', $emailInput);

  });

  $('#enquiryEmail').text($.jStorage.get('emailInput'));

  if($('#accountCreated').length) {
    var emailInputPre = $.jStorage.get('emailInput');

    $('.email-address').text(emailInputPre);
  }

  $('#applyPreviewBtn').on('click', function() {
    var $schoolName    = $('#school-name').val(),
        $schoolFrom    = $('#school-from').val(),
        $schoolTo      = $('#school-to').val(),
        $question1     = $('#question1').val(),
        $question2     = $('#question2').val(),
        $question3     = $('#question3').val(),
        $question4     = $('#question4').val(),
        $addQuestion1  = $('#add-question1').val(),
        $addQuestion2  = $('#add-question2').val();

    $.jStorage.set('schoolName', $schoolName);
    $.jStorage.set('schoolFrom', $schoolFrom);
    $.jStorage.set('schoolTo', $schoolTo);
    $.jStorage.set('question1', $question1);
    $.jStorage.set('question2', $question2);
    $.jStorage.set('question3', $question3);
    $.jStorage.set('question4', $question4);
    $.jStorage.set('add-question1', $addQuestion1);
    $.jStorage.set('add-question2', $addQuestion2);
  });

  if($('#schoolNamePre').length) {
    var schoolNamePre    = $.jStorage.get('schoolName'),
        schoolFromPre    = $.jStorage.get('schoolFrom'),
        schoolToPre      = $.jStorage.get('schoolTo'),
        question1Pre     = $.jStorage.get('question1'),
        question2Pre     = $.jStorage.get('question2'),
        question3Pre     = $.jStorage.get('question3'),
        question4Pre     = $.jStorage.get('question4'),
        addQuestion1Pre  = $.jStorage.get('add-question1'),
        addQuestion2Pre  = $.jStorage.get('add-question2');

    $('#schoolNamePre').text(schoolNamePre);
    $('#schoolFromPre').text(schoolFromPre);
    $('#schoolToPre').text(schoolToPre);
    $('#question1Pre').text(question1Pre);
    $('#question2Pre').text(question2Pre);
    $('#question3Pre').text(question3Pre);
    $('#question4Pre').text(question4Pre);
    $('#add-question1Pre').text(addQuestion1Pre);
    $('#add-question2Pre').text(addQuestion2Pre);

  }

//------------- Address input
  if($('#pca-addressInput').length) {
    var searchContext = "",
      key = "JY37-NM56-JA37-WT99",
      findAddressVal = $("#pca-addressInput").val();

    $("#pca-addressInput").keyup(function () {

        findAddressVal = $(this).val();
    });

    $("#pca-addressInput").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "//services.postcodeanywhere.co.uk/CapturePlus/Interactive/Find/v2.10/json3.ws",
          dataType: "jsonp",
          data: {
              key: key,
              searchFor: "Everything",
              country: 'GB',
              searchTerm: request.term,
              lastId: searchContext
          },
          success: function (data) {
              response($.map(data.Items, function (suggestion) {
                  return {
                      label: suggestion.Text,
                      data: suggestion
                  }
              }));
            }
        });
      },
      messages: {
        noResults: function () {
            return "We can't find an address matching " + findAddressVal;
        },
        results: function (amount) {
            return "We've found " + amount + (amount > 1 ? " addresses" : " address") +
                " that match " + findAddressVal + ". Use up and down arrow keys to navigate";
        }
      },
      select: function (event, ui) {
        var item = ui.item.data

        if (item.Next == "Retrieve") {
            //retrieve the address
            retrieveAddress(item.Id);
        } else {
            var field = $(this);
            searchContext = item.Id;

            //search again
            window.setTimeout(function () {
                field.autocomplete("search", item.Id);
            });
        }
      },
      focus: function(event, ui) {
        $("#addressInputWrapper").find('.ui-helper-hidden-accessible').text("To select " + ui.item.label + ", press enter");
      },
      autoFocus: false,
      minLength: 1,
      delay: 100
    });

    function retrieveAddress(id) {
      $('#addressLoading').show();
      $('#enterAddressManually').hide();
      $('#addressManualInput').addClass('disabled');

      $.ajax({
        url: "//services.postcodeanywhere.co.uk/CapturePlus/Interactive/Retrieve/v2.10/json3.ws",
        dataType: "jsonp",
        data: {
          key: key,
          id: id
        },
        success: function (data) {
          if (data.Items.length)
            populateAddress(data.Items[0]);

            $('#addressLoading').hide();
            $('#enterAddressManually').show();
            $('#addressManualInput').removeClass('disabled');

            $('#ariaAddressEntered').text('Your address has been entered into the fields below.');
          }
      });
    }

    function populateAddress(address) {
      console.log(address);
      $('#pca-address1').val(address.Line1);
      $('#pca-address2').val(address.Line2);
      $('#pca-address3').val(address.Line3);
      $('#pca-address4').val(address.City);
      $('#pca-postcode').val(address.PostalCode);
    }

    $('#enterAddressManually').on('click', function(e) {
      e.preventDefault();
      $('#addressManualInput').removeClass('disabled');
      $('#pca-address1').focus();
      $('#manualAddressWrapper').unbind('click');
    });

    $('#manualAddressWrapper').bind('click', function() {
      $(this).unbind('click');
      $('#addressManualInput').removeClass('disabled');
      $('#pca-address1').focus();
    });

    $('.address-find-btn').on('click', function(e) {
      $('.address-find-select').show();
      e.preventDefault();
    });

    $('#address-select').on('change', function() {
      var $this     = $(this),
          $thisVal  = $this.val(),
          $postCode = $('#post-code').val();

      if($this.val() != 'void') {

        $('#pca-address1').val($thisVal);
        $('#address3').val('Windsor');
        $('#address4').val($postCode);

        $('#addressManualInput').removeClass('disabled');
        $('#manualAddressWrapper').unbind('click');
      }
    });

    $('.address-manual-btn').on('click', function(e) {
      $('.address-manual-input').show();
      e.preventDefault();
    });
  }


// ------------ Apply for vacancy mockup ------------ //

  $('#saveQualification').on('click', function(e){
    var $qualType    = $('#qual-type').val(),
        $qualID      = $('#qual-type').find(":selected").attr('class'),
        $qualSubject = $('#subject-name').val(),
        $qualGrade   = $('#subject-grade').val(),
        $qualYear    = $('#subject-year').val(),
        $isPredicted = $('#qual-predicted').is(':checked'),
        $isPredValue = ($isPredicted ? " (Predicted)" : ""),
        $otherQual   = $('#other-qual').val(),
        $isOther     = $('#otherQualOption').is(':selected'),
        $qualTorO    = ($isOther ? $otherQual : $qualType),
        $rowHTML     = '<tr class="tr-qualRow">' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualSubject + '" readonly>' +
                          '</td>' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualGrade + $isPredValue + '" readonly>' +
                          '</td>' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualYear + '" readonly>' +
                          '</td>' +
                          '<td class="td-qualEdit ta-center"><span class="fake-link cell-span">Edit</span></td>' +
                          '<td class="qualRemove ta-center"><i class="cell-span"><i class="copy-16 fa fa-times-circle icon-black"></i><i class="visuallyhidden">Remove</i></i></td>' +
                        '</tr>',
        $emptyTable  = '<div class="qualification-table"' + 'id="' + $qualID + '">' +
                        '<div class="hgroup-small">' +
                          '<h3 class="heading-small heading-qualType">' + $qualTorO + '</h3>' +
                        '</div>' +
                        '<table class="grid-3-4">' +
                          '<colgroup>' +
                            '<col class="t40">' +
                            '<col class="t25">' +
                            '<col class="t15">' +
                            '<col class="t10">' +
                            '<col class="t10">' +
                            '<col>' +
                          '</colgroup>' +
                          '<thead>' +
                            '<tr>' +
                              '<th class="th-qualSubject"><span class="heading-span">Subject</span></th>' +
                              '<th class="th-qualGrade"><span class="heading-span">Grade</span></th>' +
                              '<th class="th-qualYear"><span class="heading-span">Year</span></th>' +
                              '<th></th>' +
                              '<th></th>' +
                            '</tr>' +
                          '</thead>' +
                          '<tbody class="tbody-qual">' +
                            $rowHTML +
                          '</tbody>' +
                        '</table>' +
                      '</div>';

    if($('.tr-qualRow').length == 0) {
      $('.qualification-table').show().attr('id', $qualID);
      $('.heading-qualType').html($qualTorO);
      $('.tbody-qual').html($rowHTML);
    } else {
      $('#' + $qualID).find('.tbody-qual').append($rowHTML);
      diffQual();
    }

    function diffQual() {
      if($('#' + $qualID).length == 0) {
        $('.qualifications-wrapper').append($emptyTable);
      }
    }

    $('#subject-name').val('');
    $('#subject-grade').val('');
    $('#qual-predicted').prop('checked', false);

    e.preventDefault();

  });

  $('#qual-type').change(function() {
    if($(this).val() == "Other") {
      $('.other-qual-input').show();
    } else {
      $('.other-qual-input').hide();
    }
  });

  $('.qualifications-wrapper').on('click', '.qualRemove', function() {
    var $this = $(this);

    $this.closest('.tr-qualRow').remove();
  });

  $('.qualifications-wrapper').on('click', '.td-qualEdit', function(e) {
    var $this      = $(this),
        $editBoxes = $this.siblings().find('.qual-input-edit');

    $this.html('<span class="fake-link cell-span">Save</span>').addClass('qualSave');

    $editBoxes.removeAttr('readonly');

    e.preventDefault();
  });

  $('.qualifications-wrapper').on('click', '.qualSave', function(e) {
    var $this       = $(this),
        $editBoxes  = $this.siblings().find('.qual-input-edit');

    $this.html('<span class="fake-link cell-span">Edit</span>').removeClass('qualSave');

    $editBoxes.prop('readonly', 'readonly');

    e.preventDefault();
  });

// ------------ Training experience entry ------------ //

  $('#addWorkBtn').on('click', function(e) {
    var $workEmployer    = $('#work-employer').val(),
        $workTitle       = $('#work-title').val(),
        $workRole        = $('#work-role').val(),
        $workFrom        = $('#work-from').val(),
        $workFYear       = $('#work-from-year').val(),
        $workTo          = $('#work-to').val(),
        $workTYear       = $('#work-to-year').val(),
        $isCurrent       = $('#work-current').is(':checked'),
        $isChecked       = ($isCurrent ? 'checked' : ''),
        $isDisabled      = ($isCurrent ? 'disabled' : ''),
        $isCurrValue     = ($isCurrent ? '<span class="cell-span editable-work work-to-span work-month work-to-month"></span>' +
                                          '<span class="cell-span editable-work work-to-span work-year"></span>' :
                                          '<span class="cell-span editable-work work-to-span work-month work-to-month">' + $workTo + '</span>' +
                                          '<span class="cell-span editable-work work-to-span work-year">' + $workTYear + '</span>'),
        $historyItemHTML = '<div class="grid-wrapper work-history-item">' +
                              '<div class="work-controls">' +
                                '<div class="work-edit ta-center"><span class="cell-span fake-link">Edit</span></div>' +
                                '<div class="work-delete ta-center"><span class="cell-span"><i class="copy-16 fa fa-times-circle icon-black"></i><i class="visuallyhidden">Remove</i></span></div>' +
                              '</div>' +
                              '<div class="grid grid-1-2">' +
                                '<table class="table-no-btm-border table-compound">' +
                                  '<colgroup>' +
                                    '<col class="t100">' +
                                    '<col>' +
                                  '</colgroup>' +
                                  '<thead>' +
                                    '<tr>' +
                                      '<th><span class="heading-span">Work experience</span></th>' +
                                    '</tr>' +
                                  '</thead>' +
                                  '<tbody>' +
                                    '<tr>' +
                                      '<td>' +
                                        '<input type="text" class="form-control toggle-content inline width-all-49 editable-work-input" value="' +
                                        $workEmployer +'">' +
                                        '<span class="cell-span editable-work">' +
                                        $workEmployer + '</span>' +
                                        '<span class="cell-span work-hyphen">-</span>' +
                                        '<input type="text" class="form-control toggle-content inline width-all-49 editable-work-input no-right-margin" value="' +
                                        $workTitle + '">' +
                                        '<span class="cell-span editable-work">' +
                                        $workTitle + '</span>' +
                                        '<div></div>' +
                                        '<textarea rows="3" class="form-control toggle-content editable-work-input">'+
                                        $workRole +'</textarea>' +
                                        '<span class="cell-span editable-work">' +
                                        $workRole +'</span>' +
                                      '</td>' +
                                    '</tr>' +
                                  '</tbody>' +
                                '</table>' +
                              '</div>' +
                              '<div class="grid grid-1-2">' +
                                '<table class="table-no-btm-border table-compound">' +
                                  '<colgroup>' +
                                    '<col class="t30">' +
                                    '<col class="t30">' +
                                    '<col class="t25">' +
                                    '<col class="t15">' +
                                    '<col>' +
                                  '</colgroup>' +
                                  '<thead>' +
                                    '<tr>' +
                                      '<th><span class="heading-span">From</span></th>' +
                                      '<th><span class="heading-span">To</span></th>' +
                                      '<th></th>' +
                                      '<th></th>' +
                                    '</tr>' +
                                  '</thead>' +
                                  '<tbody>' +
                                    '<tr>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound">' +
                                            '<select class="work-month-select" id="workFromSelect">' +
                                              '<option value="Jan">Jan</option>' +
                                              '<option value="Feb">Feb</option>' +
                                              '<option value="Mar">Mar</option>' +
                                              '<option value="Apr">Apr</option>' +
                                              '<option value="May">May</option>' +
                                              '<option value="June">June</option>' +
                                              '<option value="July">July</option>' +
                                              '<option value="Aug">Aug</option>' +
                                              '<option value="Sept">Sept</option>' +
                                              '<option value="Oct">Oct</option>' +
                                              '<option value="Nov">Nov</option>' +
                                              '<option value="Dec">Dec</option>' +
                                            '</select>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<input type="text" class="form-control toggle-content work-year-input" value="' +
                                            $workFYear + '">' +
                                          '</div>' +
                                        '</div>' +
                                        '<span class="cell-span editable-work work-month work-from-month">' + $workFrom + '</span>' +
                                        '<span class="cell-span editable-work work-year">' + $workFYear + '</span>' +
                                      '</td>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound ' + $isDisabled + '">' +
                                            '<select class="editable-current work-month-select" id="workToSelect"' + $isDisabled + '>' +
                                              '<option value="Jan">Jan</option>' +
                                              '<option value="Feb">Feb</option>' +
                                              '<option value="Mar">Mar</option>' +
                                              '<option value="Apr">Apr</option>' +
                                              '<option value="May">May</option>' +
                                              '<option value="June">June</option>' +
                                              '<option value="July">July</option>' +
                                              '<option value="Aug">Aug</option>' +
                                              '<option value="Sept">Sept</option>' +
                                              '<option value="Oct">Oct</option>' +
                                              '<option value="Nov">Nov</option>' +
                                              '<option value="Dec">Dec</option>' +
                                            '</select>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound ' + $isDisabled + '">' +
                                            '<input type="text" class="editable-current form-control toggle-content work-year-input" value="' +
                                            $workTYear + '"' + $isDisabled +'>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<label><input ' + $isChecked + ' type="checkbox" id="edit-current"> Current</label>' +
                                          '</div>' +
                                        '</div>' +
                                         $isCurrValue +
                                      '</td>' +
                                      '<td></td>' +
                                      '<td></td>' +
                                    '</tr>' +
                                  '</tbody>' +
                                '</table>' +
                              '</div>' +
                            '</div>';

    $('.work-history-wrapper').append($historyItemHTML);

    $('#work-employer').val('');
    $('#work-title').val('');
    $('#work-role').val('');
    $('#work-from').val('Jan');
    $('#work-from-year').val('');
    $('#work-to').val('Jan');
    $('#work-to-year').val('');
    $('#work-current').prop('checked', false);
    $('#work-to').parent().removeClass('disabled');
    $('#work-to-year').parent().removeClass('disabled');
    $('#work-to').prop('disabled', false);
    $('#work-to-year').prop('disabled', false);

    e.preventDefault();

  });

  $('.work-history-wrapper').on('click', '.work-edit', function() {
    var $workFromMonth = $(this).closest('.work-history-item').find('.work-from-month').text(),
        $workToMonth   = $(this).closest('.work-history-item').find('.work-to-month').text();

    $(this).closest('.work-history-item').find('#workFromSelect').val($workFromMonth);
    $(this).closest('.work-history-item').find('#workToSelect').val($workToMonth);

  });

  $('#work-current').click(function() {
    $('#work-to').prop('disabled', $(this).prop('checked'));
    $('#work-to-year').prop('disabled', $(this).prop('checked'));
    $('#work-to').parent().toggleClass('disabled', $(this).prop('checked'));
    $('#work-to-year').parent().toggleClass('disabled', $(this).prop('checked'));

    $('#work-to-year').val('');
  });

  $('.work-history-wrapper').on('click', '#edit-current', function() {
    $(this).closest('td').find('.editable-current').prop('disabled', $(this).prop('checked'));
    $(this).closest('td').find('.editable-current').parent().toggleClass('disabled', $(this).prop('checked'));

  });

  $('.work-history-wrapper').on('click', '.work-delete', function(e) {
    $(this).closest('.work-history-item').remove();
    e.preventDefault();
  });

  $('.work-history-wrapper').on('click', '.work-edit', function(e) {
    $(this).closest('.work-history-item').addClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Save</span>').addClass('work-save');

    e.preventDefault();
  });

  $('.work-history-wrapper').on('click', '.work-save', function(e) {
    var $currentCheck     = $(this).closest('.work-history-item').find('#edit-current'),
        $isChecked        = $currentCheck.is(':checked'),
        $workToSpans      = $(this).closest('.work-history-item').find('.work-to-span'),
        $editableCurrents = $(this).closest('.work-history-item').find('.editable-currents');

    $(this).closest('.work-history-item').removeClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Edit</span>').removeClass('work-save');

    $(this).closest('.work-history').find('.editing-worksection').removeClass('editing-worksection');
    $(this).closest('.work-history').find('.icon-tick').removeClass('icon-tick').addClass('icon-edit');

    if($isChecked) {
      $workToSpans.text('');
      $editableCurrents.val('');
    }

    e.preventDefault();
  });

  $('.work-history-wrapper').on('keyup', '.editable-work-input', function() {
    var $thisVal = $(this).val();

    $(this).next('.editable-work').text($thisVal);
  });

  $('.work-history-wrapper').on('keyup', '.work-year-input', function() {
    var $thisVal = $(this).val();

    $(this).closest('td').find('.work-year').text($thisVal);
  });

  $('.work-history-wrapper').on('change', '.work-month-select', function() {
    var $thisVal = $(this).val();

    $(this).closest('td').find('.work-month').text($thisVal);
  });


  $('#addTrainingBtn').on('click', function(e) {
    var $trainingEmployer    = $('#training-employer').val(),
        $trainingTitle       = $('#training-title').val(),
        $trainingRole        = $('#training-role').val(),
        $trainingFrom        = $('#training-from').val(),
        $trainingFYear       = $('#training-from-year').val(),
        $trainingTo          = $('#training-to').val(),
        $trainingTYear       = $('#training-to-year').val(),
        $isCurrent       = $('#training-current').is(':checked'),
        $isChecked       = ($isCurrent ? 'checked' : ''),
        $isDisabled      = ($isCurrent ? 'disabled' : ''),
        $isCurrValue     = ($isCurrent ? '<span class="cell-span editable-training training-to-span training-month training-to-month"></span>' +
                                          '<span class="cell-span editable-training training-to-span training-year"></span>' :
                                          '<span class="cell-span editable-training training-to-span training-month training-to-month">' + $trainingTo + '</span>' +
                                          '<span class="cell-span editable-training training-to-span training-year">' + $trainingTYear + '</span>'),
        $historyItemHTML = '<div class="grid-wrapper training-history-item">' +
                              '<div class="training-controls">' +
                                '<div class="training-edit ta-center"><span class="cell-span fake-link">Edit</span></div>' +
                                '<div class="training-delete ta-center"><span class="cell-span"><i class="copy-16 fa fa-times-circle icon-black"></i><i class="visuallyhidden">Remove</i></span></div>' +
                              '</div>' +
                              '<div class="grid grid-1-2">' +
                                '<table class="table-no-btm-border table-compound">' +
                                  '<colgroup>' +
                                    '<col class="t100">' +
                                    '<col>' +
                                  '</colgroup>' +
                                  '<thead>' +
                                    '<tr>' +
                                      '<th><span class="heading-span">Training course</span></th>' +
                                    '</tr>' +
                                  '</thead>' +
                                  '<tbody>' +
                                    '<tr>' +
                                      '<td>' +
                                        '<input type="text" class="form-control toggle-content inline width-all-49 editable-training-input" value="' +
                                        $trainingEmployer +'">' +
                                        '<span class="cell-span editable-training">' +
                                        $trainingEmployer + '</span>' +
                                        '<span class="cell-span training-hyphen">-</span>' +
                                        '<input type="text" class="form-control toggle-content inline width-all-49 editable-training-input no-right-margin" value="' +
                                        $trainingTitle + '">' +
                                        '<span class="cell-span editable-training">' +
                                        $trainingTitle + '</span>' +
                                        '<div></div>' +
                                        '<textarea rows="3" class="form-control toggle-content editable-training-input">'+
                                        $trainingRole +'</textarea>' +
                                        '<span class="cell-span editable-training">' +
                                        $trainingRole +'</span>' +
                                      '</td>' +
                                    '</tr>' +
                                  '</tbody>' +
                                '</table>' +
                              '</div>' +
                              '<div class="grid grid-1-2">' +
                                '<table class="table-no-btm-border table-compound">' +
                                  '<colgroup>' +
                                    '<col class="t30">' +
                                    '<col class="t30">' +
                                    '<col class="t25">' +
                                    '<col class="t15">' +
                                    '<col>' +
                                  '</colgroup>' +
                                  '<thead>' +
                                    '<tr>' +
                                      '<th><span class="heading-span">From</span></th>' +
                                      '<th><span class="heading-span">To</span></th>' +
                                      '<th></th>' +
                                      '<th></th>' +
                                    '</tr>' +
                                  '</thead>' +
                                  '<tbody>' +
                                    '<tr>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound">' +
                                            '<select class="training-month-select" id="trainingFromSelect">' +
                                              '<option value="Jan">Jan</option>' +
                                              '<option value="Feb">Feb</option>' +
                                              '<option value="Mar">Mar</option>' +
                                              '<option value="Apr">Apr</option>' +
                                              '<option value="May">May</option>' +
                                              '<option value="June">June</option>' +
                                              '<option value="July">July</option>' +
                                              '<option value="Aug">Aug</option>' +
                                              '<option value="Sept">Sept</option>' +
                                              '<option value="Oct">Oct</option>' +
                                              '<option value="Nov">Nov</option>' +
                                              '<option value="Dec">Dec</option>' +
                                            '</select>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<input type="text" class="form-control toggle-content training-year-input" value="' +
                                            $trainingFYear + '">' +
                                          '</div>' +
                                        '</div>' +
                                        '<span class="cell-span editable-training training-month training-from-month">' + $trainingFrom + '</span>' +
                                        '<span class="cell-span editable-training training-year">' + $trainingFYear + '</span>' +
                                      '</td>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound ' + $isDisabled + '">' +
                                            '<select class="editable-current training-month-select" id="trainingToSelect"' + $isDisabled + '>' +
                                              '<option value="Jan">Jan</option>' +
                                              '<option value="Feb">Feb</option>' +
                                              '<option value="Mar">Mar</option>' +
                                              '<option value="Apr">Apr</option>' +
                                              '<option value="May">May</option>' +
                                              '<option value="June">June</option>' +
                                              '<option value="July">July</option>' +
                                              '<option value="Aug">Aug</option>' +
                                              '<option value="Sept">Sept</option>' +
                                              '<option value="Oct">Oct</option>' +
                                              '<option value="Nov">Nov</option>' +
                                              '<option value="Dec">Dec</option>' +
                                            '</select>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound ' + $isDisabled + '">' +
                                            '<input type="text" class="editable-current form-control toggle-content training-year-input" value="' +
                                            $trainingTYear + '"' + $isDisabled +'>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<label><input ' + $isChecked + ' type="checkbox" id="edit-current"> Current</label>' +
                                          '</div>' +
                                        '</div>' +
                                         $isCurrValue +
                                      '</td>' +
                                      '<td></td>' +
                                      '<td></td>' +
                                    '</tr>' +
                                  '</tbody>' +
                                '</table>' +
                              '</div>' +
                            '</div>';

    $('.training-wrapper').append($historyItemHTML);

    $('#training-employer').val('');
    $('#training-title').val('');
    $('#training-role').val('');
    $('#training-from').val('Jan');
    $('#training-from-year').val('');
    $('#training-to').val('Jan');
    $('#training-to-year').val('');
    $('#training-current').prop('checked', false);
    $('#training-to').parent().removeClass('disabled');
    $('#training-to-year').parent().removeClass('disabled');
    $('#training-to').prop('disabled', false);
    $('#training-to-year').prop('disabled', false);

    e.preventDefault();

  });

  $('.training-wrapper').on('click', '.training-edit', function() {
    var $trainingFromMonth = $(this).closest('.training-history-item').find('.training-from-month').text(),
        $trainingToMonth   = $(this).closest('.training-history-item').find('.training-to-month').text();

    $(this).closest('.training-history-item').find('#trainingFromSelect').val($trainingFromMonth);
    $(this).closest('.training-history-item').find('#trainingToSelect').val($trainingToMonth);

  });

  $('#training-current').click(function() {
    $('#training-to').prop('disabled', $(this).prop('checked'));
    $('#training-to-year').prop('disabled', $(this).prop('checked'));
    $('#training-to').parent().toggleClass('disabled', $(this).prop('checked'));
    $('#training-to-year').parent().toggleClass('disabled', $(this).prop('checked'));

    $('#training-to-year').val('');
  });

  $('.training-wrapper').on('click', '#edit-current', function() {
    $(this).closest('td').find('.editable-current').prop('disabled', $(this).prop('checked'));
    $(this).closest('td').find('.editable-current').parent().toggleClass('disabled', $(this).prop('checked'));

  });

  $('.training-wrapper').on('click', '.training-delete', function(e) {
    $(this).closest('.training-history-item').remove();
    e.preventDefault();
  });

  $('.training-wrapper').on('click', '.training-edit', function(e) {
    $(this).closest('.training-history-item').addClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Save</span>').addClass('training-save');

    e.preventDefault();
  });

  $('.training-wrapper').on('click', '.training-save', function(e) {
    var $currentCheck     = $(this).closest('.training-history-item').find('#edit-current'),
        $isChecked        = $currentCheck.is(':checked'),
        $trainingToSpans      = $(this).closest('.training-history-item').find('.training-to-span'),
        $editableCurrents = $(this).closest('.training-history-item').find('.editable-currents');

    $(this).closest('.training-history-item').removeClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Edit</span>').removeClass('training-save');

    $(this).closest('.training-history').find('.editing-trainingsection').removeClass('editing-trainingsection');
    $(this).closest('.training-history').find('.icon-tick').removeClass('icon-tick').addClass('icon-edit');

    if($isChecked) {
      $trainingToSpans.text('');
      $editableCurrents.val('');
    }

    e.preventDefault();
  });

  $('.training-wrapper').on('keyup', '.editable-training-input', function() {
    var $thisVal = $(this).val();

    $(this).next('.editable-training').text($thisVal);
  });

  $('.training-wrapper').on('keyup', '.training-year-input', function() {
    var $thisVal = $(this).val();

    $(this).closest('td').find('.training-year').text($thisVal);
  });

  $('.training-wrapper').on('change', '.training-month-select', function() {
    var $thisVal = $(this).val();

    $(this).closest('td').find('.training-month').text($thisVal);
  });

  //--- Dirty quals/work experience

  $('.enter-qualification').on('change', 'select', function() {
    if($(this).val() != "Select") {
      $('#applyPreviewBtn').addClass('dirtyForm');
      $('#saveQualButton').show();
    } else if($('.enter-qualification').find('input').val() == ""
              && $('.enter-qualification').find('select').val() == "Select") {
      $('#applyPreviewBtn').removeClass('dirtyForm');
      $('.enter-qualification').removeClass('panel-danger fieldset-danger');
    }
  });

  $('.enter-qualification').on('keyup', 'input', function() {
    if($(this).val() != "") {
      $('#applyPreviewBtn').addClass('dirtyForm');
      $('#saveQualButton').show();
    } else if($('.enter-qualification').find('input').val() == ""
              && $('.enter-qualification').find('select').val() == "Select") {
      $('#applyPreviewBtn').removeClass('dirtyForm');
      $('.enter-qualification').removeClass('panel-danger fieldset-danger');
    }
  });

  $('html').on('click', '.dirtyForm', function(e) {
    $(this).text('Continue anyway').removeClass('dirtyForm');
    $('#unsavedQuals').show();

    $('.enter-qualification').addClass('panel-danger fieldset-danger');

    e.preventDefault();
  });

  $('#saveQualification').on('click', function() {
    $('#applyPreviewBtn').text('Save and continue');
    $('.dirtyForm').removeClass('dirtyForm');
    $('#unsavedQuals').hide();
    $('.enter-qualification').removeClass('panel-danger fieldset-danger');
  });

  //-- Errors on pattern library page

  $('#errorButton').on('click', function() {
    $('.validation-summary-errors').toggle();
    $('.has-an-error').toggleClass('input-validation-error')
  });

  //-- Application save
  // $('#saveApplication').on('click', function() {
  //   $(this).hide();
  //   $('#applicationSaved').show();
  //   return false;
  // });

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

    if($('.global-header__title').text() == 'Traineeships') {
      // $('#applicationsLink').remove();
      $('#settingsLink').attr('href', '/trainee/settings.html');
      $('title').text('Traineeships');
      $('.global-header__title a').attr('href', '/trainee/search-index.html');
    }

    $('#viewTrainingProvider').on('click', function() {
      $('#trainingProviderPanel').show();
      $('#employerPanel').hide();

      return false;
    });

    $('#viewEmployer').on('click', function() {
      $('#employerPanel').show();
      $('#trainingProviderPanel').hide();

      return false;
    });

  // $('#forgotPasswordBtn').on('click', function(){
  //   var $this = $(this),
  //       $thisVal = $this.val();

  //   $.jStorage.set('forgottenEmail', $thisVal);
  // });

  // if($('#forgottenEmail').length) {
  //   var $forgottenEmail = $.jStorage.get('forgottenEmail');

  //   $('#forgottenEmail').val($forgottenEmail);
  // }

  $('.saveADraft').on('click', function() {
    $('#savedInfo').show();
  });

  $('#removeDraft').on('click', function() {
    $(this).closest('section').remove();
    // $('#deleteSuccess').show();
  });

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

  if($('.heading-xlarge').text() == 'My applications') {
    var tshipPar = gup('Traineeships'),
        appSupport = gup('Apprenticeships');

    if(tshipPar == "true") {
      $('#tshipPrompt').show();
      $('#tshipLink').show();
    } else if(tshipPar == "seen") {
      $('#tshipLink').show();
    } else if(tshipPar == "submitted") {
      $('#dashTraineeships').show();
      $('#tshipLink').show();
      $('#tshipJump').removeClass('toggle-content');
    } else if(appSupport == "true") {
      $('#supportPrompt').show();
    }
  }

  $('.notInterested').on('click', function() {
    $(this).closest('.panel-info').hide();
  });

  if($('#signInTitle').length) {
    var signInStatus = gup('Status');

    if(signInStatus == "signout") {
      $('#signedOut').show();
    }

    if(signInStatus == "textsent") {
      $('#emailAddressSent').show();
    }
  }

  //----- Verify trigger

  $('#verifyNumBtn, #verifyLink').on('click', function() {
    var $telephoneNumber    = $('#phoneNumber').val();

    $.jStorage.set('mobile-number', $telephoneNumber);

    if($('#textMessage').is(':checked') && !$.cookie('numberIsVerified')) {

      window.location = 'verify-number.html';

    }
  });

  if($('#enterNumber').length) {
    var mobileNumber    = $.jStorage.get('mobile-number');
    $('#enterNumber').text(mobileNumber);
  }

  $('#numberVerified').on('click', function() {
    $.cookie('numberIsVerified', true, {path: '/'});
  });
  //------ Refine keywords input

  $('#Keywords').on('keydown', function() {
    $('#refineSelect').show();

    // if($(this).val().length == 0) {
    //   $('#refineSelect').hide();
    // }
  });

  $('#refineSearch').on('click', function() {
    $('#keywordHint').toggle();
    $('#refineControls').toggle();

  });

  var blackHeaderHeight = $('.global-header').outerHeight(),
      fixedContainerHeight = $('.fixed-container').outerHeight(),
      heightOfHeader = blackHeaderHeight + fixedContainerHeight,
      lastScrollTop = 0,
      delta = 5;

  $(window).on('scroll', removeFixedHeader );

  function showFixedHeader() {
    var nowScrollTop = $(window).scrollTop();
    if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
      if (nowScrollTop > lastScrollTop){
        removeFixedHeader();

        // if(nowScrollTop > heightOfHeader) {
        //   $('.fixed-container').addClass('dwarf-header');
        //   $('.dwarf-header').removeClass('grown-header');
        // } else {
        //   $('.fixed-container').removeClass('dwarf-header');
        // }

      } else {

        if(nowScrollTop > heightOfHeader) {
          addFixedHeader();
          // $('.dwarf-header').addClass('grown-header');

        } else {
          removeFixedHeader();
          // $('.fixed-container').removeClass('grown-header dwarf-header');
        }
      }
      lastScrollTop = nowScrollTop;
    }
  }

  function removeFixedHeader() {
    $('.fixed-container').removeClass('fixed-header');
    $('.content-container').css('padding-top', '0');
  }

  function addFixedHeader() {
    $('.fixed-container').addClass('fixed-header');
    $('.content-container').css('padding-top', fixedContainerHeight + 'px');
  }

  function throttle( delay, fn )
    {
      var last, deferTimer;
      return function()
      {
        var context = this, args = arguments, now = +new Date;
        if( last && now < last + delay )
        {
          clearTimeout( deferTimer );
          deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
        }
        else
        {
          last = now;
          fn.apply( context, args );
        }
      };
    }

  // ------ Change bookmark icon on click

  $('.bookmark-result').on('click', function() {

    $(this).find('.fa').toggleClass('fa-star-o fa-star');

    $(this).attr('title', $(this).find('.fa').hasClass('fa-star') ? 'Remove from saved':'Add to saved');

    if($('.fa-star').length) {
      $('#savedHeaderItem').removeClass('toggle-content');
      if($(window).scrollTop() > heightOfHeader) {
        addFixedHeader();
      }
    } else {
      $('#savedHeaderItem').addClass('toggle-content');
    }

    $('#savedCount').text($('.fa-star').length);

    $(this).toggleClass('filled-in');
    $(this).blur();

    if('#settingsLink')

    return false;

  });

  //------- Choose details

  $('#chooseDetails input').on('change', function() {
    var $this = $(this),
        $thisId = $this.attr('id');

    $('[data-show="' + $thisId + '"]').toggle();
  });

  //------- Trigger saved search

  $('#receiveSaveSearchAlert').on('click', function() {
    $.cookie('savedSearch', true, {path: '/'});
    $('#savedSearchPanel').show();
  });

  if($('#savedSearch').length && $.cookie('savedSearch')) {
    $('#savedSearch').find('.savedInitalText').hide();
    $('#savedSearches').show();
  }


  // -------- Employer search

  $('#employerSearch').on('click', function() {
    $('#keywordSearchBox').hide();
    $('#employerSearchBox').show();

  });
  $('#keywordSearch').on('click', function() {
    $('#employerSearchBox').hide();
    $('#keywordSearchBox').show();

  });

  // -------- Select all control

  if($('#refineSelect').length) {
    setSelectControl($('#refineSelect'));
  }

  function setSelectControl(that) {
    var $this = that,
        $container = $this.closest('.input-withlink--all-select');

    if($this.val() != "All") {
      $container.addClass('auto-width');
      $container.css('padding-left', $this.outerWidth() + 'px');
      $container.find('input').focus();
    } else {
      $container.removeClass('auto-width');
      $container.css('padding-left', $this.outerWidth() + 'px');
      $container.find('input').focus();
    }
  }

  $('.all-select').on('change', function() {
    var $this = $(this);

    setSelectControl($this);
  });

  //------- Verify email

  $('#emailVerified').on('click', function() {
    $.cookie('emailIsVerified', true, {path: '/'});
  });

  if($('#successEmailVerified').length) {
    var settingsStatus = gup('Status');

    if(settingsStatus == "verified") {
      $('#successEmailVerified').show();
    } else if(settingsStatus == "textverified") {
      $('#textMessage').prop('checked', true).closest('label').addClass('selected');
      $('#verifyContainer').html('<span><i class="fa fa-check-circle-o"></i>Verified</>');
      $('#successVerified').show();
    }
  }

  //-------- What's new panel

  $('.hover-link__anchor').on('click', function() {
    var $this = $(this);

    $this.closest('.hover-link')
         .find('.hover-link__child').toggleClass('hidden');

    return false;
  });

  $('.hover-link__close').on('click', function() {
    $(this).closest('.hover-link__child').toggleClass('hidden');

    $(this).blur();

    return false;
  });

  // --- How to search effectively

  if($.cookie('seenSearchTour')) {

  } else if($('#keywords-tab-control').length) {

    setTimeout(function() {
      $("#firstSearchTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop',
        'postStepCallback' : setSearchTourCookie
      });
    }, 1000);

    $('html').on('click', '.startNextTourGuide .joyride-next-tip', function() {
      $("#firstSearchTour").joyride('destroy');

      $('#runSearchHelp').click();
    });

  }

  function setSearchTourCookie() {
    $.cookie('seenSearchTour', true, { expires: 7, path: '/' });
  }

  $('#keywords-tab-control').on('click', function() {
    if($('.joyride-content-wrapper').is(':visible')) {
      $("#browseTour").joyride('destroy');
      $("#savedSearchTour").joyride('destroy');

      $("#searchTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop'
      });
    }
  });

  $('#categories-tab-control').on('click', function() {
    if($('.joyride-content-wrapper').is(':visible')) {
      $("#searchTour").joyride('destroy');
      $("#savedSearchTour").joyride('destroy');

      $("#browseTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop'
      });
    }
  });

  $('#saved-tab-control').on('click', function() {
    if($('.joyride-content-wrapper').is(':visible')) {
      $("#searchTour").joyride('destroy');
      $("#browseTour").joyride('destroy');

      $("#savedSearchTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop'
      });
    }
  });

  // Search tour

  $('#runSearchHelp').on('click',function() {
    var joyrideAttached = false;

    setTimeout(function () {
      $('html').find('.joyride-close-tip').each(function () {
          $(this).attr('title', "Close tour")
      });
    }, 100);

    if($('.joyride-tip-guide').css('visibility') == 'visible'){
      joyrideAttached = true;
    }

    if($('#keywords-tab-control').hasClass('active')) {

      if(joyrideAttached) {
        $("#browseTour").joyride('destroy');
        $("#savedSearchTour").joyride('destroy');
      }

      $("#searchTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop'
      });

    } else if ($('#categories-tab-control').hasClass('active')) {

      if(joyrideAttached) {
        $("#searchTour").joyride('destroy');
        $("#savedSearchTour").joyride('destroy');
      }

      $("#browseTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop'
      });

    } else if ($('#saved-tab-control').hasClass('active')) {

      if(joyrideAttached) {
        $("#searchTour").joyride('destroy');
        $("#browseTour").joyride('destroy');
      }

      $("#savedSearchTour").joyride({
        'autoStart' : true,
        'nextButton': true,
        'tipAnimation': 'pop'
      });

    }

    return false;
  });

  // Application form tour

  function appTour() {
    $('#appFormTour').joyride({
      'autoStart' : true,
      'nextButton': true,
      'prev_button': true,
      'tipAnimation': 'pop'
    });
  }

  $('#runApplyTour').on('click', function() {
    appTour();

    return false;
  });

  if($('#runApplyTour').length) {
    var tourStatus = gup('Tour'),
        sessionStatus = gup('Session');


    if(tourStatus == "start") {
      appTour();
      $('textarea[data-value]').each(function() {
        $thisDataVal = $(this).attr('data-value');

        $(this).val($thisDataVal);

      });
    }
    if(sessionStatus == "timeout") {
      $('#sessionTimeOutOverlay').show();
    } else if (sessionStatus == "saving") {
      $('#savingPrompt').show();
    }
  }

  var appUpdates = gup('AppUpdates');

  if(appUpdates == "true"){
    $('#newAppChanges').joyride({
      'autoStart' : true,
      'nextButton': true,
      'tipAnimation': 'pop'
    });
  }

  //---- Dashboard prompt fake

  if($('.proto-dashboard').length) {
    var dashStatus = gup('Updates');

    if(dashStatus == "true") {
      $('#statusPrompt').show();
      $('#dashUpdatesNumber').hide();
    }
  }

  //---- Unsubscribe

  $('#emailToggle').on('click', function() {
    $(this).closest('.display-table').find('.email-input').click();

    $(this).blur();

    return false;
  });

  $('#textToggle').on('click', function() {
    $(this).closest('.display-table').find('.text-input').click();

    $(this).blur();

    return false;
  });

  //---- Send email address

  $('#sendEmailAddress').on('click', function() {
    $('#emailAddressSent').show();
  });

  //----

  $('.print-trigger').on('click', function(e) {
    window.print();

    e.preventDefault();
  });

  //---- Verify mobile from registration

  $('#phone-input').on('keyup', function() {
    if($(this).val() !== '') {
      $.cookie('verifyNumberReg', true, {path: '/'});
    } else {
      $.cookie('verifyNumberReg', null, { path: '/', expires: -5 });
    }
  });

  if($('.proto-dashboard').length && $.cookie('verifyNumberReg')) {
    $('#dashboardVerifyNumber').show();
    $.cookie('verifyNumberReg', null, { path: '/', expires: -5 });
  }

  if($('.proto-dashboard').length) {
    var dashboardBanner = gup('Banner');

    if(dashboardBanner == "verify") {
      $('#dashboardVerifyNumber').show();
    }
  }

  $('#feedbackButton').on('click', function(e) {
    e.preventDefault();

    $('#feedbackSuccess').show();
  });


// --------------- Remove for live code -------------- //
});