'use strict'

const eventContainers = require('../models/eventoContainers')
//const contenedor = require('../models/contenedor')

function TraerEventosContainers(req, res) {
    eventContainers.TraerEventoContainers((err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'No hay datos en la BD'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send({
                eventos: data
            })
        }
    })
}

function insertarEventoContainer(req, res) {
    const eventoContainer = {
        serialContenedor: req.body.serialContenedor,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        datos1: req.body.datos1,
        datos2: req.body.datos2,
        delay_time: req.body.envc_delay_time
    }
    eventContainers.insertarEventoContainers(eventoContainer, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al guardar Datos' + err,
                status: false
            })
        } else {
            res.status(200).send({
                message: "Evento Insertado Correctamente",
                status: true
            })
        }
    })

}

function TraerContenedorXSerial(req, res) {
    eventContainers.TraerUltimoContenedorXSerial(req.body.serialContenedor, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error al mostrar Datos' + err
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function ReporteTemperatura(req, res) {
    const data = {
        evnc_id_contenedor: req.body.id_contenedor,
        fechaMenor: req.body.fechaInferior,
        fechaMayor: req.body.fechaSuperior,
    }
    eventContainers.ReporteTempSuministroDatos1(data, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error al mostrar Datos' + err
            })
        } else {
            res.status(200).send(data)
        }
    })
}

module.exports = {
    TraerEventosContainers,
    insertarEventoContainer,
    TraerContenedorXSerial,
    ReporteTemperatura
}