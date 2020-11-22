//import Msm from "./Msm";
import React, { Component } from "react";
//import ReactDOM from "react-dom";
//import classNames from "classnames";
// import { Row, Col } from 'reactstrap';
//import { rgbToHex } from "@coreui/coreui/dist/js/coreui-utilities";
import { RadialGauge } from "react-canvas-gauges";
//import { PostData } from "../../../Servicios/PostData";
// import {ConexionMqtt} from './ConexionMqtt';
import { AMBIENT, PORT } from "../../../Servicios/config";
//import { Redirect, Link } from "react-router-dom";
//import { AppSwitch } from "@coreui/react";
//import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
//import socketIOClient from "socket.io-client";
//import { Connector } from "react-mqtt";
//import { subscribe } from "react-mqtt";
import _Sub from "./Sub";
import GoogleMapReact from "google-map-react";
// import { Monitor } from "./monitor";
//import Delay from "react-delay";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Switch from "react-switch";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "transparent",
      background: "rgb(77, 189, 116)",
      padding: "5px 5px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {/* {text} */}
    <img
      src={require("../../../image/Contenedor.png")}
      className="img-thumbnail rounded  d-block  text-center"
      width="50"
      height="50"
      alt="avatar"
    //width="1%"
    />
  </div>
);


const ErrorAnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "transparent",
      background: "rgb(77, 189, 116)",
      padding: "5px 5px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {/* {text} */}
    <img
      src={require("../../../image/x.png")}
      className="img-thumbnail rounded  d-block  text-center"
      width="50"
      height="50"
      alt="avatar"
    //width="1%"
    />
  </div>
);



class SimpleMap extends Component {



  static defaultProps = {


    center: {

      lat: 4.6186496,
      lng: -74.1203968
    },
    zoom: 11,
    danger: false,
    intentos: 0
  };





  toggleDanger() {
    this.setState({
      danger: !this.props.danger,
    });
  }


  render() {


    var latitud = 0;
    var longitud = 0;
    if (this.props.serial) {

      latitud = this.props.serial.latitud;
      longitud = this.props.serial.longitud;


    } else {
      latitud = this.latitud;
      longitud = this.longitud;
    }
    return (
      // Important! Always set the container height explicitly

      <div style={{ height: "50vh", width: "100%" }}>

        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBcMvJb7zdnjOAkNGZa2fl6wPLkEL_Ufmg" }}
          // defaultCenter={this.props.center}
          defaultCenter={{
            lat: latitud,
            lng: longitud
          }}
          defaultZoom={this.props.zoom}
        >

          {this.props.serial ?
            <AnyReactComponent lat={latitud} lng={longitud} />
            :
            <ErrorAnyReactComponent lat={latitud} lng={longitud} />
          }
        </GoogleMapReact>
      </div>

    );
  }
}

