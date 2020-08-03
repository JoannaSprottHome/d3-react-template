import React, { Component } from 'react';
import '../App.css';
import { getData } from "./getData";
import { readCSV } from "../csv/readCSV";
import { formatArrayByDateTotals, formatArrayByDate } from "../csv/formatCSV";
import { propsToConsolidate } from "./lineProps";

export default class TestFile extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph(getData());
  };

  createGraph(data) {   
    readCSV("./data/sample.csv", formatArrayByDateTotals, [propsToConsolidate]);
  }

  render() {
      return (
      <div></div>
    );
  }
}
