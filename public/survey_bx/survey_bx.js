var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey_b"); }catch(ex) { }
    setupComponents();
    setupUI();
});
function setupComponents() {
    $("#buttoncancel").click(function() { confirmCancelSurvey(this); return false; });
}
function confirmCancelSurvey(src) {
    confirmCancelMessage(function() {
        gotoSurveyBAppendix();
    });
}
function setupUI() {
    $("a.bx-linker",$("#categorytablelayer")).click(function() {
        let profile_id = $("#profile_id").val();
        let survey_id = $(this).attr("data-survey");
        let column_id = $(this).attr("data-column");
        openSurveyBX(profile_id,survey_id,survey_id,column_id);
    });
}
function openSurveyBX(profile_id,survey_id,master_id,column_id) {
    let token_key = $("#token_key").val();
    let main_id = $("#main_id").val();
    console.log("openSurveyBX: profile_id = "+profile_id+", survey_id = "+survey_id+", master_id = "+master_id+", column_id = "+column_id);
    startWaiting();
    submitWindow({url: BASE_URL+"/"+column_id+"/listing", params: {token_key: token_key, profile_id: profile_id, survey_id: survey_id, master_id: master_id, column_id: column_id, main_id: main_id}, windowName: "_self"});
}
