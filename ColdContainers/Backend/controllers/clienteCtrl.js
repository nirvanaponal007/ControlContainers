'use strict'

const cliente = require('../models/cliente');
const usuario = require('../models/usuarios');
const services = require('../services');
const usuario_rol = require('../models/usuario_rol');

function TraerClientes(req,res){
    cliente.TraerClientes((err,data)=> {
        if (data == "") {
            res.status(200).send({message:'No hay datos en la BD'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({clientes : data})
        }
    })
}

function TraerClientesSelect(req,res){
    cliente.TraerClientesSelect((err,data)=> {
        if (data == "") {
            res.status(200).send({message:'No hay datos en la BD'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({clientes : data})
        }
    })
}

function TraerClienteXNit(req,res) {
    cliente.TraerIdClienteXNit(req.body.nit,(err,data)=>{
        if (data == "") {
            res.status(200).send({message:'No existe el cliente'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'+err})
        } else{
            res.status(200).send({cliente : data})
        }
    })
}

function RegistrarCliente(req,res) {
    const clienteData = {
        cli_nit_empresa :req.body.nit,
        cli_razon_social :req.body.razonSocial,
        cli_estado :req.body.estado,
        cli_email :req.body.email,
        cli_direccion:req.body.direccion,
        cli_telefono :req.body.telefono,
        cli_pagina_web :req.body.pagina_web,
        cli_n_empleados :req.body.n_empleados,
        cli_celular :req.body.celular,
        cli_imagen :req.body.imagen
    }
    cliente.RegistrarCliente(clienteData,(err,data)=> {
        if(err){
            res.status(500).send({message: err});
        }else{
            const email = req.body.email.split("@");
            const username = email[0]+req.body.nit;
            const usuarioData = {
                usu_contrasena :req.body.nit,
                usu_username: username,
                usu_email :req.body.email,
                usu_celular:req.body.celular,
                usu_estado: req.body.estado,
                usu_id_cliente: data.insertId
            }
            usuario.RegistrarUsuario(usuarioData,(err1,data1)=>{
                if (err1) {
                    res.status(500).send({message: err1});
                }else {
                    const usuarioRolData = {
                        usr_id_rol :2,
                        usr_id_usuario :data1.insertId
                    }
                    usuario_rol.InsertarUsuarioRol(usuarioRolData,(err2,data2)=> {
                        if (err2) {
                            res.status(500).send({message: err2});
                        }else{
                            res.status(200).send({
                                message: 'Cliente Insertado Correctamente',
                                datos: {
                                    username: usuarioData.usu_username,
                                    correo: usuarioData.usu_email,
                                    contraseña: 'La contraseña es el nit'
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    
}

function TraerClienteXId(req,res){
    cliente.TraerClienteXId(req.body.id_cliente,(err,data)=>{
        if (data == "") {
            res.status(200).send({message:'No existe el cliente'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'+err})
        } else{
            res.status(200).send({cliente : data})
        }
    })
}

function TraerUsuariosXIdCliente(req,res){
    cliente.TraerUsuariosXIdCliente(req.body.id_cliente,(err,data)=>{
        if (data == "") {
            res.status(200).send({message:'No existe el usuarios'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'+err})
        } else{
            res.status(200).send({usuarios : data})
        }
    })
}

function EliminarCliente(req,res){
    cliente.eliminarCliente(req.body.id_cliente,(err,result)=> {
        if(err){
            res.status(500).send({message:'Error Al eliminar datos'+err})
        } else{
            res.status(200).send({message:'Datos Eliminados Exitosamente'})
        }
    })
}

function EditarCliente(req,res){
    const data = {
        cli_estado:req.body.estado,
        cli_direccion:req.body.direccion,
        cli_telefono:req.body.telefono,
        cli_pagina_web:req.body.pagina_web,
        cli_n_empleados:req.body.Nempleados,
        cli_celular:req.body.celular,
        cli_imagen:req.body.imagen,
        cli_id:req.body.id_cliente,
    }
    cliente.editarCliente(data,(err,result)=> {
        if(err){
            res.status(500).send({message:'Error Al Editar datos'+err})
        } else{
            res.status(200).send({message:'Datos Editados Exitosamente'})
        }
    })
}

function TraerContenedorXIdCliente(req,res) {
    cliente.TraerContenedorXIdCliente(req.body.id_cliente,(err,data)=>{
        if (data == "") {
            res.status(200).send({message:'No existe contenedores'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'+err})
        } else{
            res.status(200).send({Contenedores : data})
        }
    })    
}

function TraerContenedorNoAsignadosXIdCliente(req,res) {
    cliente.TraerContenedorNoAsignadoXIdCliente(req.body.id_cliente,(err,data)=>{
        if (data == "") {
            res.status(200).send({message:'No existe contenedores'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'+err})
        } else{
            res.status(200).send({Contenedores : data})
        }
    })    
}



module.exports = {
    TraerClientes,
    TraerClienteXNit,
    RegistrarCliente,
    TraerClienteXId,
    TraerUsuariosXIdCliente,
    EliminarCliente,
    EditarCliente,
    TraerContenedorXIdCliente,
    TraerContenedorNoAsignadosXIdCliente,
    TraerClientesSelect
}