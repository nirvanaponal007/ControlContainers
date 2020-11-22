'use strict'

const connection = require('./conexion')
const services = require('../services');
const usuario_rol = require('./usuario_rol');

let usuariosModel = {};
const conexion = connection();

usuariosModel.Traerusuarios = (id_usuario, usuarios) => {
    if (conexion) {
        usuario_rol.TraerRolXidUsuario(id_usuario, (err, data) => {
            if (data[0].usr_id_rol === 1) {
                conexion.query('SELECT usu_id,usu_nombre,usu_apellido,usu_username,usu_email,usu_celular,usu_fecha_creacion,usu_estado FROM tbl_usuario where usu_eliminado=0', (err, res) => {
                    if (err) {
                        usuarios(err, null)
                    } else {
                        usuarios(null, res)
                    }
                })
            } else {
                conexion.query(`select * from tbl_usuario where usu_id_cliente=(select usu_id_cliente from tbl_usuario where usu_id=${conexion.escape(id_usuario)}) and usu_eliminado=0;`, (err, res) => {
                    if (err) {
                        usuarios(err, null)
                    } else {
                        usuarios(null, res)
                    }
                })
            }
        })
    }
}

usuariosModel.RegistrarUsuario = (usuarioData, res) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_usuario WHERE (usu_username = ${conexion.escape(usuarioData.usu_username)} or usu_email=${conexion.escape(usuarioData.usu_email)}) and usu_eliminado=0`;
        conexion.query(sql, (err3, result) => {
            if (err3) {
                res(err3, null);
            } else if (result != "") {
                res({
                    error: "El usuario ya esta registrado en nuestra base de datos"
                }, null)
            } else {
                const hashedPassword = services.encrypt(`${usuarioData.usu_contrasena}`);
                const sql = `INSERT INTO tbl_usuario SET 
                        usu_nombre = ${conexion.escape(usuarioData.usu_nombre)},
                        usu_apellido = ${conexion.escape(usuarioData.usu_apellido)},
                        usu_username = ${conexion.escape(usuarioData.usu_username)},
                        usu_contrasena = '${hashedPassword}',
                        usu_email = ${conexion.escape(usuarioData.usu_email)},
                        usu_celular = ${conexion.escape(usuarioData.usu_celular)},
                        usu_estado =${conexion.escape(usuarioData.usu_estado)},
                        usu_id_cliente = ${conexion.escape(usuarioData.usu_id_cliente)}`;
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

usuariosModel.IniciarSession = (usuarioData, res) => {
    if (conexion) {
        const sql = `SELECT * FROM tbl_usuario WHERE usu_username = ${conexion.escape(usuarioData.usu_username)} OR usu_email=${conexion.escape(usuarioData.usu_email)}`;
        conexion.query(sql, (err, result) => {
            if (err) {
                res({
                    error: err
                }, null)
            } else if (result == "") {
                res({
                    error: "El usuario no esta registrado en nuestra base de datos"
                }, null)
            } else {
                const sql = `SELECT u.* FROM tbl_usuario u inner join tbl_cliente c WHERE (u.usu_username=${conexion.escape(usuarioData.usu_username)} or u.usu_email=${conexion.escape(usuarioData.usu_email)}) and u.usu_estado=1 and u.usu_id_cliente=c.cli_id and c.cli_eliminado=0 and c.cli_estado=1`;
                conexion.query(sql, (err1, resultados) => {
                    if (err1) {
                        res({
                            error: err1
                        }, null)
                    } else if (resultados == "") {
                        res({
                            error: "El usuario no esta activo"
                        }, null)
                    } else {
                        const dp = `${usuarioData.usu_contrasena}`;
                        const hashedPassword = services.encrypt(`${dp}`);
                        const sql = `SELECT usu_id,usu_nombre,usu_apellido,usu_username,usu_estado,usu_email,usu_celular,usu_fecha_creacion,ur.usr_id_rol FROM tbl_usuario u inner join tbl_usuario_rol ur WHERE (usu_username=${conexion.escape(usuarioData.usu_username)} or usu_email=${conexion.escape(usuarioData.usu_email)}) and usu_contrasena='${hashedPassword}' and usu_estado=1 and u.usu_id=ur.usr_id_usuario;`;                        
                        conexion.query(sql, (err2, data) => {
                            if (err2) {
                                res({
                                    error: err2
                                }, null)
                            } else if (data == "") {
                                res({
                                    error: "El usuario y contraseña incorrectos"
                                }, null)
                            } else {
                                res(null, data);
                            }
                        });
                    }
                })

            }
        })
    }
}

usuariosModel.TraerUsuarioXId = (usu_id, res) => {
    if (conexion) {
        conexion.query(`SELECT * FROM tbl_usuario where usu_id=${conexion.escape(usu_id)}`, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

usuariosModel.editarUsuario = (usuario, res) => {
    if (conexion) {
        const sql = `update tbl_usuario set 
            usu_nombre=${conexion.escape(usuario.usu_nombre)}, 
            usu_apellido=${conexion.escape(usuario.usu_apellido)}, 
            usu_celular=${conexion.escape(usuario.usu_celular)}, 
            usu_estado=${conexion.escape(usuario.usu_estado)} 
            where 
            usu_id=${conexion.escape(usuario.usu_id)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

usuariosModel.eliminarUsuario = (id_usuario, res) => {
    if (conexion) {
        const sql = `update tbl_usuario set  
            usu_eliminado=1 
            where 
            usu_id=${conexion.escape(id_usuario)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

usuariosModel.cantidadUsuarios = (id_usuario, res) => {
    if (conexion) {
        usuario_rol.TraerRolXidUsuario(id_usuario, (err, data) => {
            var sql = "";
            if (data[0].usr_id_rol === 1) {
                sql = `select count(*) as cantidad from tbl_usuario where usu_eliminado=0`;
            } else if (data[0].usr_id_rol === 2) {
                sql = `select count(*) as cantidad from tbl_usuario where usu_id_cliente=(select usu_id_cliente from tbl_usuario where usu_id=${conexion.escape(id_usuario)}) and usu_eliminado=0`;
            } else if (data[0].usr_id_rol === 3) {
                sql = `select count(*) as cantidad from tbl_usuario where usu_id=${conexion.escape(id_usuario)} and usu_eliminado=0`;
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

usuariosModel.TraerUsuarioXSerial = (serial, res) => {
    if (conexion) {
        const sql = `select u.usu_id,u.usu_nombre,u.usu_apellido,u.usu_email,c.con_id,c.con_nombre,cli.cli_razon_social from (((tbl_usuario u 
            inner join tbl_cliente_contenedor cc on u.usu_id_cliente=cc.uscon_cli_id and u.usu_eliminado=0) 
                inner join tbl_contenedor c on c.con_id=cc.uscon_con_id and c.con_serial_contenedor=${conexion.escape(serial)}) inner join tbl_cliente cli on cli.cli_id=cc.uscon_cli_id);`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

usuariosModel.RestaurarPassword = (usuarioData,res)=> {
    if (conexion) {
        const sql = `update tbl_usuario set  
            usu_contrasena=${conexion.escape(usuarioData.hashedPassword)} 
            where 
            usu_id=${conexion.escape(usuarioData.usu_id)}`
        conexion.query(sql, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

usuariosModel.TraerIdUsuarioXCorreo = (correo,res)=> {
    if (conexion) {
        conexion.query(`select usu_id,usu_nombre,usu_apellido,usu_username from tbl_usuario where usu_email=${conexion.escape(correo)}`, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

usuariosModel.comparaContrasena = (data,res)=>{
    if (conexion) {
        conexion.query(`select usu_id from tbl_usuario where usu_contrasena=${conexion.escape(data.contrasena)} and usu_id=${conexion.escape(data.id)}`, (err, data) => {
            if (err) {
                res(err, null)
            } else {
                res(null, data)
            }
        })
    }
}

module.exports = usuariosModel;