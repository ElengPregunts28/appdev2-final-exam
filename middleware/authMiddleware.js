const jwt = require("jsonwebtoken");
const Joi = require('joi');
const bcrypt = require("bcrypt");

const hashing = (value, saltValue) => {
    return bcrypt.hash(value, saltValue);
};

const hashValidation = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const signInSchema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
        .min(6)
        .required()
});

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateAccessToken = (email) => {
    return jwt.sign( {email} , TOKEN_SECRET, {expiresIn: "1800s"});
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({
            sucess: false,
            message: "Unauthorized Access",
        });
    }

    try {
        const validToken = jwt.verify(token, TOKEN_SECRET);

        if (validToken) {
            req.user = validToken;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    generateAccessToken,
    authenticateToken,
    signInSchema,
    hashing,
    hashValidation,
};