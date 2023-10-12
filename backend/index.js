const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const app = express()
dotenv.config()

app.get('/', (req, res) =>{
    res.send("API is running")
})

const PORT = process.env.PORT
const uri = process.env.URI

mongoose.connect(uri)
.then(()=>{
    console.log("MongoDB Connected Successfully");
}).catch((error)=>{
    console.log(error);
})
app.listen(PORT, console.log(`Server Started at Port:${PORT}`));