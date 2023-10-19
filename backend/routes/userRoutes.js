const userRoutes = require("express").Router();
const { register, login, allUsers } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth");
userRoutes.route("/register").post(register).get(allUsers);
userRoutes.post("/login", login);
userRoutes.route("/").get(protect, allUsers)


module.exports = userRoutes;