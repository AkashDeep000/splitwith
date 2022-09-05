const Joi = require("@hapi/joi");

const addBillSchema = Joi.object({
  title: Joi.string().required(),
  paidById: Joi.string().required(),
  paidFor: Joi.array().required(),
  amount: Joi.number().required(),
});

module.exports = { addBillSchema };
