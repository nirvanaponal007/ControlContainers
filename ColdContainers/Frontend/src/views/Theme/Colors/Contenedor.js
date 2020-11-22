import React, { Component } from 'react';
import {PostData} from '../../../Servicios/PostData';
import Widget02 from '../../Widgets/Widget02';
import { AppSwitch } from '@coreui/react'
import './contenedor.css';
import socketIOClient from "socket.io-client";
import { RadialGauge } from 'react-canvas-gauges';
import GoogleMapReact from 'google-map-react';
import App from '../Graficas/TimeReal';
import {AMBIENT,PORT,PORT_MQTT} from '../../../Servicios/config';
import HistoryTemp from '../Graficas/App';
import { subscribe } from 'react-mqtt';
// import _Monitor from './monitor';
import { Connector } from 'react-mqtt';

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


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'rgb(77, 189, 116)',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
  }}>  
    {text}
  </div>
);
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 4.6186496,
      lng: -74.1203968
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAe3-7NOcE3s0FVQFOwpXPSVIDDTEKtOF0' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={4.6186496}
            lng={-74.1203968}
            text={'Contenedor 1'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

class TempSum extends Component{

  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: `http://${AMBIENT}:${PORT}/`,
      value1: 0
    };
  }
    componentDidMount() {
      console.log('TempSuministro Serial: '+this.props.serial);
      // const { endpoint } = this.state;
      // const socket = socketIOClient(endpoint);
      // socket.on(this.props.serial, data => {
      //   console.log(data);
        
      //   this.setState({ response: data })
      // });
      //socket.emit('add-message','hola mundo');
    }

  render(){
    const { response } = this.state;
    if (response) {
      setInterval( () => {
        var min = 0;
        var max = 1;
        var rand =  min + (Math.random() * (max-min));
        const datos1 = response.datos1;
        const data = datos1.split("/");
        var temp = parseFloat(data[29])+rand;
        this.setState({
          value1: temp.toFixed(2)
        }); 
      }, 2000);
    }
    return (
      <tr className="text-center">
        <td className="text-muted">Temperatura Suministro</td>
        <td className="font-weight-bold" >{this.state.value1} °C</td>
      </tr>
    )
    
  }
}

class TempRet extends Component{

  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: `http://${AMBIENT}:${PORT}/`,
      value1: 0
    };
  }
    componentDidMount() {
      // console.log('TempSuministro Serial: '+this.props.serial);
      // const { endpoint } = this.state;
      // const socket = socketIOClient(endpoint);
      // socket.on(this.props.serial, data => {
      //   this.setState({ response: data })
      // });
      //socket.emit('add-message','hola mundo');
    }

  render(){
    const { response } = this.state;
    if (response) {
      setInterval( () => {
        var min = 0;
        var max = 1;
        var rand =  min + (Math.random() * (max-min));
        const datos1 = response.datos1;
        const data = datos1.split("/");
        var temp = parseFloat(data[29])+rand;
        this.setState({
          value1: temp.toFixed(2)
        }); 
      }, 2000);
    }
    return (
      <tr className="text-center">
        <td className="text-muted">Temperatura Retorno</td>
        <td className="font-weight-bold" >{this.state.value1} °C</td>
      </tr>
    )
    
  }
}

class Estado extends Component{

  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: `http://${AMBIENT}:${PORT}/`,
      value1: 'No Registrado el estado'
    };
  }
    componentDidMount() {
      console.log('TempSuministro Serial: '+this.props.serial);
      // const { endpoint } = this.state;
      // const socket = socketIOClient(endpoint);
      // socket.on(this.props.serial, data => {
      //   this.setState({ response: data })
      // });
      //socket.emit('add-message','hola mundo');
    }

  render(){
    const { response } = this.state;
    if (response) {
      setInterval( () => {
        var min = 0;
        var max = 1;
        var rand =  min + (Math.random() * (max-min));
        const datos1 = response.datos1;
        const data = datos1.split("/");
        data[32] = 5;
        var temp = ""
        if (parseInt(data[32])==1) {
          temp = "Petrip";
        }else if (parseInt(data[32])==2) {
          temp = "Shutdown";
        }else if (parseInt(data[32])==3) {
          temp = "Cooling";
        }else if (parseInt(data[32])==4) {
          temp = "Heating";
        }else if (parseInt(data[32])==5) {
          temp = "Defrost";
        }else if (parseInt(data[32])==6) {
          temp = "idle";
        }else{
          temp = "No Registrado el estado";
        }
        this.setState({
          value1: temp
        }); 
      }, 2000);
    }
    return (
      <tr className="text-center">
        <td className="text-muted">Estado</td>
        <td className="font-weight-bold" >{this.state.value1}</td>
      </tr>
    )
    
  }
}

