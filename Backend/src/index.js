const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require("./routers/userAuth")
const redisclient = require("./config/redis");
const problemRouter = require("./routers/problemCreator");
const submitRouter = require("./routers/submit");
const cors = require('cors');


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);

const startServer = async () => {
    try {
        await main();   // connect to DB
        console.log("Connected to MONGODB Database successfully");
        
        await redisclient.connect();
        console.log("Connected to Redis Database successfully");
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening at port ${process.env.PORT}`);
        });

    } catch (err) {
        console.log("Error Occurred: " + err.message);
    }
};

startServer();



// Browser ko farq nahi padta request kahan se aayi — wo sirf dekhta hai request kahan ja rahi hai