import express from 'express';
import dotenv from 'dotenv';
import { ConnectToDb } from './config/ConnectToDb.mjs';

import UserRoutes from './router/user_routes/index.mjs';
import bodyParser from 'body-parser';

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(bodyParser.json())


const port = process.env.PORT || 5000


ConnectToDb()


app.use('/api/user', UserRoutes)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500 
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})



