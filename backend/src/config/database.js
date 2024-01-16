const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config({ path: "../../.env" });

const host = process.env.HOST;
const db = process.env.DATABASE;
const user = process.env.USER;
const dbName = process.env.DBNAME;
const password = process.env.PASSWORD;

// TODO: Esto conecta con la db
const sequelize = new Sequelize(dbName, user, password, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
  dialectOptions: {
    connectTimeout: 90000,
  },
});

// Todo: Esto comprueba la conexion a la DB
async function testConenection() {
  try {
    await sequelize.authenticate();
    console.log("All Good!!");
  } catch (error) {
    console.error("All bad!!", error);
  }
}

testConenection();
module.exports = sequelize;
