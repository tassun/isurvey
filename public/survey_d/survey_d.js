var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_d"); }catch(ex) { }
    setupComponents();
    setupUI();
});
function setupComponents() {
    $("#buttonsave").click(function() { confirmSaveSurvey(this); return false; });
    $("#buttoncancel").click(function() { confirmCancelSurvey(this); return false; });
    $("#buttonupdate").click(function() { confirmUpdateSurvey(this); return false; });
}
function setupUI() {
    $("a.sd-linker").click(function() {
        if($(this).hasClass("disabled")) return false;
        let column_id = $(this).attr("data-column");
        let refer_id = $(this).attr("data-refer");
        let profile_id = $("#profile_id").val();
        let survey_id = $("#survey_id").val();
        alert("profile_id: " + profile_id + ", survey_id: " + survey_id+", column_id: "+column_id+", refer_id: "+refer_id);
    });
    $("input.sd-radio").change(function() {
        if ($(this).val() == '1') {
            $(this).closest("tr").find("a.sd-linker").prop('disabled', false).removeClass("disabled");
        } else {
            $(this).closest("tr").find("a.sd-linker").prop('disabled', true).addClass("disabled");
        }
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
}
function confirmCancelSurvey(src) {
    confirmCancelMessage(function() {
        window.history.back();
    });
}
function confirmSaveSurvey(src) {
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    var $form = $('#form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmUpdateMessage(function() { updateSurvey(src); });
    } else {
        warningMessage();
    }
}
function saveSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_d/insert",
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
        url: BASE_URL+"/survey_d/update",
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