class TempSuministro extends Component{

  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: `http://${AMBIENT}:${PORT}/`,
      value1: 0
    };
  }
    componentDidMount() {
      console.log('TempSuministro Serial: '+this.props.serial);
      // const { endpoint } = this.state;
      // const socket = socketIOClient(endpoint);
      // socket.on(this.props.serial, data => {
      //   this.setState({ response: data })
      // });
      //socket.emit('add-message','hola mundo');
    }

  render(){
    const { response } = this.state;
    if (response) {
      setInterval( () => {
        var min = 0;
        var max = 1;
        var rand =  min + (Math.random() * (max-min));
        const datos1 = response.datos1;
        const data = datos1.split("/");
        var temp = parseFloat(data[29])+rand;
        this.setState({
          value1: temp
        }); 
      }, 2000);
    }
    return <div>
        <RadialGauge
              units='°C | °F'
              title='Temp Ret'
              value={this.state.value1}
              minValue={-50}
              maxValue={50}
              size={60}
              majorTicks={['-50', '-40', '-30', '-20', '-10', '0', '10', '20', '30', '40', '50']}
              minorTicks={10}
            ></RadialGauge>
    </div>
    
  }
}

class TempRetorno extends Component{
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: `http://${AMBIENT}:${PORT}/`,
      value: 0
    };
  }

  componentDidMount() {
    //console.log('Serial: '+this.props.serial);
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on(this.props.serial, data => this.setState({ response: data }));
    //socket.emit('add-message','hola mundo');
  }
//28
  render(){
    const { response } = this.state;
    if (response) {
      setInterval( () => {
        var min = 0;
        var max = 1;
        var rand =  min + (Math.random() * (max-min));
        const datos1 = response.datos1;
        const data = datos1.split("/");
        var temp = parseFloat(data[28])+rand;
        this.setState({
          value: temp
        }); 
      }, 2000);
    }
    return <div>
    <RadialGauge
    units='°C | °F'
    title='Temp Sum'
    value={this.state.value}
    minValue={-50}
    maxValue={50}
    size={60}
    majorTicks={['-50', '-40', '-30', '-20', '-10', '0', '10', '20', '30', '40', '50']}
    minorTicks={10}
  ></RadialGauge>
</div>
  }
}

class Contenedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contenedor: {},
      response: '0'
    };
  }

  componentDidMount() {
      console.log(this.props.match.params.id);
      this.setState({
        response : this.props.match.params.id
      })
      PostData('TraerContendorXSerail','POST',{serialContenedor: this.props.match.params.id}).then((result)=>{
        const responseJSON = result;
        this.setState({
          contenedor: responseJSON.contenedor[0]
        });
      }).catch((err) => {
          console.log(err);
      })
  }

  render() {
    const {con_id,con_nombre,con_estado,con_url_foto,con_descripcion} = this.state.contenedor;
    const con_serial_contenedor = this.props.match.params.id;
    const urlTopic = "contenedor/prueba";
    // const Monitor = subscribe({topic:urlTopic})(_Monitor);
    return (
      
      <div>  
        <Row>
          <div className="col-md-6">
            <div className="card">
            
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Editar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h5 className="text-center text-white">Detalles del Contenedor</h5>
              </div>
              <div className="card-body">
                <div className="image_ava">
                  <img src={con_url_foto === "" ? con_url_foto :  require("../../../image/Contenedor.png") } className="img-thumbnail rounded mx-auto d-block" alt="avatar"/>
                </div>
                <div className="paneles-usuario">
                  <table className="table table-striped">
                    <tbody>
                    <tr className="text-center">
                        <td className="text-muted">Encendido/Apagado</td>
                        <td className="font-weight-bold" >
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <AppSwitch className={'mx-2'} variant={'pill'} color={'success'} outline label checked={con_estado==1 ? true:false} disabled />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Nombre</td>
                        <td className="font-weight-bold" >{con_nombre}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Serial</td>
                        <td className="font-weight-bold" >{con_serial_contenedor}</td>
                      </tr>
                      <tr className="text-center">
                        <td className="text-muted">Descripcion</td>
                        <td className="font-weight-bold" >{con_descripcion==null || con_descripcion==""? 'Sin Descripcion': con_descripcion}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <ButtonGroup className="float-right">
                  <Dropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Editar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h5 className="text-center text-white">Detalles del Contenedor</h5>
              </div>
              <div className="card-body">
                <div className="image_ava">
                  <div className="row">
                    <div className="col-md-6">
                      <TempSuministro serial={con_serial_contenedor}/>
                    </div>
                    <div className="col-md-6">
                      <TempRetorno serial={con_serial_contenedor}/>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="paneles-usuario">
                  <table className="table table-striped">
                    <tbody>
                      <Estado serial={con_serial_contenedor}/>
                      <TempSum serial={con_serial_contenedor}/>
                      <TempRet serial={con_serial_contenedor}/>
                      <tr className="text-center">
                        <td className="text-muted">Set Point</td>
                        <td className="font-weight-bold" >2 C°</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Editar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h5 className="text-center text-white">Datos del Contenedor</h5>
              </div>
              <div className="card-body">
                <Row>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Ambient Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Cargo Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Comp Dsch Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Comp Suct Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX PSI" mainText="Disch Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="DTS Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RM Rt Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Int Therm Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="USDA1 Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="USDA2 Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="USDA3 Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="CA Memb Temp" icon="fa fa-thermometer-2" color="#fd1c1a" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="Battery Volt" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX A" mainText="Phase A" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX A" mainText="Phase B" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX A" mainText="Phase C" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="Power Sup DC" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="Sup Line Volts" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="CA Batt Volt" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="CA Bus Volt" icon="icon-energy" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="RTC Battery" icon="fa fa-battery-2" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="AF CO2 Sensor" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="AF 02 Calc" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="CO2 Sensor" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="O2 Sensor" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="AF CO2 Sensor" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="AF 02 Calc" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="CO2 Sensor" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX V" mainText="O2 Sensor" icon="icon-feed" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Humid H2O/Sec" icon="cui-drop" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX %" mainText="Humidity" icon="cui-drop" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX PSI" mainText="CA Memb Press" icon="fa fa-compress" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX PSI" mainText= "Suct Press" icon="fa fa-compress" color="primary" />
                  </Col>
                  <Col xs="12"sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Composite Ret" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="Composite Sup" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX PSI" mainText="CPD Prest" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RM Comp Ret" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RM Compt Sup" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RM Def Ther Tm" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RM Supp Tm 1" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RM Supp Tm 2" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RRS" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="RTS" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="SRS" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="STS" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX HZ" mainText="Sup Line Freq" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX CMH" mainText="VPS" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX C" mainText="CA RTS" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX HZ" mainText="CA Sup Ln Freq" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX %" mainText="CO2 Conc" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX %" mainText="N2 Conc" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget02 header="XXXX %" mainText= "O2 Conc" icon="fa fa-cogs" color="primary" />
                  </Col>
                </Row>

              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <h5 className="text-center text-white">Estadisticas del Contenedor</h5>
              </div>
              <div className="card-body">
                <Row>
                  <div className="image_ava col-md-6">
                    <App/>         
                  </div>
                  <div className="paneles-usuario col-md-6">
                    <HistoryTemp/>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74'}}>
                <h5 className="text-center text-white">Mapa Contenedor</h5>
              </div>
              <div className="card-body">
                <div className="paneles-usuario">
                  <SimpleMap/>
                </div>
              </div>
            </div>
          </div>
        </Row>
        
      </div>
    );
  }
}

export default Contenedor;

