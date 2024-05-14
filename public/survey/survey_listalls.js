var mouseX = 0;
var mouseY = 0;
var datatable;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey"); }catch(ex) { }
    $("#addsurveylinker").click(function() { gotoAddSurvey(); return false; });
    $("#export-linker").click(function() { gotoExportSurvey(); return false; });
    initDataTable();
    $("#refreshuserutton").on('click', function () {
        refreshDataTable();
        return false;
    });
});
function gotoAddSurvey() {
    let token_key = $("#token_key").val();
    startWaiting();
    submitWindow({url: BASE_URL+"/survey/add", params: {token_key: token_key}, windowName: "_self"});
}
function gotoExportSurvey() {
    let token_key = $("#token_key").val();
    submitWindow({url: BASE_URL+"/export/csv", params: {token_key: token_key}, windowName: "_self"});
}
function initDataTable() {
    let token_key = $("#token_key").val();
    datatable = $('#data-table').DataTable({
        bAutoWidth: false,
        responsive: false,
        columnDefs: [
            { orderable: false, targets: [6] },
            { className: "text-left", targets: [2,5] },
        ],
        columns: [
            { data: 'profile_code' },
            { data: 'house_no' },
            { data: 'province_name' },
            { data: 'gender_name' },
            { data: 'ages' },
            { data: 'creator_name' },
            { data: 'profile_id' },
        ],        
        ajax: {
            dataSrc: 'body.rows',
            url: '/survey/list',
            type: 'POST',
            data: { ajax: true, token_key: token_key },
        },        
        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $(nRow).data("userdata", aData);            
            let editbtn = $('<a href="javascript:void(0)" class="btn-form-edit"><i class="edit icon large enable-color"></i></a>');
            let delbtn = $('<a href="javascript:void(0)" class="btn-form-delete"><i class="trash icon large alert-color"></i></a>');
            if(aData.ownered == "1") {
                delbtn.click(function() { confirmDeleteSurvey(this); });
            } else {
                delbtn.find("i").removeClass("alert-color").addClass("disable-color");
            }
            editbtn.click(function() { confirmEditSurvey(this); });
            let td = $('td:last', nRow).empty();
            td.append(editbtn).append(delbtn);            
        }
    });
}
function confirmEditSurvey(element) {
    let button = $(element); 
    let tr = button.closest("tr");
    let userdata = tr.data("userdata");
    if(userdata) {
        let token_key = $("#token_key").val();
        startWaiting();
        submitWindow({url: BASE_URL+"/survey/edit", params: {token_key: token_key, profile_id: userdata.profile_id}, windowName: "_self"});
    }
}
function confirmDeleteSurvey(element) {
    let tr = $(element).closest("tr");
    let userdata = tr.data("userdata");
    confirmDeleteMessage(function() { deleteSurvey(userdata); },userdata.profile_code);
}
function deleteSurvey(userdata) {
    let token_key = $("#token_key").val();
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey/remove",
        data: { ajax: true, profile_id: userdata.profile_id, token_key: token_key },
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
                refreshDataTable();
            }
        }
    });
}
function refreshDataTable() {
    if(datatable) datatable.ajax.reload(null,false);
}
