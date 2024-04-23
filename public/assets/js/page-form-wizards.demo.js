/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.5/admin/
*/

var success = '#17B6A4',
    danger = '#ff5b57',
    primary = '#2184DA',
    warning = '#fcaf41',
    inverse = '#3C454D',
    info = '#38AFD3',
    lime = '#65C56F',
    grey = '#aab3ba',
    purple = '#9b59b6';

var handleBootstrapWizardsValidation = function() {
    "use strict";
    
    $("#wizard").bwizard({ 
        validating: function (e, ui) { 
            if ((ui.index == 0 && ui.nextIndex >= 0) || ui.nextIndex > 0) {
                // step-1 validation
                if (false === $('form[name="form-wizard"]').parsley().validate('wizard-step-1')) {
                    return false;
                }
            }
            if ((ui.index == 1 && ui.nextIndex >= 1) || ui.nextIndex > 1) {
                // step-2 validation
                if (false === $('form[name="form-wizard"]').parsley().validate('wizard-step-2')) {
                    return false;
                }
            }
            if ((ui.index == 2 && ui.nextIndex >= 2) || ui.nextIndex > 2) {
                // step-3 validation
                if (false === $('form[name="form-wizard"]').parsley().validate('wizard-step-3')) {
                    return false;
                }
            }
            if ((ui.index == 3 && ui.nextIndex >= 3) || ui.nextIndex > 3) {
                // step-4 validation
                if (false === $('form[name="form-wizard"]').parsley().validate('wizard-step-4')) {
                    return false;
                }
            }
        } 
    });
};

var handleGoogleMap = function() {
    "use strict";
    var mapDefault;
    var mapLightDream;
    var mapBlue;
    var mapEsque;
    var mapGrey;
    var mapCobalt;

    var mapLightDreamStyles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
    var mapEsqueStyles = [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}];
    var mapCobaltStyles = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}];
    var mapGreyStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
    var mapBlueStyles = [{"featureType":"all","stylers":[{"hue":"#0000b0"},{"invert_lightness":"true"},{"saturation":-30}]}];
    
    function initialize() {
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(40.742092, -73.971242),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        mapDefault = new google.maps.Map(document.getElementById('google-map-default'), mapOptions);
        
        mapLightDream = new google.maps.Map(document.getElementById('google-map-light-dream'), mapOptions);
        mapLightDream.setOptions({styles: mapLightDreamStyles});
        
        mapEsque = new google.maps.Map(document.getElementById('google-map-esque'), mapOptions);
        mapEsque.setOptions({styles: mapEsqueStyles});
        
        mapGrey = new google.maps.Map(document.getElementById('google-map-grey'), mapOptions);
        mapGrey.setOptions({styles: mapGreyStyles});
        
        mapCobalt = new google.maps.Map(document.getElementById('google-map-cobalt'), mapOptions);
        mapCobalt.setOptions({styles: mapCobaltStyles});
        
        mapBlue = new google.maps.Map(document.getElementById('google-map-blue'), mapOptions);
        mapBlue.setOptions({styles: mapBlueStyles});
        
    }
    
    google.maps.event.addDomListener(window, 'load', initialize);
};

var checkSwitcherState = function() {
    $(document).on('click', '[data-click="check-switchery-state"]', function() {
        alert($('[data-id="switchery-state"]').prop('checked'));
    });
    $(document).on('change', '[data-change="check-switchery-state-text"]', function() {
        $('[data-id="switchery-state-text"]').text($(this).prop('checked'));
    });
};

var handleFormMaskedInput = function() {
    "use strict";
    
    $("#masked-input-idkey").mask("9-9999-99999-99-9");
    $("#masked-input-laser").mask("aa9-9999999-99");
    $("#masked-input-tid").mask("99-9999999");
    $("#masked-input-ssn").mask("999-99-9999");
    $("#masked-input-pno").mask("aaa-9999-a");
    $("#masked-input-pkey").mask("a*-999-a999");
};

