'use strict'

const clienteCtrl = require('../controllers/clienteCtrl')

module.exports = function(app,auth){
    app.get('/api/TraerClientes',auth,clienteCtrl.TraerClientes);
    app.get('/api/TraerClientesSelect',auth,clienteCtrl.TraerClientesSelect);
    app.post('/api/TraerClienteXNit',auth,clienteCtrl.TraerClienteXNit);
    app.post('/api/InsertarCliente',auth,clienteCtrl.RegistrarCliente);
    app.post('/api/TraerClienteXId',auth,clienteCtrl.TraerClienteXId);
    app.post('/api/TraerUsuariosXIdCliente',auth,clienteCtrl.TraerUsuariosXIdCliente);
    app.post('/api/EliminarCliente',auth,clienteCtrl.EliminarCliente);
    app.post('/api/EditarCliente',auth,clienteCtrl.EditarCliente);
    app.post('/api/TraerContenedorXIdCliente',auth,clienteCtrl.TraerContenedorXIdCliente);
    app.post('/api/TraerContenedorNoAsignadosXIdCliente',auth,clienteCtrl.TraerContenedorNoAsignadosXIdCliente);
}