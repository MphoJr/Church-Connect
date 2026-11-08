const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define("Member", {
  fullName: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  ministry: DataTypes.STRING,
  status: DataTypes.STRING,
  joinDate: DataTypes.DATEONLY,
});

module.exports = Member;
