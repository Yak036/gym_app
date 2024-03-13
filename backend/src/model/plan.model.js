const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Plan extends Model {}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plan: {
      type: DataTypes.ENUM(["standar", "premium"]),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "plan",
    timestamps: false,
  }
);

module.exports = Plan;
