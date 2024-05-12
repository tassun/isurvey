var mouseX = 0;
var mouseY = 0;
var canFocused = false;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_dx"); }catch(ex) { }
    setupComponentsApt();
    setupUIApt();
});
function setupComponentsApt() {
    $("#dxbuttonsave").click(function() { confirmSaveSurveyApt(this); return false; });
    $("#dxbuttoncancel").click(function() { confirmCancelSurveyApt(this); return false; });
    $("#dxbuttonupdate").click(function() { confirmUpdateSurveyApt(this); return false; });
}
function confirmCancelSurveyApt(src) {
    confirmCancelMessage(function() {
        gotoSurveyFormApt();
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
    let profile_id = $("#dx_profile_id").val();
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
                successMessage(function() { gotoSurveyForm(profile_id); });
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
                successMessage(function() { gotoSurveyForm(profile_id); }); 
            }
        }
    });
}
function gotoHomerForm() {
    let token_key = $("#dx_token_key").val();
    submitWindow({url: BASE_URL+"/index", params: {token_key: token_key}, windowName: "_self"});
}
function gotoSurveyForm(profile_id) {
    if(!profile_id) profile_id = $("#dx_profile_id").val();
    let token_key = $("#dx_token_key").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey/form", params: {token_key: token_key, profile_id: profile_id}, windowName: "_self"});
}
function gotoSurveyBAppendix() {
    let token_key = $("#dx_token_key").val();
    let profile_id = $("#dx_profile_id").val();
    let survey_id = $("#dx_master_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_d/open", params: {token_key: token_key, profile_id: profile_id, survey_id: survey_id}, windowName: "_self"});
}
function setupUIApt() {
    canFocused = false;
    $('input[name="SDX_6"]').on('change', function() {
        if ($(this).val() == '5') {
            $("#SDX_6_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_6_text").focus();
        } else {
            $("#SDX_6_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_7"]').on('change', function() {
        if ($(this).val() == '5') {
            $("#SDX_7_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_7_text").focus();
        } else {
            $("#SDX_7_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_8"]').on('change', function() {
        if ($(this).val() == '2') {
            $("#SDX_8_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_8_text").focus();
        } else {
            $("#SDX_8_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_9"]').on('change', function() {
        if ($(this).val() == '3') {
            $("#SDX_9_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_9_text").focus();
        } else {
            $("#SDX_9_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_10"]').on('change', function() {
        if ($(this).val() == '7') {
            $("#SDX_10_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_10_text").focus();
        } else {
            $("#SDX_10_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_11"]').on('change', function() {
        if ($(this).val() == '5') {
            $("#SDX_11_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_11_text").focus();
        } else {
            $("#SDX_11_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SDX_12"]').on('change', function() {
        if ($(this).val() == '6') {
            $("#SDX_12_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SDX_12_text").focus();
        } else {
            $("#SDX_12_text").removeClass("parsley-error").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("input[type=radio]:checked",$("#dx-form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#dx-form-data-layer")).trigger("change");
    canFocused = true;
}
