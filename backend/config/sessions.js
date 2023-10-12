const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        // Add any other user data you want to include in the token payload
    };
    const options = {
        expiresIn: '1d', // Set the token expiration time
    };
    const secret = process.env.JWT_SECRET; // Replace with your own secret key
    return jwt.sign(payload, secret, options);
}

function verifyToken(token) {
    const secret = process.env.JWT_SECRET; // Replace with your own secret key
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { generateToken, verifyToken };
