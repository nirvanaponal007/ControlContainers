import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { DotLoader } from 'react-spinners';
// import {ClipLoader} from 'react-spinners/ClipLoader';
import {ReporteEstados} from './Reportes';
import {ReporteEventos} from './Reportes';
import {ReporteAlarmas} from './Reportes';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,

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
  ModalHeader,
  Jumbotron
} from "reactstrap";
import { PostData } from '../../../Servicios/PostData';
import HistoryTemp from '../../Theme/Graficas/App';

var moment = require('moment');

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      planets: [],
      clientes: []
    };
  }

  componentDidMount() {

    var Usuario = JSON.parse(sessionStorage.getItem('Usuario'));
    var rol = Usuario.usuario.data[0].usr_id_rol;
    var filtrar = sessionStorage.getItem('cli_reporte');
    console.log(filtrar);
    var aux_cont = [];
    PostData('TraerClientesSelect', 'GET').then((result2) => {
      const responseJSON2 = result2;
      this.setState({
        clientes: responseJSON2.clientes
      });
    }).catch((err) => {
      console.log(err);
    })

    if (rol == 1) {
      PostData('TraerContenedores', 'GET').then((result) => {
        const responseJSON = result;
        const selcon = [responseJSON.eventos];
        Object.keys(selcon[0]).map(function (key) {
          if (selcon[0][key].cli_id == filtrar) {
            aux_cont.push(selcon[0][key]);
          }
        });
        this.setState({
          planets: aux_cont,
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
          aux_cont.push(selcon[0][key]);
        });
        this.setState({
          planets: aux_cont,
        });
      }).catch((err) => {
        console.log(err);
      })

    }


  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className='text-center card-header' style={{ backgroundColor: "#4dbd74", borderColor: "#4dbd74" }}>
            <h4 className="text-center text-white">Reportes</h4>
          </div>
          <SelectContenedor state={this.state} />
        </div>
      </div>
    );
  }
}

var array = [];


