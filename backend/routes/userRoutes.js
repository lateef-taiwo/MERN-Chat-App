const userRoutes = require("express").Router();
const { register, login } = require("../controllers/user.controller");

userRoutes.post("/register", register);
userRoutes.post("/login", login);


module.exports = userRoutes;