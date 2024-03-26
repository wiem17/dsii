const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "is required"],
  },
  lastname: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "is required"],
    unique: true,
    index: true,
  },
  password: {
    type: String,
  },
  image: { 
  type: String 
}
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const UserSchema = mongoose.model("users", userSchema);

module.exports = UserSchema;
