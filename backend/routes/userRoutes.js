const express = require("express");
const router = express.Router();

const { getUser, registerUser, loginUser } = require('../controllers/userDataController');
// const UserModel = require("../models/users");


router.post('/getuser', getUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;