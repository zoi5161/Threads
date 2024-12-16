const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    email: {type: String, required: true},
    password: {type: String, required: true},
    user_id: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);