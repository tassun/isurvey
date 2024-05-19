var canFocused = false;
$(function() {
    setupComponentsFamily();
    setupUIFamily();
});
function setupComponentsFamily(callback) {
    $("#familybuttonsave").click(function() { confirmSaveSurveyFamily(this,callback); return false; });
    $("#familybuttoncancel").click(function() { confirmCancelSurveyFamily(this,callback); return false; });
}
function setupUIFamily() {
    canFocused = false;
    $('input[name="SB_age"]').on('change', function() {
        if ($(this).val() == '0') {
            $("#SB_age_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB_age_text").focus();
        } else {
            $("#SB_age_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("input[type=radio]:checked",$("#profile-form-data-layer")).trigger("change");
    canFocused = true;
}
function confirmCancelSurveyFamily(src) {
    confirmCancelMessage(function() {
        $("#family-modal-dialog").modal("hide");
    });
}
function confirmSaveSurveyFamily(src,callback) {
    var $form = $('#family-form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { saveSurveyFamily(src,callback); });
    } else {
        warningMessage();
    }
}
function saveSurveyFamily(src,callback) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b/family/insert",
        data: $('#family-form-data-validate').serialize(),
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
                successMessage(function() { gotoSurveyFormFamily(); if(callback) callback(); });
            }
        }
    });
}
function gotoSurveyFormFamily(profile_id) {
    $("#family-modal-dialog").modal("hide");
}
