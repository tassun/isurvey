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
    $("#dx-modal-dialog-listing").find(".modal-dialog").draggable();
}
function setupUI() {
    $("a.sd-linker").click(function() {
        if($(this).hasClass("disabled")) return false;
        let column_id = $(this).attr("data-column");
        let refer_id = $(this).attr("data-refer");
        let profile_id = $("#profile_id").val();
        let survey_id = $("#survey_id").val();
        console.log("profile_id: " + profile_id + ", master_id: " + survey_id+", column_id: "+column_id+", survey_id: "+refer_id);
        $("#dx-modal-dialog-listing").modal("show");
        let title = $(this).closest("tr").find("td").eq(0).text();
        $("#dx-topic-title").text(title);
        $("#list_dx_profile_id").val(profile_id);
        $("#list_dx_master_id").val(survey_id);
        $("#list_dx_column_id").val(column_id);    
        searchDataTable(profile_id,survey_id,column_id);
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
function displayDataTable() {
    let profile_id = $("#list_dx_profile_id").val();
    let master_id = $("#list_dx_master_id").val();
    let column_id = $("#list_dx_column_id").val();    
    searchDataTable(profile_id,master_id,column_id);
}
function searchDataTable(profile_id,master_id,column_id) {
    console.log("searchDataTable: profile_id: " + profile_id + ", master_id: " + master_id+", column_id: "+column_id);
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/datatable",
        data: {
            ajax: true,
            profile_id: profile_id,
            master_id: master_id,
            column_id: column_id
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
            $("#dxdatatablelayer").html(data);
            $("a.dx-edit-linker",$("#dxdatatablelayer")).click(function() { 
                let tr = $(this).closest("tr");
                let survey_id = tr.attr("data-survey");
                openSurveyDXForm(profile_id,survey_id);
            });        
        }
    });
}
function openSurveyDXForm(profile_id,survey_id) {
    console.log("openSurveyDXForm: profile_id: " + profile_id + ", survey_id: " + survey_id);
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/dialog",
        data: {
            ajax: true,
            profile_id: profile_id,
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
            console.log(data);
            stopWaiting();
            $("#dialogpanel").html(data);
            setupDialogComponents();
        }
    });
}
function setupDialogComponents() {
	$("#dialogpanel").find(".modal-dialog").draggable();
    $("#dx-modal-dialog").modal("show");
    setupComponentsApt();
    setupUIApt();
}
