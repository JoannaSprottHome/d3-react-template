
import { returnMargin } from "../generic/margins";

const marginData = {  
    top: 2.5, 
    right: 5, 
    bottom: 15, 
    left: 100, 
    width: 350,
    height: 175
};
const { width, height, top, left } = returnMargin(marginData);

const xAxisParam = {
    transform: "translate(" + (left) + "," + (height + 13) + ")  "
};

const yAxisParam = {
    transform: "translate(" + left + "," + (top + 10) + ")"
};

const yAxisTextParam = {
    transform: "rotate(-90)",
    x: 0 - (height /2),
    y: 0 + 50,
    text_anchor: "middle",
    text: "Value"    
};

const xAxisTextParam = {
    transform: "translate(" + (width/2 + 90) + "," + (height + top + 57.5) + ")", 
    text_anchor: "middle", 
    text: "Date"
};

export { xAxisTextParam, yAxisTextParam, marginData, xAxisParam, yAxisParam };