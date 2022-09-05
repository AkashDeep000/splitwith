const Joi = require("@hapi/joi");

const settleUpSchema = Joi.object({
  senderId: Joi.string().required(),
  amount: Joi.number().required(),
});

module.exports = { settleUpSchema };
