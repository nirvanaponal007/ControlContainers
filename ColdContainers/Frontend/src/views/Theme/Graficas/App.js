import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip,Subtitle,
} from 'react-jsx-highstock';

import HighchartsReact from 'highcharts-react-official';
import { createRandomData } from '../utils/data-helpers';
import Highstock from 'highcharts/highstock';
import { parse } from 'url';
import { PostData } from '../../../Servicios/PostData';
require('highcharts-more')(Highstock);
require('highcharts/modules/exporting')(Highstock);
require('highcharts/modules/export-data.src')(Highstock);


var info = [];
var info2 = [];
var tempSumn = [];
var ambTempgraf = [];
var CDTgraf = [];
var CSTgraf = [];
var Cretgraf = [];
var Csupgraf = [];
var RTSgraf = [];
var STSgraf = [];
var RTCBatterygraf = [];
var SupLineVoltsgraf = [];
var IntTermTempgraf = [];
var PhaseAgraf = [];
var PhaseBgraf = [];
var PhaseCgraf = [];
var PowerSDCgraf = [];
var Humiditygraf = [];
var HumidH2Ograf = [];
var DTSTempgraf = [];
var BatteryVoltgraf = [];
var Dpressgraf = [];
var Spressgraf = [];
var CPCPressgraf = [];
var SRSgraf = [];
var RRSgraf = [];
var Usda1graf = [];
var Usda2graf = [];
var Usda3graf = [];
var Usda4graf = [];
var setpointgraf = [];
var moment = require('moment');


class HistoryTemp extends Component {

  constructor(props) {
    super(props);

    const now = Date.now();
    this.state = {
      data1: createRandomData(now, 1e7, 500),
      data2: createRandomData(now, 1e7, 500),
      contenedor:{}
    };
    const r = ["STS", "RTS"];
  }


