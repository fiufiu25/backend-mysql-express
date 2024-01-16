
const workoutService=require("../services/workoutService")
const createUser=async (req,res)=>{
    const {correo, password,nombre}=req.body
    console.log(req.file)
    const {mimetype,originalname,filename}=req.file
   console.log(mimetype,originalname,filename)
  const newUser={
        correo,
        password,
        nombre,
        rol:"user"
    }
  const imageFile={
        mimetype,originalname,filename
    }
    const  result=await workoutService.createUser(newUser,imageFile)
    return res.json({msg:"enviado correctamente", data:result})
}
const loginUser=async(req,res)=>{
    const {correo,password}=req.body
    const user={correo,password}
    const result =await workoutService.loginUser(user,res)
    return res.json({msg:"autenticado",data:result})
}

module.exports={createUser,loginUser}