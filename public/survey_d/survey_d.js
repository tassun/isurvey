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
function setupUI() {
    $("a.sd-linker").click(function() {
        if($(this).hasClass("disabled")) return false;
        let column_id = $(this).attr("data-column");
        let refer_id = $(this).attr("data-refer");
        let profile_id = $("#profile_id").val();
        let survey_id = $("#survey_id").val();
        console.log("profile_id: " + profile_id + ", master_id: " + survey_id+", column_id: "+column_id+", survey_id: "+refer_id);
        let tr = $(this).closest("tr");
        $("#dx-modal-dialog-listing").modal("show");
        $("#listdxbuttonok").unbind("click").bind("click",() => { 
            let rowlen = $("#listdxdatatablebody").find("tr").length; 
            $("#"+column_id+"_counter").text(rowlen);
            $("#dx-modal-dialog-listing").modal("hide"); 
            console.log("rowlen: "+rowlen+", column_id: "+column_id);
        });
        let title = tr.find("td").eq(0).text();
        $("#dx-topic-title").text(title);
        $("#list_dx_profile_id").val(profile_id);
        $("#list_dx_master_id").val(survey_id);
        $("#list_dx_column_id").val(column_id);    
        searchSurveyDXDataTable(profile_id,survey_id,column_id);
    });
    $("input.sd-radio").change(function() {
        if ($(this).val() == '1') {
            $(this).closest("tr").find("a.sd-linker").prop('disabled', false).removeClass("disabled");
        } else {
            $(this).closest("tr").find("a.sd-linker").prop('disabled', true).addClass("disabled");
        }
    });
    $("input.sd-unused").each(function(index,element) {
        let tr = $(element).closest("tr");
        let $idx = tr.attr("data-index");
        let inputname = "SD_"+$idx+"_1";
        $('input[name="'+inputname+'"]').on('change', function() {
            if ($(this).val() == '0') {
                let $tr = $(this).closest("tr");
                let $index = $tr.attr("data-index");
                $("#SD_"+$index+"_2_0").prop('checked', true);
            }
        });
    });
    $("input[type=radio]:checked",$("#form-data-layer")).trigger("change");
}
function displaySurveyDXDataTable() {
    let profile_id = $("#list_dx_profile_id").val();
    let master_id = $("#list_dx_master_id").val();
    let column_id = $("#list_dx_column_id").val();    
    searchSurveyDXDataTable(profile_id,master_id,column_id);
}
function searchSurveyDXDataTable(profile_id,master_id,column_id) {
    console.log("searchDataTable: profile_id: " + profile_id + ", master_id: " + master_id+", column_id: "+column_id);
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/datatable",
        data: {
            ajax: true,
            token_key: token_key,
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
            stopWaiting();
            $("#dxdatatablelayer").html(data);
            setupSurveyDXDataTable(profile_id,master_id,column_id);
        }
    });
}
function setupSurveyDXDataTable(profile_id,master_id,column_id) {
    $("#dx-add-button").unbind("click").bind("click",function() {
        openSurveyDXEntry(profile_id,master_id,column_id);
    });
    $("a.dx-edit-linker",$("#dxdatatablelayer")).click(function() { 
        let tr = $(this).closest("tr");
        let survey_id = tr.attr("data-survey");
        openSurveyDXView(profile_id,survey_id);
    });
    $("a.dx-delete-linker",$("#dxdatatablelayer")).click(function() { 
        let tr = $(this).closest("tr");
        let survey_id = tr.attr("data-survey");
        let text = tr.find("td").eq(1).text();
        let text2 = tr.find("td").eq(2).text();
        confirmSurveyDXDelete(profile_id,survey_id,text,text2);
    });
}
function openSurveyDXEntry(profile_id,master_id,column_id) {
    console.log("openSurveyDXEntry: profile_id: " + profile_id + ", master_id: " + master_id+", column_id: "+column_id);
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/entry",
        data: {
            ajax: true,
            token_key: token_key,
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
            stopWaiting();
            $("#dialogpanel").html(data);
            setupDialogComponents();
        }
    });
}
function openSurveyDXView(profile_id,survey_id) {
    console.log("openSurveyDXView: profile_id: " + profile_id + ", survey_id: " + survey_id);
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/view",
        data: {
            ajax: true,
            token_key: token_key,
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
function confirmSurveyDXDelete(profile_id,survey_id,text,text2) {
    confirmDeleteMessage(function() { deleteDXForm(profile_id,survey_id); }, text+"<br/>"+text2);
}
function deleteDXForm(profile_id,survey_id) {
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_dx/remove",
        data: { 
            ajax: true,
            token_key: token_key,
            profile_id: profile_id, 
            survey_id: survey_id 
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
                successMessage(function() { displaySurveyDXDataTable();});
            }
        }
    });
}
