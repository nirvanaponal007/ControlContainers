'use strict'

const connection = require('./conexion')

let TipoAlarmaModel = {};
const conexion = connection();

TipoAlarmaModel.TraerTipoAlarmas = (res)=> {
    if (conexion) {
        const sql = `select * from tbl_tipo_alarma;`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

module.exports = TipoAlarmaModel;