const mysql = require('mysql')
const config = require('../config')

module.exports = () => {
    var conexion = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    setInterval(function () {
        conexion.query('SELECT 1');
    }, 5000);
    return conexion;
}