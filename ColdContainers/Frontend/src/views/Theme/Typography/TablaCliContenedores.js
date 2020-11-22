import React, { Component } from 'react';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'reactstrap';
import { PostData } from "../../../Servicios/PostData";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,

} from 'reactstrap';


class TablaCliContenedores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      primary: false,
      error: false,
      large: false,
    };
  }

 

  vincularContenedor = (id) => {
    const data = { id_cliente: this.props.idCliente,
                  id_contenedor: id,
                  estado: 1
                 };
    PostData("InsertarCLienteContainer", "POST", data).then(result => {
      const confirmacion = result;
      if(confirmacion.message === 'Insertado Correctamente'){
        alert('Contenedor Agregado Correctamente');
        window.location.reload();
      }else{
        alert('Error Contenedor No Agregado');
        window.location.reload();
      }
    });
  }

  desvincularContenedor = (id) => {
    const data = { id_cliente: this.props.idCliente,
                  id_contenedor: id,
                  };
    PostData("EliminarClienteContainer", "POST", data).then(result => {
      const confirmacion = result;
      if(confirmacion.message === "Eliminado Correctamente"){
        alert('Contenedor Eliminado Del Cliente');
        window.location.reload();
      }else{
        alert('Error Contenedor No Eliminado Del Cliente');
        window.location.reload();
      }
    });
  }

  toggleLarge = () => {
    this.setState({
      large: !this.state.large,
      error: false
    });
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




  buttonFormatter =(cell, row)=>{
    return <div>
    <Button onClick={this.toggleLarge} className="btn-success" href= {'#/Contenedores/'} ><i className="fa fa-eye fa-md"></i></Button>
    <Button className="btn-danger" onClick={()=> this.desvincularContenedor(row.con_id)} ><i className="fa fa-remove fa-md"></i></Button>
    </div>
  }

  buttonFormatterEstado = (cell, row)=> {
    if(row.con_estado===1){
      return <Button onClick={this.prevenirDefault} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>
    }else if(row.con_estado===0){
      return <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Inactivo</Button>
    }else{
      return <Button onClick={this.prevenirDefault} size="sm" className="btn-instagram btn-brand icon mr-1 mb-1">Sin descripcion</Button>
    } 
  }
  buttonFormatId = (cell,row)=> {
    return <p>{row.con_id==="" ||row.con_id==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Id</Button>: row.con_id}</p>
  }
  buttonFormatNombre = (cell,row)=> {
    return <p>{row.con_nombre==="" || row.con_nombre==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Nombre</Button>: row.con_nombre}</p>
  }
  buttonFormatApellido = (cell,row)=> {
    return <p>{row.usu_apellido==="" || row.usu_apellido==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Apellido</Button>: row.usu_apellido}</p>
  }
  buttonFormatTelefono = (cell,row)=> {
    return <p>{row.usu_celular==="" || row.usu_celular==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Telefono Celular</Button>: row.usu_celular}</p>
  }
  buttonFormatDescripcion = (cell,row)=> {
    return <p>{row.con_descripcion==="" || row.con_descripcion==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Descripción</Button>: row.con_descripcion}</p>
  }
  buttonFormatSerial = (cell,row)=> {
    return <p>{row.con_serial_contenedor==="" || row.con_serial_contenedor==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Serial</Button>: row.con_serial_contenedor}</p>
  }
  buttonFormatfe = (cell,row)=> {
    return <p>{row.con_fecha_creacion==="" || row.con_fecha_creacion==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Fecha De Creación</Button>: row.con_fecha_creacion}</p>
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
buttonFormatterC =(cell, row)=>{
  return <div><Button className="btn-success btn" onClick={()=> this.vincularContenedor(row.con_id)}><i className="fa fa-plus"></i></Button></div>
  
}

buttonFormatterEstadoC = (cell, row)=> {
  if(row.con_estado===1){
    return <Button onClick={this.prevenirDefault} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>
  }else if(row.con_estado===0){
    return <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Inactivo</Button>
  }else{
    return <Button onClick={this.prevenirDefault} size="sm" className="btn-instagram btn-brand icon mr-1 mb-1">Sin descripcion</Button>
  } 
}

buttonFormatIdC = (cell,row)=> {
  return <p>{row.con_id==="" ||row.con_id==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Id</Button>: row.con_id}</p>
}
buttonFormatNombreC = (cell,row)=> {
  return <p>{row.con_nombre==="" || row.con_nombre==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Nombre</Button>: row.con_nombre}</p>
}
buttonFormatApellidoC = (cell,row)=> {
  return <p>{row.usu_apellido==="" || row.usu_apellido==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Apellido</Button>: row.usu_apellido}</p>
}
buttonFormatTelefonoC = (cell,row)=> {
  return <p>{row.usu_celular==="" || row.usu_celular==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Telefono Celular</Button>: row.usu_celular}</p>
}
buttonFormatDescripcionC = (cell,row)=> {
  return <p>{row.con_descripcion==="" || row.con_descripcion==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Descripción</Button>: row.con_descripcion}</p>
}
buttonFormatSerialC = (cell,row)=> {
  return <p>{row.con_serial_contenedor=="" || row.con_serial_contenedor==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Serial</Button>: row.con_serial_contenedor}</p>
}
buttonFormatfeC = (cell,row)=> {
  return <p>{row.con_fecha_creacion==="" || row.con_fecha_creacion==null? <Button onClick={this.prevenirDefault} size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Fecha De Creación</Button>: row.con_fecha_creacion}</p>
}

  render() {
    const dataContenedores = this.props.dataContenedores;
    const contenedoresSinAsignar = this.props.contenedoresSinAsignar;
    return (
      <div>
      <div className="card" style={{borderColor: '#4dbd74'}}>
      <div className="row">
      <div className="col-md-5"><Button color="success" onClick={this.toggleLarge} className="mr-1 btn btn-success">Agregar Contenedores</Button>
      </div> 
      <div className="col-md-7"><h4 style={{color: '#4dbd74'}}>Contenedores</h4></div>
      </div>
      </div>
      <BootstrapTable  
      ref='table'
      data={ dataContenedores }
      pagination={ true }
      search={ true }
      striped={true} 
      button={true}
      hover={true}>
      <TableHeaderColumn width="75" dataField='con_estado' dataFormat={this.buttonFormatterEstado}>Estado</TableHeaderColumn>
      <TableHeaderColumn width="100" dataField='con_nombre' dataFormat={this.buttonFormatNombre} >Nombre</TableHeaderColumn>
      <TableHeaderColumn dataField='con_serial_contenedor' dataFormat={this.buttonFormatSerial} isKey={true}>Serial</TableHeaderColumn>
      <TableHeaderColumn dataField='con_fecha_creacion' dataFormat={this.buttonFormatfe}>Fecha Creación</TableHeaderColumn>
      <TableHeaderColumn width="120" dataField='con_descripcion'  dataFormat={this.buttonFormatDescripcion}>Descripción</TableHeaderColumn>
      <TableHeaderColumn width="100" dataField="button" dataFormat={this.buttonFormatter}>Acción</TableHeaderColumn>
    </BootstrapTable>

    <Modal isOpen={this.state.large} toggle={this.toggleLarge}
    className={'modal-lg modal-success ' + this.props.className}>
    <ModalHeader toggle={this.toggleLarge}>Agregar Contenedores</ModalHeader>
    <ModalBody>

    <BootstrapTable  
        ref='table'
        data={ contenedoresSinAsignar }
        pagination={ true }
        search={ true }
        striped={true} 
        button={true}
        hover={true}>
        <TableHeaderColumn width="75" dataField='con_estado' dataFormat={this.buttonFormatterEstadoC}>Estado</TableHeaderColumn>
        <TableHeaderColumn width="120" dataField='con_nombre' dataFormat={this.buttonFormatNombreC} >Nombre</TableHeaderColumn>
        <TableHeaderColumn dataField='con_serial_contenedor' dataFormat={this.buttonFormatSerialC} isKey={true}>Serial</TableHeaderColumn>
        <TableHeaderColumn dataField='con_fecha_creacion' dataFormat={this.buttonFormatfeC}>Fecha Creación</TableHeaderColumn>
        <TableHeaderColumn dataField='con_descripcion'  dataFormat={this.buttonFormatDescripcionC}>Descripción</TableHeaderColumn>
        <TableHeaderColumn width="70" dataField="button" dataFormat={this.buttonFormatterC}>Acción</TableHeaderColumn>
    </BootstrapTable>

    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={this.toggleLarge}>Cerrar</Button>
      </ModalFooter>
  </Modal>

      </div>
   );
  }
}
export default TablaCliContenedores;

