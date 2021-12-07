var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

// Legend titles
var LegendOptions = ['Africa','Americas','Asia','Europe','Oceania'];

// Data
var d = [
		  [
			{axis:"Industry",value:0.28},
			{axis:"Agriculture",value:0.27},
			{axis:"Service",value:0.45},
		  ],[
			{axis:"Industry",value:0.25},
			{axis:"Agriculture",value:0.10},
			{axis:"Service",value:0.65},
		  ],[
		    {axis:"Industry",value:0.36},
			{axis:"Agriculture",value:0.14},
			{axis:"Service",value:0.50},
		  ],[
		    {axis:"Industry",value:0.29},
			{axis:"Agriculture",value:0.05},
			{axis:"Service",value:0.66},
		  ],[
		    {axis:"Industry",value:0.24},
			{axis:"Agriculture",value:0.15},
			{axis:"Service",value:0.61},
		  ]
		];

// Options for the Radar chart
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

// Call function to draw the Radar chart
// Data is in %'s
RadarChart.draw("#dataviz_chart", d, mycfg);

  //---------------------------//
  //      Initiate legend      //
  //---------------------------//

var svg = d3.select('#dataviz_legend')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

// Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)')
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Continent");

// Initiate Legend
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)')
	;
	// Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	// Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
