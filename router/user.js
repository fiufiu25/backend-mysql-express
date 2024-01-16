const express=require("express")
const router=express.Router()
; 

const { generatetoken } = require("../utils/generateToken");
const { requiretoken } = require("../middlewares/requireToken");
const fileUpload = require("../utils/configMulter");
const workoutController=require("../controllers/workoutController")

router.post("/register", fileUpload, workoutController.createUser)
 
router.post("/login",workoutController.loginUser)
router.get("/home",requiretoken, (req,res)=>{
      res.json({mng:"exitoso",id:req.uid })
})
router.post("/mensaje" ,requiretoken,async(req,res)=>{
    try {
        const { mensaje } = req.body;
        const id = req.uid;
    
        // Obtener el pedido asociado al usuario
        const pedido = await new Promise((resolve, reject) => {
          conexion.query("SELECT * FROM pedidos WHERE userID=?", [id], (err, row) => {
            if (err) {
              console.error("Error al obtener el pedido:", err);
              reject(err);
            } else {
                console.log(row)
              resolve(row);
            }
          });
        });
    
        if (!pedido) {
          return res.status(404).json({ msg: "No se encontró ningún pedido para el usuario" });
        }
    
        const pedidoID = pedido[0].pedidoID;
        console.log( pedido, pedidoID);
    
        // Insertar el mensaje
        await new Promise((resolve, reject) => {
          conexion.query(
            "INSERT INTO mensajes SET ? ",
            [{ userID: id, pedidoID, mensaje, fecha_mensaje: new Date() }],
            (err, row) => {
              if (err) {
                console.error("Error al insertar mensaje:", err);
                reject(err);
              } else {
                resolve(row);
              }
            }
          );
        });
    
        res.json({ msg: "Mensaje insertado correctamente" });
      } catch (error) {
        console.error("Error general:", error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
    });
router.get("/mensaje" ,requiretoken,(req,res)=>{
    
    conexion.query(
        `
  SELECT mensajes.mensaje, imagenes.imagen, usuarios.correo,usuarios.nombre,mensajes.fecha_mensaje
  FROM mensajes
  JOIN usuarios ON mensajes.userID = usuarios.userID
  JOIN imagenes ON usuarios.userID = imagenes.userID
`
        ,(err,rows)=>{
        if(err) {
        console.error("Error al insertar usuario:", err)
        return res.status(400).json({msg:"error  de servidor"})}  
       if (rows.length<1){
      return res.json({msg:"error"})
    } 

     const mensajesConImagenes = rows.map((row) => {
    // Convertir la imagen blob a base64
    const imagenBase64 = row.imagen.toString('base64');

    return {
      mensaje: row.mensaje,
      imagen: imagenBase64,
      correo: row.correo,
      nombre:row.nombre,
      fecha:row.fecha_mensaje
    };
  });
  console.log(mensajesConImagenes)
  res.json({ mensajesConImagenes });
   
      
    })
})
module.exports =router