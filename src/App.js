import React, { Component } from 'react';
import './App.css';
import PieChart from "./pie-chart/PieChart";
import LineGraph from "./line-graph/LineGraph";



class App extends Component {
  render() {
      return (
      <div className="center margin-bottom-medium">
        <PieChart 
          svgProps={
            { 
              width: 1375, 
              height: 350,
              id:"svg-pie"
            }
          }
        /> 
        <LineGraph 
          svgProps={
            { 
              width: 500, 
              height: 300,
              id:"svg-line"
            }
          } />  
      </div>
    );
  }
}

export default App;
