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

router.get("/pastor/:id", getPastorAppointments);

router.put("/:id/status", updateAppointmentStatus);

router.put("/:id/assign", assignPastor);

module.exports = router;
