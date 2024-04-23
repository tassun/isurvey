function warningMessage(callback, title = 'กรอกข้อมูลไม่ครบถ้วน', message = 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล') {
	$.alert({
		icon: 'warning sign icon',
		title: title,
		content: message,
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		confirm: function () { if(callback) callback(); }
	});
}
function confirmSaveMessage(callback, title = 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล') {
    $.confirm({
        icon: 'alarm outline icon',
        title: title,
        content: message,
        confirmButton: 'ตกลง',
        cancelButton: 'ยกเลิก',
        confirmButtonClass: 'ui button green',
        cancelButtonClass: 'ui button red',
        columnClass: 'ui grid center aligned',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        confirm: function () { if(callback) callback(); }
    });
}
function confirmUpdateMessage(callback, title = 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล') {
    $.confirm({
        icon: 'alarm outline icon',
        title: title,
        content: message,
        confirmButton: 'ตกลง',
        cancelButton: 'ยกเลิก',
        confirmButtonClass: 'ui button green',
        cancelButtonClass: 'ui button red',
        columnClass: 'ui grid center aligned',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        confirm: function () { if(callback) callback(); }
    });
}
function confirmDeleteMessage(callback, title = 'ยืนยันการลบข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message = 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการลบข้อมูล') {
    $.confirm({
        icon: 'alarm outline icon',
        title: title,
        content: message,
        confirmButton: 'ตกลง',
        cancelButton: 'ยกเลิก',
        confirmButtonClass: 'ui button green',
        cancelButtonClass: 'ui button red',
        columnClass: 'ui grid center aligned',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        confirm: function () { if(callback) callback(); }
    });
}
