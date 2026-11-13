const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define("Appointment", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
  },

  meetingType: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  preferredDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  preferredTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },

  assignedPastorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  assignedPastorName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Appointment;
