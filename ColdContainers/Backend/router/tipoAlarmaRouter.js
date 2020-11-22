'use strict'

const tipoAlarmaCtrl = require('../controllers/tipoAlarmaCtrl')

module.exports = function(app,auth){
    app.get('/api/TraerTipoAlarma',tipoAlarmaCtrl.TraerTipoAlarmas);
}