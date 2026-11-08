const express = require("express");

const router = express.Router();

const {
  getMembers,
  createMember,
  deleteMember,
  updateMember,
} = require("../controllers/memberController");

router.get("/", getMembers);

router.post("/", createMember);

router.delete("/:id", deleteMember);
router.put("/:id", updateMember);

module.exports = router;
