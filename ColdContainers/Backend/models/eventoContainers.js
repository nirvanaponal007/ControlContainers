const connection = require('./conexion')
const usuario = require('./usuarios');
const alarma = require('./alarma')
const servicio = require('../services/index')
const config = require('../config')
let eventoContainersModel = {};
const conexion = connection()


eventoContainersModel.TraerEventoContainers = (evento) => {
    if (conexion) {
        conexion.query('SELECT * FROM tbl_Evento_contenedor;', (err, res) => {
            if (err) {
                evento(err, null)
            } else {
                evento(null, res)
            }
        })
    }
}

eventoContainersModel.insertarEventoContainers = (eventoContainer, res) => {
    if (conexion) {
        // if (eventoContainer.delay_time == 0) {
        //     //Consultar Datos
        //     usuario.TraerUsuarioXSerial(eventoContainer.serialContenedor, (err, data) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             data.forEach(element => {
        //                 const description = "Señor(a) " + element.usu_nombre +
        //                     " " + element.usu_apellido +
        //                     ", El contenedor " + element.con_nombre +
        //                     " del cliente " + element.cli_razon_social +
        //                     " presenta fallos electricos.";
        //                 const alarmaData = {
        //                     ala_descripcion: description,
        //                     ala_estado: 1,
        //                     ala_id_tipo: 4,
        //                     ala_usu_id: element.usu_id,
        //                     ala_con_id: element.con_id
        //                 }
        //                 alarma.InsertarAlarmas(alarmaData, (err1, result1) => {
        //                     if (err1) {
        //                         console.log(err1);
        //                     } else {
        //                         const html = `<!DOCTYPE html>
        //                         <html lang="es">
        //                             <head>
        //                                 <meta charset="utf-8">
        //                                 <title>Alarma</title>
        //                             </head>
        //                             <body style="background-color: #ffffff;font-weight: 700; font-family: Montserrat,'Helvetica Neue',Helvetica,Arial,sans-serif; ">
        //                                 <div style="background-color: #ffffff;" align="center">
        //                                     <a href="http://www.coldcontainers.com.co" target="_blank" rel="nofollow">
        //                                         <img width="20%" src="http://www.coldcontainers.com.co/uploads/DxXwDb3l/584x0_1139x0/logo.png">
        //                                     </a>
        //                                 </div>
        //                                 <!--Copia desde aquí-->
        //                                 <table style="width: 100%; padding: 10px; margin:0 auto; border-collapse: collapse;">
        //                                     <tr>
        //                                         <td style="background-color: #ffffff">
        //                                             <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
        //                                                 <h2 style="color: #005c0f; margin: 0 0 7px">Hola ${element.usu_nombre.toUpperCase()} ${element.usu_apellido.toUpperCase()}!</h2>
        //                                                 <br>
        //                                                 <hr>
        //                                                 <h2 style="color: #0f7f4c; margin: 0 0 7px">NOTA</h2>
        //                                                 <ul >
        //                                                         <li>Señor(a) <spam style="color: black;">${element.usu_nombre.toUpperCase()} ${element.usu_apellido.toUpperCase()}</spam>, el contenedor 
        //                                                         <spam style="color: black;">${element.con_nombre.toUpperCase()}</spam> del cliente 
        //                                                         <spam style="color: black;">${element.cli_razon_social.toUpperCase()}</spam> presenta fallos electricos.</li>
        //                                                 </ul>
        //                                             </div>
        //                                         </td>
        //                                     </tr>
        //                                 </table>
        //                                 <div style="background-color: #ffffff;" align="center">
        //                                     <a href="http://www.coldcontainers.com.co" target="_blank" rel="nofollow">
        //                                         <img width="10%" src="http://34.241.195.46:3001/static/media/Contenedor.4885a8ce.png">
        //                                     </a>
        //                                 </div>
        //                             </body>
        //                         </html>`;
        //                         const asunto = "Alerta Critica Contenedor "+element.con_nombre;
        //                         const datosCorreo = {
        //                             from: config.from,
        //                             to: element.usu_email,
        //                             // cc: req.body.cc,
        //                             // bcc: req.body.bcc,
        //                             subject: asunto,
        //                             // text: req.body.text,
        //                             html: html
        //                         }
        //                         var aux = servicio.EnviarCorreos(datosCorreo);
        //                     }
        //                 })
        //             });
        //         }
        //     })
        // }

        // const aux = eventoContainer.datos1.split("/");
        // if (aux[0] == 2) {
        //     //Consultar Datos
        //     usuario.TraerUsuarioXSerial(eventoContainer.serialContenedor, (err, data) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             data.forEach(element => {
        //                 const description = "Señor(a) " + element.usu_nombre +
        //                     " " + element.usu_apellido +
        //                     ", El contenedor " + element.con_nombre +
        //                     " del cliente " + element.cli_razon_social +
        //                     " paso al estado SHUTDOWN.";
        //                 const alarmaData = {
        //                     ala_descripcion: description,
        //                     ala_estado: 1,
        //                     ala_id_tipo: 4,
        //                     ala_usu_id: element.usu_id,
        //                     ala_con_id: element.con_id
        //                 }
        //                 alarma.InsertarAlarmas(alarmaData, (err1, result1) => {
        //                     if (err1) {
        //                         console.log(err1);
        //                     } else {
        //                         const html = `<!DOCTYPE html>
        //                         <html lang="es">
        //                             <head>
        //                                 <meta charset="utf-8">
        //                                 <title>Alarma</title>
        //                             </head>
        //                             <body style="background-color: #ffffff;font-weight: 700; font-family: Montserrat,'Helvetica Neue',Helvetica,Arial,sans-serif; ">
        //                                 <div style="background-color: #ffffff;" align="center">
        //                                     <a href="http://www.coldcontainers.com.co" target="_blank" rel="nofollow">
        //                                         <img width="20%" src="http://www.coldcontainers.com.co/uploads/DxXwDb3l/584x0_1139x0/logo.png">
        //                                     </a>
        //                                 </div>
        //                                 <!--Copia desde aquí-->
        //                                 <table style="width: 100%; padding: 10px; margin:0 auto; border-collapse: collapse;">
        //                                     <tr>
        //                                         <td style="background-color: #ffffff">
        //                                             <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
        //                                                 <h2 style="color: #005c0f; margin: 0 0 7px">Hola ${element.usu_nombre.toUpperCase()} ${element.usu_apellido.toUpperCase()}!</h2>
        //                                                 <br>
        //                                                 <hr>
        //                                                 <h2 style="color: #0f7f4c; margin: 0 0 7px">NOTA</h2>
        //                                                 <ul >
        //                                                     <li>Señor(a) <spam style="color: black;">${element.usu_nombre.toUpperCase()} ${element.usu_apellido.toUpperCase()}</spam>, el contenedor 
        //                                                     <spam style="color: black;">${element.con_nombre.toUpperCase()}</spam> del cliente 
        //                                                     <spam style="color: black;">${element.cli_razon_social.toUpperCase()}</spam> paso al estado 
        //                                                     <spam style="color: red;">SHUTDOWN</spam>.</li>
        //                                                 </ul>
        //                                             </div>
        //                                         </td>
        //                                     </tr>
        //                                 </table>
        //                                 <div style="background-color: #ffffff;" align="center">
        //                                     <a href="http://www.coldcontainers.com.co" target="_blank" rel="nofollow">
        //                                         <img width="10%" src="http://34.241.195.46:3001/static/media/Contenedor.4885a8ce.png">
        //                                     </a>
        //                                 </div>
        //                             </body>
        //                         </html>`;
        //                         const asunto = "Alerta Critica Contenedor " + element.con_nombre;
        //                         const datosCorreo = {
        //                             from: config.from,
        //                             to: element.usu_email,
        //                             // cc: req.body.cc,
        //                             // bcc: req.body.bcc,
        //                             subject: asunto,
        //                             // text: req.body.text,
        //                             html: html
        //                         }
        //                         var aux = servicio.EnviarCorreos(datosCorreo);
        //                     }
        //                 })
        //             });
        //         }
        //     })
        // }

        const sql = `call insertEventoContenedor(
            ${conexion.escape(eventoContainer.serialContenedor)},
            ${conexion.escape(eventoContainer.latitud)},
            ${conexion.escape(eventoContainer.longitud)},
            ${conexion.escape(eventoContainer.datos1)},
            ${conexion.escape(eventoContainer.datos2)},
            ${conexion.escape(eventoContainer.delay_time)})`;
        conexion.query(sql,(err,result)=>{
            if (!err){
                res(null,result)
            }else{
                res(err,result)
            }
        });
    }
}

eventoContainersModel.TraerUltimoContenedorXSerial = (serial, res) => {
    if (conexion) {
        const sql = `select * from tbl_Evento_contenedor ev inner join tbl_contenedor c where ev.evnc_id_contenedor=c.con_id and c.con_serial_contenedor=${conexion.escape(serial)} order by evnc_id desc limit 0,1`;
        conexion.query(sql, (err, result) => {
            if (!err) {
                res(null, result)
            } else {
                res(err, result)
            }
        });
    }
}

eventoContainersModel.ReporteTempSuministroDatos1 = (data, res) => {
    if (conexion) {
        const sql = `select distinct evnc_fecha_creacion as '0',evnc_datos1 as '1',evnc_datos2 as '2' from tbl_Evento_contenedor where evnc_id_contenedor=${conexion.escape(data.evnc_id_contenedor)} and evnc_fecha_creacion between from_unixtime(${conexion.escape(data.fechaMenor)}) and from_unixtime(${conexion.escape(data.fechaMayor)}) order by evnc_fecha_creacion asc;`;
        conexion.query(sql, (err, result) => {
            if (!err) {
                res(null, result)
            } else {
                res(err, null)
            }
        });
    }
}


module.exports = eventoContainersModel;