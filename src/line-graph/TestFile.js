import React, { Component } from 'react';
import '../App.css';
import { getData } from "./getData";
import { readCSV } from "../csv/readCSV";
import { formatArrayByDate } from "../csv/formatCSV";

export default class TestFile extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph(getData());
  };

  createGraph(data) {   
    // may need to build up a function here and pass the whole thing to read CSV... 
    readCSV("./data/sample.csv", formatArrayByDate);
    console.log("passing this point");
  }

  render() {
      return (
      <div className="center">
        Test File           
      </div>
    );
  }
}
