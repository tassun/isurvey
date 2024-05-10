var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_b2"); }catch(ex) { }
    setupComponents();
    setupUI();
});
function setupComponents() {
    $("#listbuttoncancel").click(function() { confirmCancelSurvey(this); return false; });
    $("#bx-add-button").click(function() {  
        let profile_id = $("#list_bx_profile_id").val();
        let master_id = $("#list_bx_master_id").val();
        let column_id = $("#list_bx_column_id").val();
        openSurveyBX(profile_id,"",master_id,column_id);
        return false; 
    });
}
function confirmCancelSurvey(src) {
    confirmCancelMessage(function() {
        gotoSurveyBCategory();
    });
}
function gotoSurveyForm(profile_id) {
    if(!profile_id) profile_id = $("#list_bx_profile_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey/form", params: {profile_id: profile_id}, windowName: "_self"});
}
function setupUI() {
    $("a.bx-edit-linker",$("#bxdatatablelayer")).click(function() {
        let tr = $(this).closest("tr");
        let profile_id = $("#list_bx_profile_id").val();
        let column_id = $("#list_bx_column_id").val();
        let survey_id = tr.attr("data-survey");
        let master_id = tr.attr("data-master");
        openSurveyBX(profile_id,survey_id,master_id,column_id);
    });
    $("a.bx-delete-linker",$("#bxdatatablelayer")).click(function() {
        let tr = $(this).closest("tr");
        let profile_id = $("#list_bx_profile_id").val();
        let column_id = $("#list_bx_column_id").val();
        let survey_id = tr.attr("data-survey");
        let master_id = tr.attr("data-master");
        let text = tr.find("td").eq(1).text();
        let text2 = tr.find("td").eq(2).text();
        confirmSurveyBXDelete(profile_id,survey_id,master_id,column_id,text,text2);
    });
}
function openSurveyBX(profile_id,survey_id,master_id,column_id) {
    console.log("openSurveyBX: profile_id = "+profile_id+", survey_id = "+survey_id+", master_id = "+master_id+", column_id = "+column_id);
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_b2/open", params: {profile_id: profile_id, survey_id: survey_id, master_id: master_id, column_id: column_id}, windowName: "_self"});
}
function confirmSurveyBXDelete(profile_id,survey_id,master_id,column_id,text,text2) {
    confirmDeleteMessage(function() { deleteBXForm(profile_id,survey_id,master_id,column_id); }, text+"<br/>"+text2);
}
function deleteBXForm(profile_id,survey_id,master_id,column_id) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b2/remove",
        data: { 
            ajax: true,
            profile_id: profile_id, 
            survey_id: survey_id,
            master_id: master_id,
            column_id: column_id 
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
                successMessage(function() { displaySurveyBXDataTable();});
            }
        }
    });
}
function displaySurveyBXDataTable() {
    let profile_id = $("#list_bx_profile_id").val();
    let survey_id = $("#list_bx_survey_id").val();    
    let master_id = $("#list_bx_master_id").val();
    let column_id = $("#list_bx_column_id").val();
    searchSurveyBXDataTable(profile_id,survey_id,master_id,column_id);
}
function searchSurveyBXDataTable(profile_id,survey_id,master_id,column_id) {
    console.log("searchDataTable: profile_id: " + profile_id + ", survey_id = "+survey_id+", master_id: " + master_id+", column_id: "+column_id);
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey_b2/datatable",
        data: {
            ajax: true,
            profile_id: profile_id,
            survey_id: survey_id,
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
            $("#bxdatatablelayer").html(data);
            setupUI();
        }
    });
}
function gotoSurveyBCategory() {
    let profile_id = $("#list_bx_profile_id").val();
    let survey_id = $("#list_bx_survey_id").val();    
    openSurveyCategory(profile_id,survey_id);
}
function openSurveyCategory(profile_id,survey_id) {
    console.log("openSurveyCategory: profile_id: " + profile_id + ", survey_id: " + survey_id);
    let main_id = $("#list_bx_main_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_bx/open", params: {profile_id: profile_id, survey_id: survey_id, main_id: main_id}, windowName: "_self"});
}
function gotoSurveyBAppendix() {
    let profile_id = $("#list_bx_profile_id").val();
    let survey_id = $("#list_bx_main_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_b/open", params: {profile_id: profile_id, survey_id: survey_id}, windowName: "_self"});
}
