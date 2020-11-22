'use strict'
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
var uniqid = require('uniqid');
const notificacion = require('../models/Notificacion')
 
var encrypt = function(texto){
    var cipher = crypto.createCipher(algorithm, config.SECRET_PASSWORDS)
    var crypted = cipher.update(texto, 'utf8', 'hex')
     crypted += cipher.final('hex');
    return crypted;
   }
    
var decrypt = function(texto){
    var decipher = crypto.createDecipher(algorithm, config.SECRET_PASSWORDS)
    var decrypted = decipher.update(texto, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    return decrypted;
}

function createToken(usuario) {
    //Buscar que el sub no sea el id del usuario
    const payload = {
        sub: uniqid(),
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El Token a expirado'
                })
            }else{
                resolve(payload.sub)
            }
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded
}

function EnviarCorreos(data){
    const notificacionData = {
        from: data.from,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        text: data.text,
        html: data.html
    }
    notificacion.enviarCorreo(notificacionData,(err,response)=> {
        if (err) {
            return {
                status:false,
                message: 'Error : '+err
            };
        } else {
            return {
                status:true,
                message: 'response : '+response
            };
        }
    });
    return {
        status:true
    }
}

module.exports = {
    encrypt,
    decrypt,
    createToken,
    decodeToken,
    EnviarCorreos
}