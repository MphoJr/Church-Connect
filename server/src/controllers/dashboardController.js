const Member = require("../models/Member");
const Visitor = require("../models/Visitor");
const Event = require("../models/Event");
const Attendance = require("../models/Attendance");

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
