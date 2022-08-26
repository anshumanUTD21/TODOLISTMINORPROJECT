const mongoose = require("mongoose");

const todoTaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const TodoTask = mongoose.model("TodoTask", todoTaskSchema);
module.exports = TodoTask;
