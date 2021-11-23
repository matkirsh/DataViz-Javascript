// The svg
var svg = d3.select("svg"),
  width = svg.attr("width"),
  height = svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoRobinson()
  .scale(130)
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([1, 20, 50, 100, 200, 300, 500, 800, 1000])
  .range(d3.schemeBlues[9]);

// Add tooltip
var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/matkirsh/DataViz-Javascript/main/CSV/WordCountriesVF.csv", function(d) { data.set(d.Alpha3code, +d.Phones); })
  .await(ready);

function ready(error, topo) {

  let mouseOver = function(d) {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", .5)
			.style("stroke", "transparent");
		d3.select(this)
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "black");
		tooltip.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px")
			.transition().duration(400)
			.style("opacity", 1)
			.text(d.properties.name + " : " + d.total + " phones (per 1000 hab.).");
	}

  let mouseLeave = function() {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "transparent");
		tooltip.transition().duration(300)
			.style("opacity", 0);
	}

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // Draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // Set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave);


// Legend
var x = d3.scaleLinear()
.domain([2.6, 75.1])
.rangeRound([600, 860]);

var legend = svg.append("g")
.attr("id", "legend");

var legend_entry = legend.selectAll("g.legend")
.data(colorScale.range().map(function(d) {
  d = colorScale.invertExtent(d);
  if (d[0] == null) d[0] = x.domain()[0];
  if (d[1] == null) d[1] = x.domain()[1];
  return d;
}))
.enter().append("g")
.attr("class", "legend_entry");

var ls_w = 20,
ls_h = 20;

legend_entry.append("rect")
.attr("x", 20)
.attr("y", function(d, i) {
  return height - (i * ls_h) - 2 * ls_h;
})
.attr("width", ls_w)
.attr("height", ls_h)
.style("fill", function(d) {
  return colorScale(d[0]);
})
.style("opacity", 0.8);

legend_entry.append("text")
.attr("x", 50)
.attr("y", function(d, i) {
  return height - (i * ls_h) - ls_h - 6;
})
.text(function(d, i) {
  if (i === 0) return "< " + d[1] + " Phones";
  if (d[1] < d[0]) return d[0] + " Phones +";
  return d[0] + " - " + d[1] + " Phones";
});

legend.append("text").attr("x", 15).attr("y", 240).text("Phones (per 1000 hab.)");

}

