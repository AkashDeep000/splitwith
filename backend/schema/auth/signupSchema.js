const Joi = require("@hapi/joi");


const signupSchema = Joi.object({
  name: Joi.string().max(16).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})")
    )
    .required(),
});

module.exports = signupSchema;
