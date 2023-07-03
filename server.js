console.log("Inside Server.js");
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

const { errorHandler } = require("./middleware/errorMiddleware.js");
const port = process.env.PORT || 5000
connectDB();
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//static files
// app.use(express.static(path.join(__dirname, '../frontend/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })
// const URI = process.env.MONGO_URI;

app.use('/auth', require('./routes/userRoutes.js'));
app.use('/recipe', require('./routes/recipeRoutes.js'));
app.use(errorHandler);
app.listen(port, () => console.log(`Server Started on Port ${port}`));
