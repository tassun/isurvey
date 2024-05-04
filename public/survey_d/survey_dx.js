$(function() {
    setupComponentsApt();
    setupUIApt();
});
function setupComponentsApt() {
    $("#dxbuttonsave").click(function() { confirmSaveSurveyApt(this); return false; });
    $("#dxbuttonupdate").click(function() { confirmUpdateSurveyApt(this); return false; });
}
function setupUIApt() {
    $('input[name="SDX_6"]').on('change', function() {
        if ($(this).val() == '5') {
            $("#SDX_6_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_6_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_7"]').on('change', function() {
        if ($(this).val() == '5') {
            $("#SDX_7_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_7_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_8"]').on('change', function() {
        if ($(this).val() == '2') {
            $("#SDX_8_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_8_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_9"]').on('change', function() {
        if ($(this).val() == '3') {
            $("#SDX_9_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_9_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_10"]').on('change', function() {
        if ($(this).val() == '7') {
            $("#SDX_10_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_10_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_11"]').on('change', function() {
        if ($(this).val() == '5') {
            $("#SDX_11_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_11_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_12"]').on('change', function() {
        if ($(this).val() == '6') {
            $("#SDX_12_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SDX_12_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("input[type=radio]:checked",$("#dx-form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#dx-form-data-layer")).trigger("change");
}
function confirmCancelSurveyApt(src) {
    confirmCancelMessage(function() {
        window.history.back();
    });
}
function confirmSaveSurveyApt(src) {
    var $form = $('#dx-form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { saveSurveyApt(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurveyApt(src) {
    var $form = $('#dx-form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmUpdateMessage(function() { updateSurveyApt(src); });
    } else {
        warningMessage();
    }
}
function saveSurveyApt(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/insert",
        data: $('#dx-form-data-validate').serialize(),
        type: "POST",
        dataType: "json",
        contentType: defaultContentType,
        error : function(transport,status,errorThrown) {
            stopWaiting();
            submitFailure(transport,status,errorThrown);
        },
        success: function(data,status,xhr){ 
            stopWaiting();
            if(data.head.errorflag=="Y") {
                alertmsg(data.head.errordesc);
            } else {
                let profile_id = $("#dx_profile_id").val();
                successMessage(function() { gotoSurveyFormApt(profile_id); });
            }
        }
    });
}
function updateSurveyApt(src) {
    let profile_id = $("#dx_profile_id").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/update",
        data: $('#dx-form-data-validate').serialize(),
        type: "POST",
        dataType: "json",
        contentType: defaultContentType,
        error : function(transport,status,errorThrown) {
            stopWaiting();
            submitFailure(transport,status,errorThrown);
        },
        success: function(data,status,xhr){ 
            stopWaiting();
            if(data.head.errorflag=="Y") {
                alertmsg(data.head.errordesc);
            } else {
                successMessage(function() { gotoSurveyFormApt(profile_id); }); 
            }
        }
    });
}
function gotoSurveyFormApt(profile_id) {
    $("#dx-modal-dialog").modal("hide");
    displayDataTable();
}
