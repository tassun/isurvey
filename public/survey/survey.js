var mouseX = 0;
var mouseY = 0;
var datatable;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("survey"); }catch(ex) { }
    initDataTable();
    $("#refreshuserutton").on('click', function () {
        refreshDataTable();
    });
});
function initDataTable() {
    datatable = $('#data-table').DataTable({
        bAutoWidth: false,
        responsive: true,
        columnDefs: [
            { orderable: false, targets: [6] },
            { className: "text-left", targets: [2,5] }
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
        submitWindow({url: BASE_URL+"/survey/edit", params: {profile_id: userdata.profile_id}, windowName: "_self"});
    }
}
function confirmDeleteSurvey(element) {
    let tr = $(element).closest("tr");
    let userdata = tr.data("userdata");
    confirmDeleteMessage(function() { deleteSurvey(userdata); });
}
function deleteSurvey(userdata) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey/remove",
        data: { ajax: true, profile_id: userdata.profile_id },
        type: "POST",
        dataType: "json",
        contentType: defaultContentType,
        error : function(transport,status,errorThrown) {
            stopWaiting();
            submitFailure(transport,status,errorThrown);
        },
        success: function(data,status,xhr){ 
            stopWaiting();
            refreshDataTable();
        }
    });
}
function refreshDataTable() {
    if(datatable) datatable.ajax.reload(null,false);
}
