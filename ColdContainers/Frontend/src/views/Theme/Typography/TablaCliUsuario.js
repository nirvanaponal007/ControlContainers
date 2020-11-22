import React, { Component } from 'react';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'reactstrap';
import { PostData } from '../../../Servicios/PostData';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' ;// Import css
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Col
} from 'reactstrap';



class Tabla extends Component {

  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  usernameRef = React.createRef();
  contrasenaRef = React.createRef();
  correoRef = React.createRef();
  celularRef = React.createRef();
  nitRef = React.createRef();
  estadoRef = React.createRef();
  //fileRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      primary: false,
      error: false,
      large: false,
      usuarios: 0,
      data:''
    };
  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  toggleLarge = () => {
    this.setState({
      large: !this.state.large,
      error: false
    });
  }

  crearUsuario = e => {

    e.preventDefault();
    const nombre = this.nombreRef.current.value;
    const apellido = this.apellidoRef.current.value;
    const username = this.usernameRef.current.value;
    const contrasena = this.contrasenaRef.current.value;
    const correo = this.correoRef.current.value;
    const celular = this.celularRef.current.value;
    const nit = this.props.nit;
    const estado = this.estadoRef.current.value;
    //const  imagen = this.fileRef.current.value;


    if (nombre === '' || apellido === '' || username === '' || contrasena === '' ||
      correo === '' || celular === '' || nit === '' || estado === '') {
      //|| imagen === ''
      this.setState({
        error: {
          nombre: nombre ? true : false,
          apellido: apellido ? true : false,
          username: username ? true : false,
          contrasena: contrasena ? true : false,
          correo: correo ? true : false,
          celular: celular ? true : false,
          nit: nit ? true : false,
          estado: estado ? true : false,
          //imagen : imagen ? true:false
        }
      })
    }
    else {

      const nuevoCliente = {
        nombre,
        apellido,
        username,
        contrasena,
        correo,
        celular,
        nit,
        estado,
        //imagen
      };
      const validEmail = this.validate(correo);
      if (validEmail) {
        PostData("InsertarUsuario", "POST", nuevoCliente).then(result => {
          let respuesta = result;
          if (respuesta.message === 'Nit no encontrado') {
            alert(respuesta.message);
            window.location.reload();
          } else {
            alert('Usuario Insertado Correctamente');
            window.location.reload();
          }
        });
      } else {
        alert('Error Formato Email')
        window.location.reload();
      }

      this.toggleLarge();
      this.setState({
        error: false
      })
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////
  eliminarUsuario = (row) => {
    console.log(row);
    confirmAlert({
      title: 'Eliminar Usuario',
      message: '¿Esta Seguro Que Desea Eliminar El Usuario?',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            PostData("EliminarUsuario", "POST", {id_usuario:row.usu_id}).then(result => {
              alert('Se Elimino Correctamente')
              window.location.reload();
           
            });
          }
        },
        {
          label: 'No',
          onClick: () => alert('Se cancelo la operacion ')
          
        }
      ]
    })
  }

  togglePrimary = () => {
    this.setState({
      primary: !this.state.primary,
      error: false
    });
  };

  
  prevenirDefault= e => {
    e.preventDefault();
  }

  handleClick = (rowKey) => {
    alert(this.refs.table.getPageByRowKey(rowKey));
  }
  buttonFormatter = (cell, row) => {
    return <div>
    <Button onClick={this.toggleLarge} className="btn-success" href={'#/Usuarios/Usuario/' + row.usu_id} ><i className="fa fa-eye fa-md"></i></Button>
    <Button onClick={this.toggleLarge}  className="btn-warning" href={'#/Usuarios/EditarUsuario/' + row.usu_id} ><i className="fa fa-edit fa-md"></i></Button>
    <Button onClick={this.toggleLarge}  className="btn-danger"  onClick={()=> this.eliminarUsuario(row)} ><i className="fa fa-user-times fa-md"></i></Button>
   </div>
  }

  buttonFormatterEstado = (cell, row) => {
    if (row.usu_estado === 1) {
      return <Button onClick={this.prevenirDefault} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>
    } else if (row.usu_estado === 0) {
      return <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Inactivo</Button>
    } else {
      return <Button onClick={this.prevenirDefault} size="sm" className="btn-instagram btn-brand icon mr-1 mb-1">Sin descripcion</Button>
    }
  }
  buttonFormatNombre = (cell, row) => {
    return <p>{row.usu_nombre === "" || row.usu_nombre == null ? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Nombre</Button> : row.usu_nombre}</p>
  }
  buttonFormatApellido = (cell, row) => {
    return <p>{row.usu_apellido === "" || row.usu_apellido == null ? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Apellido</Button> : row.usu_apellido}</p>
  }
  buttonFormatTelefono = (cell, row) => {
    return <p>{row.usu_celular === "" || row.usu_celular == null ? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Telefono Celular</Button> : row.usu_celular}</p>
  }
  buttonFormatCorreo = (cell, row) => {
    return <p>{row.usu_email === "" || row.usu_email == null ? <Button  onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Correo</Button> : row.usu_email}</p>
  }
  buttonFormatusername = (cell, row) => {
    return <p>{row.usu_username === "" || row.usu_username == null ? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin UserName</Button> : row.usu_username}</p>
  }
  buttonFormatfe = (cell, row) => {
    return <p>{row.usu_fecha_creacion === "" || row.usu_fecha_creacion == null ? <Button onClick={this.prevenirDefault}  size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Fecha De Creación</Button> : row.usu_fecha_creacion}</p>
  }


  render() {
    const existeError = this.state.error;  
    const { usuarios } = this.props.dataUsuarios;
   // console.log(this.props);
    // console.log(usuarios);
    return (
      <div>
        <div className="card" style={{ borderColor: '#4dbd74' }}>
          <div className="row">
            <div className="col-md-5"> <Button onClick={this.toggleLarge} className="btn-success btn-brand mr-1 mb-1"><i className="fa fa-user-plus"></i><span>Crear Usuario</span></Button>
            </div>
            <div className="col-md-7"><h4 style={{ color: '#4dbd74' }}>Usuarios</h4></div>
          </div>
        </div>

        <BootstrapTable
          ref='table'
          data={usuarios}
        
          pagination={true}
          search={true}
          striped={true}
          button={true}
          hover={true}>

          <TableHeaderColumn  width='75' dataField='usu_estado' dataFormat={this.buttonFormatterEstado}>Estado</TableHeaderColumn>
          <TableHeaderColumn  width='80' dataField='usu_nombre' dataFormat={this.buttonFormatNombre}>Nombre</TableHeaderColumn>
          <TableHeaderColumn  width='80' dataField='usu_apellido' dataFormat={this.buttonFormatApellido}>Apellido</TableHeaderColumn>
          <TableHeaderColumn  width='100' dataField='usu_username' dataFormat={this.buttonFormatusername}>Username</TableHeaderColumn>
          <TableHeaderColumn  width='125' dataField='usu_email' isKey={true} dataFormat={this.buttonFormatCorreo}>Correo</TableHeaderColumn>
          <TableHeaderColumn  width='85' dataField='usu_celular' dataFormat={this.buttonFormatTelefono}>Telefono</TableHeaderColumn>
          <TableHeaderColumn  width='150' dataField="button" dataFormat={this.buttonFormatter}>Acción</TableHeaderColumn>
        </BootstrapTable>
        
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
             {/*<FormGroup row>
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
                  />}
                  {/* <FormText className="help-block">Celular: </FormText> }
                </Col>
             </FormGroup>*/}
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
      </div>
    );
  }

}

export default Tabla;
