'use strict'

const parametrosCtrl = require('../controllers/parametrosCtrl')

module.exports = function(app,auth){
    app.get('/api/Traerparametros',auth,parametrosCtrl.TraerParametros);
    app.post('/api/InsertarParametro',parametrosCtrl.InsertarParametro);
    app.post('/api/TraerValorXClave',parametrosCtrl.TraerValorXClave);
}