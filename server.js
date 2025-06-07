const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AuthRouther = require('./routes/authRoutes');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', AuthRouther);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connection created!");
    })
    .catch((error) => {
        console.log(error.message);
    });