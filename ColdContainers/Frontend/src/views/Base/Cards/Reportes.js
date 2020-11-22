import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { DotLoader } from 'react-spinners';
// import {ClipLoader} from 'react-spinners/ClipLoader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Nav,
    NavItem,
    NavLink,
    Collapse,
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
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
var moment = require('moment');
var info = [];
var Estado = {};
export class ReporteEstados extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        var addEstado = [];
        const datos1 = this.props.datos1;

        if (this.props.datos1) {
            Object.keys(datos1).map(function (key) {
                var data = datos1[key][1];
                var fecha = datos1[key][0];
                const time = Math.round((new Date(fecha)).getTime() / 1000)
                var timestamp = moment.unix(time);
                info = data.split("/");
                var UTCDate = new Date(fecha);
                UTCDate.setTime(UTCDate.getTime() - UTCDate.getTimezoneOffset() * 60 * 1000);
                // const time = Math.round((new Date(UTCDate)))
                var status = "";
                if (parseInt(info[0]) == 1) {
                    status = "Petrip";
                } else if (parseInt(info[0]) == 2) {
                    status = "Shutdown";
                } else if (parseInt(info[0]) == 3) {
                    status = "Cooling";
                } else if (parseInt(info[0]) == 4) {
                    status = "Heating";
                } else if (parseInt(info[0]) == 5) {
                    status = "Defrost";
                } else if (parseInt(info[0]) == 6) {
                    status = "idle";
                } else if (parseInt(info[0]) == 7) {
                    status = "Apagado";
                } else if (parseInt(info[0]) == 8) {
                    status = "sin energia";
                } else if (parseInt(info[0]) == 9) {
                    status = "Apagado del interruptor";
                }
                else {
                    status = "No Registrado el estado";
                }

                Estado = { fecha: timestamp.format("MMMM D, YYYY h:mm A"), estado: status, numero: parseInt(info[0]) }
                addEstado.push(Estado);

            });
        }


        return (
            <div >
                
                <div className='text-center card-header' style={{ backgroundColor: "#4dbd74", borderColor: "#4dbd74" }}>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button  text-white bg-success text-center"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                    />
                 </div>
                <div>
                    <Table id="table-to-xls" responsive size="sm">
                    
                        <thead>
                            
                                <tr>
                                
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                   
                                </tr>
                           
                        </thead>
                        {
                            Object.keys(addEstado).map(key => (
                                <tr>
                                    <td> <strong>{addEstado[key].fecha}</strong></td>
                                    <td>{addEstado[key].estado}</td>

                                </tr>
                            )
                            )
                        }
                    </Table>
                </div>
            </div>
        );
    }
}




