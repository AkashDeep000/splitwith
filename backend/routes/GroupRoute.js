const express = require("express");
const router = express.Router();
const createGroup = require("../controller/group/createGroup");
const createMember = require("../controller/group/createMember");
const addBill = require("../controller/group/addBill");
const joinMember = require("../controller/group/joinMember");
const listGroups = require("../controller/group/listGroups");
const listGroupsMinimal = require("../controller/group/listGroupsMinimal");
const getGroup = require("../controller/group/getGroup");
const settleUp = require("../controller/group/settleUp");

router.post("/", createGroup);
router.get("/", listGroups);
router.get("/minimal", listGroupsMinimal);

router.get("/:groupId", getGroup);

router.post("/:groupId/member", createMember);
router.post("/:groupId/join", joinMember);
router.post("/:groupId/bill", addBill);
router.post("/:groupId/settle", settleUp);

module.exports = router;
