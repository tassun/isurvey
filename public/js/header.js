$(function() {
    $("#logoutlinker").click(function() { startWaiting(); logOut(); return false; });
});
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
