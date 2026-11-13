const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create appointment",
    });
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

    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    await appointment.update({
      status: req.body.status,
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update appointment",
    });
  }
};
exports.assignPastor = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const pastor = await User.findByPk(req.body.pastorId);

    if (!pastor) {
      return res.status(404).json({
        message: "Pastor not found",
      });
    }

    await appointment.update({
      assignedPastorId: pastor.id,
      assignedPastorName: pastor.fullName,
      status: "Approved",
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to assign pastor",
    });
  }
};
exports.getPastorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        assignedPastorId: req.params.id,
      },
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
  }
};
