const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Announcement = sequelize.define("Announcement", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  audience: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Announcement;
