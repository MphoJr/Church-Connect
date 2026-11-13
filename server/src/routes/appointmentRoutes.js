const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  assignPastor,
  getPastorAppointments,
} = require("../controllers/appointmentController");

router.post("/", createAppointment);

router.get("/", getAppointments);

router.put("/:id/status", updateAppointmentStatus);
router.put("/:id/assign", assignPastor);
router.get("/pastor/:id", getPastorAppointments);

module.exports = router;
