var mouseX = 0;
var mouseY = 0;
$(function() {
    console.log("login : init ..., ");
    console.log("BASE_URL = "+BASE_URL);
    $(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
    initWaiting();
    $("#buttonlogin").click(function() { 
        console.log("connect server");
        connectServer();
        return false;
    });
    $("#password").on("keydown", function (e) {
        if(e.which==13) { 
            e.preventDefault();
            connectServer(); 
        }
    });
    $("input.input").on("focus", function() { 
        $(this).parent().parent().addClass("focus") 
    }).on("blur", function() {
        if($.trim($(this).val()) == "") {
            $(this).parent().parent().removeClass("focus");
        }
    });
    $("#username").focus();
});
function connectServer() {	
    if(!validInputUser()) return;
    login();
}
function validInputUser() {
    if($.trim($("#username").val())=="") { 
        $("#username").focus();
        return false; 
    }
    if($.trim($("#password").val())=="") { 
        $("#password").focus();
        return false; 
    }
    return true;
}
function login(){
    console.log("login");
    startWaiting();
    jQuery.ajax({
        url: BASE_URL+"/signin/signin",
        type: "POST",
        contentType: defaultContentType,
        data: $("#login_form").serialize(), 
        dataType: "html",
        error : function(transport,status,errorThrown) {
            console.log("login error :",transport.responseText); 
            stopWaiting();
            errorThrown = parseErrorThrown(transport, status, errorThrown);
            alertbox(errorThrown);
        },
        success: function(data,status,xhr){ 
            stopWaiting();
            loginSuccess(data);
        }
    });			
}
function loginSuccess(data) {
    console.log("login success :",data);
    try {
        let json = $.parseJSON(data);
        if(json.head.errorflag=="Y") {
            let msg = getMessageTitle(json.head.errorcode,json.head.errordesc);
            alertbox(msg);
            return;
        }
        window.open("/index", "_self");
    } catch(ex) { 
        console.error(ex);
    }
}
function logOut() {
    forceLogout();
    doLogout();
}
function forceLogout() {
    $.ajax({ url : BASE_URL+"/signin/signout", type : "POST", data: { } });
}
function doLogout() {
    $("#username").val("");
    $("#password").val("");
    $("#username").focus();
    window.open("/login", "_self");
}
