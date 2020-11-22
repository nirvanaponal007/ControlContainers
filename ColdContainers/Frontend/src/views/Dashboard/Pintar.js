
import React, { Component, lazy, Suspense } from 'react';
//import { findDOMNode } from 'react-dom';
//import { Bar, Line } from 'react-chartjs-2';
//import GoogleMapReact from 'google-map-react';
//import { Connector } from 'react-mqtt';
//import { subscribe } from 'react-mqtt';
//import { Map, GoogleApiWrapper, Marker, InfoWindow, MarkerWithLabel } from 'google-maps-react';
import ReactTooltip from 'react-tooltip';
// import {
//   ButtonGroup,
//   Dropdown,
//   DropdownToggle,
// } from "reactstrap";




const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'red',
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const AnyReactComponent = ({ text, bcolor, status }) => (

  // <div style={{
  //   color: 'white',
  //   // background: 'rgb(77, 189, 116)',
  //   background: bcolor,
  //   padding: '5px 5px',
  //   display: 'inline-flex',
  //   textAlign: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: '10%',
  //   transform: 'translate(-60%, -60%)',

  // }}

  // >
  //   {text}

  //   <img
  //     src={require("../../image/Contenedor.png")}
  //     className="img-thumbnail rounded  d-block  text-center"
  //     width="30" height="30"
  //     alt="avatar"
  //   //width="1%"
  //   />

  // </div>


  <div>
   {bcolor == 'rgb(77, 189, 116)' ?
      <img
        src={status == 2 ? require("../../image/cont-rojo.png") : require("../../image/cont-verde.png")}
      /> :
      <img
        src={require("../../image/cont-azul.png")}
      />}
  </div>
);



export default class Pintar extends Component {
  state = {
    redirect: false,
    dataContenedor: 0,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }
  constructor(props) {
    super(props)
    this.serialRef = React.createRef();

  }


  onMarkerClick = (props, marker, e) => {
    console.log("click" + this.props.contenedor.con_nombre);
    sessionStorage.setItem('filtro_cont', this.props.contenedor.cli_id);
    window.location="#/Contenedores";
    window.location.reload();
    //ReactTooltip.show(findDOMNode(this.refs.foo));

  }

  render() {
    var latitud = 0;
    var longitud = 0;
    var color = ''
    var estado = '';

    const nombre = this.props.contenedor.con_nombre
    console.log(this.props);


    if (this.props.data) {
      if (this.props.data[0]) {
        const x = this.props.data[0];
        const info = x.datos1.split("/");
        const info2 = x.datos2.split("/");
        var setpoint = parseFloat(info2[10]).toFixed(1);
        estado = info[0];
        var temp = "";
        if (parseInt(info[0]) == 1) {
          temp = "Petrip";
        } else if (parseInt(info[0]) == 2) {
          temp = "Shutdown";
        } else if (parseInt(info[0]) == 3) {
          temp = "Cooling";
        } else if (parseInt(info[0]) == 4) {
          temp = "Heating";
        } else if (parseInt(info[0]) == 5) {
          temp = "Defrost";
        } else if (parseInt(info[0]) == 6) {
          temp = "idle";
        } else if (parseInt(info[0]) == 7) {
          temp = "Apagado";
        } else if (parseInt(info[0]) == 8) {
          temp = "sin energia";
        } else if (parseInt(info[0]) == 9) {
          temp = "Apagado del interruptor";
        }
        else {
          temp = "No Registrado el estado";
        }
        var tret=parseFloat(info[30]).toFixed(1);
        var tsum=parseFloat(info[29]).toFixed(1);
        latitud = x.latitud;
        longitud = x.longitud;
        color = 'rgb(77, 189, 116)';
      }
      else {
        color = 'rgb(0, 0, 116)';

      }
    }
    return (
      <div>
        <div onClick={this.onMarkerClick} data-tip="React-tooltip" data-for={nombre}>

          <AnyReactComponent

            lat={37.778519} lng={-122.405640}
            text={nombre} bcolor={color}
            status={estado}
          />
          <ReactTooltip id={nombre} place="right" type="dark" effect="float">
            <div className='row'>
              <div className="col-sm-2 col-md-3">
                <img
                  src={require("../../image/Contenedor.png")}
                  className="img-thumbnail rounded  d-block  text-center"
                  width="30" height="30"
                  alt="avatar"
                />

              </div>
              <div >
              <table >
                  <tbody>
                    <tr className="text-center">
                      <td>
                      {nombre}
                      </td>
                      </tr>
                      </tbody>
                      </table>
                
                {this.props.contenedor.cli_razon_social}
              </div>

              <table >
                  <tbody>
                    <tr className="text-center">
                      <td>
                        <i className="cui-monitor icons " />
                      </td>
                      <td className="text-muted">Estado.</td>
                      <td
                        className="font-weight-bold"  
                      >
                        {temp}
                      </td>
                    </tr>
                    <tr className="text-center col">
                      <td>
                        <i className="cui-speedometer icons " />
                      </td>
                      <td className="text-muted">T. Suministro..</td>
                      <td
                        className="font-weight-bold"
                      >
                        {tsum+"°C"}
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <i className="cui-speedometer icons " />
                      </td>
                      <td className="text-muted">T. Retorno</td>
                      <td
                        className="font-weight-bold"
                      >
                        {tret+"°C"}
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <i className="cui-graph icons " />{" "}
                      </td>
                      <td className="text-muted">Setpoint</td>
                      <td
                        className="font-weight-bold"
                      >
                        {setpoint+"°C"}
                      </td>
                    </tr>
                  </tbody>
                </table>

            </div>
          </ReactTooltip>
        </div>
      </div>

    );
  }
}