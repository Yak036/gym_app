const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Habit extends Model {}

Habit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    smoke: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    drink: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    hrsDream: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "habit",
    timestamps: false,
  }
);
module.exports = Habit;
