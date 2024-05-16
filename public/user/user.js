var mouseX = 0;
var mouseY = 0;
var datatable;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("member"); }catch(ex) { }
    initDataTable();
    $("#breadhomelinker").click(function() { gotoHomerForm(); return false; });
    $("#refreshuserutton").on('click', function () {
        refreshDataTable();
    });
    $('#modal-add').on('show.bs.modal', function(event) {
        var $form = $('#form-data-add');
        $form.parsley().reset();
        $form.trigger("reset");
    });
    $('#modal-edit').on('show.bs.modal', function(event) {
        confirmEditUser(event.relatedTarget);
    });
    $('#useraddbutton').on('click', function () {
        confirmAddUser();
    });
	$("#modal-add").find(".modal-dialog").draggable();
	$("#modal-edit").find(".modal-dialog").draggable();
    $("#e_editable").change(function() {
        if($(this).is(":checked")) {
            $("#e_password").prop("disabled",false);
            $("#e_passwordconfirm").prop("disabled",false);
            $("#e_password").attr("data-parsley-required",true);
            $("#e_passwordconfirm").attr("data-parsley-required",true);
        } else {
            $("#e_password").prop("disabled",true);
            $("#e_passwordconfirm").prop("disabled",true);
            $("#e_password").attr("data-parsley-required",false);
            $("#e_passwordconfirm").attr("data-parsley-required",false);
        }
    });
});
function initDataTable() {
    let token_key = $("#token_key").val();
    datatable = $('#data-table').DataTable({
        bAutoWidth: false,
        responsive: false,
        columnDefs: [
            { orderable: false, targets: [0,7] },
            { className: "text-left", targets: [2,3,5] }
        ],
        columns: [
            {   data: 'seqno',
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 'username' },
            { data: 'name' },
            { data: 'surname' },
            { data: 'level' },
            { data: 'email' },
            { data: 'mobile' },
            { data: 'userid' },
        ],        
        ajax: {
            dataSrc: 'body.rows',
            url: '/user/list',
            type: 'POST',
            data: { ajax: true, token_key: token_key },
        },
        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $(nRow).data("userdata", aData);
            let editbtn = $('<a href="javascript:void(0)" type="button" data-toggle="modal" data-target="#modal-edit"><i class="edit icon large enable-color"></i></a>');
            let delbtn = $('<a href="javascript:void(0)" class="btn-form-delete"><i class="trash icon large alert-color"></i></a>');
            delbtn.click(function() { confirmDeleteUser(this); });
            let td = $('td:last', nRow).empty();
            td.append(editbtn).append(delbtn);
        }
    });
}
function confirmAddUser() {
    var $form = $('#form-data-add');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { addNewUser(); });
    } else {
        warningMessage();
    }
}
function addNewUser() {
    let token_key = $("#token_key").val();
    let userdata = {
        ajax: true,
        token_key: token_key,
        name: $("#a_name").val(),
        surname: $("#a_surname").val(),
        email: $("#a_email").val(),
        mobile: $("#a_mobile").val(),
        level: $("#a_level").val(),
        username: $("#a_username").val(),
        password: $("#a_password").val(),
        passwordconfirm: $("#a_passwordconfirm").val(),
    };
    startWaiting();
    jQuery.ajax({
        url: BASE_URL+"/user/insert",
        data: userdata, 
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
                userdata.userid = data.body.rows.userid;
                datatable.row.add(userdata).draw(false);
                $("#modal-add").modal("hide");
            }
        }
    });			
}
function confirmEditUser(element) {
    var $form = $('#form-data-edit');
    $form.parsley().reset();
    let button = $(element); //$(event.relatedTarget);
    let tr = button.closest("tr");
    let userdata = tr.data("userdata");
    let userid = userdata.userid;
    let name = userdata.name;
    let surname = userdata.surname;
    let level = userdata.level;
    let email = userdata.email;
    let mobile = userdata.mobile;
    let username = userdata.username;
    let password = userdata.password;
    $('#e_userid').val(userid);
    $('#e_name').val(name);
    $('#e_surname').val(surname);
    $('#e_level').val(level);
    $('#e_email').val(email);
    $('#e_mobile').val(mobile);
    $('#e_username').val(username);
    $('#e_password').val(password);
    $("#e_passwordconfirm").val("");
    $("#userupdatebutton").unbind("click").bind('click', function () {
        confirmUpdateUser(tr,userdata);
    });
    $("#e_editable").trigger("change");
}
function confirmUpdateUser(row,datarow) {
    var $form = $('#form-data-edit');
    if (validBlank() && $form.parsley().validate()) {
        confirmUpdateMessage(function() { updateUser(row,datarow); });
    } else {
        warningMessage();
    }
}
function updateUser(row,datarow) {
    let token_key = $("#token_key").val();
    let userdata = {
        ajax: true,
        token_key: token_key,
        userid: $('#e_userid').val(),
        name: $('#e_name').val(),
        surname: $('#e_surname').val(),
        level: $('#e_level').val(),
        email: $('#e_email').val(),
        mobile: $('#e_mobile').val(),    
        username: $('#e_username').val(),
        password: $('#e_password').val(),
        passwordconfirm: $('#e_passwordconfirm').val(),
        editable: $('#e_editable').is(":checked") ? "1" : "0",
    };
    startWaiting();
    jQuery.ajax({
        url: BASE_URL+"/user/update",
        data: userdata, 
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
                $("#modal-edit").modal("hide");
                updateDataTable(row,userdata);
            }
        }
    });			
}
function confirmDeleteUser(element) {
    let tr = $(element).closest("tr");
    let userdata = tr.data("userdata");
    confirmDeleteMessage(function() { deleteUser(userdata); }, userdata.username);
}
function deleteUser(userdata) {
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/user/remove",
        data: { ajax: true, token_key: token_key, userid: userdata.userid },
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
                successMessage(function() { refreshDataTable(); });
            }
        }
    });
}
function refreshDataTable() {
    if(datatable) datatable.ajax.reload(null,false);
}
function updateDataTable(row,userdata) {
    refreshDataTable();
}
