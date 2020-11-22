'use strict'

const connection = require('./conexion')

let parametrosModel = {};
const conexion = connection();

parametrosModel.TraerParametros = (parametros)=> {
    if (conexion) {
        conexion.query('SELECT * FROM tbl_parametros;',(err,res)=>{
            if (err) {
                parametros(err,null)
            } else {
                parametros(null,res)
            }
        })
    }
}

parametrosModel.insertarParametro = (parametroData,res)=>{
    if (conexion) {
        const sql = `INSERT INTO tbl_parametros set
                par_clave = ${conexion.escape(parametroData.par_clave)},
                par_valor = ${conexion.escape(parametroData.par_valor)}`;                    
        conexion.query(sql,(err,result)=>{
            if (!err){
                res(null,result)
            }else{
                res(err,result)
            }
        });
    }
}

parametrosModel.TraerParametroXClave = (clave,res)=>{
    if (conexion) {
        const sql = `select par_valor from tbl_parametros where par_clave=${conexion.escape(clave)};`
        conexion.query(sql,(err,result)=>{
            if (err) {
                res(err,null)
            } else {
                res(null,result)
            }
        })
    }
}

module.exports = parametrosModel;