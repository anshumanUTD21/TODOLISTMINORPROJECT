const express = require("express");
const app = express();
const port = 8000;

const db = require("./config/mongoose");
const TodoTask = require("./models/todo_Task");

const path = require("path");
const bodyParser = require("body-parser");
// set up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("assets"));

// var tasks = [
//   {
//     description: "Go to gym",
//     category: "Personal",
//     date: "2022-6-17",
//   },
//   {
//     description: "Wash clothes ",
//     category: "Personal",
//     date: "2022-6-19",
//   },
//   {
//     description: "Email john",
//     category: "Office",
//     date: "2022-6-17",
//   },
// ];

//use express router
// app.use("/", require("./routes"));

app.get("/", function (req, res) {
  TodoTask.find({}, function (err, task) {
    if (err) {
      console.log("Error in fetching from database");
      return;
    }
    return res.render("home", {
      title: "Tasky: Your everyday Logger",
      task_List: task,
    });
  });
});

app.post("/create_task", function (req, res) {
  TodoTask.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, newTask) {
      if (err) {
        console.log("error in creating contact", err);
        return;
      }
      return res.redirect("back");
    }
  );
});

app.get("/delete_task", function (req, res) {
  let id = req.query;
  var count = Object.keys(id).length;
  console.log(count);
  for (let i = 0; i < count; i++) {
    // finding and deleting tasks from the DB one by one using id
    TodoTask.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("error in deleting task");
      }
    });
  }
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});

// $ npm install body-parser
// //Now use it like below
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
