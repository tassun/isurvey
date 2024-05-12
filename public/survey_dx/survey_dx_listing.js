var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_dx"); }catch(ex) { }
    setupComponentsAptList();
    setupUIAptList();
});
function setupComponentsAptList() {
    $("#dxbuttoncancel").click(function() { confirmCancelSurveyAptList(this); return false; });
}
function gotoHomerForm() {
    let token_key = $("#list_dx_token_key").val();
    submitWindow({url: BASE_URL+"/index", params: {token_key: token_key}, windowName: "_self"});
}
function gotoSurveyForm(profile_id) {
    if(!profile_id) profile_id = $("#list_dx_profile_id").val();
    let token_key = $("#list_dx_token_key").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey/form", params: {token_key: token_key, profile_id: profile_id}, windowName: "_self"});
}
function setupUIAptList() {
}
function confirmCancelSurveyAptList() {
    confirmCancelMessage(function() {
        gotoSurveyDAppendix();
    });
}
function gotoSurveyDAppendix() {
    let token_key = $("#list_dx_token_key").val();
    let profile_id = $("#list_dx_profile_id").val();
    let survey_id = $("#list_dx_master_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_d/open", params: {token_key: token_key, profile_id: profile_id, survey_id: survey_id}, windowName: "_self"});
}