  componentDidMount() {
    console.log(this.props.id_cont);

    PostData('TraerContendorXID','POST',{idContenedor: this.props.id_cont}).then((result)=>{
      const responseJSON = result;
      console.log(result);
      
      this.setState({
        contenedor: responseJSON.contenedor[0]
      });
    }).catch((err) => {
        console.log(err);
    })

    
  }
  render() {
    var STS = [];
    var RTS = [];
    var SRS = [];
    var RRS = [];
    var ambTemp = [];
    var array = [];
    var datos = [];
    var CDT = [];
    var CST = [];
    var DTSTemp = [];
    var HumidH2O = [];
    var Humidity = [];
    var CPCPress = [];
    var Spress = [];
    var Dpress = [];
    var IntTermTemp = [];
    var Cret = [];
    var Csup = [];
    var SupLineVolts = [];
    var PhaseA = [];
    var PhaseB = [];
    var PhaseC = [];
    var PowerSDC = [];
    var BatteryVolt = [];
    var RTCBattery = [];
    var Usda1 = [];
    var Usda2 = [];
    var Usda3 = [];
    var Usda4 = [];
    var setpoint = [];
    const { data1, data2 } = this.state;
    // console.log(data1);
    // console.log(this.props.id_cont)
    array = this.props.array;
    const datos1 = this.props.datos1;
    console.log(array);
    console.log(datos1);
    
    if (this.props.datos1) {
      Object.keys(datos1).map(function (key) {
        var data = datos1[key][1];
        var fecha = datos1[key][0];
        var data2 = datos1[key][2];
        info = data.split("/");
        info2=data2.split("/");
        var UTCDate = new Date(fecha);
        UTCDate.setTime(UTCDate.getTime() - UTCDate.getTimezoneOffset() * 60 * 1000);
        const time = Math.round((new Date(UTCDate)))


        STSgraf = [time, parseFloat(parseFloat(info[29]).toFixed(1))]
        RTSgraf = [time, parseFloat(parseFloat(info[30]).toFixed(1))]
        SRSgraf = [time, parseFloat(parseFloat(info[20]).toFixed(1))]
        RRSgraf = [time, parseFloat(parseFloat(info[21]).toFixed(1))]
        ambTempgraf = [time, parseFloat(parseFloat(info[5]).toFixed(1))]
        CDTgraf = [time, parseFloat(parseFloat(info[7]).toFixed(1))]
        CSTgraf = [time, parseFloat(parseFloat(info[6]).toFixed(1))]
        DTSTempgraf = [time, parseFloat(parseFloat(info[14]).toFixed(1))]
        HumidH2Ograf = [time, parseFloat(parseFloat(info[28]).toFixed(1))]
        Humiditygraf = [time, parseFloat(parseFloat(info[4]).toFixed(1))]
        CPCPressgraf = [time, parseFloat(parseFloat(info[19]).toFixed(1))]
        Spressgraf = [time, parseFloat(parseFloat(info[18]).toFixed(1))]
        Dpressgraf = [time, parseFloat(parseFloat(info[17]).toFixed(1))]
        IntTermTempgraf = [time, parseFloat(parseFloat(info[26]).toFixed(1))]
        Cretgraf = [time, parseFloat(parseFloat(info[8]).toFixed(1))]
        Csupgraf = [time, parseFloat(parseFloat(info[9]).toFixed(1))]
        SupLineVoltsgraf = [time, parseFloat(parseFloat(info[13]).toFixed(1))]
        PhaseAgraf = [time, parseFloat(parseFloat(info[10]).toFixed(1))]
        PhaseBgraf = [time, parseFloat(parseFloat(info[11]).toFixed(1))]
        PhaseCgraf = [time, parseFloat(parseFloat(info[12]).toFixed(1))]
        PowerSDCgraf = [time, parseFloat(parseFloat(info[16]).toFixed(1))]
        BatteryVoltgraf = [time, parseFloat(parseFloat(info[15]).toFixed(1))]
        RTCBatterygraf = [time, parseFloat(parseFloat(info[27]).toFixed(1))]
        Usda1graf = [time, parseFloat(parseFloat(info[22]).toFixed(1))]
        Usda2graf = [time, parseFloat(parseFloat(info[23]).toFixed(1))]
        Usda3graf = [time, parseFloat(parseFloat(info[24]).toFixed(1))]
        Usda4graf = [time, parseFloat(parseFloat(info[25]).toFixed(1))]
        setpointgraf = [time, parseFloat(parseFloat(info2[10]).toFixed(1))]
        STS.push(STSgraf);
        RTS.push(RTSgraf);
        SRS.push(SRSgraf);
        RRS.push(RRSgraf);
        ambTemp.push(ambTempgraf);
        CDT.push(CDTgraf);
        CST.push(CSTgraf);
        DTSTemp.push(DTSTempgraf);
        HumidH2O.push(HumidH2Ograf);
        Humidity.push(Humiditygraf);
        CPCPress.push(CPCPressgraf);
        Spress.push(Spressgraf);
        Dpress.push(Dpressgraf);
        IntTermTemp.push(IntTermTempgraf);
        Cret.push(Cretgraf);
        Csup.push(Csupgraf);
        SupLineVolts.push(SupLineVoltsgraf);
        PhaseA.push(PhaseAgraf);
        PhaseB.push(PhaseBgraf);
        PhaseC.push(PhaseCgraf);
        PowerSDC.push(PowerSDCgraf);
        BatteryVolt.push(BatteryVoltgraf);
        RTCBattery.push(RTCBatterygraf);
        Usda1.push(Usda1graf);
        Usda2.push(Usda2graf);
        Usda3.push(Usda3graf);
        Usda4.push(Usda4graf);
        setpoint.push(setpointgraf);
        datos = [STS, RTS, SRS, RRS, ambTemp, CDT, CST, DTSTemp, HumidH2O, Humidity, CPCPress, Spress, Dpress, IntTermTemp, Cret, Csup, SupLineVolts, PhaseA, PhaseB, PhaseC, PowerSDC, BatteryVolt, RTCBattery, Usda1, Usda2, Usda3, Usda4,setpoint];
        // console.log(datos);


      });
    }
    // console.log(data1);
    return (
      <div >
        <HighchartsStockChart loading='true' config={options}>
          <Chart zoomType="x" />

          <Title>Reporte Grafico</Title>
          <Subtitle>{this.state.contenedor.con_nombre + " - "+this.state.contenedor.con_serial_contenedor }</Subtitle>

          <RangeSelector>
            {/* <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button> */}
            {/* <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button> */}
            {/* <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button> */}
            {/* <RangeSelector.Button type="all">All</RangeSelector.Button> */}
            <RangeSelector.Input boxBorderColor="#7cb5ec" />
          </RangeSelector>

          <Tooltip />

          <XAxis>
            <XAxis.Title>Tiempo</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Valores</YAxis.Title>
            <div>
              {
                Object.keys(array).map(key => (


                  <SplineSeries id={array[key].split(',')[1]} name={array[key].split(',')[1]} data={datos[array[key].split(',')[0]]} >
                    {console.log()
                    }
                  </SplineSeries>
                )
                )
              }
            </div>


            {/* <SplineSeries id="STS" name="STS" data={datos[0]} /> */}
            {/* <SplineSeries id="RTS" name="RTS" data={datos[1]} /> */}
            {/* <SplineSeries id="STS2" name="Temperatura Suministro 2" data={STSgraf} /> */}
          </YAxis>

          {/* <YAxis >
            <YAxis.Title>Temperatura Retorno</YAxis.Title>
            <SplineSeries id="twitter" name="Temperatura Retorno" data={RTSgraf} />
          </YAxis> */}
          {/* <YAxis opposite>
            <YAxis.Title>Temperatura Retorno</YAxis.Title>
            <SplineSeries id="twitter" name="Temperatura Retorno" data={RTSgraf} />
          </YAxis> */}
          <Navigator>
              {
                Object.keys(array).map(key => (
                  <Navigator.Series seriesId={array[key].split(',')[1]} />
                ))}
          </Navigator>


          <Legend>
            <Legend.Title>reporte generado por ColdContainers SAS</Legend.Title>
          </Legend>

        </HighchartsStockChart>

      </div>
    );
  }
}

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'reporte controlcontainer'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};
export default withHighcharts(HistoryTemp, Highcharts);
