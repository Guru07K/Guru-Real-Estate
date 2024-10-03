const express = require('express');
const dotenv = require('dotenv')
const path = require('path')
const connectDataBase = require("./config/database");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoute');
const listingRouter = require('./routes/listingRoute');
dotenv.config({ path: './backend/.env' });


const app = express();

connectDataBase()


app.use(express.json())
app.use(cookieParser());
app.use(cors())

app.listen(process.env.PORT,()=>{
    console.log(`serverlistening on port : ${process.env.PORT}`);
})

app.use(express.static(path.join(__dirname, '..', 'client', 'dist'))); 

app.use('/api/user', authRouter)
app.use('/api/listing', listingRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')); // Adjusted path
});

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

   return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
