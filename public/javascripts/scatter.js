//from weiglemc's block 6185069

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");
d3.json("json/sf-la.json", function(error,data){
  if (error) return console.error(error);
  console.log(data);
});

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

svg.append("g")
   .attr("class", "y axis")
   .call(yAxis)
   .append("text")
   .attr("class", "label")
   .attr("transform", "rotate(-90)")
   .attr("y", -6)
   .attr("dy", ".71em")
   .style("text-anchor", "end")
   .text("Trip Time (in minutes)")

