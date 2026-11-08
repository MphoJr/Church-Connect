const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Visitor = sequelize.define("Visitor", {
  fullName: DataTypes.STRING,

  phone: DataTypes.STRING,

  service: DataTypes.STRING,

  firstVisitDate: DataTypes.DATEONLY,

  invitedBy: DataTypes.STRING,
});

module.exports = Visitor;
