import React, { Component } from 'react';
import './App.css';
import PieChart from "./pie-chart/PieChart";



class App extends Component {
  render() {
      return (
      <div className="center">
        <PieChart />           
      </div>
    );
  }
}

export default App;
