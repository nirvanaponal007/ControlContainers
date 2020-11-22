'use strict'

const contenedorCtrl = require('../controllers/contenedorCtrl')

module.exports = function(app,auth){
    app.post('/api/TraerContenedores',auth,contenedorCtrl.TraerContenedores);
    app.post('/api/InsertarContenedor',auth,contenedorCtrl.InsertarContenedor);
    app.post('/api/EstadoContenedor',auth,contenedorCtrl.EsadoContenedor);
    app.post('/api/TraerContendorXSerail',auth,contenedorCtrl.TraerContenedorXSerial);
    app.post('/api/TraerCantidadContenedores',auth,contenedorCtrl.CantidadContenedores);
    app.post('/api/TraerCantidadContenedoresActivos',auth,contenedorCtrl.CantidadContenedoresActivos);
    app.post('/api/TraerContendorXID',auth,contenedorCtrl.TraerContenedorXId);
    app.post('/api/EditarContenedorXID',contenedorCtrl.EditarContenedorXId)
}