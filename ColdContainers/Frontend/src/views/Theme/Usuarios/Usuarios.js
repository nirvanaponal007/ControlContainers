import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
// import { Row, Col } from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { RadialGauge } from 'react-canvas-gauges';
import {PostData} from '../../../Servicios/PostData';
import {Redirect, Link} from 'react-router-dom';
import { AppSwitch } from '@coreui/react'
//import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import socketIOClient from "socket.io-client";
import Tabla from './table'
import {
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  FormText,
  Label,
  //Table,
} from 'reactstrap';


class Usuarios extends Component {
  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  usernameRef = React.createRef();
  contrasenaRef = React.createRef();
  correoRef = React.createRef();
  celularRef = React.createRef();
  nitRef = React.createRef();
  estadoRef = React.createRef();
  //fileRef = React.createRef();
  constructor(props){
    super(props)
    this.state = {
      usuarios: 0,
      large: false,
      error: false,
    };
    this.toggleLarge = this.toggleLarge.bind(this);
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
      error: false
    });
  }
  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false){
      return false;
    }else {
      return true;
    }
  }

  crearUsuario = e => {

    e.preventDefault();
    const nombre = this.nombreRef.current.value;
    const apellido = this.apellidoRef.current.value;
    const  username = this.usernameRef.current.value;
    const  contrasena = this.contrasenaRef.current.value;
    const  correo = this.correoRef.current.value;
    const  celular = this.celularRef.current.value;
    const  nit = this.nitRef.current.value;
    const  estado = this.estadoRef.current.value;
    //const  imagen = this.fileRef.current.value;
    

    if (  nombre === '' || apellido === '' ||username === '' || contrasena === '' || 
        correo === '' || celular === '' || nit === '' ||  estado === '' ) {
          //|| imagen === ''
      this.setState({
        error : {
          nombre : nombre ? true:false,
          apellido : apellido ? true:false,
          username : username ? true:false,
          contrasena: contrasena ? true:false,
          correo : correo ? true:false,
          celular: celular ? true:false,
          nit : nit ? true:false,
          estado : estado ? true:false,
          //imagen : imagen ? true:false
        }
      })      
    }
    else{

      const nuevoCliente = {
        nombre,
        apellido ,
        username ,
        contrasena,
        correo ,
        celular,
        nit ,
        estado,
        //imagen
      };
      const validEmail = this.validate(correo);
      if (validEmail) {
        PostData("InsertarUsuario", "POST", nuevoCliente).then(result => {
          let respuesta = result;
          if (respuesta.message.error) {
            alert(respuesta.message.error);
             window.location.reload();
          }
          else if (respuesta.message === 'Nit no encontrado') {
            alert(respuesta.message);
             window.location.reload();
          }else{
            alert('Usuario Insertado Correctamente');
             window.location.reload();
          }
        }).catch(err => {
          alert(err.message);
        });
      }else{
        alert('Error Formato Email')
        window.location.reload();
      }
      this.toggleLarge();
      this.setState({
        error: false
      })
    }
  };

  componentDidMount() {
    PostData('TraerUsuarios','GET').then((result)=>{
      const responseJSON = result;
      if (responseJSON.message === "No hay datos en la BD") {
        this.setState({
          usuarios: []
        });
      }else{
        this.setState({
          usuarios: responseJSON
        });
      }
      
    }).catch((err) => {
        console.log(err);
    })
  }
  render() {
    const usuarios = this.state.usuarios ;   
    const existeError = this.state.error;    
    return (
      <Row>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
              <h5 className="text-center text-white">Mapa Contenedor</h5>
            </div>
            <div className="card-body">
              <div className="paneles-usuario">
                <Button  onClick={this.toggleLarge} className="btn-success btn-brand mr-1 mb-1"><i className="fa fa-user-plus"></i><span>Crear Usuario</span></Button>
                <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                        className={'modal-lg modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLarge}>Crear Usuario</ModalHeader>
                  <ModalBody>
                    <Form encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label className="text-input">Nombre:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          ref={this.nombreRef}
                          type="text"
                          className="form-control"
                          placeholder="Ejemplo : Jose David"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Apellido:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          ref={this.apellidoRef}
                          type="text"
                          className="form-control"
                          placeholder="Ejemplo : Beltran Lopez"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          type="email"
                          ref={this.correoRef}
                          id="email-input"
                          name="email-input"
                          className="form-control"
                          placeholder="Ejemplo : usuario@ejemplo.com"
                          required
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Username:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          type="text"
                          ref={this.usernameRef}
                          id="email-input"
                          name="email-input"
                          className="form-control"
                          placeholder="Ejemplo : xxxxxxx"
                          autoComplete="email"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="direccion">Contraseña:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          type="password"
                          id="direccion-input"
                          className="form-control"
                          ref={this.contrasenaRef}
                          placeholder="Ejemplo: XXXXXXXXX"
                        />
                        {/* <FormText className="help-block">Ejemplo : </FormText> */}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="telefono">Telefono:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          className="form-control"
                          type="tel"
                          id="telefono-input"
                          name="telefono-input"
                          ref={this.celularRef}
                          placeholder="Telefono: XXX-XXX-XXXX"
                        />
                        {/* <FormText className="help-block">Telefono: </FormText> */}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="celular">Nit :</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          className="form-control"
                          type="tel"
                          id="celular-input"
                          name="celular-input"
                          ref={this.nitRef}
                          placeholder="Nit"
                        />
                        {/* <FormText className="help-block">Celular: </FormText> */}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="selectEstado">Estado</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <select
                          className="form-control"
                          type="select"
                          name="selectEstado"
                          ref={this.estadoRef}
                          id="selectEstado"
                        >
                          <option value="1">Activo</option>
                          <option value="0">Inactivo</option>
                        </select>
                        {/* <FormText className="help-block"> Estado del cliente:{" "}</FormText> */}
                      </Col>
                    </FormGroup>
                    {/* <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">Imagen</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <input
                          type="file"
                          ref={this.fileRef}
                          id="file-input"
                          name="file-input"
                        />
                      </Col>
                    </FormGroup> */}
                  </Form>
                  {existeError ? <div className="alert alert-danger text-center">Todos los campos son obligatorios </div> : ''}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.toggleLarge}>Cancelar</Button>
                    <Button color="primary" onClick={this.crearUsuario}>Guardar</Button>
                  </ModalFooter>
                </Modal>
                <Tabla usuario={usuarios}/>
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

export default Usuarios;
