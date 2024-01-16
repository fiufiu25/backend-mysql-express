const mysql=require("mysql2");
const  conexion=mysql.createConnection({
    host:"bjwofdm3taavhi9boe4k-mysql.services.clever-cloud.com",
    port: 3306,
    user:"ugkzo5sgabprjerl",
    password:"LwXoTbbfYltE00BsmTUD",

    database:"bjwofdm3taavhi9boe4k"
 })
 conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


module.exports=conexion