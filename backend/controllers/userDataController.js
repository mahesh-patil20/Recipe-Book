const asyncHandler = require('express-async-handler');
const UserModel = require('../models/users')
// const { error } = require("console");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUser = asyncHandler(async (req, res) => {
    try {
        console.log("Inside getUser");
        const userID = req.body.userID;
        // console.log("User ID : ", userID);
        const user = await UserModel.findOne({ _id: userID }); // Retrieve all users using the UserModel
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).json({ message: "Error in getUser", error: e });
    }
})

const registerUser = asyncHandler(async (req, res) => {
    try {
        console.log("Inside registerUser");
        const { name, username, password } = req.body;
        const user = await UserModel.findOne({ username: username });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await UserModel.create({
                name: name,
                username: username,
                password: hashedPassword,
            });

            const token = jwt.sign({
                id: newUser._id,
                username: newUser.username,
            }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
            res.status(200).json({ message: "User created successfully", token });
        }

    }
    catch (e) {
        res.status(400).json({ message: "Error in register", error: e });
    }
})
const loginUser = asyncHandler(async (req, res) => {
    try {
        console.log("Inside loginUser");
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await UserModel.findOne({ username }); // Find user by username
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("isPasswordValid");

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate and sign a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        // Login successful
        res.status(200).json({ token, userID: user._id });
    }
    catch (e) {
        res.status(400).json({ message: "Error in Login", error: e });
    }
})

module.exports = {
    getUser,
    registerUser,
    loginUser
}

