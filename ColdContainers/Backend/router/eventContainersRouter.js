'use strict'

const eventContainersCtrl = require('../controllers/eventoContainersCtrl')

module.exports = function(app,auth){
    app.get('/api/TraerEventosContainers',auth,eventContainersCtrl.TraerEventosContainers);
    app.post('/api/TraerUltimoRegistroDatosContenerdor',auth,eventContainersCtrl.TraerContenedorXSerial);
    app.post('/api/InsertarEventosContainer',eventContainersCtrl.insertarEventoContainer);
    app.post('/api/ReporteTempSuministro',auth,eventContainersCtrl.ReporteTemperatura);
}