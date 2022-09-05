const Joi = require("@hapi/joi");


const loginSchema = Joi.object({
  
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})")
    )
    .required(),
});

module.exports = loginSchema;
