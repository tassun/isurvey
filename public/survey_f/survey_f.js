var mouseX = 0;
var mouseY = 0;
var canFocused = false;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_f"); }catch(ex) { }
    setupComponents();
    setupUI();
});
function setupComponents() {
    $("#buttonsave").click(function() { confirmSaveSurvey(this); return false; });
    $("#buttoncancel").click(function() { confirmCancelSurvey(this); return false; });
    $("#buttonupdate").click(function() { confirmUpdateSurvey(this); return false; });
}
function confirmCancelSurvey(src) {
    confirmCancelMessage(function() {
        gotoSurveyForm();
    });
}
function confirmSaveSurvey(src) {
    var $form = $('#form-data-validate');
    let valid2 = validateSF2();
    if (validBlank() && $form.parsley().validate() && valid2) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    var $form = $('#form-data-validate');
    let valid2 = validateSF2();
    if (validBlank() && $form.parsley().validate() && valid2) {
        confirmUpdateMessage(function() { updateSurvey(src); });
    } else {
        warningMessage();
    }
}
function saveSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_f/insert",
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
                successMessage(function() { gotoSurveyForm(profile_id); });
            }
        }
    });
}
function updateSurvey(src) {
    let profile_id = $("#profile_id").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_f/update",
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
                successMessage(function() { gotoSurveyForm(profile_id); }); 
            }
        }
    });
}
function gotoSurveyForm(profile_id) {
    if(!profile_id) profile_id = $("#profile_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey/form", params: {profile_id: profile_id}, windowName: "_self"});
}
function setupUI() {
    $("#SF_2_12").change(function() {
        if($(this).is(":checked")) {
            $("#SF_2_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SF_2_text").focus();
        } else {
            $("#SF_2_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#sf2-layer").find("input[type=checkbox]").change(function() {
        $("#SF_2_label").removeClass("parsley-error");
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#form-data-layer")).trigger("change");
    canFocused = true;
}
function validateSF2() {
    let checked = $("#sf2-layer").find("input[type=checkbox]:checked").length;
    if (checked == 0) {
        $("#SF_2_label").addClass("parsley-error");
        return false;
    }
    return true;
}
