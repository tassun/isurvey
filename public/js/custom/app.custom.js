var FormSeletor = '.a.form.app';
var FormSeletorEdit = '.b.form.app';


$.datepicker.regional['th'] = {
	changeMonth: true,
	changeYear: true,
	//defaultDate: GetFxupdateDate(FxRateDateAndUpdate.d[0].Day),
	yearOffSet: 543,
	showOn: "button",
	// buttonImage: 'images/calendar.gif',
	// buttonImageOnly: true,
	dateFormat: 'dd/mm/yy',
	dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
	dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
	monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
	monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
	constrainInput: true,

	prevText: 'ก่อนหน้า',
	nextText: 'ถัดไป',
	yearRange: '-80:+20'


};
$.datepicker.setDefaults($.datepicker.regional['th']);

$(document).ready(function () {

	$(".datepicker").datepicker($.datepicker.regional["th"]).datepicker("option", "gotoCurrent", true);;

	$("input[type='radio']").mousedown(function (e) {
		var val = $(this).prop("checked");

		var chk = this;
		if (val == true) {
			setTimeout(function () {
				$(chk).removeAttr("checked");
			}, 200)
		} else {
			return true;
		}
	});

	$("input.number").keyup(function (event) {
		if ($(this).val() != "" && !$.isNumeric($(this).val())) {
			alertMsg("กรอกข้อมูลไม่ถูกต้อง", "กรุณากรอกข้อมูลด้วยตัวเลขเท่านั้น", this);
		}
	})

	$("input.cchk").keyup(function (event) {
		var groupParent = $(this).closest('.fields.inline.chk');
		//console.log(groupParent);
		if ($(this).val() != "") {
			$(groupParent).find('input[type="checkbox"]').prop('checked', true);
		} else {
			$(groupParent).find('input[type="checkbox"]').prop('checked', false);
		}

	})


	$(document).on('click', '.btn-form-save', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		if (validBlank()) {
			$.confirm({
				icon: 'alarm outline icon',
				title: 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล',
				confirmButton: 'ตกลง',
				cancelButton: 'ยกเลิก',
				confirmButtonClass: 'ui button green',
				cancelButtonClass: 'ui button red',
				columnClass: 'ui grid center aligned',
				closeIcon: true,
				closeIconClass: 'fa fa-close',
				confirm: function () {
					$.ajax({
						url: restUrl,
						data: $(FormSeletor).serialize(),
						dataType: 'json',
						type: 'post',
						success: function (resp) {
							if (resp.status) {
								formMessageInfo(resp);
							} else {
								formMessageError(resp);
							}
						},
						error: function (err, xhrr, http) {
							toastMessageError({ title: 'Application Error', message: err.responseText });
						}
					});
				},
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-varidate-save', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		var $form = $('#form-data-varidate');
		if (validBlank() && $form.parsley().validate()) {
			$.confirm({
				icon: 'alarm outline icon',
				title: 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล',
				confirmButton: 'ตกลง',
				cancelButton: 'ยกเลิก',
				confirmButtonClass: 'ui button green',
				cancelButtonClass: 'ui button red',
				columnClass: 'ui grid center aligned',
				closeIcon: true,
				closeIconClass: 'fa fa-close',
				confirm: function () {
					$.ajax({
						url: restUrl,
						data: $(FormSeletor).serialize(),
						dataType: 'json',
						type: 'post',
						success: function (resp) {
							if (resp.status) {
								formMessageInfo(resp);
							} else {
								formMessageError(resp);
							}
						},
						error: function (err, xhrr, http) {
							console.log('err:',err);
							console.log('xhrr:',xhrr);
							console.log('http:',http);
							toastMessageError({ title: 'Application Error', message: err.responseText });
						}
					});
				},
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-crime-not-success', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		var $form = $('#form-data-varidate');
		formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลของผู้ตกเป็นเหยื่อให้ครบก่อนบันทึกข้อมูล');
	}).on('click', '.btn-form-varidate-edit', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		var $form = $('#form-data-varidate-b');
		if (validBlank() && $form.parsley().validate()) {
			$.confirm({
				icon: 'alarm outline icon',
				title: 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล',
				confirmButton: 'ตกลง',
				cancelButton: 'ยกเลิก',
				confirmButtonClass: 'ui button green',
				cancelButtonClass: 'ui button red',
				columnClass: 'ui grid center aligned',
				closeIcon: true,
				closeIconClass: 'fa fa-close',
				confirm: function () {
					$.ajax({
						url: restUrl,
						data: $(FormSeletorEdit).serialize(),
						dataType: 'json',
						type: 'post',
						success: function (resp) {
							if (resp.status) {
								formMessageInfo(resp);
							} else {
								formMessageError(resp);
							}
						},
						error: function (err, xhrr, http) {
							console.log('err:',err);
							console.log('xhrr:',xhrr);
							console.log('http:',http);
							toastMessageError({ title: 'Application Error', message: err.responseText });
						}
					});
				},
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-varidate-save-go', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		var $form = $('#form-data-varidate');
		if (validBlank() && $form.parsley().validate()) {
			$.confirm({
				icon: 'alarm outline icon',
				title: 'ยืนยันการบันทึกข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการบันทึกข้อมูล',
				confirmButton: 'ตกลง',
				cancelButton: 'ยกเลิก',
				confirmButtonClass: 'ui button green',
				cancelButtonClass: 'ui button red',
				columnClass: 'ui grid center aligned',
				closeIcon: true,
				closeIconClass: 'fa fa-close',
				confirm: function () {
					$.ajax({
						url: restUrl,
						data: $(FormSeletor).serialize(),
						dataType: 'json',
						type: 'post',
						success: function (resp) {
							if (resp.status) {
								window.location.href = resp.url;
							} else {
								formMessageError(resp);
							}
						},
						error: function (err, xhrr, http) {
							console.log('err:',err);
							console.log('xhrr:',xhrr);
							console.log('http:',http);
							toastMessageError({ title: 'Application Error', message: err.responseText });
						}
					});
				},
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-save-delete', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		if (validBlank()) {
			$.confirm({
				icon: 'alarm outline icon',
				title: 'ยืนยันการลบข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการลบข้อมูล',
				confirmButton: 'ตกลง',
				cancelButton: 'ยกเลิก',
				confirmButtonClass: 'ui button green',
				cancelButtonClass: 'ui button red',
				columnClass: 'ui grid center aligned',
				closeIcon: true,
				closeIconClass: 'fa fa-close',
				confirm: function () {
					$.ajax({
						url: restUrl,
						data: $(FormSeletor).serialize(),
						dataType: 'json',
						type: 'post',
						success: function (resp) {
							if (resp.status) {
								formMessageInfo(resp);
							} else {
								formMessageError(resp);
							}
						},
						error: function (err, xhrr, http) {
							toastMessageError({ title: 'Application Error', message: err.responseText });
						}
					});
				},
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-hiddend-save', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		if (validBlank()) {
			$.ajax({
				url: restUrl,
				data: $(FormSeletor).serialize(),
				dataType: 'json',
				type: 'post'
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-hiddend-save-go', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		if (validBlank()) {
			$.ajax({
				url: restUrl,
				data: $(FormSeletor).serialize(),
				dataType: 'json',
				type: 'post',
				success: function (resp) {
					if (resp.status) {
						window.location.href = resp.url;
					} else {
						formMessageError(resp);
					}
				}
			});
		} else {
			formMessageValidator('กรอกข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลที่เป็น <span class="star">* สีแดง</span>ให้ครบก่อนบันทึกข้อมูล');
		}
	}).on('click', '.btn-form-login', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		console.log("restUrl" + restUrl);
		$.ajax({
			url: restUrl,
			data: $(FormSeletor).serialize(),
			dataType: 'json',
			type: 'post',
			success: function (resp) {
				if (resp.status) {
					window.location.href = resp.url;
				} else {
					formMessageError(resp);
				}
			},
			error: function (err, xhrr, http) {
				toastMessageError({ title: 'Application Error', message: err.responseText });
			}
		});
	}).on('click', '.btn-form-logout', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');

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
				$.ajax({
					url: restUrl,
					data: $(FormSeletor).serialize(),
					dataType: 'json',
					type: 'post',
					success: function (resp) {
						if (resp.status) {
							formMessageInfo(resp);
						} else {
							formMessageError(resp);
						}
					},
					error: function (err, xhrr, http) {
						toastMessageError({ title: 'Application Error', message: err.responseText });
					}
				});
			},
		});
	}).on('click', '.btn-form-delete', function () {
		var element = this;
		var restUrl = $(element).attr('data-url');
		$.confirm({
			icon: 'alarm outline icon',
			title: 'ยืนยันการลบข้อมูล&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			content: 'กดปุ่ม <b>ตกลง</b> เพื่อทำการยืนยันการลบข้อมูล',
			confirmButton: 'ตกลง',
			cancelButton: 'ยกเลิก',
			confirmButtonClass: 'ui button green',
			cancelButtonClass: 'ui button red',
			columnClass: 'ui grid center aligned',
			closeIcon: true,
			closeIconClass: 'fa fa-close',
			confirm: function () {
				$.ajax({
					url: restUrl,
					dataType: 'json',
					type: 'get',
					success: function (resp) {
						if (resp.status) {
							formMessageInfo(resp);
						} else {
							formMessageError(resp);
						}
					},
					error: function (err, xhrr, http) {
						toastMessageError({ title: 'Application Error', message: err.responseText });
					}
				});
			},
		});
	})
})

function formMessageInfo(resp) {
	$.alert({
		icon: 'info circle icon',
		title: resp.title + '&nbsp&nbsp&nbsp&nbsp',
		content: resp.message,
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		confirm: function () {
			if (resp.url != '') {
				window.location.href = resp.url;
			}
		}
	});
}
function formMessageValidator(title, message) {
	$.alert({
		icon: 'warning sign icon',
		title: title,
		content: message,
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		confirm: function () { }
	});
}


function formMessageError(resp) {
	$.alert({
		icon: 'warning sign icon',
		title: resp.title + '&nbsp&nbsp&nbsp&nbsp',
		content: resp.message,
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		confirm: function () {
			if (resp.url != '') {
				window.location.href = resp.url;
			}
		}
	});
}

function alertMsg(title, message, input) {
	$.alert({
		icon: 'warning sign icon',
		title: title + '&nbsp&nbsp&nbsp&nbsp',
		content: message,
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
		confirm: function () {
			$(input).val("");
			$(input).focus();

		}
	});
}


function toastMessageError(resp) {
	$.alert({
		icon: 'warning sign icon',
		title: 'เกิดข้อผิดพลาดไม่สามารถทำรายการได้&nbsp&nbsp&nbsp&nbsp',
		content: resp.message,
		confirmButton: 'ตกลง',
		confirmButtonClass: 'ui button blue',
		confirmIcon: true,
		confirmIconClass: 'fa fa-ok',
		columnClass: 'ui grid center aligned',
	});
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


function goEdit(v_code_id) {
	with (document.myform) {
		cmd.value = "edit";
		action = form_name.value;
		code_id.value = v_code_id;
		submit();
	}
}
function initCheck(chkId) {
	var json = $("#" + chkId).val();
	if (json != "") {
		json = jQuery.parseJSON(json);
		$.each(json, function (index, val) {
			$("#" + chkId + val).prop('checked', true);
		});
	}
}
function procCheck(chkId) {
	var txt = "[0,"
	$("." + chkId).each(function (i) {
		if ($("#" + chkId + (i + 1)).is(':checked')) {
			txt += $("#" + chkId + (i + 1)).val() + ",";
		} else {
			txt += "0,";
		}
	});
	txt += "0]";
	$("#" + chkId).val(txt);
}