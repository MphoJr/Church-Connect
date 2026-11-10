const Attendance = require("../models/Attendance");
const Member = require("../models/Member");
const Visitor = require("../models/Visitor");
const Event = require("../models/Event");

const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.count();

    const totalVisitors = await Visitor.count();

    const totalEvents = await Event.count();

    const totalAttendance = await Attendance.count();

    const recentEvents = await Event.findAll({
      order: [["eventDate", "ASC"]],
      limit: 5,
    });

    res.json({
      totalMembers,
      totalVisitors,
      totalEvents,
      totalAttendance,
      recentEvents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load statistics",
    });
  }
};

exports.getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = {};

    if (startDate && endDate) {
      where.attendanceDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    const attendance = await Attendance.findAll({
      where,
    });

    const grouped = {};

    attendance.forEach((record) => {
      if (!grouped[record.service]) {
        grouped[record.service] = 0;
      }

      grouped[record.service]++;
    });

    res.json(grouped);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate report",
    });
  }
};
