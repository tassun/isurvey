var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_e"); }catch(ex) { }
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
        window.history.back();
    });
}
function confirmSaveSurvey(src) {
    var $form = $('#form-data-validate');
    let valid6 = validateSE6();
    let valid7 = validateSE7();
    if (validBlank() && $form.parsley().validate() && valid6 && valid7) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    var $form = $('#form-data-validate');
    let valid6 = validateSE6();
    let valid7 = validateSE7();
    if (validBlank() && $form.parsley().validate() && valid6 && valid7) {
        confirmUpdateMessage(function() { updateSurvey(src); });
    } else {
        warningMessage();
    }
}
function saveSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_e/insert",
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
        url: BASE_URL+"/survey_e/update",
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
    submitWindow({url: BASE_URL+"/survey/form", params: {profile_id: profile_id}, windowName: "_self"});
}
function setupUI() {
    $("input.se-radio").change(function() {
        if ($(this).val() == '1') {
            $(this).closest("tr").find("input[type=number]").prop('readonly', false);
        } else {
            $(this).closest("tr").find("input[type=number]").prop('readonly', true).val('');
        }
    });
    $('input[name="SE_5"]').on('change', function() {
        if ($(this).val() == '3') {
            $("#SE_5_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SE_5_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SE_6_5").change(function() {
        if($(this).is(":checked")) {
            $("#SE_6_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SE_6_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SE_7_13").change(function() {
        if($(this).is(":checked")) {
            $("#SE_7_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#SE_7_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#se6-layer").find("input[type=checkbox]").change(function() {
        $("#SE_6_1_label").removeClass("parsley-error");
    });
    $("#se7-layer").find("input[type=checkbox]").change(function() {
        $("#SE_7_1_label").removeClass("parsley-error");
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#form-data-layer")).trigger("change");
}
function validateSE6() {
    let checked = $("#se6-layer").find("input[type=checkbox]:checked").length;
    if (checked == 0 || checked > 3) {
        $("#SE_6_1_label").addClass("parsley-error");
        return false;
    }
    return true;
}
function validateSE7() {
    let checked = $("#se7-layer").find("input[type=checkbox]:checked").length;
    if (checked == 0) {
        $("#SE_7_1_label").addClass("parsley-error");
        return false;
    }
    return true;
}
