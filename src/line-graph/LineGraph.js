import React, { Component } from 'react';
import * as d3Line from 'd3-shape';
import { select, scaleLinear, scaleTime, axisBottom, axisLeft, max, min } from 'd3';
import { returnMargin } from "../generic/margins";
import '../App.css';
const { width, height, left, top } = returnMargin(2.5, 5, 15, 100, 350, 175);

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
    this.createGraph([ 
      {
        x: "2020-07-21T11:11:43+00:00",
        y: {
          passed: 96,
          failed: 6
        }
      },
      {
        x: "2020-07-20T11:11:43+00:00",
        y: {
          passed: 193,
          failed: 18
        }
      }
     ]);
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

    console.log(`timeSlots: ${JSON.stringify(timeSlots)}`);
    const maxArr = max(timeSlots).toString().replace(/:00 GMT.*/, "").split(/ 20.. /);
    const minArr = min(timeSlots).toString().replace(/:00 GMT.*/, "").split(/ 20.. /);

    const x = scaleTime().domain([min(timeSlots), max(timeSlots)]).range([0, width]),
    y = scaleLinear().domain([0, 100]).range([height, 0]);

    const xAxis = axisBottom().scale(x).ticks(5),
        yAxis = axisLeft().scale(y);

    const make_x_gridlines = () => {
      return axisBottom(x).ticks(8);
    };    

    // Gridlines
    select(node).append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + left + "," + (height + 5) + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat(""));

    // Append x-axis
    select(node).append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + left + "," + height + ")  ")
      .call(xAxis);
      
    // Append y-axis  
    select(node).append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + left + "," + top + ")") 
      .call(yAxis);
      
    // Line 
    const line = d3Line.line()
      .x(function(d) { return x(new Date(d.x)) + left; })
      .y(function (d) { return y(d.y); });

    select(node).append("path")
      .datum(formattedData)
      .attr("fill", "none")
      .attr("stroke", "3333ff")
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
      .attr("transform", "translate(" + (width/2 + 90) + "," + (height + top + 37.5) + ")")
      .attr("class", "svg-text")
      .style("text-anchor", "middle")
      .text("Date");

    // Earliest time-frame text along bottom
    select(node).append("text")
      .attr("transform", "translate(" + (60) + "," + (height + top + 37.5) + ")")
      .attr("font-weight", "700")
      .attr("id", "minText")
      .text(minArr[0]);

    // Earliest time-frame text along bottom  
    select(node).append("text")
      .attr("transform", "translate(" + (width/2 + 190) + "," + (height + top + 37.5) + ")")
      .attr("font-weight", "700")
      .attr("id", "maxText")
      .text(maxArr[0]);  
  }

  render() {
      return (
      <div className="center">
        <h1 className="margin-top-medium">Line Graph</h1>
        <div>
          <svg ref={node => this.node = node} width={420} height={520}  id="svg-line" className="centerGraph"></svg> 
        </div>            
      </div>
    );
  }
}
