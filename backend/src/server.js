require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname"; // Replace with your MongoDB URI
console.log("MONGO_URI:",MONGO_URI); 

console.log("Database URL:",MONGO_URI);
mongoose.connect(MONGO_URI);

require('dotenv').config({ path: './backend/.env' }); 


mongoose.connection.on("error", (error) => {
  console.log(  
    `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});

const app = require("./app");
app.set("port", process.env.PORT || 8880);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
