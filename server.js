const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AuthRouter = require('./routes/authRoutes');
const EventRouter = require('./routes/eventRoutes');


const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', AuthRouter);
app.use('/api/events', EventRouter);

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