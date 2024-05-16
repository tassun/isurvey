var latLng = {lat: 13.847077, lng: 100.606973};
function setupGmap(){
	latLng = {};
	$('#gmapbutton').click(function() {
        if($("#gmap-layer").is(":visible")) {
            $('#gmap-layer').hide();
            return;
        }
		initMap();
		$('#gmap-layer').show();
	});
	$('#choosemapbutton').click(function(){
		choosePosition();
	});
	$('#cancelmapbutton').click(function(){
		$('#gmap-layer').hide();
		$('#gmapbutton').show();
	});	
}
function choosePosition() {
    if(latLng.lat && latLng.lng) {
		$("#A3").val((latLng.lat || '') + "," + (latLng.lng || ''));
    }
	$('#gmap-layer').hide();
	$('#gmapbutton').show();
}
var googlemap = null;
var googlemarker = null;
function createMap() {
	let len = $("#gmap").children().length;
	if(!googlemap || len==0) {
		googlemarker = null;
		var mapOptions = {
			center: {lat: 13.847077, lng: 100.606973},
			zoom: 15,
		}
		googlemap = new google.maps.Map(document.getElementById("gmap"),mapOptions);	
		googlemap.addListener('click', function(position) {
			console.log(position);
			if(googlemarker) {
				googlemarker.setMap(null);
			}
			latLng.lat = position.latLng.lat();
			latLng.lng =  position.latLng.lng();
			googlemarker = new google.maps.Marker({
				position: position.latLng,
				map: googlemap,
				title: 'Marker'
			});
		});
	}
	return googlemap;
}
function initMap(){	
	createMap();
	let locate = $("#A3").val().split(",");
	let lat = locate.length>0?locate[0]:'';
	let lng = locate.length>1?locate[1]:'';	
	if(lat && $.trim(lat)!="" && lng && $.trim(lng)!="") {
		lat = parseFloat(lat);
		lng = parseFloat(lng);
		console.log(lat, lng);
		googlemap.setCenter(new google.maps.LatLng(lat, lng));
		if(googlemarker) {
			googlemarker.setMap(null);
		}
		googlemarker = new google.maps.Marker({
			   position: new google.maps.LatLng(lat, lng),
			   map: googlemap,
			   title: "Marker"
        });		
	}
}
