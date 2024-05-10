var mouseX = 0;
var mouseY = 0;
var canFocused = false;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_g"); }catch(ex) { }
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
    let valid1 = validateSG31();
    let valid2 = validateSG32();
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate() && valid1 && valid2) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    let valid1 = validateSG31();
    let valid2 = validateSG32();
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate() && valid1 && valid2) {
        confirmUpdateMessage(function() { updateSurvey(src); });
    } else {
        warningMessage();
    }
}
function saveSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_g/insert",
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
        url: BASE_URL+"/survey_g/update",
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
    $("#SG_3_1_6").change(function() {
        if($(this).is(":checked")) {
            $("#SG_3_1_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SG_3_1_text").focus();
        } else {
            $("#SG_3_1_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#sg31-layer").find("input[type=checkbox]").change(function() {
        $("#SG_3_1_label").removeClass("parsley-error");
    });
    $("#sg32-layer").find("input[type=checkbox]").change(function() {
        $("#SG_3_2_label").removeClass("parsley-error");
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#form-data-layer")).trigger("change");
    canFocused = true;
}
function validateSG31() {
    let checked = $("#sg31-layer").find("input[type=checkbox]:checked").length;
    if (checked == 0) {
        $("#SG_3_1_label").addClass("parsley-error");
        return false;
    }
    return true;
}
function validateSG32() {
    let checked = $("#sg32-layer").find("input[type=checkbox]:checked").length;
    if (checked == 0) {
        $("#SG_3_2_label").addClass("parsley-error");
        return false;
    }
    return true;
}
