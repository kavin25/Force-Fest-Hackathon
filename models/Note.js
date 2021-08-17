const mongoose = require("mongoose");

var Note = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  textOp: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notes", Note);
