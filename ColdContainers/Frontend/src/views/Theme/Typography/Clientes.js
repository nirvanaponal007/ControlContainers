import React, { Component } from "react";
import TablaCliente from "./TablaClientes";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { PostData } from "../../../Servicios/PostData";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Label,
} from "reactstrap";

class Tablas extends Component {
  razonSocialRef = React.createRef();
  nitRef = React.createRef();
  emailRef = React.createRef();
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
      primary: false,
      error: false
    };
  }

  togglePrimary = () => {
    this.setState({
      primary: !this.state.primary,
      error: false
    });
  };


  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false){
      return false;
    }else {
      return true;
    }
  }

  crearCliente = e => {

    e.preventDefault();

    const nit = this.nitRef.current.value,
      razonSocial = this.razonSocialRef.current.value,
      estado = this.estadoRef.current.value,
      email = this.emailRef.current.value,
      direccion = this.direccionRef.current.value,
      telefono = this.telefonoRef.current.value,
      pagina_web = this.paginaWebRef.current.value,
      n_empleados = this.nEmpleadosRef.current.value,
      celular= this.celularRef.current.value
      //imagen = this.fileRef.current.value
    

    if ( nit === '' || razonSocial === '' ||  estado === '' || email === '' || direccion === '' ||
     telefono === '' || pagina_web === '' || n_empleados === '' || celular === '' //|| imagen === ''
     ) {
      this.setState({
        error : {
          nit : nit ? true: false,
          razonSocial: razonSocial ? true:false,
          estado : estado ? true : false,
          email: email ? true : false,
          direccion: direccion ? true : false,
          telefono : telefono ? true : false,
          pagina_web: pagina_web ? true : false,
          n_empleados: n_empleados ? true : false,
          celular : celular ? true : false ,
          //imagen: imagen ? true: false

        }
      })
    }
    else{
    const nuevoCliente = {
      nit, razonSocial, estado, email, direccion, telefono, pagina_web, n_empleados,
      celular //,imagen
    };
    
    const validEmail = this.validate(email);
    if(validEmail){
      PostData("InsertarCliente", "POST", nuevoCliente).then(result => {
        let respuesta = result;
        console.log(respuesta);
        if(respuesta.message.error){
          alert('Error cliente ya existe')
          window.location.reload();
        }else{
          
          alert('Su Usuario es: '+respuesta.datos.username+' O '+respuesta.datos.correo+', Su Contraseña es: '+respuesta.datos.contraseña)
          window.location.reload();
        }
      });
    }else{
      alert('Error Formato Email')
      window.location.reload();
    }
      this.togglePrimary();
      this.setState({
        error: false
      })
    }
  };

  render() {
    const existeError = this.state.error;
    return (
      <div className="animated fadeIn">
        <div className="card-header " style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
          <h3 className="text-center text-white">{this.props.titulo}</h3>
        </div>
        <div className="card-body">
          <div>
          <Button  onClick={this.togglePrimary} className="btn-success btn-brand mr-1 mb-1"><i className="fa fa-user-plus"></i><span>Crear Cliente</span></Button>

            <Modal
              isOpen={this.state.primary}
              toggle={this.togglePrimary}
              className={"modal-success " + this.props.className}
            >
              <ModalHeader toggle={this.togglePrimary}>
                Nuevo Cliente
              </ModalHeader>
              <ModalBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label className="text-input">Razon Social:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <input
                        ref={this.razonSocialRef}
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      <FormText color="muted">Ejemplo : Tu Software</FormText>
                    </Col>
                    <Col md="3">
                      <Label htmlFor="text-input">Nit:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <input
                        ref={this.nitRef}
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      <FormText color="muted">Ejemplo : 1234567890-1</FormText>
                    </Col>
                    <Col md="3">
                      <Label htmlFor="email-input">Email:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <input
                        type="email"
                        ref={this.emailRef}
                        id="email-input"
                        name="email-input"
                        className="form-control"
                        ref={this.emailRef}
                        placeholder=""
                        autoComplete="email"
                      />
                      <FormText className="help-block">
                        Ejemplo : usuario@ejemplo.com
                      </FormText>
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
                        placeholder=""
                      />
                      <FormText className="help-block">Ejemplo : </FormText>
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
                        placeholder=""
                        autoComplete="telefono"
                      />
                      <FormText className="help-block">Telefono: </FormText>
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
                        placeholder=""
                        autoComplete="telefono"
                      />
                      <FormText className="help-block">Celular: </FormText>
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
                        placeholder=""
                      />
                      <FormText className="help-block">Pagina : </FormText>
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
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                      </select>
                      <FormText className="help-block">
                        Cantidad de empleados:{" "}
                      </FormText>
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
                      <FormText className="help-block">
                        Estado del cliente:{" "}
                      </FormText>
                    </Col>
                  </FormGroup>
                  {/* <FormGroup row>
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
                  </FormGroup> */}
                </Form>
                {existeError ? <div className="alert alert-danger text-center">Todos los campos son obligatorios </div> : ''}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.togglePrimary}>
                  Cancel
                </Button>
                <Button color="success" onClick={this.crearCliente}>
                  Crear
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <TablaCliente clientes={this.props.clientes} />
          {/*console.log(this.props.clientes)*/}
        </div>
      </div>
    );
  }
}

export default Tablas;
