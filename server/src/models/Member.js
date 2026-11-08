const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define("Member", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: DataTypes.STRING,

  email: DataTypes.STRING,

  ministry: DataTypes.STRING,

  status: {
    type: DataTypes.STRING,
    defaultValue: "Active",
  },

  joinDate: DataTypes.DATEONLY,
});

module.exports = Member;