export class ReporteEventos extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        var addEstado = [];
        const datos1 = this.props.datos1;

        // if (this.props.datos1) {
        //     Object.keys(datos1).map(function (key) {
        //         var data = datos1[key][1];
        //         var fecha = datos1[key][0];
        //         const time = Math.round((new Date(fecha)).getTime() / 1000)
        //         var timestamp = moment.unix(time);
        //         info = data.split("/");
        //         var UTCDate = new Date(fecha);
        //         UTCDate.setTime(UTCDate.getTime() - UTCDate.getTimezoneOffset() * 60 * 1000);
        //         // const time = Math.round((new Date(UTCDate)))
        //         var status = "";
        //         if (parseInt(info[0]) == 1) {
        //             status = "Petrip";
        //         } else if (parseInt(info[0]) == 2) {
        //             status = "Shutdown";
        //         } else if (parseInt(info[0]) == 3) {
        //             status = "Cooling";
        //         } else if (parseInt(info[0]) == 4) {
        //             status = "Heating";
        //         } else if (parseInt(info[0]) == 5) {
        //             status = "Defrost";
        //         } else if (parseInt(info[0]) == 6) {
        //             status = "idle";
        //         } else if (parseInt(info[0]) == 7) {
        //             status = "Apagado";
        //         } else if (parseInt(info[0]) == 8) {
        //             status = "sin energia";
        //         } else if (parseInt(info[0]) == 9) {
        //             status = "Apagado del interruptor";
        //         }
        //         else {
        //             status = "No Registrado el estado";
        //         }

        //         Estado = { fecha: timestamp.format("MMMM D, YYYY h:mm A"), estado: status, numero: parseInt(info[0]) }
        //         addEstado.push(Estado);

        //     });
        // }


        return (
            <div >
                
                <div className='text-center card-header' style={{ backgroundColor: "#4dbd74", borderColor: "#4dbd74" }}>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button  text-white bg-success text-center"
                        table="table-to-xls"
                        filename="eventosxls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                    />
                 </div>
                <div>
                    <Table id="table-to-xls" responsive size="sm">
                    
                        <thead>
                            
                                <tr>
                                
                                    <th>Fecha</th>
                                    <th>Evento</th>
                                    <th>Usuario</th>
                                   
                                </tr>
                           
                        </thead>
                        {
                            Object.keys(addEstado).map(key => (
                                <tr>
                                    <td> <strong>{addEstado[key].fecha}</strong></td>
                                    <td>{addEstado[key].estado}</td>

                                </tr>
                            )
                            )
                        }
                    </Table>
                </div>
            </div>
        );
    }
}




export class ReporteAlarmas extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        var addEstado = [];
        const datos1 = this.props.datos1;

        // if (this.props.datos1) {
        //     Object.keys(datos1).map(function (key) {
        //         var data = datos1[key][1];
        //         var fecha = datos1[key][0];
        //         const time = Math.round((new Date(fecha)).getTime() / 1000)
        //         var timestamp = moment.unix(time);
        //         info = data.split("/");
        //         var UTCDate = new Date(fecha);
        //         UTCDate.setTime(UTCDate.getTime() - UTCDate.getTimezoneOffset() * 60 * 1000);
        //         // const time = Math.round((new Date(UTCDate)))
        //         var status = "";
        //         if (parseInt(info[0]) == 1) {
        //             status = "Petrip";
        //         } else if (parseInt(info[0]) == 2) {
        //             status = "Shutdown";
        //         } else if (parseInt(info[0]) == 3) {
        //             status = "Cooling";
        //         } else if (parseInt(info[0]) == 4) {
        //             status = "Heating";
        //         } else if (parseInt(info[0]) == 5) {
        //             status = "Defrost";
        //         } else if (parseInt(info[0]) == 6) {
        //             status = "idle";
        //         } else if (parseInt(info[0]) == 7) {
        //             status = "Apagado";
        //         } else if (parseInt(info[0]) == 8) {
        //             status = "sin energia";
        //         } else if (parseInt(info[0]) == 9) {
        //             status = "Apagado del interruptor";
        //         }
        //         else {
        //             status = "No Registrado el estado";
        //         }

        //         Estado = { fecha: timestamp.format("MMMM D, YYYY h:mm A"), estado: status, numero: parseInt(info[0]) }
        //         addEstado.push(Estado);

        //     });
        // }


        return (
            <div >
                
                <div className='text-center card-header' style={{ backgroundColor: "#4dbd74", borderColor: "#4dbd74" }}>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button  text-white bg-success text-center"
                        table="table-to-xls"
                        filename="eventosxls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                    />
                 </div>
                <div>
                    <Table id="table-to-xls" responsive size="sm">
                    
                        <thead>
                            
                                <tr>
                                
                                    <th>Fecha</th>
                                    <th>Alarma</th>
                                    {/* <th>Usuario</th> */}
                                   
                                </tr>
                           
                        </thead>
                        {
                            Object.keys(addEstado).map(key => (
                                <tr>
                                    <td> <strong>{addEstado[key].fecha}</strong></td>
                                    <td>{addEstado[key].estado}</td>

                                </tr>
                            )
                            )
                        }
                    </Table>
                </div>
            </div>
        );
    }
}