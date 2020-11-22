'use strict'

const tipoAlarma = require('../models/tipoAlarma');

function TraerTipoAlarmas(req,res) {
    tipoAlarma.TraerTipoAlarmas((err,data)=> {
        if (data == "") {
            res.status(200).send({message:'No hay datos en la BD'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send(data)
        }
    })
}

module.exports = {
    TraerTipoAlarmas
}