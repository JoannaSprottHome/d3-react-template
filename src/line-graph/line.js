import { select } from 'd3';

const appendLine = (node, data, line, strokeColor) => {
    select(node).append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", strokeColor)
      .attr("d", line);    
}; 

export { appendLine };