var width = 500;
var height = 500;
var padding = 25;

var yScale = d3.scaleLinear()
                .domain(d3.extent(regionData,d => d.medianAge))
                .range([height - padding,padding]);
var xScale = d3.scaleLinear()
                .domain(d3.extent(regionData, d => d.subscribersPer100))
                .range([padding, width - padding]);

var xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2* padding);
                
var yAxis = d3.axisLeft(yScale)
                .tickSize(-width + 2* padding);

var colorScale = d3.scaleLinear()
                .domain(d3.extent(regionData, d => d.adultLiteracyRate))
                .range(['lightgreen','darkblue']);
                
var circleScale = d3.scaleLinear()
                .domain(d3.extent(regionData, d => d.urbanPopulationRate))
                .range([5,20]);
                
d3.select('svg')
    .append('g')
    .attr('transform','translate(' + (padding)+ ',0)')
    .call(yAxis);
    
d3.select('svg')
    .append('g')
    .attr('transform','translate(0,' + (height - padding)+ ')')
    .call(xAxis);
    
d3.select('svg')
    .attr('width',width)
    .attr('height', height)
 .selectAll('circle')
    .data(regionData)
    .enter()
  .append('circle')
    .attr('cx', d => xScale(d.subscribersPer100))
    .attr('cy', d => yScale(d.medianAge))
    .attr('fill', d => colorScale(d.adultLiteracyRate))
    .attr('r', d => circleScale(d.urbanPopulationRate));

d3.select('svg')
    .append('text')
    .attr('x',width/2)
    .attr('y',height - padding)
    .attr('dy', '1.5em')
    .style('text-anchor','middle')
    .text('subscribersPer100');
    
d3.select('svg')
   .append('text')
   .attr('transform','rotate(-90)')
   .attr('x', - height / 2)
   .attr('y', padding)
   .attr('dy', '-1.1em')
   .style('text-anchor', 'middle')
   .text('medianAge');
   
d3.select('svg')
   .append('text')
   .attr('x', width / 2)
   .attr('y', padding)
   .style('text-anchor', 'middle')
   .style('text-size', '1.5em')
   .text('Subscribers by country in 2011/2012');