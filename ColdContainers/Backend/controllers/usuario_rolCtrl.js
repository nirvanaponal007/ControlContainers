'use strict'

const usuario_rol = require('../models/usuario_rol');

function TraerUsuarios_rol(req,res){
    usuario_rol.Traerusuarios_roles((err,data)=> {
        if (data == "") {
            res.status(200).send({message:'No hay datos en la BD'})
        } else if(err){
            res.status(500).send({message:'Error Al mostrar datos'})
        } else{
            res.status(200).send({usuarios : data})
        }
    })
}

function InsertarUsuarioRol(req,res) {
    const usuarioRolData = {
        usr_token_activacion :req.body.tokenActivacion,
        usr_fecha_activacion :req.body.fechaActivacion,
        usr_token_recuperacion :req.body.tokenRecuperacion,
        usr_fecha_recuperacion :req.body.fechaRecuperacion,
        usr_id_rol :req.body.id_rol,
        usr_id_usuario :req.body.id_usuario
    }
    usuario_rol.InsertarUsuarioRol(usuarioRolData,(err,data)=> {
        if (err) {
            res.status(500).send({message: 'Error al insertar rol del usuario'});
        }else{
            res.status(200).send({message: 'Insertado correctamente'});
        }
    })
    
}

function TraerRolXIdUsuario(req,res) {
    usuario_rol.TraerRolXidUsuario(req.body.id_usuario,(err,data)=> {
        if (err) {
            res.status(500).send({message: 'Usuario no existe'});
        }else{
            res.status(200).send(data);
        }
    })
    
}

module.exports = {
    TraerUsuarios_rol,
    InsertarUsuarioRol,
    TraerRolXIdUsuario
}