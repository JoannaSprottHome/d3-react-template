import React, { Component } from 'react';
import './App.css';
import PieChart from "./pie-chart/PieChart";
import LineGraph from "./line-graph/LineGraph"



class App extends Component {
  render() {
      return (
      <div className="center">
        <PieChart /> 
        <LineGraph />          
      </div>
    );
  }
}

export default App;
