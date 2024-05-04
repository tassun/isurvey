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
function setupUIAptList() {
}
function gotoSurveyFormAptList(profile_id) {
    submitWindow({url: BASE_URL+"/survey/form", params: {profile_id: profile_id}, windowName: "_self"});
}
