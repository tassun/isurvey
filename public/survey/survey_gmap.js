var latLng = {lat: 13.847077, lng: 100.606973};
function setupGmap(){
	latLng = {};
	$('#gmapbutton').click(function() {
        if($("#gmap-layer").is(":visible")) {
            $('#gmap-layer').hide();
            return;
        }
		initMap();
		//$('#gmapbutton').hide();
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
    if(latLng.lat && latLng.lat!="" && latLng.lng && latLng.lng!="") {
        $("#A3").val((latLng.lat || '') + "," + (latLng.lng || ''));
    }
	$('#gmap-layer').hide();
	$('#gmapbutton').show();
}
function initMap(){	
    let locate = $("#A3").val().split(",");
	let lat = locate.length>0?locate[0]:'';
	let lng = locate.length>1?locate[1]:'';
	var marker;
	var mapOptions = {
        center: {lat: 13.847077, lng: 100.606973},
        zoom: 15,
    }
	var map = new google.maps.Map(document.getElementById("gmap"),mapOptions);	
	if(lat && lat!="" && lng && lng!="") {
		lat = parseFloat(lat);
		lng = parseFloat(lng);
		console.log(lat, lng);
		map.setCenter(new google.maps.LatLng(lat, lng));
		marker = new google.maps.Marker({
			   position: new google.maps.LatLng(lat, lng),
			   map: map,
			   title: "Marker"
        });		
	}
	map.addListener('click', function(position) {
		console.log(position);
		if(marker){
			marker.setMap(null);
		}
		latLng.lat = position.latLng.lat();
		latLng.lng =  position.latLng.lng();
		marker = new google.maps.Marker({
			   position: position.latLng,
			   map: map,
			   title: 'Marker'
			});
      });
}
