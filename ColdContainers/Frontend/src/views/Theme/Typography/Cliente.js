import React, { Component } from "react";
import { PostData } from "../../../Servicios/PostData";
import "./Cliente.css";
import TablaCliUsuario from "./TablaCliUsuario";
import TablaCliContenedores from "./TablaCliContenedores";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {Button, Col, Form, FormGroup, FormText, Label} from "reactstrap";
import {Redirect} from 'react-router-dom';


class Cliente extends Component {


  direccionRef = React.createRef();
  telefonoRef = React.createRef();
  celularRef = React.createRef();
  paginaWebRef = React.createRef();
  nEmpleadosRef = React.createRef();
  estadoRef = React.createRef();
  fileRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      cliente: '',
      dataUsuarios: [],
      dataContenedores: [],
      contenedoresSinAsignar: [],
      primary: false,
      error: false,
      nit: ''
    };
  }
  

  componentDidMount() {
    const clienteId = { id_cliente: this.props.match.params.id };
    PostData("TraerClienteXId", "POST", clienteId).then(result => {
      let responseJSON = result;
      const { cliente } = responseJSON;
      const cliente1 = cliente[0];
      this.setState({
        cliente: cliente1
      });
    });
    this.cargarUsuarios();
    this.cargarContenedores();
    this.cargarNitCliente();
    this.cargarContenedoresSinAsignar();
}

cargarUsuarios = () => {
  const clienteId = { id_cliente: this.props.match.params.id };
  PostData("TraerUsuariosXIdCliente", "POST", clienteId).then(result => {
    const dataUsuarios = result;
    this.setState({
      dataUsuarios: dataUsuarios
    })
  });
}

cargarContenedores = () => {
  const clienteId = { id_cliente: this.props.match.params.id };
  PostData("TraerContenedorXIdCliente", "POST", clienteId).then(result => {
    const dataContenedores = result.Contenedores;
    this.setState({
      dataContenedores: dataContenedores
    })
  });
}

cargarNitCliente = () => {
  const clienteId = { id_cliente: this.props.match.params.id };
  PostData("TraerClienteXId", "POST", clienteId).then(result => {
    const nit = result.cliente[0].cli_nit_empresa;
    this.setState({
      nit: nit
    })
  });
}

cargarContenedoresSinAsignar= () => {
  const clienteId = { id_cliente: this.props.match.params.id };
  PostData("TraerContenedorNoAsignadosXIdCliente", "POST", clienteId).then(result => {
    const contenedoresSinAsignar = result.Contenedores;
    this.setState({
      contenedoresSinAsignar: contenedoresSinAsignar
    })
  });
}

prevenirDefault= e => {
  e.preventDefault();
}

togglePrimary = () => {
  this.setState({
    primary: !this.state.primary,
    error: false
  });
};

