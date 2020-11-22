import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import classNames from 'classnames';
// import { Row, Col } from 'reactstrap';
//import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
//import { RadialGauge } from 'react-canvas-gauges';
import { PostData } from '../../../Servicios/PostData';
// import {ConexionMqtt} from './ConexionMqtt';
import { AMBIENT, PORT_MQTT } from '../../../Servicios/config';
//import { Redirect, Link } from 'react-router-dom';
//import { AppSwitch } from '@coreui/react'
//import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
//import socketIOClient from "socket.io-client";
import { Connector } from 'react-mqtt';
import { subscribe } from 'react-mqtt';
import _Sub from './Sub';
// import {
//   Badge,
//   Button,
//   ButtonDropdown,
//   ButtonGroup,
//   ButtonToolbar,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   Col,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Progress,
//   Row,
//   Table,
// } from 'reactstrap';

//const mqtt = require('mqtt')
//const client  = mqtt.connect('mqtt://${AMBIENT}:${PORT_MQTT}')

// let contenedor = {};

class Contenedor extends Component {


  state = {
    redirect: false,
    dataContenedor: 0
  }
  constructor(props) {
    super(props)
    this.serialRef = React.createRef();

  }

  componentDidCatch(error, errorInfo) {
    console.log("ERROR D", error)
  }

  // traerDatos=(datosContenedor)=>{
  //     console.log(datosContenedor);
  //     contenedor = datosContenedor;      
  // }

  render() {
    const { con_id, con_serial_contenedor, con_nombre, con_estado, con_url_foto, con_fecha_creacion } = this.props.producto;
    const urlTopic = "contenedor/" + con_serial_contenedor;
    

    const Sub = subscribe({ topic: urlTopic })(_Sub);

    const url = '#/Contenedores/contenedor/' + this.props.producto.con_serial_contenedor;
    //alert(url);
    return (
      <Connector mqttProps={`ws://${AMBIENT}:${PORT_MQTT}/`} >
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Sub serial={this.props.producto} prueba="1111"/>
        </div>
      </Connector>
    )
  }
}


class Colors extends Component {
  SelectClient = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      contenedor: {},
      clientes: {},
    };
  }


  filtrarXCliente = e => {
    e.preventDefault();
    const clientesel = this.SelectClient.current.value;
    sessionStorage.setItem('filtro_cont', clientesel);
    // console.log("filtro" + sessionStorage.getItem('filtro_cont'));
    window.location.reload();
  }

  componentDidMount() {

    var filtrar = sessionStorage.getItem('filtro_cont');
    var aux_cont = [];
    PostData('TraerClientesSelect', 'GET').then((result2) => {
      const responseJSON2 = result2;
      this.setState({
        clientes: responseJSON2.clientes
      });
    }).catch((err) => {
      console.log(err);
    })

    if (filtrar == "todos") {
      PostData('TraerContenedores', 'GET').then((result) => {
        const responseJSON = result;
        this.setState({
          contenedor: responseJSON.eventos
        });
      }).catch((err) => {
        console.log(err);
      })
    }
    else {


      PostData('TraerContenedores', 'GET').then((result) => {
        const responseJSON = result;
        const selcon = [responseJSON.eventos];

        Object.keys(selcon[0]).map(function (key) {
          if (selcon[0][key].cli_id == filtrar) {
            aux_cont.push(selcon[0][key]);
          }
        });

        this.setState({
          contenedor: aux_cont
        });
      }).catch((err) => {
        console.log(err);
      })

    }
  }


  render() {
    const cliente = [
      this.state.clientes
    ];

    const cont = [
      this.state.contenedor
    ];
    console.log(this.state.contenedor)

    var filtrar = sessionStorage.getItem('filtro_cont');
    var Usuario = JSON.parse(sessionStorage.getItem('Usuario'));
    var rol = Usuario.usuario.data[0].usr_id_rol;


    return (
      <section id="team" >
        <div className="container col-md-12">
          {rol == 1 ?
            <div className="row  justify-content-end">
              <div className="col-md-4 ">
                <i className="fa fa-search mt-4"><strong>Buscar</strong></i>
                <select ref={this.SelectClient} id="selectCliente" name="selectClient" onChange={this.filtrarXCliente} className="form-control " style={{ top: "5px", borderColor: "green" }}>
                  <option selected={(filtrar == "todos") ? true : false} > todos</option>
                  {
                    Object.keys(cliente[0]).map(key => (

                      <option selected={(filtrar == cliente[0][key].cli_id) ? true : false} value={cliente[0][key].cli_id}> {cliente[0][key].cli_razon_social}
                      </option>

                    ))
                  }
                </select>
              </div>
            </div>
            : ""}
          <h5 className="section-title h1">Contenedores</h5>
          {!this.state.contenedor ?
            <div class="alert alert-danger"
              style={{ background: '#F9C2B8', justifyContent: "center", alignItems: "center", textAlign: "center" }}
              role="alert">
              <i class="fa fa-exclamation-triangle fa-lg"><strong>Cliente sin contenedores asignados!</strong></i>
            </div> : ""}
          <div className="row">
            {this.state.contenedor ?
              Object.keys(cont[0]).map(key => (
                <Contenedor key={key} producto={cont[0][key]} />
              )) : ""
            }
          </div>
        </div>
      </section>
    );
  }
}

export default Colors;

