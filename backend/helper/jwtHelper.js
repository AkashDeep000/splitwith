const JWT = require("jsonwebtoken");
require("dotenv").config();
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWT_SECRET;
      const options = {
        expiresIn: "30d",
        issuer: "splitwith.vercel.app",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    JWT.verify(token, secret, (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
      }
      req.payload = payload;
      //console.log(payload);
      next();
    });
  },
};
