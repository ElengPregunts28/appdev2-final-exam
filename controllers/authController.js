const { signInSchema, generateAccessToken } = require("../middleware/authMiddleware");
const { hashValidation } = require("../middleware/authMiddleware");

const signIn = async (req, res) => {
    const { name, email, password } = req.body; 

    const { error } = signInSchema.validate({ name, email, password });

    if (error) {
        return res.status(401).json({
            status: false,
            message: error.details[0].message,
        });
    }

    const userExist = await User.findOne( {email} );

    if (userExist) {
        const matchPassword = await hashValidation(password, userExist.password);

        if (matchPassword) {
            const token = generateAccessToken(userExist.email);
            return res.status(200).json({
                status: true,
                token: token,
                message: "Welcome, you are logged in!",
            });
        }  
        
        res.status(401).json({
            status: false,
            message: "Invalid password",
        });
    }    

    res.status(401).json({
        status: false,
        message: "Invalid credentials",
    });
};

module.exports = {
    signIn
};