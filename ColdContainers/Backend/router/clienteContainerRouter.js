'use strict'

const clienteContainerCtrl = require('../controllers/clienteContenedorCtrl')

module.exports = function(app,auth){
    app.post('/api/InsertarClienteContainer',auth,clienteContainerCtrl.InsertarContenedor);
    app.post('/api/EliminarClienteContainer',auth,clienteContainerCtrl.EliminarClienteContenedor);
}