var width = 960, height = 600;
var path = d3.geo.path().projection(null);
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

d3.json("json/us.json", function(error, us) {

  if (error) return console.error(error);

  svg.append("path")
     .datum(topojson.feature(us, us.objects.nation))
     .attr("class", "land")
     .attr("d", path);

  svg.append("path")
     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
     .attr("class", "border border--state")
     .attr("d", path);

  var projection = d3.geo.albersUsa().scale(1280).translate([width/2,height/2]);

  function lonlat_to_xy(lonlat,projection){
    return projection(lonlat);
  }

  function lonlats_to_xys(lonlats,projection){
    return lonlats.map( function(lonlat) { return lonlat_to_xy(lonlat,projection)})
  }

  var xyCoords=lonlats_to_xys([[-118.23, 34.05],[-122.4167, 37.7833]],projection);
  //var cities = {"SF":{"lat": "37.7833","lon": "-122.4167},"LA":{"lat": "34.05","lon": "-118.23"}}
  // var pairs = {}     
  var numCities = xyCoords.length;   

  for(i = 0; i < numCities; i++){
    svg.append("circle")
       .attr("cx",xyCoords[i][0])
       .attr("cy",xyCoords[i][1])
       .attr("r", "8px")
       .attr("fill", "red")
  }

  svg.append("line")
     .attr("x1",xyCoords[0][0])
     .attr("y1",xyCoords[0][1])
     .attr("x2",xyCoords[1][0])
     .attr("y2",xyCoords[1][1])
     .attr("stroke-width", 2)
     .attr("stroke", "black")
     .on("click", function(d,i){          
            window.location.href += "citypair";
        });

});
