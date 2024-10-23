const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new Schema({
  name: String,
  age: Number,
}, { timestamps: true });

module.exports = mongoose.model("Test", testSchema);
