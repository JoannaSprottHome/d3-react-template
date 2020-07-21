import React, { Component } from 'react';
import * as d3Line from 'd3-shape';
import { select, scaleLinear, scaleTime, axisBottom, axisLeft, max, min } from 'd3';
import { returnMargin } from "../generic/margins";
import '../App.css';
import { getData } from "./getData";
const { width, height, left, top } = returnMargin(2.5, 5, 15, 100, 350, 175);
const graphData = getData();
;
const calculatePassRate = (passed, failed) => {
  return passed / (passed + failed) * 100;
};

const formatData = (data) => {
  let formatedData = [];
  data.forEach(item => {
    const passRate = calculatePassRate(item.y.passed, item.y.failed);
    formatedData.push({x: item.x, y: passRate});
  });
  return formatedData;
};

export default class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph(graphData);
  };

  createGraph(data) {
    const node = this.node;
    const allData = data;
    const formattedData = formatData(data);
    

    const timeSlots = [];
    allData.forEach(data => {
      console.log(new Date(data.x));
      timeSlots.push(new Date(data.x));      
    });

    const maxArr = max(timeSlots).toString().replace(/:00 GMT.*/, "").split(/ 20.. /);
    const minArr = min(timeSlots).toString().replace(/:00 GMT.*/, "").split(/ 20.. /);

    const x = scaleTime().domain([min(timeSlots), max(timeSlots)]).range([0, width]),
    y = scaleLinear().domain([0, 100]).range([height, 0]);

    const xAxis = axisBottom().scale(x).ticks(graphData.length -1), 
        yAxis = axisLeft().scale(y);

    const make_x_gridlines = () => {
      return axisBottom(x).ticks(0); // PUT TICKS BACK HERE IF WANTED
    };    

    // Gridlines
    select(node).append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + left + "," + (height + 13) + ")")
      // .call(make_x_gridlines()
      //     .tickSize(-height)
      //     .tickFormat(""));

    // Append x-axis
    select(node).append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + (left) + "," + (height + 13) + ")  ")
      .call(xAxis);
      
    // Append y-axis  
    select(node).append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + left + "," + (top + 10) + ")") 
      .call(yAxis);
      
    // Line 
    const line = d3Line.line()
      .x(function(d) { return x(new Date(d.x)) + left; })
      .y(function (d) { return y(d.y); });

    select(node).append("path")
      .datum(formattedData)
      .attr("fill", "none")
      .attr("stroke", "#0B575B")
      .attr("d", line);
      
    // Y-axis title-text
    select(node).append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + 50)
      .attr("class", "svg-text")
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Value");
      
    // X-axis title-text
    select(node).append("text")
      .attr("transform", "translate(" + (width/2 + 90) + "," + (height + top + 47.5) + ")")
      .attr("class", "svg-text")
      .style("text-anchor", "middle")
      .text("Date");  
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
