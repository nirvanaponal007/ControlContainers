var mosca = require('mosca');
const config = require('../config')

var settings = {
    port: config.PORT_SOCKET,
    http:{
        port:config.PORT_WEBSOCKET,
        bundle: false,
        static: './'
    }
}
var server = new mosca.Server(settings);

server.on('ready', function () {
    console.log(`Broker corriendo en http://${config.AMBIENT}:${config.PORT_SOCKET}`);
});

// Cliente conectador con id
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
    //console.log(client);
});


// CLientes desconectados con id 
// server.on('clientDisconnected', function(client) {
//     console.log('client desconnected', client.id);
// });

// Clientes desconectados a un topic con id 
// server.on('unsubscribed', function(topic,client) {
//     console.log('desconectador del Topic', topic);
//     console.log('client desconnecting', client.id);
// });

// Clientes conectados a un topic con id 
// server.on('subscribed', function(topic,client) {
//     const data = {
//         Topic: topic,
//         cliente: client.id
//     }
//     console.log(data);
// });
