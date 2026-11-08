const Attendance = require("../models/Attendance");

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(attendance);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.bulkCreate(req.body);

    res.status(201).json(attendance);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to save attendance",
    });
  }
};
