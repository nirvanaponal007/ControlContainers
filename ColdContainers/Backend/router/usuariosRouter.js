'use strict'

const usuariosCtrl = require('../controllers/usuariosCtrl')

module.exports = function(app,auth){
    app.post('/api/TraerUsuarios',auth,usuariosCtrl.TraerParametros);
    app.post('/api/InsertarUsuario',auth,usuariosCtrl.RegistrarUsuario);
    app.post('/api/Login',usuariosCtrl.Login);
    app.post('/api/TraerUsuarioXId',auth,usuariosCtrl.TraerUsuarioXId);
    app.post('/api/EditarUsuario',auth,usuariosCtrl.EditarUsuario);
    app.post('/api/EliminarUsuario',auth,usuariosCtrl.EliminarUSuario);
    app.post('/api/TraerCantidadUsuarios',auth,usuariosCtrl.CantidadUsuarios);
    app.post('/api/TraerUsuarioXSerial',auth,usuariosCtrl.TraerUsuariosXSerial);
    app.post('/api/CambiarContrasena',usuariosCtrl.CambiarContraseña);
    //Sin token de autorizacion
    app.post('/api/RestaurarContrasena',usuariosCtrl.RestaurarContraseña);
}

    