require("dotenv").config({ path: "../../.env" });
const express = require("express");
const morgan = require("morgan");
const router = require("../router/index");
const cors = require("cors");
const path = require("path");
const app = express();
// ? morgan informa en donde estamos a travez de la consola
app.use(morgan("dev"));

// ? se setea el puerto donde vamos a abrir la app
app.set("PORT", process.env.PORT || 3000);
// ? le dices a la app que use una vinculacion estatica
app.use(express.static(path.join(__dirname, "../public")));
// ? cors permitira q reciba datos de otros servidores
app.use(cors());
// ? express.json traduce lo q veremos
app.use(express.json());
// ? se marca la ruta
app.use("/api", router);
app.use("/sa", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("This is express");
// });

// app.use(express.json());
// app.use("/api/v1", router);
module.exports = app;
