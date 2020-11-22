const connection = require('./conexion')
const usuario_rol = require('./usuario_rol');
let contenedorModel = {};
const conexion = connection();

contenedorModel.TraerContenedores = (id_usuario, contenedor) => {
    if (conexion) {
        usuario_rol.TraerRolXidUsuario(id_usuario, (err, data) => {
            if (data[0].usr_id_rol === 1) {
                conexion.query(`select * from (select IFNULL(c.cli_id,0) as cli_id,IFNULL(c.cli_razon_social,'Sin Asignar') as cli_razon_social,con.*,IFNULL(c.cli_eliminado,0) as eli from ((tbl_contenedor con left join tbl_cliente_contenedor cc on con.con_id=cc.uscon_con_id) left join tbl_cliente c on cc.uscon_cli_id=c.cli_id)) ass where ass.eli=0 ;`, (err, ress) => {
                    if (err) {
                        contenedor(err, null)
                    } else {
                        contenedor(null, ress)
                    }
                })
            } else {
                conexion.query(`select c.cli_id,c.cli_razon_social,con.* from (((tbl_usuario u inner join tbl_cliente c on u.usu_id_cliente=c.cli_id) inner join tbl_cliente_contenedor cc on c.cli_id=cc.uscon_cli_id) inner join tbl_contenedor con on cc.uscon_con_id=con.con_id) where u.usu_id=${conexion.escape(id_usuario)} and c.cli_eliminado=0 order by con.con_fecha_creacion;`, (err, ress) => {
                    if (err) {
                        contenedor(err, null)
                    } else {
                        contenedor(null, ress)
                    }
                })
            }
        })
    }
}

contenedorModel.InsertarContenedor = (contenedorData, res) => {
    if (conexion) {
        const sql = `INSERT INTO tbl_contenedor set
                con_serial_contenedor = ${conexion.escape(contenedorData.con_id_contenedor)},
                con_nombre = ${conexion.escape(contenedorData.con_nombre)},
                con_url_foto = ${conexion.escape(contenedorData.con_foto)}`;
        contenedorModel.ExisteContenedor(contenedorData.con_id_contenedor, (err, data) => {
            if (data == "") {
                conexion.query(sql, (err, result) => {
                    if (!err) {
                        res(null, result)
                    } else {
                        res(err, result)
                    }
                });
            } else if (err) {
                res(err, null)
            } else {
                res(null, { message: 'Ya Exite Contenedor' })
            }
        })
    }
}

contenedorModel.ExisteContenedor = (serialContenedor, res) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_contenedor WHERE con_serial_contenedor=${conexion.escape(serialContenedor)}`;
        conexion.query(sql, (err, res1) => {
            if (err) {
                res(err, null)
            } else {
                res(null, res1)
            }
        })
    }
}

contenedorModel.TraerEstadoXSerial = (serial, res) => {
    if (conexion) {
        const sql = `SELECT con_estado FROM tbl_contenedor WHERE con_serial_contenedor=${conexion.escape(serial)}`;
        conexion.query(sql, (err, res1) => {
            if (err) {
                res(err, null)
            } else {
                res(null, res1)
            }
        })
    }
}

contenedorModel.TraerContenedorXSerial = (serial, res) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_contenedor WHERE con_serial_contenedor=${conexion.escape(serial)}`;
        conexion.query(sql, (err, res1) => {
            if (err) {
                res(err, null)
            } else {
                res(null, res1)
            }
        })
    }
}


contenedorModel.TraerContenedorXid = (id, res) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_contenedor WHERE con_id=${conexion.escape(id)}`;
        conexion.query(sql, (err, res1) => {
            if (err) {
                res(err, null)
            } else {
                res(null, res1)
            }
        })
    }
}

contenedorModel.cantidadContenedores = (id_usuario, res) => {
    if (conexion) {
        usuario_rol.TraerRolXidUsuario(id_usuario, (err, data) => {
            if (data[0].usr_id_rol === 1) {
                conexion.query(`select count(*) as cantidad from tbl_contenedor`, (err, ress) => {
                    if (err) {
                        res(err, null)
                    } else {
                        res(null, ress)
                    }
                })
            } else {
                conexion.query(`select count(*) as cantidad from (tbl_usuario u inner join tbl_cliente c on u.usu_id_cliente=c.cli_id) inner join tbl_cliente_contenedor cc on c.cli_id=cc.uscon_cli_id where u.usu_id=${conexion.escape(id_usuario)}`, (err, ress) => {
                    if (err) {
                        res(err, null)
                    } else {
                        res(null, ress)
                    }
                })
            }
        })
    }
}

contenedorModel.cantidadContenedoresActivos = (id_usuario, res) => {
    if (conexion) {
        usuario_rol.TraerRolXidUsuario(id_usuario, (err, data) => {
            var sql = "";
            if (data[0].usr_id_rol === 1) {
                sql = `select count(*) as cantidad from tbl_contenedor where con_estado=1`;
            } else {
                sql = `select count(*) as cantidad from ((tbl_usuario u inner join tbl_cliente c on u.usu_id_cliente=c.cli_id) inner join tbl_cliente_contenedor cc on c.cli_id=cc.uscon_cli_id ) inner join tbl_contenedor tc on cc.uscon_con_id=tc.con_id where u.usu_id=${conexion.escape(id_usuario)} and tc.con_estado=1`;
            }
            conexion.query(sql, (err, ress) => {
                if (err) {
                    res(err, null)
                } else {
                    res(null, ress)
                }
            })
        })
    }
}

contenedorModel.EditarContenedor = (contenedorData, res) => {
    if (conexion) {
        const sql = `UPDATE tbl_contenedor
        SET con_nombre = ${conexion.escape(contenedorData.con_nombre)}, con_url_foto= ${conexion.escape(contenedorData.con_url_foto)},con_descripcion = ${conexion.escape(contenedorData.con_descripcion)}
        WHERE con_id = ${conexion.escape(contenedorData.con_id)};`;
        console.log(sql);
        
        conexion.query(sql, (err, res1) => {
            if (err) {
                res(err, null)
            } else {
                res(null, res1)
            }
        })

    }
}

module.exports = contenedorModel;