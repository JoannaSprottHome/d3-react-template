import React, { Component } from 'react';
import * as d3Line from 'd3-shape';
import { select, scaleLinear, scaleTime, axisBottom, axisLeft, max, min } from 'd3';
import { returnMargin } from "../margins/margins";
import '../App.css';
import { getDataWithKey } from "./getDataWithKey";
import { appendYAxisText, appendXAxisText, appendXAxis, appendYAxis } from "../axis/axis";
import { xAxisTextParam, yAxisTextParam, marginData, xAxisParam, yAxisParam, lineParam } from "./parameters";
import { addLegend } from "../legend/addLegend";
import { getcolors } from "./colorMappings";
const { width, height, left } = returnMargin(marginData);

export default class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph(getDataWithKey());
  };

  createGraph(data) {
    const node = this.node;
    // Construct the scale and axis from only 1 line
    // skip this step and just use data if you have 1 line (i.e. 1D array)
    let dataOneLine = data[0];
    let arrayToMap;
    Object.keys(dataOneLine).forEach(key => {
      arrayToMap = dataOneLine[key];
    });
    const time = arrayToMap.map(data => new Date(data.x));
    // For one line, only need to map 1 level
    const valueMap = data.map(each => {
      let arrayToReturn = [];
      Object.keys(each).forEach(key => {
        arrayToMap = each[key];
        arrayToMap.forEach(data => {
          arrayToReturn.push(data.y);
        });
      });   
      return arrayToReturn;   
    });
  
    const x = scaleTime().domain([min(time), max(time)]).range([0, width]),
          y = scaleLinear().domain([0, max(valueMap.flat()) + 5]).range([height, 0]);
    const xAxis = axisBottom().scale(x).ticks(arrayToMap.length -1), 
          yAxis = axisLeft().scale(y);    

    // const line = d3Line.line()
    //       .x(function(d) { return x(new Date(d.x)) + left; })
    //       .y(function (d) { return y(d.y); });
    const { strokeColors } = lineParam;
    const { colorMapping } = getcolors(data, strokeColors);  
    let svg = select("#svg-bar");
    const g = svg.append("g").attr("transform", "translate(" + width / 1 + "," + height / 1.8 + ")");   
    
    // https://bl.ocks.org/d3noob/8952219

    appendXAxis(node, xAxis, xAxisParam);
    appendYAxis(node, yAxis, yAxisParam);   
    appendXAxisText(node, xAxisTextParam);
    appendYAxisText(node, yAxisTextParam); 

    // the exact dimensions are too explicit and just overwrite the original line graph
    // add different dimensions (find a wayto reuse) and refactor
    addLegend(
      g,
      colorMapping     
    );
  }

  render() {
      return (
      <div className="center">
        <h1 className="margin-top-medium">Bar Chart</h1>
        <div>
          <svg ref={node => this.node = node} width={500} height={300}  id="svg-bar" className="centerGraph"></svg> 
        </div>            
      </div>
    );
  }
}
