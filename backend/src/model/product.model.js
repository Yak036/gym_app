const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config({ path: "./.env" });

const host = process.env.HOST;
const db = process.env.DATABASE;
const user = process.env.USER;
const dbName = process.env.DBNAME;
const password = process.env.PASSWORD;

// TODO: Esto conecta con la db
const sequelize = new Sequelize(dbName, user, password, {
  host: host,
  dialect: db,
  port: 3306,
});
// ? con esto creas las tablas
class Product extends Model {}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    is_stock: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

module.exports = Product;
// Todo: Esto comprueba la conexion a la DB
// async function testConenection() {
//   try {
//     await sequelize.authenticate();
//     console.log("All Good!!");
//   } catch (error) {
//     console.error("All bad!!", err);
//   }
// }

//testConenection();
