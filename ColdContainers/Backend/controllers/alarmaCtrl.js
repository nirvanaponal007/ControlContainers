'use strict'

const Alarma = require('../models/alarma');

function TraerAlarmas(req, res) {
    Alarma.TraerAlarmas((err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'No hay datos en la BD'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function TraerAlarmasVistas(req, res) {
    Alarma.TraerAlarmasVistas((err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'No hay datos en la BD'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function TraerAlarmasNoVistas(req, res) {
    Alarma.TraerAlarmasNoVistas(req.body.id_usuario,(err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'No hay datos en la BD'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}



function InsertarAlarma(req, res) {
    const alarmaData = {
        ala_descripcion: req.body.descripcion,
        ala_estado: req.body.estado,
        ala_id_tipo: req.body.id_tipo,
        ala_usu_id: req.body.usu_id,
        ala_con_id: req.body.con_id
    }

    Alarma.InsertarAlarmas(alarmaData, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al guardar Datos' + err,
                status: false
            })
        } else {
            res.status(200).send({
                message: 'Insertado Correctamente',
                status:true
            })
        }
    })
}

function UpdateAlarma(req, res) {
    const alarmaData = {
        vista: req.body.vista,
        id_alarma: req.body.id_alarma
    }
    Alarma.EditarVistaAlarmas(alarmaData,(err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al Editar Datos' + err,
                status: false
            })
        } else {
            res.status(200).send({
                message: 'Editado Correctamente',
                status:true
            })
        }
    })
}

function TraerAlarmasXIdUsuario(req,res){
    Alarma.TraerAlarmasXIdUsuario(req.body.id_usuario,(err,data)=> {
        if (err) {
            res.status(500).send({
                message: 'Error Al mostrar Datos' + err,
                status: false
            })
        } else if(data==""){
            res.status(200).send({message:"No hay datos en la BD"});
        }else {
            res.status(200).send(data);
        }
    })
}

function TraerCantidadAlarmasXIdUsuario(req,res){
    Alarma.TraerCantidadAlarmasXIdUsuario(req.body.id_usuario,(err,data)=> {
        if (err) {
            res.status(500).send({
                message: 'Error Al mostrar Datos' + err,
                status: false
            })
        } else if(data==""){
            res.status(200).send({message:"No hay datos en la BD"});
        }else {
            res.status(200).send(data);
        }
    })
}

function TraerAlarmasXIdContenedor(req,res){
    Alarma.TraerAlarmasXIdContenedor(req.body.id_contenedor,(err,data)=> {
        if (err) {
            res.status(500).send({
                message: 'Error Al mostrar Datos' + err,
                status: false
            })
        } else if(data==""){
            res.status(200).send({message:"No hay datos en la BD"});
        }else {
            res.status(200).send(data);
        }
    })
}

module.exports = {
    TraerAlarmas,
    TraerAlarmasVistas,
    TraerAlarmasNoVistas,
    InsertarAlarma,
    UpdateAlarma,
    TraerAlarmasXIdUsuario,
    TraerCantidadAlarmasXIdUsuario,
    TraerAlarmasXIdContenedor
}