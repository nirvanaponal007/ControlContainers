
module.exports = {
    PORT: process.env.port || 3000,
    PORT_SOCKET: process.env.port || 1883,
    PORT_WEBSOCKET: process.env.port || 1884,
    SECRET_TOKEN: '@$@$TUSOFTWARE$@$@',
    SECRET_PASSWORDS: 'd6F3Efeq',
    //Variables envio de correo


    // from: 'Tu Software <tusoftware.co@gmail.com>',
    // correo: 'tusoftware.co@gmail.com',
    // password_correo: 'Cambiar123',


    from: 'control containers <controlcontainers01@gmail.com>',
    correo: 'controlcontainers01@gmail.com',
    password_correo: 'monitoreo',

    // VARIABLES DE AMBIENTE DESARROLLO
    //AMBIENT : 'localhost',
    // AMBIENT : '192.168.0.12',
    // VARIABLES DE AMBIENTE PRUEBAS

    // AMBIENT : '34.250.44.147',

    // host: 'www.tusoftware.co',
    // user: 'griosb_bd_cold1',
    // password: 'eHt[i1SUu3lA',
    // database: 'griosb_desa_coldcontainers',

    // DESARROLLO
    //AMBIENT : 'localhost',
    // PRUEBAS WINDOWS SERVER BACKEND 
    //AMBIENT : '3.85.211.106'
    //host: '3.85.211.106',
    // user: 'griosb01',
    //password: 'eHt[i1SUu3lA',
    //database: 'griosb_desa_coldcontainers'
    //control01'@'localhost
    

    // host: 'www.tusoftware.co',
    // user: 'griosb_bd_cold1',
    // password: 'eHt[i1SUu3lA',
    // database: 'griosb_desa_coldcontainers',

    // AMBIENT : 'localhost'

    //Desarrollo ControlContainers 21/11/2020
    AMBIENT : '127.0.0.1',
    host: 'localhost',
    user: 'control01',
    password: 'eHt[i1SUu3lA',
    database: 'controlcontainers'
}