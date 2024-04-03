const express = require('express');
const dotenv = require('dotenv').config()
const cors =require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
// db connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mogodb connected"))
.catch((err)=>console.log('db connection errror',err))

const app = express();
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
///

const corsOptions = {
    origin: '*',
};
  
  
  app.use(cors(corsOptions));

app.use('/',require('./routes/authRoutes'))
const port =4000;
app.listen(port, ()=>console.log(`server is running on port ${port}`))