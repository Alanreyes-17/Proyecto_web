const mysql = require('mysql2'); //accesando al mysql 
require('dotenv').config(); //importando dotenv 
 
const connection = mysql.createConnection({  //creando un objeto de conexion para conectarse ala base de datos
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
 
connection.connect((error) => {  
    if (error) {
        console.error('Error conectando a la base de datos:', error);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});
 
module.exports = connection; //permitir conexion a los otros archivos