import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Modal, ModalBody, ModalFooter, Button, Table, Progress, Row, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logocontainers.png'
import sygnet from '../../assets/img/brand/logocontainerspeque.png'
import { Redirect } from 'react-router-dom';
import { PostData } from '../../Servicios/PostData';
const propTypes = {
  children: PropTypes.node,
};


const defaultProps = {};


export class ModalAlertas extends Component {
  constructor(props) {
    super(props);
    this.Modalmsm = this.Modalmsm.bind(this);
    this.state = {
      redirect: false,
      alarmasnovistas: 0,
      abrirmodal: true
    };
  }
  Modalmsm() {

    console.log("open modal");
    this.setState({
      abrirmodal: !this.state.abrirmodal
    });
  }

  componentWillMount() {
    this.setState({
      abrirmodal: true
    });
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    if (this.state.redirect) {
      return (<Redirect to={'/login'} />)
    }
    return (
      <Modal
        isOpen={this.state.abrirmodal}
        toggle={this.Modalmsm}
        className={
          "modal-success modal-lg  text-center" + this.props.className
        }
      >
        <ModalHeader className="text-center" toggle={this.Modalmsm}>
          Detalles Contenedor
             </ModalHeader>
        <ModalBody>

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.Modalmsm}>
            Cerrar
               </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }

}


