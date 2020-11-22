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
  Table,
} from 'reactstrap';

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
    };
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
    const usu_apellido= this.state.usuario.usu_apellido;
    const usu_celular= this.state.usuario.usu_celular;
    const usu_contrasena= this.state.usu_contrasena;
    const usu_email= this.state.usuario.usu_email;
    const usu_estado= this.state.usuario.usu_estado;
    const usu_fecha_creacion= this.state.usuario.usu_fecha_creacion;
    const usu_id= this.state.usuario.usu_id;
    const usu_id_cliente= this.state.usuario.usu_id_cliente;
    const usu_nombre= this.state.usuario.usu_nombre;
    const usu_username= this.state.usuario.usu_username;
    return (
      <div>  
        <Row>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <h5 className="text-center text-white">Detalles del Usuario </h5>
              </div>
              <div className="card-body">
                <div className="image_ava">
                  <img src={require('../../../image/avatar.png')} className="img-thumbnail rounded mx-auto d-block" alt="avatar"/>
                </div>
                <br/>
                <div className="paneles-usuario">
                  <table className="table table-striped">
                    <tbody>
                      <tr className="text-center">
                        <td className="text-muted">Nombre</td>
                        <td className="font-weight-bold" >{usu_nombre==null || usu_nombre==""? 'Sin Nombre': usu_nombre}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Apellido</td>
                        <td className="font-weight-bold" >{usu_apellido==null || usu_apellido==""? 'Sin Apellido': usu_apellido}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Username</td>
                        <td className="font-weight-bold" >{usu_username==null || usu_username==""? 'Sin UserName': usu_username}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Correo</td>
                        <td className="font-weight-bold" >{usu_email==null || usu_email==""? 'Sin Correo': usu_email}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Telefono</td>
                        <td className="font-weight-bold" >{usu_celular==null || usu_celular==""? 'Sin Telefono': usu_celular}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Fecha Creacion</td>
                        <td className="font-weight-bold" >{usu_fecha_creacion==null || usu_fecha_creacion==""? 'Sin Fecha De Creacion': usu_fecha_creacion}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Estado</td>
                        <td className="font-weight-bold" >
                          <div className="row">
                            <div className="col-md-12 text-center">
                            {
                              usu_estado==1 ?
                                <Button size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>
                              :
                                <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Inactivo</Button>
                            }
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

export default Usuario;