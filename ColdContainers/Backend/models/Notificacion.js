'use strict'
const nodemailer = require('nodemailer');
const config = require('../config');
let notificacionModel = {};

notificacionModel.enviarCorreo = (notificationData, res) => {

    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.correo, // generated ethereal user
            pass: config.password_correo // generated ethereal password
        }
    });
    var mailOptions = {
        from: notificationData.from,
        to: notificationData.to,
        cc: notificationData.cc,
        bcc: notificationData.bcc,
        subject: notificationData.subject,
        text: notificationData.text,
        html: notificationData.html
    }
    smtpTransport.sendMail(mailOptions, (err, response)=>{
        if (err) {
            console.log("Error al enviar correo " + err);   
        }
    });
}

module.exports = notificacionModel;