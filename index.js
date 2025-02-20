// 1.Imporing express
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors')
const fileUpload = require('express-fileupload')

// 2. Creating an express app
const app = express();

// JSON Config
app.use(express.json())

//  File Upload Config
app.use(fileUpload())

// Make a public folder access to outside
app.use(express.static('./public'))



// CORS Config
const corsOptions = {
    origin : true,
    credentials : true,
    optionSuccessStatus : 200
};
app.use(cors(corsOptions))

// configuration dotenv
dotenv.config()

// Connecting to the database
connectDB();

// 3. Defining the port
const PORT = process.env.PORT;

// 4. Creating a test route or endpoint
app.get('/test', (req,res)=>{
    res.send("Test Api is Working ...!")
})

// Configuring routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/product', require('./routes/productRoutes'))

// http://localhost:5000/api/product/create


// http://localhost:5000/api/user/create


// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server-app is Running on port ${PORT}`)
})


// API URL
// http://localhost:5500/test


