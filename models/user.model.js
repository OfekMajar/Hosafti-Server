const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
module.exports = { User, validate };
