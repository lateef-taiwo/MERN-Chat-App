const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {generateToken, verifyToken} = require("../config/sessions");

const register = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    const newUser = new User({
      name,
      email,
      password,
      pic,
    });
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const result = await newUser.save();
    console.log(result);
    res.status(200).json({
      _id: result._id,
      name: result.name,
      email: result.email,
      pic: result.pic,
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Registration Failed" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "You do not have an account with us", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    const token = generateToken(email);
    if (isMatch) {
      req.user = user;
      console.log(req.user);
      return res
        .status(200)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: token,
          success: true,
          message: "Login Successful",
        })
    }
    verifyToken;
    return res.status(401).send({ message: "Invalid Login Credentials", status: false });
  } catch (error) {
    next(error);
  }
};

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports = { register, login, allUsers };
