import React, { Component } from 'react';
import {PostData} from '../../../Servicios/PostData';
import Widget02 from '../../Widgets/Widget02';
import { AppSwitch } from '@coreui/react'
import socketIOClient from "socket.io-client";
import { RadialGauge } from 'react-canvas-gauges';
import GoogleMapReact from 'google-map-react';
import App from '../Graficas/TimeReal';
import HistoryTemp from '../Graficas/App';
import  Tabla  from './table';
import {Redirect} from 'react-router-dom';

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

class EditarUsuario extends Component {
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    usernameRef = React.createRef();
    correoRef = React.createRef();
    celularRef = React.createRef();
    estadoRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
    };
  }

  editarUsuario = e => {
    e.preventDefault();
    const nombre = this.nombreRef.current.value;
    const apellido = this.apellidoRef.current.value;
    const  username = this.usernameRef.current.value;
    const  correo = this.correoRef.current.value;
    const  celular = this.celularRef.current.value;
    const  estado = this.estadoRef.current.value;
    const id_usuario = this.props.match.params.id;
    
    if (  nombre === '' || apellido === '' ||username === '' || 
        correo === '' || celular === '' ||  estado === '' ) {
          //|| imagen === ''
      this.setState({
        error : {
          nombre : nombre ? true:false,
          apellido : apellido ? true:false,
          username : username ? true:false,
          correo : correo ? true:false,
          celular: celular ? true:false,
          estado : estado ? true:false,
          //imagen : imagen ? true:false
        }
      })      
    }
    else{

      const nuevoCliente = {
        nombre,
        apellido ,
        celular,
        estado,
        id_usuario,
      };
      const validEmail = this.validate(correo);
      if (validEmail) {
        PostData("EditarUsuario", "POST", nuevoCliente).then(result => {
          let respuesta = result;
          alert('Editado Correctamente')
          window.location.reload();
        });
      }else{
        alert('Error Formato Email')
        window.location.reload();
      }
      this.setState({
        error: false
      })
    }
  };
  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false){
      return false;
    }else {
      return true;
    }
  }
  componentDidMount() {
      PostData('TraerUsuarioXId','POST',{id: this.props.match.params.id}).then((result)=>{
        const responseJSON = result;
        this.setState({
          usuario: responseJSON[0]
        });
      })
  }

  render() {

  if(this.state.usuario.usu_id){
  if(this.props.match.params.id == this.state.usuario.usu_id){
  }else{
    return(<Redirect to={'/dashboard'}/>)
  }}
    const usu_apellido= this.state.usuario.usu_apellido;
    const usu_celular= this.state.usuario.usu_celular;
    const usu_email= this.state.usuario.usu_email;
    const usu_estado= this.state.usuario.usu_estado;
    const usu_nombre= this.state.usuario.usu_nombre;
    const usu_username= this.state.usuario.usu_username;
    const  usuario = sessionStorage.getItem('Usuario');
    const usuId = JSON.parse(usuario);
    const {usr_id_rol} = usuId.usuario.data[0];
    return (
      <div>  
        <Row>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <h5 className="text-center text-white">Editar Usuario </h5>
              </div>
              <div className="card-body">
                <div className="image_ava">
                  <img src={require('../../../image/avatar.png')} className="img-thumbnail rounded mx-auto d-block" alt="avatar"/>
                </div>
                <br/>
                <div className="paneles-usuario">
                    <Form encType="multipart/form-data" className="form-horizontal" onSubmit={this.editarUsuario}>
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
                                defaultValue={usu_nombre==null || usu_nombre==""? '': usu_nombre}
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
                                defaultValue={usu_apellido==null || usu_apellido==""? '': usu_apellido}
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
                                defaultValue={usu_email==null || usu_email==""? '': usu_email}
                                required
                                disabled
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
                                defaultValue={usu_username==null || usu_username==""? '': usu_username}
                                autoComplete="email"
                                disabled
                                />
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
                                defaultValue={usu_celular==null || usu_celular==""? '': usu_celular}
                                />
                                {/* <FormText className="help-block">Telefono: </FormText> */}
                            </Col>
                        </FormGroup>
                        {usr_id_rol == 3 ? null : 
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
                                defaultValue={usu_estado==1?'Activo':'Inactivo'}
                                >
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                                </select>
                                {/* <FormText className="help-block"> Estado del cliente:{" "}</FormText> */}
                            </Col>
                        </FormGroup>
                        }
                        <Button color="primary" >Guardar</Button>
                    </Form>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

export default EditarUsuario;