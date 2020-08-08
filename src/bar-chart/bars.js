import { select } from 'd3';

// use this to create bars:
// https://bl.ocks.org/d3noob/8952219
const appendBar = (node, data, line, strokeColor) => {
    select(node).append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", strokeColor)
      .attr("d", line);    
}; 

export { appendBar };