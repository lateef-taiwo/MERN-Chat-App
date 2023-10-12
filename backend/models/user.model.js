const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});

let saltRound = 10;
userSchema.pre("save", function (next) {
  if (this.password != undefined) {
    bcrypt
      .hash(this.password, saltRound)
      .then((hashed) => {
        this.password = hashed;
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});


const User = mongoose.model("User", userSchema)

module.exports = {User}