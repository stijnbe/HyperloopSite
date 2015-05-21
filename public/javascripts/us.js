var width = 960, height = 600;
var path = d3.geo.path().projection(null);
var svg = d3.select("#map")
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

  projection = d3.geo.albersUsa().scale(1280).translate([width/2,height/2]); 

  function lonlat_to_xy(lonlat,projection){
    return projection(lonlat);
  }

  function lonlats_to_xys(lonlats,projection){
    return lonlats.map( function(lonlat) { return lonlat_to_xy(lonlat,projection)})
  }

  d3.json("json/cityPairs.json", function(error, data) {
    if (error) return console.error(error);
    data.cityPairs.forEach(function(pair){
      pair.startLatLng.Lng = +pair.startLatLng.Lng;
      pair.startLatLng.Lat = +pair.startLatLng.Lat;
      startXY = projection([pair.startLatLng.Lng,pair.startLatLng.Lat]);   
      endXY = projection([pair.endLatLng.Lng,pair.endLatLng.Lat]);
      pair.startXY.x = startXY[0];
      pair.startXY.y = startXY[1];    
      pair.endXY.x = endXY[0];
      pair.endXY.y = endXY[1];

      svg.append("line")
         .attr("x1",pair.startXY.x)
         .attr("y1",pair.startXY.y)
         .attr("x2",pair.endXY.x)
         .attr("y2",pair.endXY.y)
         .attr("stroke-width", 4)
         .attr("stroke", "green")
         .on("mouseover", mouseOver)
         .on("mouseout", mouseOut)
         .on("click", function(d,i){          
             window.location.href += "citypair";
          });

      svg.append("circle")
         .attr("cx",pair.startXY.x)
         .attr("cy",pair.startXY.y)
         .attr("r", "8px")
         .attr("fill", "blue")   
      
      svg.append("circle")
         .attr("cx",pair.endXY.x)
         .attr("cy",pair.endXY.y)
         .attr("r", "8px")
         .attr("fill", "blue")
    
    });
  });
  /* 
  var xyCoords=lonlats_to_xys([[-118.23, 34.05],[-122.4167, 37.7833]],projection);
  //console.log(projection([-118.23,34.05]));
  var numCities = xyCoords.length;   

  svg.append("line")
     .attr("x1",xyCoords[0][0])
     .attr("y1",xyCoords[0][1])
     .attr("x2",xyCoords[1][0])
     .attr("y2",xyCoords[1][1])
     .attr("stroke-width", 4)
     .attr("stroke", "green")
     .on("mouseover", mouseOver)
     .on("mouseout", mouseOut)
     .on("click", function(d,i){          
            window.location.href += "citypair";
        });

  for(i = 0; i < numCities; i++){
    svg.append("circle")
       .attr("cx",xyCoords[i][0])
       .attr("cy",xyCoords[i][1])
       .attr("r", "8px")
       .attr("fill", "blue")
  }
  */

  function mouseOver(d) {
    d3.select(this)
      .transition()
      .duration(300)
      .style('stroke-width', 8);
  }
  
  function mouseOut(d) {
    d3.select(this)
      .transition()
      .duration(300)
      .style('stroke-width', 4)
  }
   
});
