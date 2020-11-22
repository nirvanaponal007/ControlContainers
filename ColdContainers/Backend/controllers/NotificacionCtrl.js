'use strict'
// 
const services = require('../services/index')

function envioCorreo(req, res) {
    // const notificacionData = {
    //     from: "Tu Software <tusoftware.co@gmail.com>",
    //     to: "bdvalientes@gmail.com",
    //     cc: '',
    //     bcc: '',
    //     subject: "envio Correo Node JS",
    //     text: "Hola sin HTML",
    //     html: "<b> Hola con HTML</b>"
    // }
    //FALTA AGREGAR EL ENVIO DE ARCHIVOS E IMAGENES
    const notificacionData = {
        from: req.body.from,
        to: req.body.to,
        cc: req.body.cc,
        bcc: req.body.bcc,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    }    
    const status = services.EnviarCorreos(notificacionData);
    if (status.status) {
        res.status(200).send({
            message: 'Correo Enviado Exitosamente'
        })    
    }else{
        res.status(500).send({
            message: 'Error Al Enviar Correo'+status.message
        })
    }
    
}

module.exports = {
    envioCorreo
}