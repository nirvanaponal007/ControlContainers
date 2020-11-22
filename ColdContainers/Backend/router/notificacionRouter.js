'use strict'

const notificacionCtrl = require('../controllers/NotificacionCtrl')

module.exports = function(app,auth){
    app.post('/api/EnviarCorreo',notificacionCtrl.envioCorreo);
}