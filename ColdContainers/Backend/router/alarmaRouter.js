'use strict'

const AlarmaCtrl = require('../controllers/alarmaCtrl')

module.exports = function(app,auth){
    app.get('/api/TraerAlarmas',AlarmaCtrl.TraerAlarmas);
    app.get('/api/TraerAlarmasVistas',AlarmaCtrl.TraerAlarmasVistas);
    app.post('/api/TraerCantidadAlarmasNoVistasXIdUsuario',AlarmaCtrl.TraerAlarmasNoVistas);
    app.post('/api/InsertarAlarma',AlarmaCtrl.InsertarAlarma);
    app.post('/api/EditarAlarma',AlarmaCtrl.UpdateAlarma);
    app.post('/api/TraerAlarmasXIdUsuario',AlarmaCtrl.TraerAlarmasXIdUsuario);
    app.post('/api/TraerCantidadAlarmasXIdUsuario',AlarmaCtrl.TraerCantidadAlarmasXIdUsuario);
    app.post('/api/TraerAlarmasXIdContenedor',AlarmaCtrl.TraerAlarmasXIdContenedor);
}