const express = require("express");
const app = express();
require("dotenv").config();
// middlewares






// server
app.listen(process.env.PORT, ()=>{
    console.log(`server running at http://localhost${process.env.PORT}/`)
});