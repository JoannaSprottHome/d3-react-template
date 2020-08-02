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
    readCSV("./data/sample.csv", formatArrayByDate);
  }

  render() {
      return (
      <div></div>
    );
  }
}
