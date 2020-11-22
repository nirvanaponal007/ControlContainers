'use strict'

const clienteContenedor = require('../models/clienteContenedor')

function InsertarContenedor(req,res){
    const contenedorData = {
        uscon_cli_id: req.body.id_cliente,
        uscon_con_id: req.body.id_contenedor,
        uscon_estado: req.body.estado
    }
    clienteContenedor.RegistrarClienteContenedor(contenedorData,(err,data)=>{
        if(err){
            res.status(500).send({message: 'Error Al guardar Datos'+err})
        }else{
            res.status(200).send({message : 'Insertado Correctamente'})  
        }
    })
}

function EliminarClienteContenedor(req,res){
    const contenedorData = {
        uscon_cli_id: req.body.id_cliente,
        uscon_con_id: req.body.id_contenedor
    }
    clienteContenedor.EliminarClienteContenedor(contenedorData,(err,data)=>{
        if(err){
            res.status(500).send({message: 'Error Al eliminar Datos'+err})
        }else{
            res.status(200).send({message : 'Eliminado Correctamente'})  
        }
    })
}

module.exports = {
    InsertarContenedor,
    EliminarClienteContenedor
}