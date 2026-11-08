const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Attendance = sequelize.define("Attendance", {
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  memberName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  attendanceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Present",
  },
});

module.exports = Attendance;