editarPerfil = (e) => {
  const datosEditar = {
    direccion: '',
    telefono: '',
    celular:'',
    pagina_web:'',
    Nempleados: '',
    estado:'',
    imagen:'',
    id_cliente: this.state.cliente.cli_id
  };

  const direccion = this.direccionRef.current.value;
  if (direccion === this.state.cliente.cli_direccion || !direccion){
      datosEditar.direccion= this.state.cliente.cli_direccion;
  }
  else{
    datosEditar.direccion= direccion;
  }

  const telefono = this.telefonoRef.current.value;
  if (direccion === this.state.cliente.cli_telefono || !telefono){
      datosEditar.telefono= this.state.cliente.cli_telefono;
  }
  else{
    datosEditar.telefono= telefono;
  }
  
  const celular = this.celularRef.current.value;
  if (celular === this.state.cliente.cli_celular || !celular){
      datosEditar.celular = this.state.cliente.cli_celular;
  }
  else{
    datosEditar.celular= celular;
  }

  const pagina_web = this.paginaWebRef.current.value;
  if (pagina_web === this.state.cliente.cli_pagina_web || !pagina_web){
      datosEditar.pagina_web = this.state.cliente.cli_pagina_web;
  }
  else{
    datosEditar.pagina_web= pagina_web;
  }
  
  const n_empleados = this.nEmpleadosRef.current.value;
  if (n_empleados === this.state.cliente.cli_n_empleados || !n_empleados){
      datosEditar.Nempleados = this.state.cliente.cli_n_empleados;
  }
  else{
    datosEditar.Nempleados= Number(n_empleados);
  }

  const estado = this.estadoRef.current.value;
  if (estado === this.state.cliente.cli_estado || !estado){
      datosEditar.estado = this.state.cliente.cli_estado;
  }
  else{
    datosEditar.estado= estado;
  }

  const imagen = this.fileRef.current.value;
  if (imagen === this.state.cliente.cli_imagen || !imagen){
      datosEditar.imagen = this.state.cliente.fileRef;
  }
  else{
    datosEditar.imagen= imagen;
  }
  PostData('EditarCliente', 'POST', datosEditar).then(result => {
    const respuesta = result.message;
    console.log(respuesta);
    if(respuesta === 'Datos Editados Exitosamente'){
      alert('Modificacion De Datos Exitosa..');
      //window.location.reload();
    }else{
      alert('Modificacion De Datos Fallida..')
      //window.location.reload();
    }
  })
 this.togglePrimary();
}

  render() {
    const existeError = this.state.error;
    const idCliente = this.state.cliente.cli_id;

    const  usuario = sessionStorage.getItem('Usuario');
    const usuId = JSON.parse(usuario);
    const {usr_id_rol} = usuId.usuario.data[0];

     return (
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-img">
                <img
                src={require('../../../image/avatar.png')} style={{maxWidth: '50%'}} className="img-thumbnail rounded mx-auto d-block" alt="avatar"/>
                </div>
            </div>
            <div className="col-md-7">
              <div className="profile-head">
                <h5>{this.state.cliente.cli_razon_social}</h5>
                <h6>
                  {!this.state.cliente.cli_estado ? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1" onClick={this.prevenirDefault}>Inactivo</Button> : <Button onClick={this.prevenirDefault} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>}
                </h6>
              </div>
            </div>
            <div className="col-md-2">
            <Button onClick={this.togglePrimary} className="btn-success btn-brand mr-1 mb-1"><i className="fa fa fa-edit"></i><span>Edit Profile</span></Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="profile-work">
                <p>DETALLES</p>
                <a href="">Nit : {this.state.cliente.cli_nit_empresa}</a>
                <br />
                <a href="">Telefono : {this.state.cliente.cli_telefono}</a>
                <br />
                <a href="">celular : {this.state.cliente.cli_celular}</a>
                <br />
                <a href="">Direccion : {this.state.cliente.cli_direccion}</a>
                <br />
                <a href="">Pagina : {this.state.cliente.cli_pagina_web}</a>
                <br />
                <a href="">
                  N° Empleados : {this.state.cliente.cli_n_empleados}
                </a>
              </div>
            </div>
            <div className="col-md-9">
            <div className="card" style={{borderColor: '#4dbd74'}}>
              <TablaCliUsuario 
              dataUsuarios = {this.state.dataUsuarios}
              nit = {this.state.nit}
              />
              </div>
              {usr_id_rol === 1 ? 
                <div className="card" style={{borderColor: '#4dbd74'}}>
                <TablaCliContenedores
                  dataContenedores = {this.state.dataContenedores}
                  contenedoresSinAsignar = {this.state.contenedoresSinAsignar}
                  idCliente = {this.state.cliente.cli_id}
              />
               </div>
              : null
              }
            </div>
          </div>
        </form>
      
      
        <Modal
        isOpen={this.state.primary}
        toggle={this.togglePrimary}
        className={"modal-success " + this.props.className}
      >
        <ModalHeader toggle={this.togglePrimary}>
          Editar Cliente
        </ModalHeader>
        <ModalBody>
          <Form encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label className="text-input">Razon Social:</Label>
              </Col>
              <Col xs="12" md="9">
                <input disabled
                  type="text"
                  className="form-control"
                  placeholder={this.state.cliente.cli_razon_social}
                />
                <FormText color="muted"></FormText>
              </Col>
              <Col md="3">
                <Label htmlFor="text-input">Nit:</Label>
              </Col>
              <Col xs="12" md="9">
                <input disabled
                  type="text"
                  className="form-control"
                  placeholder={this.state.cliente.cli_nit_empresa}
                />
                <FormText color="muted"></FormText>
              </Col>
              <Col md="3">
                <Label htmlFor="email-input">Email:</Label>
              </Col>
              <Col xs="12" md="9">
                <input disabled
                  type="email"
                  id="email-input"
                  name="email-input"
                  className="form-control"
                  ref={this.emailRef}
                  placeholder={this.state.cliente.cli_email}
                  autoComplete="email"
                />
                <FormText className="help-block"></FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="direccion">Direccion:</Label>
              </Col>
              <Col xs="12" md="9">
                <input
                  type="text"
                  id="direccion-input"
                  className="form-control"
                  ref={this.direccionRef}
                  placeholder={this.state.cliente.cli_direccion}
                />
                <FormText className="help-block"></FormText>
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
                  ref={this.telefonoRef}
                  placeholder={this.state.cliente.cli_telefono}
                  autoComplete="telefono"
                />
                <FormText className="help-block"> </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="celular">Celular:</Label>
              </Col>
              <Col xs="12" md="9">
                <input
                  className="form-control"
                  type="tel"
                  id="celular-input"
                  name="celular-input"
                  ref={this.celularRef}
                  placeholder={this.state.cliente.cli_celular}
                  autoComplete="telefono"
                />
                <FormText className="help-block"></FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="pagina">Pagina Web:</Label>
              </Col>
              <Col xs="12" md="9">
                <input
                  className="form-control"
                  type="text"
                  id="pagina-input"
                  ref={this.paginaWebRef}
                  placeholder={this.state.cliente.cli_pagina_web}
                />
                <FormText className="help-block"></FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="selectEmpleados">N° Empleados</Label>
              </Col>
              <Col xs="12" md="9">
                <select
                  className="form-control"
                  type="select"
                  name="selectEmpleados"
                  ref={this.nEmpleadosRef}
                  id="selectEmpleados"
                >
                  <option value={this.state.cliente.cli_n_empleados}>{this.state.cliente.cli_n_empleados}</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="250">250</option>
                  <option value="500">500</option>
                </select>
                <FormText className="help-block"></FormText>
              </Col>
            </FormGroup>
            {usr_id_rol === 1 ? <FormGroup row>
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
                <FormText className="help-block">
                  Estado Actual: {this.state.cliente.cli_estado === '1' ? "Activo" : "Inactivo" }
                </FormText>
              </Col>
            </FormGroup> : null }
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="file-input">File input</Label>
              </Col>
              <Col xs="12" md="9">
                <input
                  type="file"
                  ref={this.fileRef}
                  id="file-input"
                  name="file-input"
                />
              </Col>
            </FormGroup>
          </Form>
          {existeError ? <div className="alert alert-danger text-center">Todos los campos son obligatorios </div> : ''}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.togglePrimary}>
            Cancel
          </Button>
          <Button color="success" onClick={this.editarPerfil}>
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default Cliente;

