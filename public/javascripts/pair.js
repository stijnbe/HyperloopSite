var map;
//var index = "1";
var sfLatLng = [37.7833, -122.4167];
var laLatLng = [34.05, -118.23];

/*$.getJSON("json/cityPairs.json", function (data) {
  console.log(data);
});*/

function initialize() {
  var mapDiv = document.getElementById("map-canvas");
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };  
  var map = new google.maps.Map(mapDiv,mapOptions);

  var swLat = Math.min(sfLatLng[0],laLatLng[0]);
  var swLng = Math.min(sfLatLng[1],laLatLng[1]);
  var southwest = new google.maps.LatLng(swLat,swLng);

  var neLat = Math.max(sfLatLng[0],laLatLng[0]);
  var neLng = Math.max(sfLatLng[1],laLatLng[1]);
  var northeast = new google.maps.LatLng(neLat,neLng);

  var bounds = new google.maps.LatLngBounds(southwest,northeast);
  map.fitBounds(bounds);

  var examplePath1 = [
    new google.maps.LatLng(sfLatLng[0], sfLatLng[1]),
    new google.maps.LatLng(laLatLng[0], laLatLng[1])
  ];

  var exampleRoute1= new google.maps.Polyline({
    path: examplePath1,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  var exampleBase1= new google.maps.Polyline({
    path: examplePath1,
    geodesic: true,
    strokeColor: "#CC0000",
    strokeOpacity: 0.2,
    strokeWeight: 15
  });

  exampleRoute1.setMap(map);
  exampleBase1.setMap(map);

  google.maps.event.addListener(exampleBase1, 'click', function () {
    if(exampleBase1.strokeOpacity == 0.2){
      exampleBase1.setOptions({strokeOpacity: 0.6});
    } else if(exampleBase1.strokeOpacity == 0.6){
      exampleBase1.setOptions({strokeOpacity: 0.2});
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
