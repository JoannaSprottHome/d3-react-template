import { select } from 'd3';

const addYAxisText = (node, yOptions) => {  
    const { transform, x, y, text_anchor, text } = yOptions;
    select(node).append("text")
        .attr("transform", transform)
        .attr("y", y)
        .attr("x", x)
        .style("text-anchor", text_anchor)
        .text(text);  
};   

const addXAxisText = (node, xOptions) => {
    const { transform, text_anchor, text } = xOptions;
    select(node).append("text")
        .attr("transform", transform)
        .style("text-anchor", text_anchor)
        .text(text);     
}; 

export { addYAxisText, addXAxisText };