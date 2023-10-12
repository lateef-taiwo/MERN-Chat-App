const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes")


dotenv.config()
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/users", userRoutes);


const uri = process.env.URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server Started at Port:${PORT}`));