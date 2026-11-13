const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [["preferredDate", "ASC"]],
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
  }
};
