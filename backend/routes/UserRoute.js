const express = require("express");
const router = express.Router();
const listTransactions = require("../controller/user/listTransactions");

router.get("/transactions", listTransactions);


module.exports = router;
