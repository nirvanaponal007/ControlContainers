'use strict'

const eventoUsuarioCtrl = require('../controllers/eventoUsuarioCtrl')


module.exports = function(app,auth){
    app.get('/api/TraerEventosUsuarios',auth,eventoUsuarioCtrl.TraerEventosUsuarios);
    app.post('/api/InsertarEventoUsuario',eventoUsuarioCtrl.InsertarEventoUsuario);
    app.post('/api/TraerEventoUsuarioXIdContenedor',eventoUsuarioCtrl.TraerEventoUsuarioXIdContenedor);
    
}