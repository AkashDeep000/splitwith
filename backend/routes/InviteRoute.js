const express = require("express");
const router = express.Router();
const signup = require("../controller/auth/signup");
const invite = require("../controller/invite");

router.get("/:groupId", invite);

module.exports = router;
