// Importamos la librería de MySQL para conectarnos a la base de datos
const mysql = require('mysql2');

// Creamos la conexión a la base de datos con los datos de acceso
const connection = mysql.createConnection({
    host: 'localhost',        // Dirección del servidor de MySQL
    user: 'root',       // Usuario de la base de datos
    password: 'D@t@b@s3',// Contraseña del usuario
    database: 'crud_admin'       // Nombre de la base de datos
});

// Conectamos y verificamos si hay algún error
connection.connect((err) => {
    if (err) throw err;       // Si hay error, termina el proceso
    console.log('Conectado a la base de datos MySQL');
});

// Exportamos la conexión para que se pueda usar en otros archivos
module.exports = connection;
