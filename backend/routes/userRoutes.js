const userRoutes = require("express").Router();
const { register, login, allUsers } = require("../controllers/user.controller");
userRoutes.route("/register").post(register).get(allUsers);
userRoutes.post("/login", login);
// userRoutes.route("/").get(allUsers)


module.exports = userRoutes;