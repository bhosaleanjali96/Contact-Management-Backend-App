const express= require("express");
const errorHandler = require("./middleware/errorhandler");
const dotenv= require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();
//app is having express application created by calling express object
const app = express();

const port = process.env.PORT || 5000;

//body parser middleware
app.use(express.json()); 

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})