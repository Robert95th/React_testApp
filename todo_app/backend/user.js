const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tasks:[ {
    id: String,
    text: String,
    completed: Boolean
  }]
});

module.exports = mongoose.model("WamusTodos", user);

