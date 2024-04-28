var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey"); }catch(ex) { }
    $("a.topic-linker").click(function() {
        openSurveyForm(this);
        return false;
    });
});
function openSurveyForm(src) {
    let link = $(src);
    let url = link.attr("data-url");
    let survey_id = link.attr("data-survey");
    submitWindow({url: BASE_URL+url, params: {profile_id: $("#profile_id").val(), survey_id: survey_id}, windowName: "_self"});
}
