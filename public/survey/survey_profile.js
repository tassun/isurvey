var mouseX = 0;
var mouseY = 0;
$(function() {
	$(this).mousedown(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
	try { startApplication("profile"); }catch(ex) { }
    setupComponents();
    setupDataControls();
    setupUI();
});
function setupComponents() {
    $("#breadhomelinker").click(function() { gotoHomerForm(); return false; });
    $("#buttonsave").click(function() { confirmSaveSurvey(this); return false; });
    $("#buttoncancel").click(function() { confirmCancelSurvey(this); return false; });
    $("#buttonupdate").click(function() { confirmUpdateSurvey(this); return false; });
    $("#buttonnext").click(function() { confirmNextSurvey(this); return false; });
    $("#buttonnexttop").click(function() { confirmNextSurvey(this); return false; });
}
function setupDataControls() {
    setupProvince("province_2",$("#province_2").attr("data-value"),$("#province_1").val());
    setupAmphure("amphure_2", $("#province_2").attr("data-value"),$("#amphure_2").attr("data-value"));
    setupDistrict("district_2",$("#amphure_2").attr("data-value"),$("#district_2").attr("data-value"));
    setupAmphure("amphure_1", $("#province_1").val(),$("#amphure_1").attr("data-value"),"เลือกเขต");
    setupDistrict("district_1",$("#amphure_1").attr("data-value"),$("#district_1").attr("data-value"),"เลือกแขวง");
    $("#amphure_1").change(function() { setupDistrict("district_1",$(this).val(),"","เลือกแขวง"); });
    $("#province_2").change(function() { setupAmphure("amphure_2", $(this).val()); });
    $("#amphure_2").change(function() { setupDistrict("district_2",$(this).val()); });
}
function setupUI() {
    $('input[name="A4"]').on('change', function() {
        if ($(this).val() == '1') {
            $(".A4-1-set").removeAttr('disabled');
            $(".A4-1-text").prop('readonly', false);
            $(".A4-1-required").attr('data-parsley-required', 'true');

            $(".A4-2-set").prop('disabled', 'disabled');
            $(".A4-2-text").prop('readonly', true).val('');
            $(".A4-2-required").attr('data-parsley-required', 'false').val('');
        } else {
            $(".A4-1-set").prop('disabled', 'disabled');
            $(".A4-1-text").prop('readonly', true).val('');
            $(".A4-1-required").attr('data-parsley-required', 'false').val('');

            $(".A4-2-set").removeAttr('disabled');
            $(".A4-2-text").prop('readonly', false);
            $(".A4-2-required").attr('data-parsley-required', 'true');
        }
    });
    $('input[name="A_02"]').on('change', function() {
        if ($(this).val() == '0') {
            $("#A_02_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_02_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_05"]').on('change', function() {
        if ($(this).val() == '8') {
            $("#A_05_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_05_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_06"]').on('change', function() {
        if ($(this).val() == '11') {
            $("#A_06_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_06_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_07"]').on('change', function() {
        if ($(this).val() == '7') {
            $("#A_07_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_07_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_08"]').on('change', function() {
        if ($(this).val() == '2') {
            $("#A_08_text").attr('data-parsley-required', 'true').prop('readonly', false);
            $('input[name="A_08_N"]').prop('checked', false).prop('disabled', true);
            $("#A_08_N_text").attr('data-parsley-required', 'false').prop('readonly', true);
            $("#A_08_N_1").attr('data-parsley-required', 'false');
        } else {
            $("#A_08_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
            $('input[name="A_08_N"]').prop('disabled', false);
            $("#A_08_N_1").attr('data-parsley-required', 'true');
        }
    });
    $('input[name="A_08_N"]').on('change', function() {
        if ($(this).val() === '10') {
            $("#A_08_N_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_08_N_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_09"]').on('change', function() {
        if ($(this).val() == '2') {
            $("#A_09_text").attr('data-parsley-required', 'true').prop('readonly', false);
            $('input.A_09_2').prop('disabled', false);
            $("#A_09_09").trigger("change");
        } else {
            $("#A_09_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
            $('input.A_09_2').prop('checked', false).prop('disabled', true);
        }
    });
    $("#A_09_09").change(function() {
        if($(this).is(":checked")) {
            $("#A_09_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_09_text").attr('data-parsley-required', 'false').prop('readonly', true);
        }
    });
    $('input[name="A_10"]').on('change', function() {
        if ($(this).val() == '6') {
            $("#A_10_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_10_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_12"]').on('change', function() {
        if ($(this).val() == '9') {
            $("#A_12_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_12_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_13"]').on('change', function() {
        if ($(this).val() === '6') {
            $("#A_13_text").attr('data-parsley-required', 'true').prop('readonly', false);
        } else {
            $("#A_13_text").attr('data-parsley-required', 'false').prop('readonly', true).val('');
        }
    });
    $('input[name="A_14"]').on('change', function() {
        if ($(this).val() === '1') {
            $('input.A_14_2').prop('disabled', false);
        } else {
            $('input.A_14_2').prop('disabled', true);
        }
    });
    $("input[type=radio]:checked",$("#profile-form-data-layer")).trigger("change");
    $("input[type=checkbox]:checked",$("#profile-form-data-layer")).trigger("change");
}
function assignSelctedValues() {
    $("#A4_1_2_text").val("");
    $("#A4_1_3_text").val("");
    $("#A4_2_1_text").val("");
    $("#A4_2_2_text").val("");
    $("#A4_2_3_text").val("");
    if($("#amphure_1").val()!="") $("#A4_1_2_text").val($("#amphure_1 option:selected").text());
    if($("#district_1").val()!="") $("#A4_1_3_text").val($("#district_1 option:selected").text());
    if($("#province_2").val()!="") $("#A4_2_1_text").val($("#province_2 option:selected").text());
    if($("#amphure_2").val()!="") $("#A4_2_2_text").val($("#amphure_2 option:selected").text());
    if($("#district_2").val()!="") $("#A4_2_3_text").val($("#district_2 option:selected").text());
}
function confirmCancelSurvey(src) {
    confirmCancelMessage(function() {
        window.history.back();
    });
}
function confirmSaveSurvey(src) {
    assignSelctedValues();
    var $form = $('#profile-form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmSaveMessage(function() { saveSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmUpdateSurvey(src) {
    assignSelctedValues();
    var $form = $('#profile-form-data-validate');
    if (validBlank() && $form.parsley().validate()) {
        confirmUpdateMessage(function() { updateSurvey(src); });
    } else {
        warningMessage();
    }
}
function confirmNextSurvey(src) {
    let profile_id = $(src).attr("data-key");
    gotoSurveyForm(profile_id);
}
function saveSurvey(src) {
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey/insert",
        data: $('#profile-form-data-validate').serialize(),
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
                let profile_id = data.body.rows.profile_id;
                successMessage(function() { gotoSurveyForm(profile_id); });
            }
        }
    });
}
function updateSurvey(src) {
    let profile_id = $(src).attr("data-key");
    startWaiting();
    $.ajax({
        url: BASE_URL+"/survey/update",
        data: $('#profile-form-data-validate').serialize(),
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
                successMessage(function() { gotoSurveyForm(profile_id); });
            }
        }
    });
}
function setupDistrict(src,amphurCode,districtCode,defaultCaption="เลือกตำบล") {
    let listing = $("#"+src).empty();
    if($.trim(amphurCode)=="") {
        setupDefaultSelectOptions(listing,"",defaultCaption);
        return;
    }
    let data_set = data_category["tdistricts"];
    if(data_set && data_set.resultset.rows) {
        let rows = data_set.resultset.rows.filter(function(e) { return e.amphure_code==amphurCode; });
        setupSelectOptions(rows,listing,"",defaultCaption);
        if(districtCode) listing.val(districtCode);
    }
}
function setupAmphure(src,provinceCode,amphurCode,defaultCaption="เลือกอำเภอ") {
    let listing = $("#"+src).empty();
    if($.trim(provinceCode)=="") {
        setupDefaultSelectOptions(listing,"",defaultCaption);
        return;
    }
    let data_set = data_category["tamphures"];
    if(data_set && data_set.resultset.rows) {
        let rows = data_set.resultset.rows.filter(function(e) { return e.province_code==provinceCode; });
        setupSelectOptions(rows,listing,"",defaultCaption);
        if(amphurCode) listing.val(amphurCode);
        console.log("setupAmphure: src="+src+" provinceCode="+provinceCode+" amphurCode="+amphurCode+" defaultCaption="+defaultCaption);
    }
}
function setupProvince(src,provinceCode,ignoreProvinceCode,defaultCaption="เลือกจังหวัด") {
    let listing = $("#"+src).empty();
    let data_set = data_category["tprovinces"];
    if(data_set && data_set.resultset.rows) {
        let rows = data_set.resultset.rows.filter(function(e) { return e.code!=ignoreProvinceCode; });
        setupSelectOptions(rows,listing,"",defaultCaption);
        if(provinceCode) listing.val(provinceCode);
    }
}
function setupDefaultSelectOptions(listing,defaultValue,defaultCaption) {
    if(defaultValue!=null) $("<option value='"+defaultValue+"'>"+defaultCaption+"</option>").appendTo(listing);
}
function setupSelectOptions(arrays,listing,defaultValue,defaultCaption,keyField="key_code",valueField="name_th") {
    if(!defaultCaption) defaultCaption = "   ";
    setupDefaultSelectOptions(listing,defaultValue,defaultCaption);
    if(arrays) {
        for(let p of arrays) {
            $("<option value='"+p[keyField]+"'>"+p[valueField]+"</option>").appendTo(listing);
        }
    }
}
