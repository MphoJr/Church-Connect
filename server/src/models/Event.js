const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define("Event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  venue: {
    type: DataTypes.STRING,
  },

  eventDate: {
    type: DataTypes.DATEONLY,
  },

  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Event;
