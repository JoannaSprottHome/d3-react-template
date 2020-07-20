const appendText = (legend, textObj) => {
    const { x_coord, y_coord, text_anchor, font_size } = textObj;
    legend.append("text")
          .attr("x", x_coord)
          .attr("y", y_coord)
          .style("text-anchor", text_anchor)
          .style("font-size", font_size)
          .text(function(d) {return d.result;}); // result prop from colorMapping obj
};

const appendColoredSquares = (legend, rectObj) => {
    const { x, width, height } = rectObj;
    legend.append("rect")
          .attr("x", x)
          .attr("width", width)
          .attr("height", height)
          .style("fill", function(d) { return d.color;}); // color prop from colorMapping obj
};

const addBase = (g, colorMapping, legendObj) => {
    const { distance_between } = legendObj;
    const legend = g.selectAll(".legend")
          .data(colorMapping)
          .enter()
          .append("g")
          .attr("class", "legend")
          .attr("transform", function(d,i) {
            return "translate(0," + (1 - i * distance_between) + ")";
          });
    return legend;      
};

/**
 * Add legend to chart
 * @param {element} g 
 * @param {colorMap} colorMapping 
 * @param {Data to specify text} textObj 
 * @param {Data to specify colored rectangles} rectObj 
 * @param {Data to specify legend} legendObj 
 */
const addLegend = (g, colorMapping, legendObj, rectObj, textObj) => {  
    const legend = addBase(g, colorMapping, legendObj);
    appendColoredSquares(legend, rectObj);
    appendText(legend, textObj);     
    
};    

export { addLegend };