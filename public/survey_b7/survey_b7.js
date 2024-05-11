var mouseX = 0;
var mouseY = 0;
var canFocused = false;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_b7"); }catch(ex) { }
    setupComponents();
    setupUI();
});
function setupComponents() {
    $("#data_table_bread_form_linker").click(function() { gotoListingForm(); return false; });
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
        url: BASE_URL+"/survey_b7/insert",
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
        url: BASE_URL+"/survey_b7/update",
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
function setupUI() {
    $('input[name="fault_character"]').on('change', function() {
        if ($(this).val() == '12') {
            $("#fault_character_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#fault_character_text").focus();
        } else {
            $("#fault_character_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="fault_event"]').on('change', function() {
        if ($(this).val() == '11') {
            $("#fault_event_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#fault_event_text").focus();
        } else {
            $("#fault_event_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
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
    $('input[name="SB7_2_1"]').on('change', function() {
        if ($(this).val() == '1') {
            if($("#SB7_2_2_4").is(":checked")) {
                $("#SB7_2_2_text").val('');
            }
            $("input[type=checkbox]",$("#SB7_2_2_layer")).prop('readonly', true).prop('checked', false).prop('disabled', true);
            $("input[type=checkbox]",$("#SB7_2_3_layer")).prop('readonly', false).removeAttr('disabled');
            $("#SB7_2_2_text").attr('data-parsley-required', 'false').prop('readonly', true);
            $("#SB7_2_2_label").removeClass("parsley-error");
        } else {
            if($("#SB7_2_3_18").is(":checked")) {
                $("#SB7_2_3_text").val('');
            }
            $("input[type=checkbox]",$("#SB7_2_2_layer")).prop('readonly', false).removeAttr('disabled');
            $("input[type=checkbox]",$("#SB7_2_3_layer")).prop('readonly', true).prop('checked', false).prop('disabled', true);
            $("#SB7_2_3_text").attr('data-parsley-required', 'false').prop('readonly', true);
            $("#SB7_2_3_label").removeClass("parsley-error");
        }
    });
    $("#SB7_2_2_4").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_2_2_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_2_2_text").focus();
        } else {
            $("#SB7_2_2_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_2_3_18").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_2_3_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_2_3_text").focus();
        } else {
            $("#SB7_2_3_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SB7_2_4"]').on('change', function() {
        if ($(this).val() == '1') {
            $("#SB7_2_4_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_2_4_text").focus();
        } else {
            $("#SB7_2_4_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="SB7_3_2_3"]').on('change', function() {
        if ($(this).val() == '2') {
            $("#SB7_3_2_3_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_3_text").focus();
        } else {
            $("#SB7_3_2_3_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_1").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_1_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_1_text").focus();
        } else {
            $("#SB7_3_2_4_1_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_2").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_2_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_2_text").focus();
        } else {
            $("#SB7_3_2_4_2_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_3").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_3_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_3_text").focus();
        } else {
            $("#SB7_3_2_4_3_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_4").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_4_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_4_text").focus();
        } else {
            $("#SB7_3_2_4_4_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_5").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_5_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_5_text").focus();
        } else {
            $("#SB7_3_2_4_5_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_6").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_6_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_6_text").focus();
        } else {
            $("#SB7_3_2_4_6_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_3_2_4_7").change(function() {
        if($(this).is(":checked")) {
            $("#SB7_3_2_4_7_text").attr('data-parsley-required', 'true').prop('readonly', false);
            if(canFocused) $("#SB7_3_2_4_7_text").focus();
        } else {
            $("#SB7_3_2_4_7_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $("#SB7_2_2_layer").find("input[type=checkbox]").change(function() {
        $("#SB7_2_2_label").removeClass("parsley-error");
    });
    $("#SB7_2_3_layer").find("input[type=checkbox]").change(function() {
        $("#SB7_2_3_label").removeClass("parsley-error");
    });
    $("input[type=radio]:checked",$("#bx-form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#bx-form-data-layer")).trigger("change");
    canFocused = true;
}
function validateSB22() {
    if($("#SB7_2_1_2").is(":checked")) {
        let checked = $("#SB7_2_2_layer").find("input[type=checkbox]:checked").length;
        if (checked == 0) {
            $("#SB7_2_2_label").addClass("parsley-error");
            $("#SB7_2_2_1").attr('data-parsley-required', 'true');
            return false;
        }
    }
    return true;
}
function validateSB23() {
    if($("#SB7_2_1_1").is(":checked")) {
        let checked = $("#SB7_2_3_layer").find("input[type=checkbox]:checked").length;
        if (checked == 0) {
            $("#SB7_2_3_label").addClass("parsley-error");
            $("#SB7_2_3_1").attr('data-parsley-required', 'true');
            return false;
        }
    }
    return true;
}
function gotoListingForm() {
    let token_key = $("#token_key").val();
    let profile_id = $("#profile_id").val();
    let master_id = $("#master_id").val();
    let column_id = $("#column_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_b7/listing", params: {token_key: token_key, profile_id: profile_id, survey_id: master_id, master_id: master_id, column_id: column_id}, windowName: "_self"});
}
