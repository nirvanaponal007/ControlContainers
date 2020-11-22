import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import {PostData} from '../../../Servicios/PostData';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Tabla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    
  
  }

  handleClick = (rowKey) => {
    alert(this.refs.table.getPageByRowKey(rowKey));
  }

  eliminarUsuario = (row) => {
    confirmAlert({
      title: 'Eliminar Usuario',
      message: '¿Esta Seguro Que Desea Eliminar El Usuario?',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            PostData("EliminarUsuario", "POST", {id_usuario:row.usu_id}).then(result => {
              alert('Se Elimino Correctamente')
              const posts = [...this.props.usuario]
              let resultado = posts.filter(post=> {
                if(post.usu_id !== row.usu_id){
                  return post.usu_id;
                }
              });
              this.setState({
                data:resultado
              })  
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

  buttonFormatter =(cell, row)=>{
    return (
    <div>
        <Button onClick={this.toggleLarge} className="btn-success" href={'#/Usuarios/Usuario/' + row.usu_id} ><i className="fa fa-eye fa-md"></i></Button>
        <Button onClick={this.toggleLarge}  className="btn-warning" href={'#/Usuarios/EditarUsuario/' + row.usu_id} ><i className="fa fa-edit fa-md"></i></Button>
        <Button onClick={this.toggleLarge}  className="btn-danger"  onClick={()=> this.eliminarUsuario(row)} ><i className="fa fa-user-times fa-md"></i></Button>
    </div>);
    //return <Button type="submit" color='success' className="mr-1" href= {'#/Clientes/Cliente/' + row.cli_id}>Ver</Button>
  }

  buttonFormatterEstado = (cell, row)=> {
    if(row.usu_estado===1){
      return <Button size="sm" className="btn-spotify btn-brand icon mr-1 mb-1">Activo</Button>
    }else if(row.usu_estado===0){
      return <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Inactivo</Button>
    }else{
      return <Button size="sm" className="btn-instagram btn-brand icon mr-1 mb-1">Sin descripcion</Button>
    } 
  }
  buttonFormatNombre = (cell,row)=> {
    return <p>{row.usu_nombre==="" || row.usu_nombre==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Nombre</Button>: row.usu_nombre}</p>
  }
  buttonFormatApellido = (cell,row)=> {
    return <p>{row.usu_apellido==="" || row.usu_apellido==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Apellido</Button>: row.usu_apellido}</p>
  }
  buttonFormatTelefono = (cell,row)=> {
    return <p>{row.usu_celular==="" || row.usu_celular==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Telefono Celular</Button>: row.usu_celular}</p>
  }
  buttonFormatCorreo = (cell,row)=> {
    return <p>{row.usu_email==="" || row.usu_email==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Correo</Button>: row.usu_email}</p>
  }
  buttonFormatusername = (cell,row)=> {
    return <p>{row.usu_username==="" || row.usu_username==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin UserName</Button>: row.usu_username}</p>
  }
  buttonFormatfe = (cell,row)=> {
    return <p>{row.usu_fecha_creacion==="" || row.usu_fecha_creacion==null? <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1">Sin Fecha De Creación</Button>: row.usu_fecha_creacion}</p>
  }
  buttonFormatImg =(cell,row)=> {
    return  (<div className="image_ava">
              <img src={require('../../../image/avatar.png')} style={{maxWidth: '70%'}} className="img-thumbnail rounded mx-auto d-block" alt="avatar"/>
            </div>)
  }

  render() {
    const data = this.props.usuario; 
    return (
      <div>
        <BootstrapTable
        
          ref='table'
          data={ this.state.data==[]? data:this.state.data}
          pagination={ true }
          search={ true }
          striped={true} 
          button={true}
          hover={true}>
          <TableHeaderColumn width='65' dataFormat={this.buttonFormatImg}>Imagen</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='usu_nombre' dataFormat={this.buttonFormatNombre}>Nombre</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='usu_apellido' dataFormat={this.buttonFormatApellido}>Apellido</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='usu_username' dataFormat={this.buttonFormatusername}>Username</TableHeaderColumn>
          <TableHeaderColumn width='85' dataField='usu_email' isKey={true} dataFormat={this.buttonFormatCorreo}>Correo</TableHeaderColumn>
          <TableHeaderColumn width='60' dataField='usu_celular' dataFormat={this.buttonFormatTelefono}>Telefono</TableHeaderColumn>
          <TableHeaderColumn width='50' dataField='usu_estado' dataFormat={this.buttonFormatterEstado}>Estado</TableHeaderColumn>
          <TableHeaderColumn width='85' dataField="button" dataFormat={this.buttonFormatter}>Acción</TableHeaderColumn>
        </BootstrapTable>
      </div>
   );
  }
}

export default Tabla;
