const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); // Parse JSON request bodies

PORT = process.env.PORT;
dbUrl = 'mongodb://localhost:27017/assignment';
async function connectDB(){
    try{
        await mongoose.connect(dbUrl)
        console.log("Connected to Database")
    }catch(e){
        console.log("❌Failed to connect to Database❌ ",e)
    }
}
connectDB()

app.use('/api', userRoutes);
app.use('/api', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });