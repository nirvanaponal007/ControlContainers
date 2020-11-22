'use strict'

const parametros = require('../models/parametros');

function TraerParametros(req,res) {
    parametros.TraerParametros((err,data)=> {
        if (data == "") {
            res.status(200).send({message:'No hay datos en la BD'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({eventos : data})
        }
    })
}

function InsertarParametro(req,res){
    const parametroData = {
        par_clave: req.body.clave, 
        par_valor: req.body.valor
    }
    parametros.insertarParametro(parametroData,(err,data)=>{
        if(err){
            res.status(500).send({message: 'Error Al guardar Datos'+err})
        } else{
            res.status(200).send({message : 'Insertado Correctamente'})  
        }
    })
}

function TraerValorXClave(req,res){    
    parametros.TraerParametroXClave(req.body.clave,(err,data)=>{
        if(err){
            res.status(500).send({message: 'Error Datos'+err})
        } else{
            res.status(200).send({valor:data})  
        }
    })
}

module.exports = {
    TraerParametros,
    InsertarParametro,
    TraerValorXClave
}