// require the library
const mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb://localhost/todo_List_db");
//make connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database");
});

module.exports = db;
