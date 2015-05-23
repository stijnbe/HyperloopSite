//credit to weiglemc's block 6185069

var divWidth = $( "#map-canvas" ).width();
var divHeight = $( "#map-canvas" ).height()

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = divWidth - margin.left - margin.right,
    height = divHeight - margin.top - margin.bottom;

/*
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis = sets up axis
 */

//setup x
var xValue = function(d) { return d.cost; },
    xScale = d3.scale.linear().range([0,width]),
    xMap = function(d) {return xScale(xValue(d));},
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
   
//setup y
var yValue = function(d) { return d.tripTime; },
    yScale = d3.scale.linear().range([height,0]),
    yMap = function(d) {return yScale(yValue(d));},
    yAxis = d3.svg.axis().scale(yScale).orient("left");

//setup fill color
var cValue = function(d) { return d.route; },
    color = d3.scale.category10()

//add the graph canvas to the body of the webpage
var svg = d3.select("#scatterplot")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

//add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)

//load data
d3.json("json/pairs.json", function(error,data){
  if (error) return console.error(error);
  //console.log(data.cityPairs[0].routes);
  data.cityPairs[0].routes.forEach(function(route) {
    //console.log(route);
    route.cost = +route.cost;
    route.tripTime = +route.tripTime
  });

  var xPadding = (d3.max(data.cityPairs[0].routes,xValue) - d3.min(data.cityPairs[0].routes,xValue))/10
  var yPadding = (d3.max(data.cityPairs[0].routes,yValue) - d3.min(data.cityPairs[0].routes,yValue))/10
  xScale.domain([d3.min(data.cityPairs[0].routes,xValue)-xPadding, d3.max(data.cityPairs[0].routes,xValue)+xPadding]);
  yScale.domain([d3.min(data.cityPairs[0].routes,yValue)-yPadding, d3.max(data.cityPairs[0].routes,yValue)+yPadding]);
  
  // x-axis
  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .append("text")
     .attr("class", "label")
     .attr("x", width)
     .attr("y", -6)
     .style("text-anchor", "end")
     .text("Cost (in millions of dollars)")
  
  // y-axis
  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis)
     .append("text")
     .attr("class", "label")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("Trip Time (in minutes)")
 
  // draw dots
  svg.selectAll(".dot")
     .data(data.cityPairs[0].routes)
     .enter()
     .append("circle")
     .attr("class", "dot")
     .attr("r", 7)
     .attr("cx",xMap)
     .attr("cy",yMap)
     .style("fill", function(d) {return color(cValue(d));})
     .on("mouseover", function(d){
       tooltip.transition()
              .duration(200)
              .style("opacity", .9);
       tooltip.html("cost: " + d.cost + ", trip time: " + d.tripTime)
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY -28) + "px");
       })
     .on("mouseout", function(d) {
        tooltip.transition(500)
               .style("opacity", 0);
     });

});


