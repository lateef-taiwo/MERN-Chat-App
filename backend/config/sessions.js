const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

function generateToken(user) {
    try {
        const payload = {
          id: user.id,
          email: user.email,
          // Add any other user data you want to include in the token payload
        };
        const options = {
          expiresIn: "1m", // Set the token expiration time
        };
        const secret = process.env.JWT_SECRET; // Replace with your own secret key
        return jwt.sign(payload, secret, options);
    } catch (error) {
        console.log(error);
        throw {
          name: "AuthenticationError",
          message: "Error generating token",
          error: error,
        };
    }
}

function verifyToken(token) {
    const secret = process.env.JWT_SECRET; // Replace with your own secret key
    try {
      if (!token)
        throw { name: "AuthenticationError", message: "Invalid Token" };
      const decoded = jsonwebtoken.sign(token, secret);
      console.log(decoded);
      let email = decoded.email;
      return email;
    } catch (error) {
      console.log(error);
      throw {
        name: "AuthenticationError",
        message: `Error verifying token`,
        error: error,
      };
    }
}

module.exports = { generateToken, verifyToken };
