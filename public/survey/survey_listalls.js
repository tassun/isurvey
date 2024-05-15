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
        responsive: true,
        columnDefs: [
            { orderable: false, targets: [6] },
            { className: "text-left", targets: [2,5] },
            { targets: 6, 
                render: function(data, type, row, meta) {
                    let buf = '<a href="javascript:void(0)" class="btn-form-edit" data-profile="'+row.profile_id+'" data-code="'+row.profile_code+'"><i class="edit icon large enable-color"></i></a>';
                    if(row.ownered == "1") {
                        buf += '<a href="javascript:void(0)" class="btn-form-delete" data-profile="'+row.profile_id+'" data-code="'+row.profile_code+'"><i class="trash icon large alert-color"></i></a>';
                    } else {
                        buf += '<a href="javascript:void(0)" class="btn-form-disable"><i class="trash icon large disable-color"></i></a>';
                    }
                    return buf;
                }
            },
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
        /*
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
        }*/
    });
    datatable.on('click', 'a.btn-form-edit', function(e) {
        //e.target is i tag
        e.preventDefault();
        let tr = $(this).closest("tr");
        let pr = $(e.target).parent();
        let profile_id = pr.attr("data-profile");
        let profile_code = pr.attr("data-code");
        let adata = {profile_id: profile_id, profile_code: profile_code};
        let data = datatable.row(tr).data();
        console.log("click data edit: adata", adata,", data", data);
        if(data == undefined) {
            if(tr.hasClass("child")) {
                tr = tr.prev();
                data = datatable.row(tr).data();            
                console.log("click data edit: data", data);
            }
        }
        confirmEditSurvey(this,data || adata);
    });
    datatable.on('click', 'a.btn-form-delete', function(e) {
        //e.target is i tag
        e.preventDefault();
        let tr = $(this).closest("tr");
        let pr = $(e.target).parent();
        let profile_id = pr.attr("data-profile");
        let profile_code = pr.attr("data-code");
        let adata = {profile_id: profile_id, profile_code: profile_code};
        let data = datatable.row(tr).data();
        console.log("click data delete: adata", adata,", data", data);
        if(data == undefined) {
            if(tr.hasClass("child")) {
                tr = tr.prev();
                data = datatable.row(tr).data();            
                console.log("click data delete: data", data);
            }
        }
        confirmDeleteSurvey(this,data || adata);
    });
}
function confirmEditSurvey(element,data) {
    let button = $(element); 
    let tr = button.closest("tr");
    let userdata = tr.data("userdata") || data;
    if(userdata) {
        let token_key = $("#token_key").val();
        startWaiting();
        submitWindow({url: BASE_URL+"/survey/edit", params: {token_key: token_key, profile_id: userdata.profile_id}, windowName: "_self"});
    }
}
function confirmDeleteSurvey(element,data) {
    let tr = $(element).closest("tr");
    let userdata = tr.data("userdata") || data;
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
