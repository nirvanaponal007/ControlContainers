'use strict'

const connection = require('./conexion')
const services = require('../services');

let clienteContenedorModel = {};
const conexion = connection();

clienteContenedorModel.RegistrarClienteContenedor = (data, res) => {
    if (conexion) {
        const sql = `insert into tbl_cliente_contenedor SET 
                    uscon_cli_id =${conexion.escape(data.uscon_cli_id)},
                    uscon_con_id =${conexion.escape(data.uscon_con_id)},
                    uscon_estado = ${conexion.escape(data.uscon_estado)}`;
        conexion.query(sql, (err2, resultados) => {
            if (!err2) {
                res(null, resultados)
            } else {
                res(err2, null)
            }
        })
    }
}

clienteContenedorModel.EliminarClienteContenedor = (data, res) => {
    if (conexion) {
        const sql = `select uscon_id from tbl_cliente_contenedor where 
                uscon_cli_id=${conexion.escape(data.uscon_cli_id)} and 
                uscon_con_id=${conexion.escape(data.uscon_con_id)}`;
        conexion.query(sql, (err, resultados) => {
            if (!err) {
                console.log(resultados[0].uscon_id);
                const sql = `delete FROM tbl_cliente_contenedor where uscon_id=${resultados[0].uscon_id}`;
                conexion.query(sql,(err1,resultados1)=>{
                    if(!err1){
                        res(null,resultados1)
                    }else{
                        res(err1, null)
                    }
                })
            } else {
                res(err, null)
            }
        })
    }
}





module.exports = clienteContenedorModel;