var autoPrivicepicker = function() {
    "use strict";
    
    $('body').AutoProvince({
		PROVINCE:		'#province1', // select div สำหรับรายชื่อจังหวัด
		AMPHUR:			'#amphur1', // select div สำหรับรายชื่ออำเภอ
		DISTRICT:		'#district1', // select div สำหรับรายชื่อตำบล
		POSTCODE:		'#postcode1', // input field สำหรับรายชื่อรหัสไปรษณีย์
		GEOGRAPHY:		'#geography1', // input field แสดงภาค
		CURRENT_PROVINCE:1, //  แสดงค่าเริ่มต้น ใส่ไอดีจังหวัดที่เคยเลือกไว้
		CURRENT_AMPHUR:1, // แสดงค่าเริ่มต้น  ใส่ไอดีอำเภอที่เคยเลือกไว้
		CURRENT_DISTRICT:1, // แสดงค่าเริ่มต้น  ใส่ไอดีตำบลที่เคยเลือกไว้
		arrangeByName:	true // กำหนดให้เรียงตามตัวอักษร
	});

    $('body').AutoProvince({
            PROVINCE:       '#province2',
            AMPHUR:         '#amphur2',
            DISTRICT:       '#district2', 
            POSTCODE:       '#postcode2', 
            GEOGRAPHY:      '#geography2', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });
    
    $('body').AutoProvince({
            PROVINCE:       '#province3',
            AMPHUR:         '#amphur3',
            DISTRICT:       '#district3', 
            POSTCODE:       '#postcode3', 
            GEOGRAPHY:      '#geography3', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });
    
    $('body').AutoProvince({
            PROVINCE:       '#province4',
            AMPHUR:         '#amphur4',
            DISTRICT:       '#district4', 
            POSTCODE:       '#postcode4', 
            GEOGRAPHY:      '#geography4', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });
    
    $('body').AutoProvince({
            PROVINCE:       '#province5',
            AMPHUR:         '#amphur5',
            DISTRICT:       '#district5', 
            POSTCODE:       '#postcode5', 
            GEOGRAPHY:      '#geography5', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });
    
    $('body').AutoProvince({
            PROVINCE:       '#province6',
            AMPHUR:         '#amphur6',
            DISTRICT:       '#district6', 
            POSTCODE:       '#postcode6', 
            GEOGRAPHY:      '#geography6', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });

    $('body').AutoProvince({
            PROVINCE:       '#province7',
            AMPHUR:         '#amphur7',
            DISTRICT:       '#district7', 
            POSTCODE:       '#postcode7', 
            GEOGRAPHY:      '#geography7', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });

    $('body').AutoProvince({
            PROVINCE:       '#province8',
            AMPHUR:         '#amphur8',
            DISTRICT:       '#district8', 
            POSTCODE:       '#postcode8', 
            GEOGRAPHY:      '#geography8', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });

    $('body').AutoProvince({
            PROVINCE:       '#province9',
            AMPHUR:         '#amphur9',
            DISTRICT:       '#district9', 
            POSTCODE:       '#postcode9', 
            GEOGRAPHY:      '#geography9', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });

    $('body').AutoProvince({
            PROVINCE:       '#province10',
            AMPHUR:         '#amphur10',
            DISTRICT:       '#district10', 
            POSTCODE:       '#postcode10', 
            GEOGRAPHY:      '#geography10', 
            CURRENT_PROVINCE:1, 
            CURRENT_AMPHUR:1,
            CURRENT_DISTRICT:1, 
            arrangeByName:  true 
        });
};


var handleDateTimePicker = function() {
    "use strict";

    $('#datetimepicker1').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker2').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker3').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker4').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker5').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker6').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker7').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker8').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker9').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    $('#datetimepicker10').datetimepicker({
        locale: moment.locale('th'),
        format: 'DD/MM/YYYY hh:mm'
    });
    
};

var renderSwitcher = function() {
    if ($('[data-render=switchery]').length !== 0) {
        $('[data-render=switchery]').each(function() {
            var themeColor = success;
            if ($(this).attr('data-theme')) {
                switch ($(this).attr('data-theme')) {
                    case 'danger':
                        themeColor = danger;
                        break;
                    case 'primary':
                        themeColor = primary;
                        break;
                    case 'purple':
                        themeColor = purple;
                        break;
                    case 'warning':
                        themeColor = warning;
                        break;
                    case 'info':
                        themeColor = info;
                        break;
                    case 'lime':
                        themeColor = lime;
                        break;
                    case 'grey':
                        themeColor = grey;
                        break;
                    case 'inverse':
                        themeColor = inverse;
                        break;
                }
            }
            var option = {};
                option.color = themeColor;
                option.secondaryColor = ($(this).attr('data-secondary-color')) ? $(this).attr('data-secondary-color') : '#dfdfdf';
                option.className = ($(this).attr('data-classname')) ? $(this).attr('data-classname') : 'switchery';
                option.disabled = ($(this).attr('data-disabled')) ? true : false;
                option.disabledOpacity = ($(this).attr('data-disabled-opacity')) ? $(this).attr('data-disabled-opacity') : 0.5;
                option.speed = ($(this).attr('data-speed')) ? $(this).attr('data-speed') : '0.5s';
            var switchery = new Switchery(this, option);
        });
    }
};

var handleDataTableResponsive = function() {
    "use strict";

    if ($('#data-table').length !== 0) {
        $('#data-table').DataTable({
            responsive: true
        });
    }
};



/* Application Controller
------------------------------------------------ */
var PageDemo = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
            handleBootstrapWizardsValidation();
            autoPrivicepicker();
            handleDateTimePicker();
            renderSwitcher();
            checkSwitcherState();
            handleGoogleMap();
            handleFormMaskedInput();
            handleDataTableResponsive();
		}
    };
}();