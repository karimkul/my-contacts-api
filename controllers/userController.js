const asyncHandler = require("express-async-handler");
const bycrypt = require("bcrypt");
const User = require("../models/userModel");

// @desc Register a user
// @route GET /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailiable = await User.findOne({ email });

    if (userAvailiable) {
        res.status(400);
        throw new Error("User already regintered!");
    }

    //Hash password
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(user);

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// @desc Login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login the user" });
});

// @desc Current user info
// @route GET /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current the user" });
});

module.exports = { registerUser, loginUser, currentUser };
