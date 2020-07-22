import { select } from 'd3';

const appendXAxis = (node, xAxis, xOptions) => {  
    const { transform } = xOptions;
    select(node).append("g")
        .attr("class", "x axis")
        .attr("transform", transform)
        .call(xAxis);
};

const appendYAxis = (node, yAxis, yOptions) => {  
    const { transform } = yOptions;
    select(node).append("g")
        .attr("class", "y axis")
        .attr("transform", transform) 
        .call(yAxis);
};

const appendYAxisText = (node, yOptions) => {  
    const { transform, x, y, text_anchor, text } = yOptions;
    select(node).append("text")
        .attr("transform", transform)
        .attr("y", y)
        .attr("x", x)
        .style("text-anchor", text_anchor)
        .text(text);  
};   

const appendXAxisText = (node, xOptions) => {
    const { transform, text_anchor, text } = xOptions;
    select(node).append("text")
        .attr("transform", transform)
        .style("text-anchor", text_anchor)
        .text(text);     
}; 

export { appendYAxisText, appendXAxisText, appendXAxis, appendYAxis };