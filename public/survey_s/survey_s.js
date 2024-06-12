var mouseX = 0;
var mouseY = 0;
var canFocused = false;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_s"); }catch(ex) { }
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
        gotoSurveyCancel();
    });
}
function confirmSaveSurvey(src) {
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        topicLabelError();
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmUpdateMessage(function() { updateSurvey(src); });
    } else {
        topicLabelError();
        warningMessage();        
    }
}
function saveSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_s/insert",
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
                successMessage(function() { gotoSurveySuccess(profile_id); });
            }
        }
    });
}
function updateSurvey(src) {
    let profile_id = $("#profile_id").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_s/update",
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
                successMessage(function() { gotoSurveySuccess(profile_id); }); 
            }
        }
    });
}
function setupUI() {
    canFocused = false;
    $('input[name="SS_1_1"]').on('change', function(e) {
        console.log("onchange: ",e);
        $("label.SS_1_1_topic").removeClass("parsley-error");
        $("div.SS_1_1").each(function(index,element) { 
            $("label:eq(0)",$(element)).removeClass("parsley-error");
        });
        if ($(this).val() == '4') {
            $("#SS_1_1_text").removeAttr('readonly').attr("data-parsley-required", "true");
            $("div.SS_1_1").each(function(index,element) { 
                $("input[type=radio]",$(element)).prop("checked",false).attr("data-parsley-required", "false");
            });
            $("div.SS_1_1").hide();
            if(canFocused) $("#SS_1_1_text").focus();
        } else {
            let id = $(this).attr("id");            
            $("div.SS_1_1").hide();
            $("#SS_1_1_text").prop('readonly', true).attr("data-parsley-required", "false").removeClass("parsley-error").val("");
            $("div.SS_1_1").each(function(index,element) { 
                let eid = $(element).attr("id");
                if(eid.indexOf(id)<0) {
                    $("input[type=radio]",$(element)).prop("checked",false).attr("data-parsley-required", "false");
                }
            });
            $("input[type=radio]",$("#"+id+"_layer")).each(function(index,element) {
                $(element).attr("data-parsley-required", "true");
            });
            $("#"+id+"_layer").show();
        }
    });
    $('input[name="SS_1_2"]').on('change', function() {
        $("label.SS_1_2_topic").removeClass("parsley-error");
        if ($(this).val() == '10') {
            $("#SS_1_2_text").removeAttr('readonly').attr("data-parsley-required", "true");
            $("div.SS_1_2").each(function(index,element) { 
                $("input[type=radio]",$(element)).prop("checked",false).attr("data-parsley-required", "false");
            });
            $("div.SS_1_2").hide();
            $("input[type=radio]",$("#datatablebody")).prop("checked",false);
            $("input.data-parsley",$("#datatablebody")).each(function(index,element) { 
                $(element).attr("data-parsley-required", "false");
            });
            $("#datatable").hide();
            if(canFocused) $("#SS_1_2_text").focus();
        } else {
            let id = $(this).attr("id");
            $("div.SS_1_2").hide();
            $("#SS_1_2_text").prop('readonly', true).attr("data-parsley-required", "false").removeClass("parsley-error").val("");
            $("div.SS_1_2").each(function(index,element) { 
                let eid = $(element).attr("id");
                if(eid.indexOf(id)<0) {
                    $("input[type=radio]",$(element)).prop("checked",false).attr("data-parsley-required", "false");
                }
            });
            $("input[type=radio]",$("#"+id+"_layer")).each(function(index,element) {
                $(element).attr("data-parsley-required", "true");
            });
            $("#"+id+"_layer").show();
            $("#datatable").show();
            $("div",$("#datatablebody")).each(function(index,element) {
                if(!$(element).hasClass(id+"_row")) {
                    $("input[type=radio]",$(element)).prop("checked",false);
                }
            });
            $("tr",$("#datatablebody")).each(function(index,element) {
                if(!$(element).hasClass(id+"_row")) {
                    $("input[type=radio]",$(element)).prop("checked",false);
                }
            });
            $("input.data-parsley",$("#datatablebody")).each(function(index,element) { 
                $(element).attr("data-parsley-required", "false");
            });
            $("div",$("#datatablebody")).hide();
            $("tr",$("#datatablebody")).hide();
            $("."+id+"_row").each(function(index,element) {
                $("input.data-parsley",$(element)).each(function(index,input) { 
                    $(input).attr("data-parsley-required", "true");
                });
            });
            $("."+id+"_row").show();
        }
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#form-data-layer")).trigger("change");
    canFocused = true;
}
function topicLabelError() {
    let found = false;
    $("label.SS_1_1_topic").each(function(index,element) { 
        if($(element).hasClass("parsley-error")) {
            found = true; return false;
        }
    });
    if(found) $("label.SS_1_1_topic").addClass("parsley-error"); 
    found = false;
    $("label.SS_1_2_topic").each(function(index,element) { 
        if($(element).hasClass("parsley-error")) {
            found = true; return false;
        }
    });
    if(found) $("label.SS_1_2_topic").addClass("parsley-error");
}
function gotoSurveySuccess(profile_id) {
    gotoSuccessPage();
}
function gotoSurveyCancel() {
    window.history.back();
}
function gotoSuccessPage() {
    window.open("/success.html","_self");
}
