const express=require("express")
const cors=require("cors")
const router = require("./router/user")
const PORT = process.env.PORT || 9000;
const dotenv=require("dotenv")
dotenv.config()
const path=require("path")
const app=express()
app.get("/",(req,res)=>{
    res.json({msg:"ola"})
})
app.use(cors({methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"dbimages")))
app.use("/api",router)
app.listen(PORT,()=>console.log("escuchando"))