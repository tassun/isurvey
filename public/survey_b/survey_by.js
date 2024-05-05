$(function() {
    setupComponentsApt();
    setupUIApt();
});
function setupComponentsApt() {
    $("#bybuttonsave").click(function() { confirmSaveSurveyApt(this); return false; });
    $("#bybuttoncancel").click(function() { confirmCancelSurveyApt(this); return false; });
    $("#bybuttonupdate").click(function() { confirmUpdateSurveyApt(this); return false; });
}
function confirmCancelSurveyApt(src) {
    confirmCancelMessage(function() {
        window.history.back();
    });
}
function confirmSaveSurveyApt(src) {
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { saveSurveyApt(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurveyApt(src) {
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmUpdateMessage(function() { updateSurveyApt(src); });
    } else {
        warningMessage();
    }
}
function saveSurveyApt(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_by/insert",
        data: $('#form-data-validate').serialize(),
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
                let profile_id = $("#profile_id").val();
                successMessage(function() { gotoSurveyFormApt(profile_id); });
            }
        }
    });
}
function updateSurveyApt(src) {
    let profile_id = $("#profile_id").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_by/update",
        data: $('#form-data-validate').serialize(),
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
    $("#by-modal-dialog").modal("hide");
}
function setupUIApt() {
}
