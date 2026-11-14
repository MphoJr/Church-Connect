const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reminder = sequelize.define("Reminder", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  reminderDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  reminderTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Reminder;
