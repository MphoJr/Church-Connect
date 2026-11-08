const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define("Event", {
  title: DataTypes.STRING,
  venue: DataTypes.STRING,
  eventDate: DataTypes.DATEONLY,
  description: DataTypes.TEXT,
});

module.exports = Event;
