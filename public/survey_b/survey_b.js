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
function gotoSurveyForm(profile_id) {
    submitWindow({url: BASE_URL+"/survey/form", params: {profile_id: profile_id}, windowName: "_self"});
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
    $("#by-add-button").unbind("click").bind("click",function() {
        //create new row into table
        let parent_id = createUUID();
        addNewTableRow($("#profile_id").val(),$("#survey_id").val(),parent_id,parent_id);
    });
    setupSurveyBYDataTable($("#profile_id").val(),$("#survey_id").val());
}
function setupSurveyBYDataTable(profile_id,survey_id) {
    $("a.by-edit-linker",$("#dxdatatablelayer")).click(function() { 
        let tr = $(this).closest("tr");
        let parent_id = tr.attr("data-survey");
        let master_id = tr.attr("data-master");
        openSurveyBYView(profile_id,parent_id,master_id);
    });
    $("a.by-delete-linker",$("#dxdatatablelayer")).click(function() { 
        let tr = $(this).closest("tr");
        let parent_id = tr.attr("data-survey");
        let master_id = tr.attr("data-master");
        confirmSurveyBYDelete(profile_id,parent_id,master_id,parent_id,function() {
            tr.remove();
        });
    });
}
function openSurveyBYEntry(profile_id,master_id,parent_id,survey_id) {
    console.log("openSurveyBYEntry: profile_id: " + profile_id + ", master_id: " + master_id+", parent_id: "+parent_id+", survey_id: "+survey_id);
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_by/entry",
        data: {
            ajax: true,
            profile_id: profile_id,
            master_id: master_id,
            parent_id: parent_id,
            survey_id: survey_id
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
            $("#dialogpanel").html(data);
            setupDialogComponents();
        }
    });
}
function openSurveyBYView(profile_id,survey_id,master_id) {
    console.log("openSurveyBYView: profile_id: " + profile_id + ", survey_id: " + survey_id+", master_id: "+master_id);
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_by/view",
        data: {
            ajax: true,
            profile_id: profile_id,
            survey_id: survey_id,
            master_id: master_id
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
            $("#dialogpanel").html(data);
            setupDialogComponents();
        }
    });
}
function setupDialogComponents() {
	$("#dialogpanel").find(".modal-dialog").draggable();
    $("#by-modal-dialog").modal("show");
    setupComponentsApt();
    setupUIApt();
}
function confirmSurveyBYDelete(profile_id,survey_id,master_id,parent_id,callback) {
    confirmDeleteMessage(function() { deleteBYForm(profile_id,survey_id,master_id,parent_id,callback); });
}
function deleteBYForm(profile_id,survey_id,master_id,parent_id,callback) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_by/remove",
        data: { 
            ajax: true,
            profile_id: profile_id, 
            survey_id: survey_id,
            master_id: master_id,
            parent_id: parent_id
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
function addNewTableRow(profile_id,master_id,parent_id,survey_id) {
    console.log("addNewTableRow: profile_id: " + profile_id + ", master_id: " + master_id + ", parent_id: " + parent_id+", survey_id: "+survey_id);    
    openSurveyBYEntry(profile_id,master_id,parent_id,survey_id);
}
