import React, { Component } from 'react';
import * as shape from 'd3-shape';
import { select } from 'd3';
import { returnMargin } from "../generic/margins";
import { getcolors } from "./pieChartColorMappings";
import { addLegend } from "./addLegend";

const colorArray = [ "#82BEC0", "#0B575B", "#d9534f" ];
const { width, height } = returnMargin(5, 10, 30, 100, 980, 350);

const legendTextObj = {
  x_coord: 200,
  y_coord: 14,
  text_anchor: "end",
  font_size: "14px"
};

const legendRectObj = {
  x: 210,
  width: 18,
  height: 18
};

const legendObj = {
  distance_between: 20
};

export default class PieChart extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph([ 8, 5, 13 ]);
  };

  createGraph(data) {
    const node = this.node;
    select(node).append("g");    

    let svg = select("#svg-pie"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 1.33 + "," + height / 1.8 + ")"); 
        const { colorMapping, colors } = getcolors(data, colorArray);

    let pie = shape.pie();
    
    let arc = shape.arc()
        .innerRadius(0)
        .outerRadius(radius);

    let arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("fill", function(d, i) {return colors(i);})
        .attr("d", arc);  
        
    addLegend(
      g,
      colorMapping,
      legendObj,
      legendRectObj,
      legendTextObj     
    );   
  }

  render() {
      return (
      <div className="center">
        <h1 className="margin-top-medium">Pie Chart</h1>
        <div className="my-border">
          <svg ref={node => this.node = node} width={1300} height={520}  id="svg-pie" ></svg> 
        </div>            
      </div>
    );
  }
}