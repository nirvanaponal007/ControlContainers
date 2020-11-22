'use strict'

const connection = require('./conexion')


let eventoUsuarioModel = {};
const conexion = connection();

eventoUsuarioModel.TraerEventoUsuarios = (res)=> {
    if (conexion) {
        const sql = `select * from tbl_evento_usuario;`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

eventoUsuarioModel.InsertarEventoUsuario = (eventoUsuarioData,res)=> {
    if (conexion) {
        const sql = `INSERT INTO tbl_evento_usuario set
        evus_usu_id=${conexion.escape(eventoUsuarioData.evus_usu_id)},
        evus_con_id=${conexion.escape(eventoUsuarioData.evus_con_id)},
        evus_tipo_evento=${conexion.escape(eventoUsuarioData.evus_tipo_evento)},
        evus_origen_evento=${conexion.escape(eventoUsuarioData.evus_origen_evento)},
        evus_recursos_afectados=${conexion.escape(eventoUsuarioData.evus_recursos_afectados)},
        evus_resultado=${conexion.escape(eventoUsuarioData.evus_resultado)},
        evus_actividad_realizada=${conexion.escape(eventoUsuarioData.evus_actividad_realizada)},
        evus_identidad_ip=${conexion.escape(eventoUsuarioData.evus_identidad_ip)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

eventoUsuarioModel.TraerEventoUsuarioXIdContenedor = (id,res)=> {
    if (conexion) {
        const sql = `select * from tbl_evento_usuario where evus_con_id=${conexion.escape(id)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}


module.exports = eventoUsuarioModel;