const userRoutes = require("express").Router();
const { register, login, allUsers } = require("../controllers/user.controller");

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.route("/").get(allUsers)


module.exports = userRoutes;