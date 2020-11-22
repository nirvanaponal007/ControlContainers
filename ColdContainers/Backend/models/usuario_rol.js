'use strict'

const connection = require('./conexion')

let usuario_rolModel = {};
const conexion = connection();

usuario_rolModel.Traerusuarios_roles = (usuarios_rol) => {
    if (conexion) {
        conexion.query('select * from tbl_usuario_rol', (err, res) => {
            if (err) {
                usuarios_rol(err, null)
            } else {
                usuarios_rol(null, res)
            }
        })
    }
}

usuario_rolModel.InsertarUsuarioRol = (data,usuarioRol)=> {
    if (conexion) {
        const sql = `INSERT INTO tbl_usuario_rol SET 
        usr_token_activacion = ${conexion.escape(data.usr_token_activacion)},
        usr_fecha_activacion = ${conexion.escape(data.usr_fecha_activacion)},
        usr_token_recuperacion = ${conexion.escape(data.usr_token_recuperacion)},
        usr_fecha_recuperacion = ${conexion.escape(data.usr_fecha_recuperacion)},
        usr_id_rol = ${conexion.escape(data.usr_id_rol)},
        usr_id_usuario =${conexion.escape(data.usr_id_usuario)}`;
        conexion.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                usuarioRol(err, null)
            } else {
                usuarioRol(null, res)
            }
        })
    }
}

usuario_rolModel.TraerRolXidUsuario = (id_usuario,usuarioRol)=>{
    if (conexion) {
        const sql = `select usr_id_rol from tbl_usuario_rol where usr_id_usuario=${conexion.escape(id_usuario)}`;
        conexion.query(sql, (err, res) => {
            if (err) {
                usuarioRol(err, null)
            } else {
                usuarioRol(null, res)
            }
        })
    }
}

module.exports = usuario_rolModel;