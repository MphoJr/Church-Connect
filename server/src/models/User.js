const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("Admin", "Pastor"),
    defaultValue: "Pastor",
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  profileImage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = User;
