import React, { Component } from 'react';
import { CardGroup, Col, Row } from 'reactstrap';
import Widget01 from './Widget01';
import Widget02 from './Widget02';
import Widget03 from './Widget03';
import Widget04 from './Widget04';
import { Line } from 'react-chartjs-2';


// Brand Card Chart
const makeSocialBoxData = (dataSetNo) => {
  const socialBoxData = [
    { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
    { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
    { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
    { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
  ];

  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Widgets extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className= 'card'>
          <div className= 'card-header'>
            <h3>Sensors</h3>
            <div className= 'card-body'>
              <Row>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="AF CO2 Sensor" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="AF 02 Calc" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Ambient Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="Battery Volt" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Cargo Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Comp Dsch Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Comp Suct Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Composite Ret" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Composite Sup" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX PSI" mainText="CPD Prest" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX PSI" mainText="Disch Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="DTS Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Humid H2O/Sec" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX %" mainText="Humidity" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="Int Therm Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX A" mainText="Phase A" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX A" mainText="Phase B" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX A" mainText="Phase C" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="Power Sup DC" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RM Comp Ret" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RM Compt Sup" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RM Def Ther Tm" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RM Rt Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RM Supp Tm 1" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RM Supp Tm 2" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RRS" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="RTC Battery" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="RTS" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="SRS" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="STS" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX PSI" mainText= "Suct Press" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX HZ" mainText="Sup Line Freq" icon="fa fa-cogs" color="primary" />
                </Col>

                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="Sup Line Volts" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="USDA1 Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="USDA2 Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="USDA3 Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX CMH" mainText="VPS" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="CA Batt Volt" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="CA Bus Volt" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX PSI" mainText="CA Memb Press" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="CA Memb Temp" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX C" mainText="CA RTS" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX HZ" mainText="CA Sup Ln Freq" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX %" mainText="CO2 Conc" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="CO2 Sensor" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX %" mainText="N2 Conc" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX %" mainText= "O2 Conc" icon="fa fa-cogs" color="primary" />
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Widget02 header="XXXX V" mainText="O2 Sensor" icon="fa fa-cogs" color="primary" />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Widgets;
