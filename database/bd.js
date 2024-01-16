const mysql=require("mysql2");
const  conexion=mysql.createConnection({
    host: process.env.Host,
    port: process.env.port,
    user:process.env.USER,
    password:"",

    database:process.env.DATABASE
 })
 conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


module.exports=conexion