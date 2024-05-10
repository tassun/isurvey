var mouseX = 0;
var mouseY = 0;
var canFocused = false;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_b3"); }catch(ex) { }
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
    let valid1 = validateSB22();
    let valid2 = validateSB23();
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate() && valid1 && valid2) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    let valid1 = validateSB22();
    let valid2 = validateSB23();
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
        url: BASE_URL+"/survey_b3/insert",
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
                successMessage(function() { gotoListingForm(); });
            }
        }
    });
}
function updateSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b3/update",
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
                successMessage(function() { gotoListingForm(); }); 
            }
        }
    });
}
function gotoSurveyForm(profile_id) {
    submitWindow({url: BASE_URL+"/survey/form", params: {profile_id: profile_id}, windowName: "_self"});
}
function setupUI() {
    $('input[name="fault_type"]').on('change', function() {
        if ($(this).val() == '11') {
            $("#fault_type_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#fault_type_text").focus();
        } else {
            $("#fault_type_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="fault_relation"]').on('change', function() {
        if ($(this).val() == '14') {
            $("#fault_relation_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#fault_relation_text").focus();
        } else {
            $("#fault_relation_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="fault_location"]').on('change', function() {
        if ($(this).val() == '8') {
            $("#fault_location_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#fault_location_text").focus();
        } else {
            $("#fault_location_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SB3_2_1"]').on('change', function() {
        if ($(this).val() == '1') {
            if($("#SB3_2_2_4").is(":checked")) {
                $("#SB3_2_2_text").val('');
            }
            $("input[type=checkbox]",$("#SB3_2_2_layer")).prop('readonly', true).prop('checked', false).prop('disabled', true);
            $("input[type=checkbox]",$("#SB3_2_3_layer")).prop('readonly', false).removeAttr('disabled');
            $("#SB3_2_2_text").attr('data-parsley-required', 'false').prop('readonly', true);
            $("#SB3_2_2_label").removeClass("parsley-error");
        } else {
            if($("#SB3_2_3_18").is(":checked")) {
                $("#SB3_2_3_text").val('');
            }
            $("input[type=checkbox]",$("#SB3_2_2_layer")).prop('readonly', false).removeAttr('disabled');
            $("input[type=checkbox]",$("#SB3_2_3_layer")).prop('readonly', true).prop('checked', false).prop('disabled', true);
            $("#SB3_2_3_text").attr('data-parsley-required', 'false').prop('readonly', true);
            $("#SB3_2_3_label").removeClass("parsley-error");
        }
    });
    $("#SB3_2_2_4").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_2_2_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_2_2_text").focus();
        } else {
            $("#SB3_2_2_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_2_3_18").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_2_3_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_2_3_text").focus();
        } else {
            $("#SB3_2_3_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SB3_2_4"]').on('change', function() {
        if ($(this).val() == '1') {
            $("#SB3_2_4_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_2_4_text").focus();
        } else {
            $("#SB3_2_4_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SB3_3_2_3"]').on('change', function() {
        if ($(this).val() == '2') {
            $("#SB3_3_2_3_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_3_text").focus();
        } else {
            $("#SB3_3_2_3_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_1").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_1_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_1_text").focus();
        } else {
            $("#SB3_3_2_4_1_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_2").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_2_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_2_text").focus();
        } else {
            $("#SB3_3_2_4_2_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_3").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_3_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_3_text").focus();
        } else {
            $("#SB3_3_2_4_3_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_4").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_4_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_4_text").focus();
        } else {
            $("#SB3_3_2_4_4_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_5").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_5_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_5_text").focus();
        } else {
            $("#SB3_3_2_4_5_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_6").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_6_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_6_text").focus();
        } else {
            $("#SB3_3_2_4_6_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_3_2_4_7").change(function() {
        if($(this).is(":checked")) {
            $("#SB3_3_2_4_7_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB3_3_2_4_7_text").focus();
        } else {
            $("#SB3_3_2_4_7_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB3_2_2_layer").find("input[type=checkbox]").change(function() {
        $("#SB3_2_2_label").removeClass("parsley-error");
    });
    $("#SB3_2_3_layer").find("input[type=checkbox]").change(function() {
        $("#SB3_2_3_label").removeClass("parsley-error");
    });
    $("input[type=radio]:checked",$("#bx-form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#bx-form-data-layer")).trigger("change");
    canFocused = true;
}
function validateSB22() {
    if($("#SB3_2_1_2").is(":checked")) {
        let checked = $("#SB3_2_2_layer").find("input[type=checkbox]:checked").length;
        if (checked == 0) {
            $("#SB3_2_2_label").addClass("parsley-error");
            $("#SB3_2_2_1").attr('data-parsley-required', 'true');
            return false;
        }
    }
    return true;
}
function validateSB23() {
    if($("#SB3_2_1_1").is(":checked")) {
        let checked = $("#SB3_2_3_layer").find("input[type=checkbox]:checked").length;
        if (checked == 0) {
            $("#SB3_2_3_label").addClass("parsley-error");
            $("#SB3_2_3_1").attr('data-parsley-required', 'true');
            return false;
        }
    }
    return true;
}
function gotoListingForm() {
    let profile_id = $("#profile_id").val();
    let master_id = $("#master_id").val();
    let column_id = $("#column_id").val();
    submitWindow({url: BASE_URL+"/survey_b3/listing", params: {profile_id: profile_id, survey_id: master_id, master_id: master_id, column_id: column_id}, windowName: "_self"});
}
