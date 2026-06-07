const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  filename: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resume", resumeSchema);