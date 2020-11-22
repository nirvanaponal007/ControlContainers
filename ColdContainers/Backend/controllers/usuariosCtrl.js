'use strict'

const usuarios = require('../models/usuarios');
const services = require('../services')
const cliente = require('../models/cliente')
const generator = require('generate-password');
const config = require('../config')
const usuario_rol = require('../models/usuario_rol');

function TraerParametros(req, res) {
    usuarios.Traerusuarios(req.body.id_usuario, (err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'No hay datos en la BD'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function RegistrarUsuario(req, res) {
    cliente.TraerIdClienteXNit(req.body.nit, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error' + err
            })
        } else if (data == "") {
            res.status(500).send({
                message: 'Nit no encontrado'
            })
        } else {
            const dataUser = {
                usu_nombre: req.body.nombre,
                usu_apellido: req.body.apellido,
                usu_username: req.body.username,
                usu_contrasena: req.body.contrasena,
                usu_email: req.body.correo,
                usu_celular: req.body.celular,
                usu_estado: req.body.estado,
                usu_id_cliente: data[0].cli_id
            }
            usuarios.RegistrarUsuario(dataUser, (err1, data1) => {
                if (err1) {
                    res.status(500).send({
                        message: err1
                    });
                } else {
                    console.log(data1.insertId);
                    const usuarioRolData = {
                        usr_token_activacion: '',
                        usr_fecha_activacion: '',
                        usr_token_recuperacion: '',
                        usr_fecha_recuperacion: '',
                        usr_id_rol: 3,
                        usr_id_usuario: data1.insertId
                    }
                    usuario_rol.InsertarUsuarioRol(usuarioRolData, (err2, data2) => {
                        if (err2) {
                            res.status(500).send({
                                message: 'Error al  Insertar usuario'
                            })
                        } else {
                            res.status(200).send({
                                message: 'Usuario Insertado Correctamente'
                            })
                        }
                    })

                }
            })
        }
    })
}

function Login(req, res) {
    const data = {
        usu_username: req.body.username,
        usu_email: req.body.email,
        usu_contrasena: req.body.contrasena,
    }
    usuarios.IniciarSession(data, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            console.log('Inicio Session => ' + data[0].usu_username);
            res.status(200).send({
                usuario: {
                    data,
                    token: services.createToken(data)
                }
            })
        }
    })
}

function TraerUsuarioXId(req, res) {
    usuarios.TraerUsuarioXId(req.body.id, (err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'No hay datos en la BD'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function EditarUsuario(req, res) {
    const data = {
        usu_nombre: req.body.nombre,
        usu_apellido: req.body.apellido,
        usu_celular: req.body.celular,
        usu_estado: req.body.estado,
        usu_id: req.body.id_usuario
    }
    usuarios.editarUsuario(data, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al editar datos' + err
            })
        } else {
            res.status(200).send({
                message: 'Datos Editados Exitosamente'
            })
        }
    })
}

function EliminarUSuario(req, res) {
    usuarios.eliminarUsuario(req.body.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al eliminar datos' + err
            })
        } else {
            res.status(200).send({
                message: 'Datos Eliminados Exitosamente'
            })
        }
    })
}

function CantidadUsuarios(req, res) {
    usuarios.cantidadUsuarios(req.body.id_usuario, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function TraerUsuariosXSerial(req, res) {
    usuarios.TraerUsuarioXSerial(req.body.serialContenedor, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            res.status(200).send(data)
        }
    })
}

function RestaurarContraseña(req, res) {
    usuarios.TraerIdUsuarioXCorreo(req.body.correo, (err, data) => {
        if (data == "") {
            res.status(200).send({
                message: 'Usuario No Existe'
            })
        } else if (err) {
            res.status(500).send({
                message: 'Error Al mostrar datos'
            })
        } else {
            var password = generator.generate({
                length: 20,
                numbers: true,
                //symbols: true,
                uppercase: true
            });
            console.log(password);
            const hashedPassword = services.encrypt(password);
            const usuarioData = {
                usu_id: data[0].usu_id,
                hashedPassword: hashedPassword
            }
            usuarios.RestaurarPassword(usuarioData, (err1, data1) => {

                if (err1) {
                    res.status(500).send({
                        message: 'Error Al mostrar datos'
                    })
                } else {
                    const html = `<!DOCTYPE html>
                    <html lang="es">
                        <head>
                            <meta charset="utf-8">
                            <title>Restauracion Contraseña</title>
                        </head>
                        <body style="background-color: #ffffff;font-weight: 700; font-family: Montserrat,'Helvetica Neue',Helvetica,Arial,sans-serif; ">
                            <div style="background-color: #ffffff;" align="center">
                                <a href="http://www.coldcontainers.com.co" target="_blank" rel="nofollow">
                                    <img width="20%" src="http://www.coldcontainers.com.co/uploads/DxXwDb3l/584x0_1139x0/logo.png">
                                </a>
                            </div>
                            <!--Copia desde aquí-->
                            <table style="width: 100%; padding: 10px; margin:0 auto; border-collapse: collapse;">
                                <tr>
                                    <td style="background-color: #ffffff">
                                        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                            <h2 style="color: #005c0f; margin: 0 0 7px">Hola ${data[0].usu_nombre} ${data[0].usu_apellido}!</h2>
                                            <br>
                                            <ul >
                                                <li>Estás recibiendo este correo porque hiciste una solicitud de recuperacion de contraseña para tu cuenta. 
                                                    <br>
                                                    <br>
                                                    <ul>
                                                        <li><spam style="color:black">NUEVA CONTRASEÑA: </spam>${password}</li>
                                                    </ul>
                                                </li>
                                                <br>
                                                Si no realizaste esta solicitud, envia un correo al administrador <a style="color: #005c0f;" href="mailto:tusofware.co@gmail.com">tusofware.co@gmail.com</a>
                                            </ul>
                    
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </body>
                    </html>`;
                    const notificacionData = {
                        from: config.from,
                        to: req.body.correo,
                        //cc: req.body.cc,
                        //bcc: req.body.bcc,
                        subject: "Restauracion De Contraseña",
                        //text: req.body.text,
                        html: html
                    }
                    const status = services.EnviarCorreos(notificacionData);
                    res.status(200).send({
                        message: 'Restauracion Contraseña Correctamente',
                        status: true
                    })
                }
            })
        }
    })
}

function CambiarContraseña(req, res) {
    const passwordAntigua = services.encrypt(req.body.contrasenaAntigua);
    const dataUsaurio = {
        id: req.body.id_usuario,
        contrasena: passwordAntigua
    }

    usuarios.comparaContrasena(dataUsaurio, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Error Al Cambiar Contraseña'
            })
        } else {
            const passwordNueva = services.encrypt(req.body.contrasenaNueva);
            const usuarioData = {
                usu_id: req.body.id_usuario,
                hashedPassword: passwordNueva
            }
            usuarios.RestaurarPassword(usuarioData, (err1, data1) => {
                if (err1) {
                    res.status(500).send({
                        message: 'Error Al Cambiar Contraseña'
                    })
                } else {
                    res.status(200).send({
                        message: 'Cambio Contraseña Correctamente',
                        status: true
                    })
                }
            })
        }
    })
}

module.exports = {
    TraerParametros,
    RegistrarUsuario,
    Login,
    TraerUsuarioXId,
    EditarUsuario,
    EliminarUSuario,
    CantidadUsuarios,
    TraerUsuariosXSerial,
    RestaurarContraseña,
    CambiarContraseña
}