import React, { Component } from 'react';
import * as d3Line from 'd3-shape';
import { scaleLinear, scaleTime, axisBottom, axisLeft, max, min } from 'd3';
import { returnMargin } from "../generic/margins";
import '../App.css';
import { getData } from "./getData";
import { appendYAxisText, appendXAxisText, appendXAxis, appendYAxis } from "./axis";
import { xAxisTextParam, yAxisTextParam, marginData, xAxisParam, yAxisParam, lineParam } from "./parameters";
import { appendLine } from "./line";
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
    const values = dataOneLine.map(data => new Date(data.y));
    const x = scaleTime().domain([min(time), max(time)]).range([0, width]),
          y = scaleLinear().domain([0, max(values)]).range([height, 0]);
    const xAxis = axisBottom().scale(x).ticks(dataOneLine.length -1), 
          yAxis = axisLeft().scale(y);      
    const line = d3Line.line()
          .x(function(d) { return x(new Date(d.x)) + left; })
          .y(function (d) { return y(d.y); });
      
    if (data && data.length > 0) {
      data.forEach((element, index) => {
        appendLine(node, element, line, lineParam.strokeColors[index]); 
      });
    }
    
    appendXAxis(node, xAxis, xAxisParam);
    appendYAxis(node, yAxis, yAxisParam);   
    appendXAxisText(node, xAxisTextParam);
    appendYAxisText(node, yAxisTextParam); 
  }

  render() {
      return (
      <div className="center">
        <h1 className="margin-top-medium">Line Graph</h1>
        <div>
          <svg ref={node => this.node = node} width={420} height={220}  id="svg-line" className="centerGraph"></svg> 
        </div>            
      </div>
    );
  }
}