class SelectContenedor extends Component {
  Selectreporte = React.createRef();
  contenedorRef = React.createRef();
  clienteRef = React.createRef();
  tipoGraficaRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      tempSuministro: [],
      startDate: new Date(),
      startDate2: new Date(),
      loading: true,
      error: false
    };

    this.state = {
      TempSumi: 0,
      success: false,
      success2: false,
      success3: false,
      success4: false
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleSuccess2 = this.toggleSuccess2.bind(this);
    this.toggleSuccess3 = this.toggleSuccess3.bind(this);
    this.toggleSuccess4 = this.toggleSuccess4.bind(this);
    this.selecfecha1 = this.selecfecha1.bind(this);
    this.selecfecha2 = this.selecfecha2.bind(this);

  }

  toggleSuccess() {

    this.setState({
      success: !this.state.success,
      datagrafica1: {},

    });
  }

  toggleSuccess2() {

    this.setState({
      success2: !this.state.success2,
      datagrafica1: {}
    });
  }



  toggleSuccess3() {

    this.setState({
      success3: !this.state.success3,
      datagrafica1: {}
    });
  }


  toggleSuccess4() {

    this.setState({
      success4: !this.state.success4,
      datagrafica1: {}
    });
  }

  selecfecha1(date) {
    console.log(date);

    this.setState({
      startDate: date
    });
  }

  selecfecha2(date) {
    console.log(date);

    this.setState({
      startDate2: date
    });
  }





  Graficar = e => {
    e.preventDefault();
    array = [];
    const contenedorselec = this.contenedorRef.current.value;
    if(contenedorselec==0 || !this.state.startDate || !this.state.startDate2){
      // console.log("*Es obligatorio seleccionar un contenedor");
      this.setState({
        error: true
      });

    }
    else{
    


    if (document.forms["form1"].elements[0].checked == true) {               //para el reporte de estados checkbox 0
      console.log("reporte estado ");
      this.setState({
        success2: !this.state.success2,
        datagrafica1: {},
        loading2: true,
        error: false,
        dataContSelect:""
      });

      const contenedor = this.contenedorRef.current.value;
      console.log(contenedor);
      const timeinicio = Math.round((new Date(this.state.startDate)).getTime() / 1000)
      const timefinal = Math.round((new Date(this.state.startDate2)).getTime() / 1000)
      console.log(timeinicio);
      console.log(timefinal);
      var timestamp2 = moment.unix(timeinicio);
      console.log(timestamp2.format("MMMM D, YYYY h:mm A"));
      var timestamp = moment.unix(timefinal);
      console.log(timestamp.format("MMMM D, YYYY h:mm A"));
      var info = { id_contenedor: contenedor, fechaInferior: timeinicio, fechaSuperior: timefinal };
      PostData('ReporteTempSuministro', 'POST', info).then((result) => {
        console.log(result);
        this.setState({
          datagrafica1: result,
          loading2: false,
          dataContSelect:contenedor
        })
      }).catch((err) => {
        console.log(err);
      })
    }

    else if (document.forms["form1"].elements[1].checked == true) {
      console.log("reporte de eventos seleccionado");
      this.setState({
        success3: !this.state.success3,
        datagrafica1: {},
        // loading3: true,
        loading3: false,
        error: false,
        // dataContSelect:""
      });
    }
    else if (document.forms["form1"].elements[2].checked == true) {
      console.log("reporte de Alarmas seleccionado");
      this.setState({
        success4: !this.state.success4,
        datagrafica1: {},
        // loading4: true,
        loading4: false,
        error: false,
        // dataContSelect:""
      });
    }
    else {

      this.setState({
        success: !this.state.success,
        datagrafica1: {},
        loading: true,
        error:false
      });



      for (var i = 0; i < document.forms["form1"].elements.length; i++) {
        var porElementos = document.forms["form1"].elements[i].checked;
        if (porElementos == true) {
          array.push(document.forms["form1"].elements[i].value);
        }
      }
      console.log(array);
      

      const contenedor = this.contenedorRef.current.value;
      // const tipoGrafica = this.tipoGraficaRef.current.value;
      console.log(contenedor);
      // console.log(tipoGrafica);
      // if (tipoGrafica === "1") {
      // const timestamp = Math.round((new Date()).getTime() / 1000)
      const timeinicio = Math.round((new Date(this.state.startDate)).getTime() / 1000)
      const timefinal = Math.round((new Date(this.state.startDate2)).getTime() / 1000)
      console.log(timeinicio);

      console.log(timefinal);

      var timestamp2 = moment.unix(timeinicio);
      console.log(timestamp2.format("MMMM D, YYYY h:mm A"));
      var timestamp = moment.unix(timefinal);
      console.log(timestamp.format("MMMM D, YYYY h:mm A"));


      var info = { id_contenedor: contenedor, fechaInferior: timeinicio, fechaSuperior: timefinal };
      PostData('ReporteTempSuministro', 'POST', info).then((result) => {
        console.log(result);
        //falta mapear el arreglo, y sacar temperaturas con split 


        this.setState({
          datagrafica1: result,
          loading: false,
          dataContSelect:contenedor
        })
        console.log("consultafinalizada");

      }).catch((err) => {
        console.log(err);
      })

      //   console.log('Temperaruta Suministro');
      // } else if (tipoGrafica === "2") {
      //   console.log('Temperaruta Retorno');
      // } else if (tipoGrafica === "3") {
      //   console.log('Temperaruta Set Point');
      // } else if (tipoGrafica === "4") {
      //   console.log('Historial Estado');
      // } else if (tipoGrafica === "5") {
      //   console.log('Historial Encendido/Apagado');
      // } else {
      //   console.log('no se encentra tipo de grafica');
      // }

    }
  }
  }

  deseleccionar() {
    if (document.forms["form1"].elements[0].checked == true) {
      for (var i = 0; i < document.forms["form1"].elements.length; i++) {
        if (document.forms["form1"].elements[i].value == 'Estado') {
          document.forms["form1"].elements[i].disabled = false;
        } else {
          document.forms["form1"].elements[i].disabled = true;
          document.forms["form1"].elements[i].checked = 0;
        }
      }
    }
    else if (document.forms["form1"].elements[1].checked == true) {
      for (var i = 0; i < document.forms["form1"].elements.length; i++) {
        if (document.forms["form1"].elements[i].value == 'Eventos') {
          document.forms["form1"].elements[i].disabled = false;
        } else {
          document.forms["form1"].elements[i].disabled = true;
          document.forms["form1"].elements[i].checked = 0;
        }
      }
    }
    else if (document.forms["form1"].elements[2].checked == true) {
      for (var i = 0; i < document.forms["form1"].elements.length; i++) {
        if (document.forms["form1"].elements[i].value == 'Alarmas') {
          document.forms["form1"].elements[i].disabled = false;
        } else {
          document.forms["form1"].elements[i].disabled = true;
          document.forms["form1"].elements[i].checked = 0;
        }
      }
    }
    else {
      for (var i = 0; i < document.forms["form1"].elements.length; i++) {

        document.forms["form1"].elements[i].disabled = false;

      }

    }

  }

  selectodo() {

    for (var i = 0; i < document.forms["form1"].elements.length; i++) {
      var aux = document.forms["form1"].elements[i].value;
      if (aux != "Estado" && aux != "Eventos" && aux != "Alarmas") {
        document.forms["form1"].elements[i].checked = 1;
      }
    }

  }
  limpiar() {
    for (var i = 0; i < document.forms["form1"].elements.length; i++) {
      document.forms["form1"].elements[i].checked = 0;
      document.forms["form1"].elements[i].disabled = false;
    }
  }

  filtrarXCliente = e => {
    e.preventDefault();
    const clientesel = this.clienteRef.current.value;
    sessionStorage.setItem('cli_reporte', clientesel);
    console.log("filtro" + sessionStorage.getItem('cli_reporte'));
    window.location.reload();

  }

  render() {
    var Usuario = JSON.parse(sessionStorage.getItem('Usuario'));
    var rol = Usuario.usuario.data[0].usr_id_rol;
    // console.log(this.state.checkedItems);
    var filtrar = sessionStorage.getItem('cli_reporte');
    let planets = this.props.state.planets;
    let clientes = this.props.state.clientes;

    let optionItems2 = planets.map((planet) =>
      <option value={planet.con_id} key={planet.con_id}>{planet.con_serial_contenedor} - {planet.con_nombre}</option>
    );

    let optionItems = clientes.map((cliente) =>
      <option selected={(filtrar == cliente.cli_id) ? true : false} value={cliente.cli_id} key={cliente.cli_id}>{cliente.cli_razon_social}</option>
    );
    return (
      <div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <ul className="list-group list-group-flush col-md-12">
              <li className="list-group-item">
                {rol == 1 ?
                  <div className="row">
                    <label className="col-md-2 control-label" style={{ top: "5px" }} htmlFor="selectContenedor"><strong>Cliente:</strong></label>
                    <div className="col-md-4">

                      <select ref={this.clienteRef} id="selectCliente" name="selectCliente" className="form-control" style={{ top: "5px", borderColor: "green" }} onChange={this.filtrarXCliente}>
                        <option value={"default"} key={"default"}> </option>
                        {optionItems}
                      </select>
                    </div>

                    <label className="col-md-2 control-label" style={{ top: "5px" }} htmlFor="selectContenedor"><strong>Contenedor:</strong></label>
                    <div className="col-md-4">
                      <select ref={this.contenedorRef} id="selectContenedor" name="selectContenedor" className="form-control" style={{ top: "5px", borderColor: "green" }} >
                        {optionItems2}
                      </select>
                    </div>
                    {/* <label className="col-md-2 control-label" style={{ top: "5px" }} htmlFor="selectTipoReporte"><strong>Tipo Reporte</strong></label>
                    <div className="col-md-4">
                      <select ref={this.tipoGraficaRef} id="selectTipoReporte" name="selectTipoReporte" className="form-control">
                        <option value="1">Temperaruta Suministro</option>
                        <option value="2">Temperaruta Retorno</option>
                        <option value="3">Temperaruta Set Point</option>
                        <option value="4">Historial Estado</option>
                        <option value="5">Historial Encendido/Apagado</option>
                      </select>
                    </div> */}
                  </div> :
                  <div className="row">
                    <label className="col-md-2 control-label" style={{ top: "5px" }} htmlFor="selectContenedor"><strong>Contenedor:</strong></label>
                    <div className="col-md-4">
                      <select ref={this.contenedorRef} id="selectContenedor" name="selectContenedor" className="form-control" style={{ top: "5px", borderColor: "green" }}>
                        {optionItems2}
                      </select>
                    </div>
                  </div>
                }


              </li>




              <Jumbotron>
                <div className='text-center card-header' style={{ backgroundColor: "#4dbd74", borderColor: "#4dbd74" }}>
                  <h4 className="text-center text-white">Seleccionar Rango</h4>


                  <label className=" col-md-2 control-label" style={{ top: "5px", textAlign: 'right' }} htmlFor="selectContenedor"><strong>Fecha inicio: </strong></label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.selecfecha1}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Hora"
                    disabled={this.props.state.planets.length != 0 ? false : true}
                    locale={es}
                    placeholderText="seleccionar inicio"
                  />
                  <label className=" col-md-2  control-label" style={{ top: "5px", textAlign: 'right' }} htmlFor="selectContenedor"><strong>Fecha final: </strong></label>
                  <DatePicker
                    selected={this.state.startDate2}
                    onChange={this.selecfecha2}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Hora"
                    locale={es}
                    minDate={this.state.startDate}
                    disabled={this.props.state.planets.length != 0 ? false : true}
                    placeholderText="seleccionar final"

                  />

                </div>
                <h4 >Seleccionar Reportes</h4>

                <form id="form1" >


                  <Table responsive size="sm">

                    <tbody>

                      <tr>
                        <td><input onChange={this.deseleccionar} type="checkbox" name="Estado" value="Estado" style={{ height: 20, width: 20 }} />Estado</td>
                        <td></td>
                        <td><input onChange={this.deseleccionar} type="checkbox" name="Eventos" value="Eventos" style={{ height: 20, width: 20 }} />Eventos</td>
                        <td></td>
                        <td><input onChange={this.deseleccionar} type="checkbox" name="Alarmas" value="Alarmas" style={{ height: 20, width: 20 }} />Alarmas</td>
                        <td></td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <h4 >Otros Reportes:</h4>
                      <tr>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="setpoint" value="27,Setpoint" />Setpoint</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="STS" value="0,STS" />STS</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="RTS" value="1,RTS" />RTS</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="SRS" value="2,SRS" />SRS</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="RRS" value="3,RRS" />RRS</td>
                        {/* <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="5,Cargo Temp" />Cargo Temp</td> */}
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="4,Ambient Temp" />Ambient Temp</td>
                      </tr>
                      <tr>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="5,Comp Dsch Temp" />Comp Dsch Temp</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="6,Comp Suct Temp" />Comp Suct Temp</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="7,DTS Temp" />DTS Temp</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="8,Humid H2O Temp" />Humid H2O Temp</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="9,Humidity" />Humidity</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="10,CPC Press" />CPC Press</td>
                      </tr>
                      <tr>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="11,Suct Press" />Suct Press</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="12,Disch Press" />Disch Press</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="13,Int Therm Temp" />Int Therm Temp</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="14,Composite Ret" />Composite Ret</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="15,Composite Sup" />Composite Sup</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="16,Sup Line Volts" />Sup Line Volts</td>
                      </tr>
                      <tr>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="17,Phase A" />Phase A</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="18,Phase B" />Phase B</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="19,Phase C" />Phase C</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="20,Power Sup DC" />Power Sup DC</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="21,Battery Volt" />Battery Volt</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="22,RTC Battery" />RTC Battery</td>
                      </tr>
                      <tr>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="23,USDA1 Temp" />USDA1 Temp</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="24,USDA2 Temp" />USDA2 Temp</td>
                        <td> <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="25,USDA3 Temp" />USDA3 Temp</td>
                        <td><input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="26,USDA4 Temp" />USDA4 Temp</td>

                      </tr>

                    </tbody>
                  </Table>
                </form>
                <Button style={{ borderColor: "green" }} color="success" onClick={this.limpiar}>Limpiar</Button>
                {/* <Button style={{ borderColor: "green" }} color="success" onClick={this.selectodo}>Seleccionar Todo</Button> */}

                {this.state.error?<div className="alert alert-danger text-center">Todos los campos son obligatorios </div> : ''}
              </Jumbotron>


              <li className="list-group-item">
                <div className="col-md-12" align="center">
                  <Button color="primary" onClick={this.Graficar}>Enviar</Button>
                </div>
              </li>
            </ul>
          </li>

        </ul>

        <Modal
          isOpen={this.state.success}
          toggle={this.toggleSuccess}
          className={
            "modal-success modal-lg  text-center" + this.props.className
          }
        >
          <ModalHeader className="text-center" toggle={this.toggleSuccess}>
            Reporte
            </ModalHeader>
          <ModalBody>
            <Nav tabs>
            </Nav>

            <li className="list-group-item">
              {this.state.loading == true ?
                <div className='sweet-loading'>
                  <DotLoader
                    css={override}
                    sizeUnit={"px"}
                    size={300}
                    color={'#34B57A'}
                    loading={this.state.loading}
                  />
                </div>
                :

                <HistoryTemp datos1={this.state.datagrafica1} array={array} id_cont={this.state.dataContSelect}/>
              }
            </li>
          </ModalBody>
        </Modal>


        <Modal
          isOpen={this.state.success2}
          toggle={this.toggleSuccess2}
          className={
            "modal-success modal-lg  text-center" + this.props.className
          }
        >
          <ModalHeader className="text-center" toggle={this.toggleSuccess2}>
            Reporte Estados
            </ModalHeader>
          <ModalBody>
            <Nav tabs>
            </Nav>
            {this.state.loading2 == true ?

            <div className='sweet-loading'>
              <DotLoader
                css={override}
                sizeUnit={"px"}
                size={300}
                color={'#34B57A'}
                loading={this.state.loading2}
              />
            </div>
            :
            <div>
              <ReporteEstados datos1={this.state.datagrafica1}/>
            </div>
            }
          </ModalBody>
        </Modal>





        <Modal
          isOpen={this.state.success3}
          toggle={this.toggleSuccess3}
          className={
            "modal-success modal-lg  text-center" + this.props.className
          }
        >
          <ModalHeader className="text-center" toggle={this.toggleSuccess3}>
            Reporte Eventos
            </ModalHeader>
          <ModalBody>
            <Nav tabs>
            </Nav>
            {this.state.loading3 == true ?

            <div className='sweet-loading'>
              <DotLoader
                css={override}
                sizeUnit={"px"}
                size={300}
                color={'#34B57A'}
                loading={this.state.loading3}
              />
            </div>
            :
            <div>
              <ReporteEventos datos1={[]}/>
            </div>
            }
          </ModalBody>
        </Modal>




        <Modal
          isOpen={this.state.success4}
          toggle={this.toggleSuccess4}
          className={
            "modal-success modal-lg  text-center" + this.props.className
          }
        >
          <ModalHeader className="text-center" toggle={this.toggleSuccess4}>
            Reporte Alarmas
            </ModalHeader>
          <ModalBody>
            <Nav tabs>
            </Nav>
            {this.state.loading4 == true ?

            <div className='sweet-loading'>
              <DotLoader
                css={override}
                sizeUnit={"px"}
                size={300}
                color={'#34B57A'}
                loading={this.state.loading4}
              />
            </div>
            :
            <div>
              <ReporteAlarmas datos1={[]}/>
            </div>
            }
          </ModalBody>
        </Modal>






      </div>


    )
  }
}

export default Cards;
