'use strict'

const eventoUsuario = require('../models/eventoUsuario');

function TraerEventosUsuarios(req, res) {
    eventoUsuario.TraerEventoUsuarios((err, data) => {
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

function InsertarEventoUsuario(req,res) {
    const eventoUsuarioData= {
        evus_usu_id:req.body.evus_usu_id,
        evus_con_id:req.body.evus_con_id,
        evus_tipo_evento:req.body.evus_tipo_evento,
        evus_origen_evento:req.body.evus_origen_evento,
        evus_recursos_afectados:req.body.evus_recursos_afectados,
        evus_resultado:req.body.evus_resultado,
        evus_actividad_realizada:req.body.evus_actividad_realizada,
        evus_identidad_ip:req.body.evus_identidad_ip
    }

    eventoUsuario.InsertarEventoUsuario(eventoUsuarioData, (err, data) => {
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

function TraerEventoUsuarioXIdContenedor(req,res){
    eventoUsuario.TraerEventoUsuarioXIdContenedor(req.body.id_contenedor,(err,data)=>{
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

module.exports = {
    TraerEventosUsuarios,
    InsertarEventoUsuario,
    TraerEventoUsuarioXIdContenedor
}