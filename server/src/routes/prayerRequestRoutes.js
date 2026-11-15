const express = require("express");

const router = express.Router();

const {
  createPrayerRequest,
  getPrayerRequests,
  updatePrayerRequest,
} = require("../controllers/prayerRequestController");

router.post("/", createPrayerRequest);

router.get("/", getPrayerRequests);

router.put("/:id", updatePrayerRequest);

module.exports = router;
