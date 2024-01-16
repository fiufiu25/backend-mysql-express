const path=require("path");
const fs=require("fs")
const conexion=require("./bd");
const { generatetoken } = require("../utils/generateToken");

const CreateUser = async (newUser, imageFile) => {
    const { rol, correo, password, nombre } = newUser;
    const { mimetype, originalname, filename } = imageFile;

    try {
        const rows = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM usuarios WHERE correo=?";
            conexion.query(query, [correo], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log("Aquí", rows);

        if (rows.length > 0) {
            console.log("El usuario ya existe");
            throw new Error("El usuario ya existe");
        } else {
            console.log("Aquí");
            
            const result = await new Promise((resolve, reject)=>{
                const insertQuery = "INSERT INTO usuarios SET ?";
                conexion.query(insertQuery, [{ rol, correo, password, nombre }],(err,rows)=>{
                    if(err){
                        reject("error")
                    } 
                    else{
                        resolve(rows)
                    }
                });
            })  
            console.log("olitas de olas",result.insertId)
            const usuarioID = result.insertId;

            const type = mimetype;
            const name = originalname;
            const data = fs.readFileSync(path.join(__dirname, "../imagenes/" + filename));

            const imageQuery = "INSERT INTO imagenes SET ?";
             conexion.query(imageQuery, [{ usuarioID, name, tipo: type, imagen: data },],(err,rows)=>{
                if(err){
                    console.log("imagenes:",err)
                }
             });
        }

        return { ...newUser };
    } catch (error) {
        console.error("Error en CreateUser:", error.message);
        throw new Error("Error al crear usuario");
    }
};
const loginUser=async(user,res)=>{
    const {correo,password}=user
    console.log(res)

    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM  usuarios WHERE CORREO = ?",[correo],(err,row)=>{
            if(err){
                reject(err)
            }
            if (row.length < 1) {
               // Usuario autenticado correctamente
               reject(err)
            }
            if( row[0].password==password){
              
               const {token,expirenIn}=generatetoken(row[0].userID)
                resolve(token,expirenIn)
            }
            else{
              reject("credenciales incorrecto")
            }
            
            })
    })  
};




 module.exports={CreateUser,loginUser}