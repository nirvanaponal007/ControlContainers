'use strict'

const connection = require('./conexion')
let clienteModel = {};
const conexion = connection();
const usuario_rol = require('./usuario_rol');

clienteModel.TraerClientes = (cliente) => {
    if (conexion) {
        conexion.query("SELECT * FROM tbl_cliente  where cli_eliminado=0", (err, res) => {
            if (err) {
                cliente(err, null)
            } else {
                cliente(null, res)
            }
        })
    }
}

clienteModel.TraerClientesSelect = (cliente) => {
    if (conexion) {
        conexion.query("SELECT * FROM tbl_cliente  where cli_eliminado=0 union select 0,'0','Sin Asignar',1,'','','','',0,'','','',0;", (err, res) => {
            if (err) {
                cliente(err, null)
            } else {
                cliente(null, res)
            }
        })
    }
}

clienteModel.TraerIdClienteXNit = (nit, cliente) => {
    if (conexion) {
        const sql = `SELECT cli_id FROM tbl_cliente WHERE cli_nit_empresa=${conexion.escape(nit)};`;
        conexion.query(sql, (err, res) => {
            if (err) {
                cliente(err, null)
            } else {
                cliente(null, res)
            }
        })
    }
}

clienteModel.RegistrarCliente = (clienteData, res) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_cliente WHERE cli_nit_empresa = ${conexion.escape(clienteData.cli_nit_empresa)} OR cli_email=${conexion.escape(clienteData.cli_email)}`;
        conexion.query(sql, (err3, result) => {
            if (err3) {
                res(err3, null);
            } else if (result != "") {
                res({
                    error: "El cliente ya esta registrado en nuestra base de datos"
                }, null)
            } else {
                const sql = `INSERT INTO tbl_cliente SET 
                        cli_nit_empresa = ${conexion.escape(clienteData.cli_nit_empresa)},
                        cli_razon_social = ${conexion.escape(clienteData.cli_razon_social)},
                        cli_estado = ${conexion.escape(clienteData.cli_estado)},
                        cli_email = ${conexion.escape(clienteData.cli_email)},
                        cli_direccion = ${conexion.escape(clienteData.cli_direccion)},
                        cli_telefono = ${conexion.escape(clienteData.cli_telefono)},
                        cli_pagina_web = ${conexion.escape(clienteData.cli_pagina_web)},
                        cli_n_empleados = ${conexion.escape(clienteData.cli_n_empleados)},
                        cli_celular = ${conexion.escape(clienteData.cli_celular)},
                        cli_imagen = ${conexion.escape(clienteData.cli_imagen)}`;
                conexion.query(sql, (err2, resultados) => {
                    if (!err2) {
                        res(null, resultados)
                    } else {
                        res(err2, null)
                    }
                })

            }
        })
    }
}

clienteModel.TraerClienteXId = (cli_id, cliente) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_cliente WHERE cli_id=${conexion.escape(cli_id)};`;
        conexion.query(sql, (err, res) => {
            if (err) {
                cliente(err, null)
            } else {
                cliente(null, res)
            }
        })
    }
}

clienteModel.TraerUsuariosXIdCliente = (cli_id, cliente) => {
    if (conexion) {
        const sql = `select u.* from tbl_usuario u inner join tbl_cliente c where u.usu_id_cliente=c.cli_id and c.cli_id=${conexion.escape(cli_id)} and u.usu_eliminado=0;`;
        conexion.query(sql, (err, res) => {
            if (err) {
                cliente(err, null)
            } else {
                cliente(null, res)
            }
        })
    }
}

clienteModel.eliminarCliente = (id_cliente, res) => {
    if (conexion) {
        const sql = `update tbl_cliente set  
            cli_eliminado=1 
            where 
            cli_id=${conexion.escape(id_cliente)}`
        console.log(sql);

        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

clienteModel.editarCliente = (cliente, res) => {
    if (conexion) {
        const sql = `update tbl_cliente set  
            cli_estado=${conexion.escape(cliente.cli_estado)}, 
            cli_direccion=${conexion.escape(cliente.cli_direccion)},
            cli_telefono=${conexion.escape(cliente.cli_telefono)}, 
            cli_pagina_web=${conexion.escape(cliente.cli_pagina_web)}, 
            cli_n_empleados=${conexion.escape(cliente.cli_n_empleados)}, 
            cli_celular=${conexion.escape(cliente.cli_celular)}, 
            cli_imagen=${conexion.escape(cliente.cli_imagen)}  
            where 
            cli_id=${conexion.escape(cliente.cli_id)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

clienteModel.TraerContenedorXIdCliente = (id_cliente, res) => {
    if (conexion) {
        const sql = `select c.* from tbl_contenedor c inner join tbl_cliente_contenedor cc where c.con_id=cc.uscon_con_id and cc.uscon_cli_id=${conexion.escape(id_cliente)}`;
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

clienteModel.TraerContenedorNoAsignadoXIdCliente = (id_cliente, res) => {
    if (conexion) {
        //const sql = `SELECT * FROM tbl_contenedor c WHERE c.con_id NOT IN (SELECT uscon_con_id FROM tbl_cliente_contenedor cc where uscon_cli_id=${conexion.escape(id_cliente)} )`;
        const sql = `SELECT * FROM tbl_contenedor c WHERE c.con_id NOT IN (SELECT uscon_con_id FROM tbl_cliente_contenedor cc)`;
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

module.exports = clienteModel;