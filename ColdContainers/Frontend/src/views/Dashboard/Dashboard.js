//import React, { Component, lazy, Suspense } from 'react';
import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import GoogleMapReact from 'google-map-react';
import { Connector } from 'react-mqtt';
import { subscribe } from 'react-mqtt';
import _Pintar from './Pintar';
import AnyReactComponent from './Pintar';
//import ModalAlertas from '../../containers/DefaultLayout/DefaultHeader'
import {
  //Badge,
  //Button,
  //ButtonDropdown,
  //ButtonGroup,
  //ButtonToolbar,
  Card,
  CardBody,
  //CardFooter,
  //CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  //DropdownMenu,
  //DropdownToggle,
  //Progress,
  Row,
  //Table,
} from 'reactstrap';
import { PostData } from '../../Servicios/PostData';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
//import { Redirect } from 'react-router-dom';
import { AMBIENT, PORT_MQTT } from './../../Servicios/config';

//const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
//const brandWarning = getStyle('--warning')
//const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.clickalarmas = this.clickalarmas.bind(this);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      redirect: false,
      IdUsuario: '',
      abrirmsm:false

    };

  }


  componentWillMount() {
    if (sessionStorage.getItem('Usuario')) {
      let data = sessionStorage.getItem('Usuario');
      let dataJson = (JSON.parse(data));
      this.setState({
        IdUsuario: dataJson.usuario.data[0].usu_id,
        cantidadContenedores: 0,
        cantidadUsuario: 0,
        ContenedoresActivos: 0,
        AlarmasDias: 0,
        contenedor: {}
      })
      PostData('TraerCantidadContenedores', 'GET').then((result) => {
        let responseJSON = result;
        if (responseJSON.message === "Error Al mostrar datos") {
          this.setState({
            cantidadContenedores: 0
          })
        } else {
          this.setState({
            cantidadContenedores: responseJSON[0].cantidad
          })
        }
      })
      PostData('TraerCantidadUsuarios', 'GET').then((result) => {
        let responseJSON = result;
        if (responseJSON.message === "Error Al mostrar datos") {
          this.setState({
            cantidadUsuario: 0
          })
        } else {
          this.setState({
            cantidadUsuario: responseJSON[0].cantidad
          })
        }
      })
      PostData('TraerCantidadContenedoresActivos', 'GET').then((result) => {
        let responseJSON = result;
        if (responseJSON.message === "Error Al mostrar datos") {
          this.setState({
            ContenedoresActivos: 0
          })
        } else {
          this.setState({
            ContenedoresActivos: responseJSON[0].cantidad
          })
        }
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




      // const todosCont=[this.state.contenedor];
      // Object.keys(todosCont[0]).map(function (key) {
      //  var x={serial:todosCont[0][key].con_serial_contenedor}
       
      //  PostData('TraerContenedorXSerial','POST', x ).then((result) => {
      //    const responseJSON = result;
      //    console.log(x);
      //    console.log(responseJSON);
         
      //    this.setState({
      //      dataCont: responseJSON.eventos
      //    });
      //  }).catch((err) => {
      //    console.log(err);
      //  })
      // });




    }
  }
  clickalarmas(){
    console.log("presionando boton deal");
   sessionStorage.setItem('mensajes',true)
   window.location.reload();

  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    console.log(sessionStorage.getItem('mensajes'));

    const { cantidadContenedores, cantidadUsuario, ContenedoresActivos, AlarmasDias } = this.state;
    // console.log(this.state.contenedor);

    // const urlTopic = "contenedor/" + con_serial_contenedor;
    // const Sub = subscribe({ topic: urlTopic })(_Sub);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3" >
            <a href="#/Contenedores">
              <Card className="text-white bg-info" onClick={() => <DropdownItem href="#/Contenedores">Ver Más</DropdownItem>} >
                <CardBody className="pb-0">
                  {/* <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="#/Contenedores">Ver Más</DropdownItem>                      
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup> */}
                  <div className="text-value"><h3>{cantidadContenedores}</h3></div>
                  <div><h3>Contenedores</h3></div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                </div>
              </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <a href="#/Usuarios">
              <Card className="text-white bg-primary">
                <CardBody className="pb-0">
                  {/* <ButtonGroup className="float-right">
                  <ButtonDropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="#/Usuarios">Ver Más</DropdownItem>                      
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup> */}
                  <div className="text-value"><h3>{cantidadUsuario}</h3></div>
                  <div><h3>Cantidad de Usuario</h3></div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData1} options={cardChartOpts1} height={70} />
                </div>
              </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <a href="#/Contenedores">
              <Card className="text-white bg-success">
                <CardBody className="pb-0">
                  {/* <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="#/Contenedores">Ver Más</DropdownItem>                      
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup> */}
                  <div className="text-value"><h3>{ContenedoresActivos}</h3></div>
                  <div><h3>Contenedores Activos</h3></div>
                </CardBody>
                <div className="chart-wrapper" style={{ height: '70px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} height={70} />
                </div>
              </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
            {/* <a href="#/Reportes"> */}
              <Card className="text-white bg-warning" onClick={this.clickalarmas}>
                <CardBody className="pb-0" >
                  {/* <ButtonGroup className="float-right">
                  <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup> */}
                  <div className="text-value"><h3>0</h3></div>
                  <div ><h3>Alarmas día de hoy</h3></div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
                </div>
              </Card>
            {/* </a> */}
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Localización General De Contenedores</CardTitle>
                    <div className="small text-muted">Cold Containers</div>
                  </Col>
                </Row>
                <div>

                  <SimpleMap contenedorespintar={this.state.contenedor} />

                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// const AnyReactComponent = ({ props, text, bcolor }) => (

//   <div style={{
//     color: 'white',
//     // background: 'rgb(77, 189, 116)',
//     background: bcolor,
//     padding: '5px 5px',
//     display: 'inline-flex',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '10%',
//     transform: 'translate(-60%, -60%)'
//   }}

//   >
//     {text}

//     <img
//       src={require("../../image/Contenedor.png")}
//       className="img-thumbnail rounded  d-block  text-center"
//       width="30" height="30"
//       alt="avatar"
//     //width="1%"
//     />
//   </div>
// );





class PintarMapa extends Component {
  state = {
    redirect: false,
    dataContenedor: 0
  }
  constructor(props) {
    super(props)
    this.serialRef = React.createRef();

  }

  render() {
    const serial = this.props.contenedor.con_serial_contenedor;
    const urlTopic = "contenedor/" + serial;
    const Pintar = subscribe({ topic: urlTopic })(_Pintar);
    return (
      
      <Connector mqttProps={`ws://${AMBIENT}:${PORT_MQTT}/`} >
        
          <Pintar contenedor={this.props.contenedor} />
          {/* <AnyReactComponent/> */}
        
      </Connector>
      // <div style={{
      //   color: 'white',
      //  // background: 'rgb(77, 189, 116)',
      // //  background: bcolor,
      //   padding: '5px 5px',
      //   display: 'inline-flex',
      //   textAlign: 'center',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   borderRadius: '10%',
      //   transform: 'translate(-60%, -60%)'
      // }}

      // >
      //   {/* {text} */}

      //   <img
      //     src={require("../../image/Contenedor.png")}
      //     className="img-thumbnail rounded  d-block  text-center"
      //     width="30" height="30"
      //     alt="avatar"
      //   //width="1%"
      //   />
      // </div>
    );
  }

}


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 4.6186496,
      lng: -74.1203968
    },
    zoom: 7
  };


  render() {

    const cont = [
      this.props.contenedorespintar
    ];

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
      
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBcMvJb7zdnjOAkNGZa2fl6wPLkEL_Ufmg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        
          {this.props.contenedorespintar?
          
              Object.keys(cont[0]).map(key => (
                
              //  {/* <AnyReactComponent key={key} text={cont[0][key].con_nombre} bcolor='rgb(77, 189, 116)'/>  */}
              // <div lat={4.6186496*(key/5)} lng={-74.1203968}>
              <div lat={cont[0][key].con_latitud} lng={cont[0][key].con_longitud}>
               <PintarMapa  contenedor={cont[0][key]}/>
               </div>
              ))
             
          :
          <div>
              <AnyReactComponent  text={'no def'} />

        </div>
        } 
        
            {/* <AnyReactComponent
            lat={4.6186496}
            lng={-74.1203968}
            text={'Contenedor 1'}
          />
          <AnyReactComponent
            lat={4}
            lng={-73}
            text={'Contenedor 2'}
          />

          <AnyReactComponent
            lat={6}
            lng={-73}
            text={'Contenedor 3'}
          />   */}

        </GoogleMapReact>
        </div>
     
        );
      }
    }
    
    export default Dashboard;
    
