
const userRepository=require("../database/userRepository")
const createUser=async(newUser,imageFile)=>{
return await   userRepository.CreateUser(newUser,imageFile)
}
const loginUser=async(user,res)=>{
 return await userRepository.loginUser(user,res)
}
module.exports={createUser,loginUser}