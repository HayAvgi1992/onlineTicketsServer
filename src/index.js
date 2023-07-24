import express from 'express'
import dotenv from 'dotenv'
import winston from 'winston'
import { router } from "./routes/ticketRoutes.js";
import mongoose from 'mongoose'

const app = express()

export const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
})

dotenv.config({ path: `../onlineTicketsServer/config.env` })
// dotenv.config({ path: `/home/hayavgi/projects/paragon/server/config.env` })

// middlewares
const errorHandler = (error, req, res, next) => {
    logger.error(`error ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    res.status(status).send(error.message)
}

const enableCors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

app.use(express.json()) // that we could read json request
app.use(express.urlencoded({ extended: true })) // that we could read body request
app.use(enableCors);
app.use("/tickets", router) // app use blueprint route
app.use(errorHandler) // app use middleware

// API's
app.get('/', (req, res, next) => {
    try {
        logger.info("Heart Beat")
        res.send('Paragon Server Is Up!');
        // res.json({message: 'Welcome to our API' })
    } catch (error) {
        next(error)
    }
});

const startServer = async () => {
    try {
        // connect to mongo cluster
        await mongoose.connect(process.env.MONGO_CONNECT);
        const PORT = process.env.PORT || 3000
        // running application
        app
            .listen(PORT, () => {
                logger.info(`Server app listening at http://localhost:${process.env.PORT}!`);

            })
            .on('error', (e) => {
                logger.error(`App crashed Error: ${e.message}`)
            })
    } catch (e) {
        logger.error("Error index.js " + e.message)
    }

}

startServer()