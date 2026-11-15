const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PrayerRequest = sequelize.define("PrayerRequest", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  request: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
});

module.exports = PrayerRequest;
