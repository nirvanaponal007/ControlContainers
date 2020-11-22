import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import {PostData} from '../../../Servicios/PostData';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class TablaCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

  }
  eliminarCliente = (row) => {
   // console.log(row);
    confirmAlert({
      title: 'Eliminar Cliente',
      message: '¿Esta Seguro Que Desea Eliminar El Cliente?',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            PostData("EliminarCliente", "POST", {id_cliente:row.cli_id}).then(result => {
              const respuesta = result.message;
              if(respuesta == 'Datos Eliminados Exitosamente'){
              alert('Se Elimino Correctamente')
              window.location.reload();
              }else{
                alert('Error')
                window.location.reload();
              }
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

  handleClick = (rowKey) => {
    alert(this.refs.table.getPageByRowKey(rowKey));
  }

  buttonFormatter =(cell, row)=>{
    return <div>
    <Button className="btn-success " href={'#/Clientes/Cliente/' + row.cli_id} ><i className="fa fa-eye fa-md"></i></Button>
    <Button onClick={this.toggleLarge}  className="btn-danger"  onClick={()=> this.eliminarCliente(row)} ><i className="fa fa-user-times fa-md"></i></Button>
    </div>
  }

  buttonFormatterEstado = (cell, row)=> {
    if(row.cli_estado==1){
      return <Button size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>
    }else if(row.usu_estado==0){
      return <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Inactivo</Button>
    }else{
      return <Button size="sm" className="btn-instagram btn-brand icon mr-1 mb-1">Sin descripcion</Button>
    } 
  }
  buttonFormatNombre = (cell,row)=> {
    return <p>{row.cli_razon_social=="" || row.cli_razon_social==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Nombre</Button>: row.cli_razon_social}</p>
  }
   buttonFormatTelefono = (cell,row)=> {
    return <p>{row.cli_celular=="" || row.cli_celular==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Telefono Celular</Button>: row.cli_celular}</p>
  }
  buttonFormatCorreo = (cell,row)=> {
    return <p>{row.cli_email=="" || row.cli_email==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Correo</Button>: row.cli_email}</p>
  }
   buttonFormatfe = (cell,row)=> {
    return <p>{row.cli_fecha_creacion=="" || row.cli_fecha_creacion==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Fecha De Creación</Button>: row.cli_fecha_creacion}</p>
  }

  render() {
    const data = this.props.clientes;
   // console.log(data);
    return (
      <div>
        <BootstrapTable
          ref='table'
          data={ data }
          pagination={ true }
          search={ true }
          striped={true} 
          button={true}
          hover={true}>
          <TableHeaderColumn width='75' dataField='cli_razon_social' dataFormat={this.buttonFormatNombre}>Razon Social</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='cli_email' isKey={true} dataFormat={this.buttonFormatCorreo}>Correo</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='cli_celular' dataFormat={this.buttonFormatTelefono}>Telefono</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='cli_fecha_creacion' dataFormat={this.buttonFormatfe}>Fecha Creación</TableHeaderColumn>
          <TableHeaderColumn width='35' dataField='cli_estado' dataFormat={this.buttonFormatterEstado}>Estado</TableHeaderColumn>
          <TableHeaderColumn width='50' dataField="button" dataFormat={this.buttonFormatter}>Acción</TableHeaderColumn>
        </BootstrapTable>
      </div>
   );
  }
}

export default TablaCliente;
