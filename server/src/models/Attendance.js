const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Attendance = sequelize.define("Attendance", {
  memberName: DataTypes.STRING,
  service: DataTypes.STRING,
  attendanceDate: DataTypes.DATEONLY,
  status: {
    type: DataTypes.STRING,
    defaultValue: "Present",
  },
});

module.exports = Attendance;
