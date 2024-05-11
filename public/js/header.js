$(function() {
    $("#homerlinker").click(function() { gotoHomerForm(); return false; });
    $("#memberlinker").click(function() { gotoMemberForm(); return false; });
    $("#logoutlinker").click(function() { confirmLogout(); return false; });
    $("#bread_home_linker").click(function() { gotoHomerForm(); return false; });
    $("#bread_form_linker").click(function() { gotoSurveyForm(); return false; });
    $("#master_bread_form_linker").click(function() { gotoSurveyBAppendix(); return false; });
    $("#table_bread_form_linker").click(function() { gotoSurveyBCategory(); return false; });
});
function confirmLogout() {
    $.confirm({
        icon: 'alarm outline icon',
        title: 'ยืนยันการออกจากระบบ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการออกจากระบบ',
        confirmButton: 'ตกลง',
        cancelButton: 'ยกเลิก',
        confirmButtonClass: 'ui button green',
        cancelButtonClass: 'ui button red',
        columnClass: 'ui grid center aligned',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        confirm: function () {
            startWaiting(); 
            logOut(); 
        },
    });
}
function logOut() {
    forceLogout();
    doLogout();
}
function forceLogout() {
    $.ajax({ async: false, url : BASE_URL+"/signin/signout", type : "POST", data: { } });
}
function doLogout() {
    $("#username").val("");
    $("#password").val("");
    $("#username").focus();
    window.open("/login", "_self");
}
function gotoHomerForm() {
    let token_key = $("#token_key").val();
    submitWindow({url: BASE_URL+"/index", params: {token_key: token_key}, windowName: "_self"});
}
function gotoMemberForm() {
    let token_key = $("#token_key").val();
    submitWindow({url: BASE_URL+"/user/listalls", params: {token_key: token_key}, windowName: "_self"});
}
function gotoSurveyForm(profile_id) {
    if(!profile_id) profile_id = $("#profile_id").val();
    let token_key = $("#token_key").val();
    submitWindow({url: BASE_URL+"/survey/form", params: {token_key: token_key, profile_id: profile_id}, windowName: "_self"});
}
function gotoSurveyBAppendix() {
    let token_key = $("#token_key").val();
    let profile_id = $("#profile_id").val();
    let survey_id = $("#main_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_b/open", params: {token_key: token_key, profile_id: profile_id, survey_id: survey_id}, windowName: "_self"});
}
function gotoSurveyBCategory() {
    let token_key = $("#token_key").val();
    let profile_id = $("#profile_id").val();
    let survey_id = $("#master_id").val();
    let main_id = $("#main_id").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey_bx/open", params: {token_key: token_key, profile_id: profile_id, survey_id: survey_id, main_id: main_id}, windowName: "_self"});
}
