var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_b"); }catch(ex) { }
    setupComponents();
    setupUI();
});
function setupComponents() {
    $("#buttonsave").click(function() { confirmSaveSurvey(this); return false; });
    $("#buttoncancel").click(function() { confirmCancelSurvey(this); return false; });
    $("#buttonupdate").click(function() { confirmUpdateSurvey(this); return false; });
    $("#sb-add-button").unbind("click").bind("click",function() {
        let profile_id = $("#profile_id").val();
        let survey_id = $("#survey_id").val();
        startAddProfile(profile_id,survey_id,function() { 
            refreshSurveyDataTable(profile_id,survey_id);
            //submitWindow({url: BASE_URL+"/survey_b/open", params: {profile_id: profile_id, survey_id: survey_id}, windowName: "_self"});
        });
    });
}
function confirmCancelSurvey(src) {
    confirmCancelMessage(function() {
        gotoSurveyForm();
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
        url: BASE_URL+"/survey_b/insert",
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
        url: BASE_URL+"/survey_b/update",
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
function setupUI() {
    $("input.sb-radio").change(function() {
        if ($(this).val() == '1') {
            $(this).closest("tr").find("a.sb-edit-linker").prop('disabled', false).removeClass("disabled");
        } else {
            $(this).closest("tr").find("a.sb-edit-linker").prop('disabled', true).addClass("disabled");
        }
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
    setupSurveyDataTable($("#profile_id").val(),$("#survey_id").val());
}
function setupSurveyDataTable(profile_id,survey_id) {
    $("a.sb-edit-linker",$("#familytablebody")).click(function() { 
        let tr = $(this).closest("tr");
        let sb_survey = tr.attr("data-survey");
        let sb_profile = tr.attr("data-profile");
        openSurveyCategory(profile_id,sb_survey,sb_profile);
    });
    $("a.sb-delete-linker",$("#familytablebody")).click(function() { 
        let tr = $(this).closest("tr");
        let sb_survey = tr.attr("data-survey");
        let sb_profile = tr.attr("data-profile");
        confirmSurveyDelete(profile_id,sb_survey,sb_profile,function() {
            tr.remove();
            refreshSurveyDataTable(profile_id,survey_id);
        });
    });
    $("a.sb-profile-linker",$("#familytablebody")).click(function() { 
        let tr = $(this).closest("tr");
        let sb_profile = tr.attr("data-profile");
        startEditProfile(sb_profile,function() { });
    });
}
function openSurveyCategory(profile_id,survey_id,survey_profile) {
    console.log("openSurveyCategory: profile_id: " + profile_id + ", survey_id: " + survey_id+", survey_profile: "+survey_profile);
    let token_key = $("#token_key").val();
    let main_id = $("#survey_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_bx/open", params: {token_key: token_key, profile_id: profile_id, survey_id: survey_id, main_id: main_id}, windowName: "_self"});
}
function confirmSurveyDelete(profile_id,survey_id,sb_profile,callback) {
    confirmDeleteMessage(function() { deleteSurvey(profile_id,survey_id,sb_profile,callback); });
}
function deleteSurvey(profile_id,survey_id,sb_profile,callback) {
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b/remove",
        data: { 
            ajax: true,
            token_key: token_key,
            profile_id: profile_id, 
            survey_id: survey_id,
            SB_profile: sb_profile
        },
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
                successMessage(function() { if(callback) callback(); });
            }
        }
    });
}
function setupDialogComponents(callback) {
	$("#dialogpanel").find(".modal-dialog").draggable();
    $("#profile-modal-dialog").modal("show");
    setupComponentsProfile(callback);
    setupDataControlsProfile();
    setupUIProfile();
}
function startAddProfile(profile_id,survey_id,callback) {
    console.log("startAddProfile: profile_id: " + profile_id + ", survey_id: "+survey_id);    
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b/profile/add",
        data: { 
            ajax: true,
            token_key: token_key,
            master_id: profile_id, 
        },
        type: "POST",
        dataType: "html",
        contentType: defaultContentType,
        error : function(transport,status,errorThrown) {
            stopWaiting();
            submitFailure(transport,status,errorThrown);
        },
        success: function(data,status,xhr){ 
            console.log(data);
            stopWaiting();
            $("#dialogpanel").html(data);
            setupDialogComponents(callback);
        }
    });
}
function startEditProfile(profile_id,callback) {
    console.log("startEditProfile: profile_id: " + profile_id);    
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b/profile/edit",
        data: { 
            ajax: true,
            token_key: token_key,
            profile_id: profile_id, 
        },
        type: "POST",
        dataType: "html",
        contentType: defaultContentType,
        error : function(transport,status,errorThrown) {
            stopWaiting();
            submitFailure(transport,status,errorThrown);
        },
        success: function(data,status,xhr){ 
            console.log(data);
            stopWaiting();
            $("#dialogpanel").html(data);
            setupDialogComponents(callback);
        }
    });
}
function refreshSurveyDataTable(profile_id,survey_id) {
    console.log("refreshSurveyDataTable: profile_id: " + profile_id+", survey_id: "+survey_id);    
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b/datatable",
        data: { 
            ajax: true,
            token_key: token_key,
            profile_id: profile_id, 
            survey_id: survey_id,
        },
        type: "POST",
        dataType: "html",
        contentType: defaultContentType,
        error : function(transport,status,errorThrown) {
            stopWaiting();
            submitFailure(transport,status,errorThrown);
        },
        success: function(data,status,xhr){ 
            stopWaiting();
            $("#familytablelayer").html(data);
            setupUI();
        }
    });
}
