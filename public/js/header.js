$(function() {
    $("#logoutlinker").click(function() { confirmLogout(); return false; });
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
