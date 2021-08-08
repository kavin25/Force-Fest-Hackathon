const mongoose = require("mongoose");

const db2 = require("../config/keys").MongoURI2;
const conn2 = mongoose.createConnection(db2);

var Note = conn2.model(
  "Note",
  new mongoose.Schema({
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
  })
);

module.exports = Note;
