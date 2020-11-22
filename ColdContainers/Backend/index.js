'use strict'

const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const config = require('./config')
const auth = require('./middlewares/auth')
const multer= require('multer')
// const socketIO = require('socket.io');
// const http = require('http');
// let server = http.createServer(app);
///const Node_tls_reject_unauthorized = '0'


//subir fotos al servidor-----------------------------------------
const storage= multer.diskStorage({
    destination:'public/uploads',
    filename:(req,file,cb)=>{
        var date = new Date();
        var timestamp = date.getTime(); 
        cb(null,timestamp+"-"+(file.originalname).replace(/ /g, ""));
    }

})
app.use(multer({
    storage:storage,
    dest:'public/uploads'
}).single('image_upload'))

//--------------------------------------------------------------------
app.use(bodyParse.urlencoded({
    extended: false
}));
app.use(bodyParse.json());
app.use(express.static('public'));
//-------socket
// module.exports.io = socketIO(server);
//-------socket
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //Cambiar a las url que se van a permitit utilizar la api
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization ');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// app.post('/upload',(req,res)=>{
//     console.log(req.file);
//     res.send("upload")
// })

require('./router/eventContainersRouter')(app, auth);
require('./router/parametrosRouter')(app, auth);
require('./router/contenedorRouter')(app, auth);
require('./router/usuariosRouter')(app, auth);
require('./router/clienteRouter')(app, auth);
require('./router/usuario_rolRouter')(app, auth);
require('./router/clienteContainerRouter')(app, auth);
require('./router/tipoAlarmaRouter')(app, auth);
require('./router/alarmaRouter')(app, auth);
require('./router/notificacionRouter')(app, auth);
require('./router/eventosUsuariosRouter')(app, auth);


//--------Inicio Broker Sockets-------------
require('./Sockets/broker')
// --------suscripción a Topico => contenedores
//require('./Sockets/suscripciones')
//-------Fin Broker Sockets------------------

app.listen(config.PORT, () => {
    console.log(`Ambiente: ${config.AMBIENT}`);
    console.log(`Api Rest Corriendo en http://${config.AMBIENT}:${config.PORT}`);
    console.log(`Base de datos : ${config.database}`);
})


//allow OPTIONS on all resources
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
// });