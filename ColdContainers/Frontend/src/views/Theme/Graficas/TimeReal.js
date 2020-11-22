import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Immutable from 'immutable';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';
import { createRandomData, createDataPoint } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);
    this.updateLiveData = this.updateLiveData.bind(this);
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this);
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this);

    const now = Date.now();
    this.state = {
      data1: Immutable.List(createRandomData(now)),
      data2: Immutable.List(createRandomData(now)),
      liveUpdate: false
    };
  }

  componentDidMount () {
    this.handleStartLiveUpdate();
  }

  updateLiveData () {
    const { data1, data2 } = this.state;

    this.setState({
      data1: data1.push(createDataPoint()),
      data2: data2.push(createDataPoint())
    });
  }

  handleStartLiveUpdate (e) {
    e && e.preventDefault();
    this.setState({
      liveUpdate: window.setInterval(this.updateLiveData, 1000)
    });
  }

  handleStopLiveUpdate (e) {
    e.preventDefault();
    window.clearInterval(this.state.liveUpdate);
    this.setState({
      liveUpdate: false
    });
  }

  render() {
    const { data1, data2, liveUpdate } = this.state;

    return (
      <div>

        <HighchartsChart>
          <Chart />
          <Title>Temperatura En Tiempo Real</Title>
          {/* <Subtitle>Using Immutable.js Lists for data</Subtitle> */}
          <Legend>
            <Legend.Title></Legend.Title>
          </Legend>
          <XAxis type="datetime">
            <XAxis.Title></XAxis.Title>
          </XAxis>
          <YAxis>
            <YAxis.Title>Temperatura (°C)</YAxis.Title>
            <LineSeries name="Temperatura Retorno" data={data1} color="#6dbcdb" />
            <LineSeries name="Temperatura Suministro" data={data2} color="#ce424b" />
          </YAxis>
        </HighchartsChart>

        {/* <div>
          {!liveUpdate && (
            <button className="btn btn-success" onClick={this.handleStartLiveUpdate}>Live update</button>
          )}
          {liveUpdate && (
            <button className="btn btn-danger" onClick={this.handleStopLiveUpdate}>Stop update</button>
          )}
        </div> */}
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