class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.Modalmsm = this.Modalmsm.bind(this);
    this.detalle = this.detalle.bind(this);
    this.state = {
      redirect: false,
      alarmasnovistas: 0,
      abrirmodal: false,
      contenedor: {},
      alarmas: {},
      sel_con_al: 0,
      sel_con_nombre:""
    };
  }

  Modalmsm() {
    console.log("open modal");
    this.setState({
      abrirmodal: !this.state.abrirmodal
    });
  }


  logout() {
    sessionStorage.setItem('Usuario', '');
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  detalle(id,nombre,e) {
    e.preventDefault();
    console.log("abrir chat" + nombre);
    this.setState({
      sel_con_al: id,
      sel_con_nombre:nombre
    })
  }

  componentWillMount() {
    if (sessionStorage.getItem('Usuario')) {
      const usuario = sessionStorage.getItem('Usuario');
      const usu = JSON.parse(usuario);
      const { usr_id_rol, usu_id } = usu.usuario.data[0];
      var info = { id_usuario: usu_id };


      PostData('TraerCantidadAlarmasNoVistasXIdUsuario', 'POST', info).then((result) => {
        let responseJSON = result;
        // console.log(result);
        this.setState({
          alarmasnovistas: responseJSON[0].cantidad
        })
      }).catch((err) => {
        console.log(err);
      })


      PostData('TraerContenedores', 'GET').then((result) => {
        const responseJSON = result;
        // todosCont=[responseJSON.eventos]
        // console.log(todosCont[0]);

        this.setState({
          contenedor: responseJSON.eventos
        });
      }).catch((err) => {
        console.log(err);
      })


      PostData('TraerAlarmasXIdUsuario', 'POST', info).then((result) => {
        let responseJSON = result;
        console.log(result);
        this.setState({
          alarmas: responseJSON
        })
      }).catch((err) => {
        console.log(err);
      })



    }

    else {
      this.setState({ redirect: true });
    }

  }
  editarPerfil = () => {
    const usuario = sessionStorage.getItem('Usuario');
    const usu = JSON.parse(usuario);
    const { usr_id_rol, usu_id } = usu.usuario.data[0];
    if (usr_id_rol == 1) {
      return <DropdownItem href={'#/Usuarios/EditarUsuario/' + usu_id}><i className="fa fa-user"></i> Perfil</DropdownItem>
    }
    if (usr_id_rol == 2) {
      return <DropdownItem href={'#/Clientes/Cliente/' + usu_id}><i className="fa fa-user"></i> Perfil</DropdownItem>
    }
    if (usr_id_rol == 3) {
      return <DropdownItem href={'#/Usuarios/EditarUsuario/' + usu_id}><i className="fa fa-user"></i> Perfil</DropdownItem>
    }
    else {
      return <DropdownItem ><i className="fa fa-user"></i> Perfil</DropdownItem>
    }
  }

  render() {
    console.log(this.state.contenedor);
    console.log(this.state.alarmasnovistas);
    console.log(this.state.alarmas);
    var arrayalarmas = [];
    var arr_aux = [];
    const alarmascli = [this.state.alarmas];
    console.log(alarmascli);
    if (this.state.alarmas) {
      Object.keys(alarmascli[0]).map(function (key) {
        console.log(alarmascli[0][key].ala_con_id);
        arrayalarmas[alarmascli[0][key].ala_con_id] = [];
      });

      Object.keys(alarmascli[0]).map(function (key) {
        console.log(alarmascli[0][key].ala_con_id);
        arrayalarmas[alarmascli[0][key].ala_con_id].push(alarmascli[0][key]);
      });

    }
    console.log(arrayalarmas);

    var contador = 0;
    const cont = [
      this.state.contenedor
    ];

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    if (this.state.redirect) {
      return (<Redirect to={'/login'} />)
    }
    return (

      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 140, height: 75, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 35, height: 35, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>           */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={require('../../image/avatar1.png')} className="img-avatar" alt="admin@admin.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Cuenta</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem> */}
              <DropdownItem onClick={this.Modalmsm}><i className="fa fa-envelope-o"></i> Mensajes<Badge color="success">{this.state.alarmasnovistas}</Badge></DropdownItem>
              {/* <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Perfil<Badge color="warning">42</Badge></DropdownItem> */}
              <DropdownItem header tag="div" className="text-center"><strong>Configuraciones</strong></DropdownItem>
              {this.editarPerfil()}
              <DropdownItem><i className="fa fa-wrench"></i> Configuraciones</DropdownItem>
              {/* <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i>Cerrar la sesión</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>


        <Modal
          isOpen={this.state.abrirmodal}
          toggle={this.Modalmsm}
          className={
            "modal-success modal-lg  text-center" + this.props.className
          }
        >
          <ModalHeader className="text-center" toggle={this.Modalmsm}>
            Mensajes
             </ModalHeader>
          <ModalBody>
            <Row>
              <div className="col-md-6">
                <div className="card">
                  <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center"><i className="icon-people"></i></th>
                        <th>Contenedores</th>
                        <th className="text-center"></th>
                        {/* <th>Usage</th> */}
                        {/* <th className="text-center">Payment Method</th>
                        <th>Activity</th> */}
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.contenedor ?

                        Object.keys(cont[0]).map(key => (

                          <tr onClick={(e) => this.detalle(cont[0][key].con_id,cont[0][key].con_nombre, e)}>

                            <td className="text-center">
                              <div className="avatar">
                                <img src={cont[0][key].con_url_foto!=""?(cont[0][key].con_url_foto):require('../../image/Contenedor.png')} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                <span className="avatar-status badge-success"></span>
                              </div>
                            </td>
                            <td>
                              <div>{cont[0][key].con_nombre}</div>
                              <div className="small text-muted">
                                <span>{cont[0][key].cli_razon_social}</span>
                              </div>
                              <div className="small text-muted">
                                <span>Alarma</span> | Registered: Jan 1, 2015
                      </div>
                            </td>
                            <td className="text-center">
                              {arrayalarmas[cont[0][key].con_id] ?
                                <Badge color="success ">{arrayalarmas[cont[0][key].con_id].length}</Badge>
                                :
                                // <i class="fa fa-check-double"></i>
                                <div className=" text-muted">
                                  <i className="fa fa-check-circle-o fa-lg mt-4"></i>
                                </div>
                              }
                              {/* <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i> */}
                            </td>
                          </tr>
                        ))

                        :
                        ""
                      }

                    </tbody>
                  </Table>

                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  {/* <div
                    className="card-header"
                    style={{
                      backgroundColor: "#4dbd74",
                      borderColor: "#4dbd74"
                    }}
                  >
                    <h5 className="text-center text-white">
                      {"Alarmas" + this.state.sel_con_al}
                    </h5>
                  </div> */}
                  <Table hover responsive className="table-outline mb-0 d-none d-sm-table ">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center"><i class="fa fa-exclamation-triangle fa-lg"></i></th>
                        <th>{"Alertas "+this.state.sel_con_nombre}</th>
                        {/* <th className="text-center"></th> */}
                      </tr>
                    </thead>

                    <tbody>

                      {/* {this.state.sel_con_al != 0 ? */}
                         {/* <a> */}
                           {arrayalarmas[this.state.sel_con_al] ?
                            Object.keys(arrayalarmas[this.state.sel_con_al]).map(key => (
                              // <div className="card">
                              // <i class="fa fa-exclamation-triangle fa-lg"><strong>{arrayalarmas[this.state.sel_con_al][key].ala_descripcion}</strong></i>
                              // </div>
                              // <div className="small text-muted">
                              //   <span>{arrayalarmas[this.state.sel_con_al][key].ala_descripcion}</span>
                              // </div>
                            
                                <tr>
                                  <td className="text-center">
                                  <i class="fa fa-exclamation-circle fa-lg"></i>
                                  </td>

                                  <td >
                                    <div></div>
                                    <div className="small text-muted">
                                      <span>{arrayalarmas[this.state.sel_con_al][key].ala_descripcion}</span>
                                    </div>
                                  </td>

                                </tr>
                              
                            ))
                            // :
                            // ""
                          // }
                        // </a>
                        :
                        ""
                      }

                    </tbody>
                  </Table>
                </div>
              </div>
            </Row>



          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.Modalmsm}>
              Cerrar
               </Button>{" "}
          </ModalFooter>
        </Modal>
        {/* {this.state.abrirmodal==true? 
       <ModalAlertas open={this.state.abrirmodal}/>
      :
       ""} */}

      </React.Fragment>



    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
