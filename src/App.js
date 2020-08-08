import React, { Component } from 'react';
import './App.css';
import PieChart from "./pie-chart/PieChart";
import LineGraph from "./line-graph/LineGraph";
import BarChart from "./bar-chart/BarChart";
import TestFile from "./line-graph/TestFile";



class App extends Component {
  render() {
      return (
      <div className="center margin-bottom-medium">
        <PieChart /> 
        <LineGraph />  
        <TestFile /> 
        <BarChart />
      </div>
    );
  }
}

export default App;
