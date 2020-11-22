'use strict'

const contenedor = require('../models/contenedor')
const config = require('../config')

function TraerContenedores(req,res){
    contenedor.TraerContenedores(req.body.id_usuario,(err,data)=>{
        if (data == "") {
            res.status(200).send({message:'No hay datos en la BD'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({eventos : data})
        }
    })
}

function InsertarContenedor(req,res){
    if(req.body.nombre==""){
        req.body.nombre="Sin Nombre";
    }
    const contenedorData = {
        con_id_contenedor: req.body.serialContenedor,
        con_nombre: req.body.nombre,
        con_foto: req.body.url_foto
    }
    contenedor.InsertarContenedor(contenedorData,(err,data)=>{
        if(err){
            res.status(500).send({message: 'Error Al guardar Datos'+err})
        } else if (data.message){
            res.status(200).send({message : data.message})  
        }else{
            res.status(200).send({message : 'Insertado Correctamente'})  
        }
    })
}

function EsadoContenedor(req,res) {
    if (req.body.serialContenedor == '0') {
        res.status(200).send({ estado : 1})
    }else{
        contenedor.TraerEstadoXSerial(req.body.serialContenedor,(err,data)=> {
            if (err) {
                res.status(500).send({message: `Error : ${err}`});
            }else if (data == "") {
                res.status(200).send({message: `No Existe contenedor`});
            }else{
                console.log(data[0].con_estado);
                const estado = ""+data[0].con_estado;
                res.status(200).send({con_estado: estado});
            }
        })
    }
}

function TraerContenedorXSerial(req,res) {
    contenedor.TraerContenedorXSerial(req.body.serialContenedor,(err,data)=> {
        if (data == "") {
            res.status(200).send({message:'El Contenedor No Existe'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({contenedor : data})
        }
    })
}


function TraerContenedorXId(req,res) {
    contenedor.TraerContenedorXid(req.body.idContenedor,(err,data)=> {
        if (data == "") {
            res.status(200).send({message:'El Contenedor No Existe'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({contenedor : data})
        }
    })
}


function CantidadContenedores(req,res){
    contenedor.cantidadContenedores(req.body.id_usuario,(err,data)=>{
        if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send(data)
        }
    })
}

function CantidadContenedoresActivos(req,res){
    contenedor.cantidadContenedoresActivos(req.body.id_usuario,(err,data)=>{
        if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send(data)
        }
    })
}


function EditarContenedorXId(req,res) {

    if(req.file){
        var datos={
            con_id:req.body.con_id,
            con_nombre:req.body.con_nombre,
            con_descripcion:req.body.con_descripcion,
            con_url_foto:`http://${config.AMBIENT}:${config.PORT}/uploads/${req.file.filename}`
        }

    }else{
        var datos={
            con_id:req.body.con_id,
            con_nombre:req.body.con_nombre,
            con_descripcion:req.body.con_descripcion,
            con_url_foto:req.body.con_url_foto
        }
    }

    contenedor.EditarContenedor(datos,(err,data)=> {
        if(err){
            res.status(500).send({message:'Error Al Editar contenedor'+err})
        } else{
            res.status(200).send({message:'Datos Editados Exitosamente-'+ datos.con_url_foto})
        }
    })
    
}

module.exports = {
    TraerContenedores,
    InsertarContenedor,
    EsadoContenedor,
    TraerContenedorXSerial,
    CantidadContenedores,
    CantidadContenedoresActivos,
    TraerContenedorXId,
    EditarContenedorXId
}