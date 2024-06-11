function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}
function validBlank() {
	var pass = true;
	$('.chk_empty').each(function (i, obj) {
		if (obj.value == "") {
			pass = false;
		}
	});
	return pass;
}
function warningMessage(callback, addon, title = 'กรอกข้อมูลไม่ครบถ้วน', message = 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span> ให้ครบก่อนบันทึกข้อมูล') {
	$.alert({
		icon: 'warning sign icon',
		title: title,
		content: message+(addon ? '<br/>'+addon : ''),
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		draggable: true,
		confirm: function () { if(callback) callback(); },
		onOpen: function () {
			$("div.jconfirm-box").draggable();
		}
	});
}
function confirmMessage(callback, addon, title = 'ยืนยัน&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยัน') {
    $.confirm({
        icon: 'alarm outline icon',
        title: title,
        content: message+(addon ? '<br/>'+addon : ''),
        confirmButton: 'ตกลง',
        cancelButton: 'ยกเลิก',
        confirmButtonClass: 'ui button green',
        cancelButtonClass: 'ui button red',
        columnClass: 'ui grid center aligned',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
		draggable: true,
        confirm: function () { if(callback) callback(); },
		onOpen: function () {
			$("div.jconfirm-box").draggable();
		}
    });
}
function confirmSaveMessage(callback, addon, title = 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล') {
    confirmMessage(callback, addon, title, message);
}
function confirmUpdateMessage(callback, addon, title = 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล') {
    confirmMessage(callback, addon, title, message);
}
function confirmDeleteMessage(callback, addon, title = 'ยืนยันการลบข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการลบข้อมูล') {
    confirmMessage(callback, addon, title, message);
}
function confirmCancelMessage(callback, addon, title = 'ยืนยันการยกเลิกรายการ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยัน') {
    confirmMessage(callback, addon, title, message);
}
function successMessage(callback, addon, title = "การดำเนินการ", message = "สำเร็จเรียบร้อยแล้ว") {
	$.alert({
		icon: 'info circle icon',
		title: title,
		content: message+(addon ? '<br/>'+addon : ''),
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		draggable: true,
		confirm: function () { if(callback) callback(); },
		onOpen: function () {
			$("div.jconfirm-box").draggable();
		}
	});
}
/*
function warningMessage(callback, addon, title = 'กรอกข้อมูลไม่ครบถ้วน', message = 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span> ให้ครบก่อนบันทึกข้อมูล') {
	bootbox.alert({
		title: "<i class='fa fa-warning'></i> "+title,
		message: message+(addon ? '<br/>'+addon : ''),
		animate: true,
		callback: function() {    		
			if(callback) callback();
		},
		buttons: {
			ok:  { label: 'ตกลง', className: "btn-primary" }
		}    		
	}); 
	$(".bootbox > .modal-dialog").draggable();
}
function confirmMessage(callback, addon, title = 'ยืนยัน&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยัน') {
	bootbox.confirm({
		title: "<i class='fa fa-question-circle'></i> "+title,
		message: message+(addon ? '<br/>'+addon : ''),
		callback: function(result) {
			if(result) {
				if(callback) callback(result);
			}		
		},
		buttons: {
			confirm : { label: 'ตกลง', className: "btn-success" },
			cancel: { label: 'ยกเลิก', className: "btn-danger" }
		}
	}); 
	$(".bootbox > .modal-dialog").draggable();
}
function successMessage(callback, addon, title = "การดำเนินการ", message = "สำเร็จเรียบร้อยแล้ว") {
	bootbox.alert({
		title: "<i class='fa fa-smile-o'></i> "+title,
		message: message+(addon ? '<br/>'+addon : ''),
		animate: true,
		callback: function() {    		
			if(callback) callback();
		},
		buttons: {
			ok:  { label: 'ตกลง', className: "btn-primary" }
		}    		
	}); 
	$(".bootbox > .modal-dialog").draggable();
}
*/