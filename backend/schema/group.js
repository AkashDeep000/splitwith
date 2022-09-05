const Joi = require("@hapi/joi");

const createGroupSchema = Joi.object({
  name: Joi.string().required(),

  category: Joi.string()
    .valid("trip", "home", "office", "sport", "others")
    .required(),
});

module.exports = { createGroupSchema };
