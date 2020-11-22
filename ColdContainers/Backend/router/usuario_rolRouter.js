'use strict'

const usuario_rolCtrl = require('../controllers/usuario_rolCtrl')

module.exports = function(app,auth){
    app.get('/api/TraerUsuariosRoles',auth,usuario_rolCtrl.TraerUsuarios_rol);
    app.post('/api/InsertarUsuarioRol',auth,usuario_rolCtrl.InsertarUsuarioRol);
    // colocar token de auth
    app.post('/api/TraerRolXIdUsuario',usuario_rolCtrl.TraerRolXIdUsuario);
}