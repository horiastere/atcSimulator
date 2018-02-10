var inputAngle = 45;
var airportName = 'otopeni';

var map;

var planeDefLat = 44.601099;
var planeDefLng = 26.049914;
var airplaneMarker;
var flightPlanCoordinates = [];

var game = {
	addPlane: function () {
		var planeDefLat = 44.601099;
		var planeDefLng = 26.049914;
		var myLatLng = new google.maps.LatLng( planeModel.lat, planeModel.lng );

		var airplaneMarker2 = new google.maps.Marker( {position: myLatLng, map: map, companyName: 'Luthansa'} );
	},
	movePlanes: function () {
		var angle = inputAngle;
		var x = 0.001000 * Math.cos(angle * (Math.PI / 180));
		var y = 0.001000 * Math.sin(angle * (Math.PI / 180));

		planeDefLat = planeDefLat + x;
		planeDefLng = planeDefLng + y;
		airplaneMarker.setPosition( new google.maps.LatLng( planeDefLat, planeDefLng ) );

		// planeDefLat = planeDefLat - 0.001000;
		// airplaneMarker.setPosition( new google.maps.LatLng( planeDefLat, 26.049914 ) );
		flightPlanCoordinates.push({lat: planeDefLat, lng: planeDefLng});
	}
};

var plane = {
	companyName: 'Lufthansa', 
	lat: 44.601099,
	lng: 26.049914
};

setTimeout(function () {
	game.addPlane(1);
	
}, 4000);

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: coordinates[airportName].airport
	});

	// set marker on airport
	var marker = new google.maps.Marker({
		position: coordinates[airportName].airport,
		map: map
	});

	
	var myLatLng = new google.maps.LatLng( planeDefLat, planeDefLng );

	airplaneMarker = new google.maps.Marker( {position: myLatLng, map: map, companyName: 'Luthansa'} );

	airplaneMarker.addListener('click', function(marker, i) {
		console.log(airplaneMarker.getPosition().lat());
		console.log(airplaneMarker.getPosition().lng());
		console.log(this.companyName);

		var flightPath = new google.maps.Polyline({
			path: flightPlanCoordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		flightPath.setMap(map);
	});

	setInterval( function(){ 
	  game.movePlanes();
		
	}, 1500 );

	// Construct the polygon.
	var ILS = new google.maps.Polygon({
		paths: coordinates.ILSCoords,
		strokeColor: '#B3DAFB',
		strokeOpacity: 0.9,
		strokeWeight: 2,
		fillColor: '#B3DAFB',
		fillOpacity: 0.8
	});
	ILS.setMap(map);
}