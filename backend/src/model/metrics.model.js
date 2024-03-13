const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Metric extends Model {}

Metric.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grease: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genetic: {
      type: DataTypes.ENUM(["Ectomorfo", "Mesomorfo", "Endomorfo"]),
      allowNull: false,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "metric",
    timestamps: false,
  }
);

module.exports = Metric;
