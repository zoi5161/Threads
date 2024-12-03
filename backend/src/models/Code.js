const mongoose = require("mongoose");
const { Schema } = mongoose;

const codeSchema = new Schema(
  {
    email: { type: String, required: true },
    code: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Code", codeSchema);