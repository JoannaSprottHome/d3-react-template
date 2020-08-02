import React, { Component } from 'react';
import * as d3Line from 'd3-shape';
import { select, scaleLinear, scaleTime, axisBottom, axisLeft, max, min } from 'd3';
import { returnMargin } from "../margins/margins";
import '../App.css';
import { getData } from "./getData";
import { appendYAxisText, appendXAxisText, appendXAxis, appendYAxis } from "./axis";
import { xAxisTextParam, yAxisTextParam, marginData, xAxisParam, yAxisParam, lineParam } from "./parameters";
import { appendLine } from "./line";
import { addLegend } from "../legend/addLegend";
import { getcolors } from "./colorMappings";
const { width, height, left } = returnMargin(marginData);

export default class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph(getData());
  };

  createGraph(data) {
    const node = this.node;
    // Construct the scale and axis from only 1 line
    // skip this step and just use data if you have 1 line (i.e. 1D array)
    const dataOneLine = data[0];
    const time = dataOneLine.map(data => new Date(data.x));
    // For one line, only need to map 1 level
    const valueMap = data.map(each => {
      return each.map(data => data.y); 
    });
  
    const x = scaleTime().domain([min(time), max(time)]).range([0, width]),
          y = scaleLinear().domain([0, max(valueMap.flat()) + 5]).range([height, 0]);
    const xAxis = axisBottom().scale(x).ticks(dataOneLine.length -1), 
          yAxis = axisLeft().scale(y);      
    const line = d3Line.line()
          .x(function(d) { return x(new Date(d.x)) + left; })
          .y(function (d) { return y(d.y); });
    const { strokeColors } = lineParam;
    const { colorMapping } = getcolors(data, strokeColors);  
    let svg = select("#svg-line");
    const g = svg.append("g").attr("transform", "translate(" + width / 1 + "," + height / 1.8 + ")");    
      
    if (data && data.length > 0) {
      data.forEach((element, index) => {
        appendLine(node, element, line, strokeColors[index]); 
      });
    }
    
    appendXAxis(node, xAxis, xAxisParam);
    appendYAxis(node, yAxis, yAxisParam);   
    appendXAxisText(node, xAxisTextParam);
    appendYAxisText(node, yAxisTextParam); 

    addLegend(
      g,
      colorMapping     
    );
  }

  render() {
      return (
      <div className="center">
        <h1 className="margin-top-medium">Line Graph</h1>
        <div>
          <svg ref={node => this.node = node} width={500} height={220}  id="svg-line" className="centerGraph"></svg> 
        </div>            
      </div>
    );
  }
}