export default class Sub extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, checked2: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.cargarImage = this.cargarImage.bind(this);
    // this.editarContenedor = this.editarContenedor.bind(this);
    this.state = {
      TempSumi: 0,
      success: false,
      imageNew: null,
      errorEditar: "",
      intentos2: 0
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
  }




  // createNotification = (type) => {
  //   return () => {
  //     switch (type) {
  //       case 'info':
  //         NotificationManager.info('Info message');
  //         break;
  //       case 'success':
  //         NotificationManager.success('Success message', 'Title here');
  //         break;
  //       case 'warning':
  //         NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
  //         break;
  //       case 'error':
  //         NotificationManager.error('Error message', 'Click me!', 5000, () => {
  //           alert('callback');
  //         });
  //         break;
  //     }
  //   };
  // };

  editarContenedor(id, url_foto) {
    var files = document.getElementById('image_upload').files[0];

    var newNombre = document.getElementById('newNombre').value;
    var textSerial = document.getElementById('txtserial').value;
    var newDescripcion = document.getElementById('newDescripcion').value;
    if (newNombre == "") {
      this.setState({
        errorEditar: "***El campo Nombre es requerido***"
      })

    } else {

      var params = { con_id: id, con_nombre: newNombre, con_descripcion: newDescripcion }
      const formData = new FormData();
      formData.append('image_upload', files);
      formData.append('con_id', id);
      formData.append('con_nombre', newNombre);
      formData.append('con_descripcion', newDescripcion);
      formData.append('con_url_foto', url_foto);
      let baseUrl = `http://${AMBIENT}:${PORT}/api/EditarContenedorXID`;
      //let urlImg = `http://${AMBIENT}:3000/uploads/${textSerial.trim() +"-"+files.name.trim()}`;

      fetch(baseUrl, {
        method: 'POST',
        body: formData
      }).then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.message.split("-")[0]);
          this.toggleSuccess();

          var img = document.getElementById("img_" + id);

          if (files) {
            let urlImg = files.name.trim();
            document.getElementById("img_" + id).src = responseJson.message.split("-")[1] + "-" + files.name.trim().replace(" ", "").replace("%20", "").split(" ").join("");
          }
          
          document.getElementById("nom_" + id).textContent = newNombre;
          this.props.serial.con_nombre = newNombre;
          this.props.serial.con_descripcion = newDescripcion;

        })
        .catch((error) => {
          console.log(error);
        })
    }
  }







  Aceptar(checked) {
    this.setState({
      success: true, checked
    })

    const topico = 'apagado/' + this.props.serial.con_serial_contenedor
    const { mqtt } = this.props;
    mqtt.publish(topico, 'off' + checked);
    console.log(checked);
  }
  Cancelar(checked) {
    this.setState({
      success: true, checked: !checked
    })
  }


  cargarImage() {
    if (document.getElementById('image_upload').files[0]) {
      var file = document.getElementById('image_upload').files[0];
      // var file2 = new FormData(document.getElementById('image'));
      // console.log(file2);
      this.setState({
        imageNew: URL.createObjectURL(file)
      })
    } else {
      this.setState({
        imageNew: ""
      })
    }
  }

  handleChange(checked) {
    var indicador = '';
    if (checked == true) {
      indicador = 'encender';
    } else {
      indicador = 'apagar';
    }
    //  window.confirm("Esta seguro que desea apagar el contenedor!"+this.props.serial.con_serial_contenedor);
    this.setState({
      success: false
    })
    confirmAlert({
      title: 'Confirmar Accion',
      message: 'desea ' + indicador + ' el contenedor <<' + this.props.serial.con_nombre + '>>',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.Aceptar(checked)
        },
        {
          label: 'No',
          onClick: () => this.Cancelar(checked)
        }
      ],

    })
    //this.setState({ checked });
  }

  Aceptar2(checked2) {
    this.setState({
      success: true
    })
    const topico = 'apagado/' + this.props.serial.con_serial_contenedor
    const { mqtt } = this.props;
    mqtt.publish(topico, 'defrosttrue');
    console.log('checked2=' + checked2);
    console.log(topico);
    setTimeout(() => {
      this.setState({ checked2: false });
    }, 5000)
  }

  Cancelar2(checked2) {
    this.setState({
      success: true, checked2: !checked2
    })
  }

  handleChange2(checked2) {
    this.setState({ checked2 });
    this.setState({
      success: false
    })
    confirmAlert({
      title: 'Confirmar Defrost',
      message: 'desea realizarle un defrost al contenedor <<' + this.props.serial.con_nombre + '>>',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.Aceptar2(checked2)
        },
        {
          label: 'No',
          onClick: () => this.Cancelar2(checked2)
        }
      ],

    })

  }





  sendMessage(e) {
    e.preventDefault();
    //MQTT client is passed on
    const { mqtt } = this.props;
    mqtt.publish('contenedores/apagado/prueba', '00');
  }


  toggleSuccess() {

    this.setState({
      success: !this.state.success,
      collapseDescripcion: true,
      collapseMonitor: false,
      collapseUbicacion: false,
      collapseAjustes: false,
      errorEditar: ""
    });
  }
  toggleCollapseDescripcion = () => {
    this.setState({
      collapseDescripcion: true,
      collapseUbicacion: false,
      collapseMonitor: false,
      collapseAjustes: false
    });
  };

  toggleCollapseMonitor = () => {

    this.setState({
      collapseDescripcion: false,
      collapseUbicacion: false,
      collapseMonitor: true,
      collapseAjustes: false
    });
  };

  toggleCollapseUbicacion = () => {
    if (this.props.data[0]) {
      if (this.props.data[0].latitud == 0) {
        NotificationManager.warning('Contenedor sin señal GPS');
      }
      else { NotificationManager.info('Contenedor ubicado'); }
    }
    else {
      NotificationManager.error('Sin conexion con el contenedor');
    }
    this.setState({
      collapseDescripcion: false,
      collapseUbicacion: true,
      collapseMonitor: false,
      collapseAjustes: false
    });
  };

  toggleCollapseAjustes = () => {
    this.setState({
      collapseDescripcion: false,
      collapseUbicacion: false,
      collapseMonitor: false,
      collapseAjustes: true
    });
  };


  render() {

    //alert(this.state.intentos2);
    //alert(this.props.prueba);

    // this.setState({
    //   intentos2: this.state.intentos2 + 1,
    // });

    //this.props.prueba = this.props.prueba + 100;

    //alert(this.props.prueba);

    console.log(this.props.serial, this.props.data)

    //window.location.reload(false);

    if (this.props.data[0]) {

      const { con_serial_contenedor } = this.props.serial;
      const x = this.props.data[0];

      //alert(x);

      var onoff = x.delay_time;
      if (onoff == '11') {
        console.log("encendido");
        this.state.checked = true;
      }
      else if (onoff == '10') {
        console.log("interruptor");
        this.state.checked = false;
      } else if (onoff == '00') {
        console.log("apagado");
        this.state.checked = false;

      }


      const info = x.datos1.split("/");
      //alert(info);
      console.log("Sub: " + tempSumn);
      //Agregando Temperatura Suministro a Vista
      var tempSumn = parseFloat(info[29]).toFixed(1);
      var ambTemp = parseFloat(info[5]).toFixed(1);
      var CDT = parseFloat(info[7]).toFixed(1);
      var CST = parseFloat(info[6]).toFixed(1);
      var Cret = parseFloat(info[8]).toFixed(1);
      var Csup = parseFloat(info[9]).toFixed(1);
      var RTS = parseFloat(info[30]).toFixed(1);
      var STS = parseFloat(info[29]).toFixed(1);
      var RTCBattery = parseFloat(info[27]).toFixed(1);

      // 2020/08/16
      var SupLineVolts = parseFloat(info[13]).toFixed(1);
      //alert("SupLineVolts" + info[13]);

      var IntTermTemp = parseFloat(info[26]).toFixed(1);
      var PhaseA = parseFloat(info[10]).toFixed(1);
      var PhaseB = parseFloat(info[11]).toFixed(1);
      var PhaseC = parseFloat(info[12]).toFixed(1);
      var PowerSDC = parseFloat(info[16]).toFixed(1);
      var Humidity = parseFloat(info[4]).toFixed(1);
      var HumidH2O = parseFloat(info[28]).toFixed(1);

      // 2020/08/20
      var DTSTemp = parseFloat(info[14]).toFixed(1);
      //alert("DTSTemp"+info[14]);

      var BatteryVolt = parseFloat(info[15]).toFixed(1);
      var Dpress = parseFloat(info[17]).toFixed(1);
      var Spress = parseFloat(info[18]).toFixed(1);
      var CPCPress = parseFloat(info[19]).toFixed(1);
      var SRS = parseFloat(info[20]).toFixed(1);
      var RRS = parseFloat(info[21]).toFixed(1);
      var usda1 = parseFloat(info[22]).toFixed(1);
      var usda2 = parseFloat(info[23]).toFixed(1);
      var usda3 = parseFloat(info[24]).toFixed(1);
      var usda4 = parseFloat(info[25]).toFixed(1);
      var info31 = parseFloat(info[31]).toFixed(1);
      var info32 = parseFloat(info[32]).toFixed(1);
      var info33 = parseFloat(info[33]).toFixed(1);
      var info34 = parseFloat(info[34]).toFixed(1);
      var info35 = parseFloat(info[35]).toFixed(1);
      var info36 = parseFloat(info[36]).toFixed(1);
      var info37 = parseFloat(info[37]).toFixed(1);
      var info38 = parseFloat(info[38]).toFixed(1);
      var info39 = parseFloat(info[39]).toFixed(1);


      var myNode = document.getElementById(
        "tempSumn" + this.props.serial.con_id
      );
      var fc = myNode.firstChild;
      while (fc) {
        myNode.removeChild(fc);
        fc = myNode.firstChild;
      }

      if (tempSumn == 'NaN') {

        var para = document.createElement("P");
        let div = document.createElement('div');
        div.id = 'content';
        div.innerHTML = "<img src='https://www.jettools.com/images/animated_spinner.gif' style='border-radius: 8px; width: 30px; height: 30px;' />";
        para.appendChild(div);

        document
          .getElementById("tempSumn" + this.props.serial.con_id)
          .appendChild(div); // Append <p> to <div> with id="myDIV"
      }
      else {
        var para = document.createElement("P");
        var t = document.createTextNode(tempSumn + "°C");
        para.appendChild(t);
        document
          .getElementById("tempSumn" + this.props.serial.con_id)
          .appendChild(t);

      }


      //Agregando Temperatura Retorno a Vista
      var tempRetor = parseFloat(info[30]).toFixed(1);
      var myNode = document.getElementById(
        "tempRet" + this.props.serial.con_id
      );
      var fc = myNode.firstChild;
      while (fc) {
        myNode.removeChild(fc);
        fc = myNode.firstChild;
      }

      if (tempRetor == 'NaN') {
        var para = document.createElement("P"); // Create a <p> element
        let div = document.createElement('div');
        div.id = 'content';
        div.innerHTML = "<img src='https://www.jettools.com/images/animated_spinner.gif' style='border-radius: 8px; width: 30px; height: 30px;' />";
        para.appendChild(div);

        document
          .getElementById("tempRet" + this.props.serial.con_id)
          .appendChild(div); // Append <p> to <div> with id="myDIV"
      }
      else {
        var para = document.createElement("P"); // Create a <p> element
        var t = document.createTextNode(tempRetor + "°C"); // Create a text node
        para.appendChild(t); // Append the text to <p>
        document
          .getElementById("tempRet" + this.props.serial.con_id)
          .appendChild(t); // Append <p> to <div> with id="myDIV"

      }


      //Agregando Estado Contenedor
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
      var myNode = document.getElementById("estado" + this.props.serial.con_id);
      var fc = myNode.firstChild;
      while (fc) {
        myNode.removeChild(fc);
        fc = myNode.firstChild;
      }

      if (temp == 'No Registrado el estado') {
        var para = document.createElement("P"); // Create a <p> element
        let div = document.createElement('div');
        div.id = 'content';
        div.innerHTML = "<img src='https://www.jettools.com/images/animated_spinner.gif' style='border-radius: 8px; width: 30px; height: 30px;' />";
        para.appendChild(div);

        document
          .getElementById("estado" + this.props.serial.con_id)
          .appendChild(div); // Append <p> to <div> with id="myDIV"
      }
      else {
        var para = document.createElement("P"); // Create a <p> element
        var t = document.createTextNode(temp); // Create a text node
        para.appendChild(t); // Append the text to <p>
        document
          .getElementById("estado" + this.props.serial.con_id)
          .appendChild(t); // Append <p> to <div> with id="myDIV"
      }

      //Agregando Setpoint
      const info2 = x.datos2.split("/");
      var setpoint = parseFloat(info2[10]).toFixed(1);
      var myNode = document.getElementById(
        "Setpoint" + this.props.serial.con_id
      );
      var fc = myNode.firstChild;
      while (fc) {
        myNode.removeChild(fc);
        fc = myNode.firstChild;
      }

      if (setpoint == 'NaN') {
        var para = document.createElement("P");
        let div = document.createElement('div');
        div.id = 'content';
        div.innerHTML = "<img src='https://www.jettools.com/images/animated_spinner.gif' style='border-radius: 8px; width: 30px; height: 30px;' />";
        para.appendChild(div);
        document
          .getElementById("Setpoint" + this.props.serial.con_id)
          .appendChild(div);
      }
      else {
        var para = document.createElement("P");
        var t = document.createTextNode(setpoint + "°C");
        para.appendChild(t);
        document
          .getElementById("Setpoint" + this.props.serial.con_id)
          .appendChild(t);

      }

    }

    // else
    // {
    //   alert('no entra');
    // }
    const url =
      "#/Contenedores/contenedor/" + this.props.serial.con_serial_contenedor;
    const {
      con_id,
      con_nombre,
      con_estado,
      con_url_foto,
      con_descripcion,
      cli_razon_social
    } = this.props.serial;

    // const { mqtt } = this.props;
    // mqtt.publish('contenedores/apagado/prueba', 'hola soy react');
    //  console.log(this.props.data[0]);

    return (
      <div className="mainflip">
        <div className="frontside">
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: "#4dbd74", borderColor: "#4dbd74" }}
            >

              <h5 className="text-center text-white" id={"nom_" + this.props.serial.con_id}>
                {this.props.serial.con_nombre}
              </h5>
              <h6 className="text-center text-white">
                {this.props.serial.con_serial_contenedor}
                <ButtonGroup className="float-right">
                  <Dropdown onClick={this.toggleSuccess}>
                    <DropdownToggle className="p-0 btn-lg" color="transparent">
                      <i className="icon-plus font-2x1" />
                    </DropdownToggle>
                  </Dropdown>
                </ButtonGroup>
              </h6>
              <h6 className="text-center text-white">
                {/* Cliente:{this.props.serial.con_nombre} */}
                Cliente: {this.props.serial.cli_razon_social}
              </h6>

            </div>
            <div className="card-body text-center">
              {/* <div className="image_ava"> */}
              <div>
                <img
                  id={"img_" + this.props.serial.con_id}
                  src={this.props.serial.con_url_foto != "" ? (this.props.serial.con_url_foto) : require("../../../image/Contenedor.png")}
                  // className="img-thumbnail rounded mx-auto d-block"
                  style={{ borderRadius: 8, width: "50%" }}
                // alt="avatar"
                />
              </div>
              <br />
              <div className=" text-center ">
                <table className="table table-bordered table-striped">
                  <tbody>
                    <tr className="text-center">
                      <td>
                        <i className="cui-monitor icons font-2xl" />
                      </td>
                      <td className="text-muted">Estado...</td>
                      <td
                        className="font-weight-bold"
                        id={"estado" + this.props.serial.con_id}
                      >
                        {/* Sin Datos */}

                        <img

                          src="https://www.jettools.com/images/animated_spinner.gif"
                          style={{ borderRadius: 8, width: "30px", height: "30px" }}
                        />

                      </td>
                    </tr>
                    <tr className="text-center col">
                      <td>
                        <i className="cui-speedometer icons font-2xl" />
                      </td>
                      <td className="text-muted">T. Suministro.</td>
                      <td
                        className="font-weight-bold"
                        id={"tempSumn" + this.props.serial.con_id}
                      >
                        {/* Sin Datos */}
                        <img

                          src="https://www.jettools.com/images/animated_spinner.gif"
                          style={{ borderRadius: 8, width: "30px", height: "30px" }}
                        />

                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <i className="cui-speedometer icons font-2xl" />
                      </td>
                      <td className="text-muted">T. Retorno</td>
                      <td
                        className="font-weight-bold"
                        id={"tempRet" + this.props.serial.con_id}
                      >
                        {/* Sin Datos */}
                        <img

                          src="https://www.jettools.com/images/animated_spinner.gif"
                          style={{ borderRadius: 8, width: "30px", height: "30px" }}
                        />

                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <i className="cui-graph icons font-2xl" />{" "}
                      </td>
                      <td className="text-muted">Setpoint</td>
                      <td
                        className="font-weight-bold"
                        id={"Setpoint" + this.props.serial.con_id}
                      >
                        <img

                          src="https://www.jettools.com/images/animated_spinner.gif"
                          style={{ borderRadius: 8, width: "30px", height: "30px" }}
                        />

                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <div className="d-flex justify-content-end">
                    <h6 className="align-self-end">Encendido/Apagado</h6>
                    <div className="row">
                      <div className="col-md-12 text-center">
                        {/* <AppSwitch
                          className={"mx-2"}
                          variant={"pill"}
                          color={"success"}
                          outline
                          label
                          checked={
                            this.props.serial.con_estado == 1 ? true : false
                          }
                          disabled
                        /> */}
                        <Switch
                          onChange={this.handleChange}
                          checked={this.state.checked}
                          onColor="#17bd6a"
                          // 
                          disabled={true}
                          uncheckedIcon={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 15,
                                color: "white",
                                paddingRight: 2
                              }}
                            >
                              OFF
                                          </div>
                          }
                          checkedIcon={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 15,
                                color: "white",
                                paddingRight: 2
                              }} >
                              ON
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={this.state.success}
            toggle={this.toggleSuccess}
            className={
              "modal-success modal-lg  text-center" + this.props.className
            }
          >
            <ModalHeader className="text-center" toggle={this.toggleSuccess}>
              Detalles Contenedor
            </ModalHeader>
            <ModalBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    onClick={this.toggleCollapseDescripcion}
                    active={this.state.collapseDescripcion}
                  >
                    {this.state.collapseDescripcion ? (
                      <h6>Descripción</h6>
                    ) : (
                        "Descripción"
                      )}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.toggleCollapseMonitor}
                    active={this.state.collapseMonitor}
                  >
                    {this.state.collapseMonitor ? <h6>Monitor</h6> : "Monitor"}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.toggleCollapseUbicacion}
                    active={this.state.collapseUbicacion}
                  >
                    {this.state.collapseUbicacion ? (
                      <h6>Ubicacion</h6>
                    ) : (
                        "Ubicacion"
                      )}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    onClick={this.toggleCollapseAjustes}
                    active={this.state.collapseAjustes}
                  >
                    {this.state.collapseAjustes ? <h6>Ajustes</h6> : "Ajustes"}
                  </NavLink>
                </NavItem>
              </Nav>

              <Collapse isOpen={this.state.collapseDescripcion}>
                <br />
                <Row>
                  <div className="col-md-6">
                    <div className="card">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: "#4dbd74",
                          borderColor: "#4dbd74"
                        }}
                      >
                        <h5 className="text-center text-white">
                          Informacion del Contenedor
                        </h5>
                      </div>
                      <div className="card-body text-center">
                        <div className="image_ava">
                          <img
                            src={this.props.serial.con_url_foto != "" ? (this.props.serial.con_url_foto) : require("../../../image/Contenedor.png")}
                            // className="img-thumbnail rounded mx-auto d-block  text-center"
                            // alt="avatar"
                            width="50%"
                            style={{ marginBottom: 10 }}
                          />
                        </div>
                        <div className="paneles-usuario">
                          <table className="table table-striped" responsive>
                            <tbody >
                              <tr className="text-center">
                                <td className="text-muted">
                                  Encendido/Apagado
                                </td>
                                <td className="font-weight-bold">
                                  <div className="row">
                                    <div className="col-md-12 text-center">
                                      {/* <AppSwitch
                                        className={"mx-2"}
                                        variant={"pill"}
                                        color={"success"}
                                        //outline
                                        label
                                        checked={con_estado == 1 ? true : false}
                                      //disabled
                                      /> */}
                                      <Switch
                                        onChange={this.handleChange}
                                        checked={this.state.checked}
                                        onColor="#17bd6a"
                                        // 
                                        disabled={(this.props.data[0]) && (onoff != '00') ? false : true}
                                        uncheckedIcon={
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              height: "100%",
                                              fontSize: 15,
                                              color: "white",
                                              paddingRight: 2
                                            }}
                                          >
                                            OFF
                                          </div>
                                        }
                                        checkedIcon={
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              height: "100%",
                                              fontSize: 15,
                                              color: "white",
                                              paddingRight: 2
                                            }} >
                                            ON
                                          </div>
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>

                              <tr className="text-center">
                                <td className="text-muted">
                                  Activar Defrost
                                </td>
                                <td className="font-weight-bold">
                                  <div className="row">
                                    <div className="col-md-12 text-center">
                                      <label>
                                        {/* <Switch
                                          onChange={this.handleChange2}
                                          checked={this.state.checked2}
                                          onColor="#17bd6a"
                                          disabled={(this.props.data[0]) &&	(temp != 'Apagado') ? false : true}
                                          uncheckedIcon={
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "white",
                                                paddingRight: 2
                                              }}
                                            >
                                              OFF
                                          </div>
                                          }

                                          checkedIcon={
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "white",
                                                paddingRight: 2
                                              }}
                                            >
                                              ON
                                          </div>
                                          }

                                        /> */}
                                        {/* 
                                        <ButtonGroup className="float-right">
                                          <Dropdown onClick={this.handleChange2}>
                                            <DropdownToggle className="p-0 btn-lg" color="danger">
                                              <i className="icon-plus font-2x1" />
                                            </DropdownToggle>
                                          </Dropdown>
                                        </ButtonGroup> */}
                                        <Button className="p-0 btn-success " style={{
                                          width: 50,
                                          height: 30,
                                          borderRadius: 40,
                                          justifyContent: "center",
                                          alignItems: "center",
                                          textAlign: "center"

                                        }}
                                          onClick={this.handleChange2} disabled={(this.props.data[0]) && (onoff == '11') && (!this.state.checked2) ? false : true}>
                                          {this.state.checked2 && <i className="fa fa-refresh fa-spin fa-lg" ></i>}
                                          {!this.state.checked2 && <i class="fa fa-power-off fa-lg" style={{ justifyContent: "center" }}></i>}
                                          {/* {!this.state.checked2 && <span>OK</span>} */}
                                        </Button>
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr className="text-center">
                                <td className="text-muted">Nombre</td>
                                <td className="font-weight-bold">
                                  {con_nombre}
                                </td>
                              </tr>
                              <tr className="text-center">
                                <td className="text-muted">Serial</td>
                                <td className="font-weight-bold">
                                  {this.props.serial.con_serial_contenedor}
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: "#4dbd74",
                          borderColor: "#4dbd74"
                        }}
                      >
                        <h5 className="text-center text-white">
                          Datos Generales
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="image_ava">
                          <div className="row">
                            <div className="col-md-6">
                              <div>
                                <RadialGauge
                                  units="°C | °F"
                                  title="Temp Sum"
                                  value={tempSumn}
                                  minValue={-50}
                                  maxValue={50}
                                  size={60}
                                  majorTicks={[
                                    "-50",
                                    "-40",
                                    "-30",
                                    "-20",
                                    "-10",
                                    "0",
                                    "10",
                                    "20",
                                    "30",
                                    "40",
                                    "50"
                                  ]}
                                  minorTicks={10}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div>
                                <RadialGauge
                                  units="°C"
                                  title="Temp Ret"
                                  value={tempRetor}
                                  minValue={-50}
                                  maxValue={50}
                                  size={60}
                                  majorTicks={[
                                    "-50",
                                    "-40",
                                    "-30",
                                    "-20",
                                    "-10",
                                    "0",
                                    "10",
                                    "20",
                                    "30",
                                    "40",
                                    "50"
                                  ]}
                                  minorTicks={10}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="paneles-usuario">
                          <table className="table table-striped" responsive>
                            <tbody>
                              <tr className="text-center">
                                <td className="text-muted">Estado.</td>
                                {temp == "No Registrado el estado" ?
                                  <img

                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "25px", height: "25px", marginTop: "5px" }}
                                  />
                                  :
                                  <td className="font-weight-bold">{temp}</td>
                                }
                              </tr>
                              <tr className="text-center">
                                <td className="text-muted">T. Suministro...</td>
                                {tempSumn == "NaN" ?
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  />
                                  :
                                  <td className="font-weight-bold">{tempSumn + "°C"}</td>
                                }

                              </tr>
                              <tr className="text-center">
                                <td className="text-muted">t. Retorno</td>


                                {tempRetor == "NaN" ?
                                  <td className="font-weight-bold">
                                    <img
                                      src="https://www.jettools.com/images/animated_spinner.gif"
                                      style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                    /></td>
                                  :
                                  <td className="font-weight-bold">
                                    {tempRetor + "°C"}
                                  </td>
                                }


                              </tr>
                              <tr className="text-center">
                                <td className="text-muted">Set Point</td>
                                {setpoint == "NaN" ?
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  />
                                  :
                                  <td className="font-weight-bold">{setpoint + "°C"}</td>
                                }
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>

                <tr className="text-center">
                  <td className="text-muted"> Descripcion: </td>
                  <td className="font-weight-bold">
                    {con_descripcion == null ||
                      con_descripcion == ""
                      ? " Sin Descripcion"
                      : con_descripcion}
                  </td>
                </tr>
              </Collapse>

              <Collapse isOpen={this.state.collapseMonitor}>
                <br />
                <Card>
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#4dbd74",
                      borderColor: "#4dbd74"
                    }}
                  >
                    <h5 className="text-center text-white">Monitor</h5>
                  </div>
                  <CardBody>
                    <Row>
                      <Col xs="10" lg="4">
                        <Table responsive size="sm">
                          <thead>
                            <tr>
                              <th />
                              <th>Sensors</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>STS</td>

                              {STS == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{STS}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RTS</td>
                              {RTS == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{RTS}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>SRS</td>
                              {SRS == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{SRS}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RRS</td>
                              {RRS == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{RRS}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Cargo Temp</td>
                              <td>XX</td>
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Ambient Temp</td>
                              {ambTemp == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{ambTemp}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Comp Dsch Temp</td>
                              {CDT == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{CDT}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Comp Suct Temp</td>
                              {CST == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{CST}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>DTS Temp</td>
                              {DTSTemp == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{DTSTemp}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Humid H20 Temp</td>
                              {HumidH2O == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{HumidH2O}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Humidity</td>
                              {Humidity == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{Humidity}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>CPC Press</td>
                              {CPCPress == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{CPCPress}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Suct Press</td>
                              {Spress == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{Spress}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Disch Press</td>
                              {Dpress == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{Dpress}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Int Therm Temp</td>
                              {IntTermTemp == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{IntTermTemp}</td>
                              }
                            </tr>
                          </tbody>
                        </Table>
                      </Col>

                      <Col xs="10" lg="4">
                        <Table responsive size="sm">
                          <thead>
                            <tr>
                              <th />
                              <th>Sensors</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Composite Ret</td>
                              {Cret == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{Cret}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Composite Sup</td>
                              {Csup == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{Csup}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Sup Line Volts</td>
                              {SupLineVolts == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{SupLineVolts}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Phase A</td>
                              {PhaseA == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{PhaseA}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Phase B</td>
                              {PhaseB == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{PhaseB}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Phase C</td>
                              {PhaseC == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{PhaseC}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Power Sup DC</td>
                              {PowerSDC == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{PowerSDC}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>AF CO2 Sensor</td>
                              <td>XX</td>
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>AF O2 Calc</td>
                              <td>XXXX</td>
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>Baterry Volt</td>
                              {BatteryVolt == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{BatteryVolt}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RTC Battery</td>
                              {RTCBattery == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{RTCBattery}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RM Def Ther Tm</td>
                              <td>XXXX</td>
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RM Rt Temp</td>
                              <td>XXXX</td>
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RM Supp Tm1</td>
                              <td>XXXX</td>
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RM Supp Tm2</td>
                              <td>XXXX</td>
                            </tr>



                          </tbody>
                        </Table>
                      </Col>

                      <Col xs="10" lg="4">
                        <Table responsive size="sm">
                          <thead>
                            <tr>
                              <th />
                              <th>Sensors</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>


                            {/* **************************************************************************************** */}
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>RM Comp Sup</td>
                              <td>XX</td>
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>USDA1 Temp</td>
                              {usda1 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{usda1}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>USDA2 Temp</td>
                              {usda2 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{usda2}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>USDA3 Temp</td>
                              {usda3 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{usda3}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>USDA4 Temp</td>
                              {usda4 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{usda4}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info31 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info31}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info32 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info32}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info33 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info33}</td>
                              }
                            </tr>


                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info34 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info34}</td>
                              }
                            </tr>

                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info35 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info35}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info36 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info36}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info37 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info37}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info38 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info38}</td>
                              }
                            </tr>
                            <tr>
                              <td>
                                <i className="cui-speedometer icons font-2xl" />
                              </td>
                              <td>no reconocido</td>
                              {info39 == "NaN" ?
                                <td>
                                  <img
                                    src="https://www.jettools.com/images/animated_spinner.gif"
                                    style={{ borderRadius: 8, width: "20px", height: "20px", marginTop: "5px" }}
                                  /></td>
                                :
                                <td>{info39}</td>
                              }
                            </tr>


                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Collapse>
              <Collapse isOpen={this.state.collapseUbicacion}>
                <br />
                <Card>
                  <CardBody>
                    <Row>
                      <div className="col-md-12">
                        <div className="card">
                          <div
                            className="card-header"
                            style={{
                              backgroundColor: "#4dbd74",
                              borderColor: "#4dbd74"
                            }}
                          >
                            <h5 className="text-center text-white">
                              Ubicacion del Contenedor
                            </h5>

                            <tr>
                              <td className="text-white">{con_nombre}</td>
                            </tr>
                            <tr>
                              <td className="text-white">Serial:</td>
                              <td className="text-white">
                                {//this.props.serial.con_serial_contenedor
                                }
                                <input id="txtserial" type="text" class="form-control form-control" value={this.props.serial.con_serial_contenedor} readonly></input>
                              </td>
                            </tr>
                          </div>
                          <div className="card-body">
                            <div className="paneles-usuario">

                              {/* <ReactNotification ref={this.notificationDOMRef} /> */}
                              {/* <button className='btn btn-info'
                                onClick={this.sendMessage.bind(this)}>Info
                               </button> */}
                              <NotificationContainer />
                              <SimpleMap serial={this.props.data[0]} />

                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Collapse>

              <Collapse isOpen={this.state.collapseAjustes}>
                <br />
                <Row>
                  <div className="col-md-12">
                    <div className="card">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: "#4dbd74",
                          borderColor: "#4dbd74"
                        }}
                      >
                        <h4 className="text-center text-white">
                          Editar Contenedor
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="image_ava">
                          {/* <img
                            src={require("../../../image/Contenedor.png")}
                            className="img-thumbnail rounded mx-auto d-block"
                            roundedCircle
                            alt="Contenedor"
                            width=""
                         /> */}

                          <div style={{ position: "relative" }} align="center">
                            <img src={this.props.serial.con_url_foto != "" ? (this.props.serial.con_url_foto) : require("../../../image/Contenedor.png")} style={{ position: "relative", zIndex: 1 }} width="30%" />
                            <img src={this.state.imageNew} width="30%" />
                          </div>


                        </div>
                        <br />
                        <div className="paneles-usuario">
                          <Form
                            encType="multipart/form-data"
                            className="form-horizontal"
                          >


                            <FormGroup row>
                              <Col md="2">
                                <Label
                                  for="image_upload"
                                  className="align-center"
                                >
                                  <h6>Imagen:</h6>
                                </Label>
                              </Col>
                              <Col xs="12" md="10">
                                <Input
                                  type="file"
                                  name="image_upload"
                                  id="image_upload"
                                  accept="image/*"
                                  onChange={this.cargarImage}
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Col xs="12" md="9">
                                {/* <Button color="success"></Button> */}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Col md="2">
                                <Label
                                  for="nombreContenedor"
                                  className="align-center"
                                >
                                  <h6>Nombre:</h6>
                                </Label>
                              </Col>
                              <Col xs="12" md="10">
                                <Input
                                  // ref={this.nombreRef}
                                  type="text"
                                  className="form-control"
                                  // placeholder={this.props.serial.con_nombre}
                                  defaultValue={this.props.serial.con_nombre}
                                  id="newNombre"
                                // defaultValue={usu_nombre==null || usu_nombre==""? '': usu_nombre}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleText">
                                <h6>Descripción:</h6>{" "}
                              </Label>
                              <Input
                                type="textarea"
                                name="text"
                                id="newDescripcion"
                                // value={this.props.serial.con_descripcion}
                                defaultValue={this.props.serial.con_descripcion}
                                placeholder={"Descripción:"}
                              />
                            </FormGroup>
                            <Label style={{ color: "red" }}>{this.state.errorEditar}</Label>
                            {/* <Button color="primary">Guardar</Button> */}
                          </Form>
                          <Button color="primary" onClick={() => this.editarContenedor(this.props.serial.con_id, this.props.serial.con_url_foto)}>Guardar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </Collapse>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggleSuccess}>
                Cerrar
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>
      </div >
    );
  }
}
