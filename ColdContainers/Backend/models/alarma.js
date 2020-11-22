'use strict'

const connection = require('./conexion')


let AlarmaModel = {};
const conexion = connection();

AlarmaModel.TraerAlarmas = (res)=> {
    if (conexion) {
        const sql = `select * from tbl_alarma;`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.TraerAlarmasVistas = (res)=> {
    if (conexion) {
        const sql = `select * from tbl_alarma where vista=1;`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.TraerAlarmasNoVistas = (id,res)=> {
    if (conexion) {
        const sql = `select count(*) as cantidad from tbl_alarma where vista=0 and ala_usu_id=${conexion.escape(id)};`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.InsertarAlarmas = (alarmaData,res)=> {
    if (conexion) {
        const sql = `INSERT INTO tbl_alarma set
        ala_descripcion=${conexion.escape(alarmaData.ala_descripcion)},
        ala_estado=${conexion.escape(alarmaData.ala_estado)},
        ala_id_tipo=${conexion.escape(alarmaData.ala_id_tipo)},
        ala_usu_id=${conexion.escape(alarmaData.ala_usu_id)},
        ala_con_id=${conexion.escape(alarmaData.ala_con_id)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.EditarVistaAlarmas = (alarmaData,res)=> {
    if (conexion) {
        const sql = `UPDATE tbl_alarma set
        vista=${conexion.escape(alarmaData.vista)} 
        WHERE ala_id=${conexion.escape(alarmaData.id_alarma)}`;
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.TraerAlarmasXIdUsuario = (id,res)=> {
    if (conexion) {
        const sql = `select * from tbl_alarma where ala_usu_id=${conexion.escape(id)};`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.TraerCantidadAlarmasXIdUsuario = (id,res)=> {
    if (conexion) {
        const sql = `select count(*) as cantidad from tbl_alarma where ala_usu_id=${conexion.escape(id)};`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

AlarmaModel.TraerAlarmasXIdContenedor = (id,res)=> {
    if (conexion) {
        const sql = `select * from tbl_alarma where ala_con_id=${conexion.escape(id)};`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

module.exports = AlarmaModel;