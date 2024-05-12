var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("form"); }catch(ex) { }
    $("a.topic-linker").click(function() { openSurveyForm(this); return false; });
    $("#homebuttonlinker").click(function() { gotoHomerForm(); return false; });
    $("#breadhomelinker").click(function() { gotoHomerForm(); return false; });
});
function openSurveyForm(src) {
    let link = $(src);
    let url = link.attr("data-url");
    let survey_id = link.attr("data-survey");
    let token_key = $("#token_key").val();
    console.log("openSurveyForm: url="+url+",  survey_id="+survey_id+", token_key="+token_key);
    startWaiting();
    submitWindow({url: BASE_URL+url, params: {token_key: token_key, profile_id: $("#profile_id").val(), survey_id: survey_id}, windowName: "_self"});
}
