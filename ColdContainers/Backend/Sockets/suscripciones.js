var mqtt = require('mqtt')
const config = require('../config')
const eventContainers = require('../models/eventoContainers')
// const {
//     io
// } = require('../index')
// const mensaje = [];

// io.on('connection', (clientes) => {
    // console.log(clientes.handshake.address);
    var client = mqtt.connect(`mqtt://${config.AMBIENT}:${config.PORT_SOCKET}`)
    client.on('connect', function () {
        //console.log(`mqtt://${config.AMBIENT}:${config.PORT_SOCKET}`);
        client.subscribe('contenedor/#')
    })
    client.on('message', function (topic, message) {
        context = JSON.parse(message.toString());
        //console.log(context);
        const contenedorData = {
            serialContenedor: context.serialContenedor,
            latitud: context.latitud,
            longitud: context.longitud,
            datos1: context.datos1,
            datos2: context.datos2,
            delay_time: context.delay_time
        }
        //console.log(context.serialContenedor);
        //console.log("INGRSA");
        //mensaje.push(contenedorData);
        // clientes.emit(contenedorData.serialContenedor, contenedorData);
        // clientes.on('add-message', (data) => {
        //     console.log(data);
        //     mensaje.push(data);
        //     io.sockets.emit('mensaje', mensaje);
        // })
        eventContainers.insertarEventoContainers(contenedorData, (err, data) => {
            console.log(contenedorData);
            if (err) {
                console.log('Error: ' + JSON.stringify(err));
            } else {
                //console.log('insertado: ' + JSON.stringify(data));
            }
        })
    })
// })