// Load our exchange rate data
$.getJSON("", function(result) {
	// Run this code on Success
	console.log(result);
	var exchangeContent = "1 GBP = " + result.destinationAmount + " AUD";
	$('#bottom').html(exchangeContent);
});

// This function is called from initMap
function addATMs() {
	$.getJSON("", function(result) {
		console.log(result);
		if (!result.responseData) {
			alert("No ATMs returned");
			return false;
		}
		var data = result.responseData[0].foundATMLocations;
		console.log(data);
		drawpoints(data);
	});
} // end addATMs

// Draw the ATMs on the map
function drawpoints(data) {

	//Define an icon for our markers to overwrite the default
	var icon = {
		url: "https://assets.decoded.com/images/atm-machine-sign-hi.png",
		scaledSize: new google.maps.Size(30, 30), // scaled size
		origin: new google.maps.Point(0, 0), // origin
		anchor: new google.maps.Point(0, 0), // anchor
	}; // End icon

	//Loop through our list of ATMs and put them on the map
	for (i = 0; i < data.length; i++) {

		// You have to create a point first
		var point = new google.maps.LatLng(data[i].location.coordinates.latitude, data[i].location.coordinates.longitude);

		// And then add a marker to the point
		var marker = new google.maps.Marker({
			position: point,
			map: map,
			icon: icon
		});
	}
}
