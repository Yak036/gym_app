const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const UsersController = require("../controllers/users.controllers");
const { where } = require("sequelize");

// TODO: Ruta para crear usuarios
router.get("/users", UsersController.index);
router.post("/users", UsersController.store);

// TODO: Ruta para iniciar sesion
router.post("/sesion", UsersController.session);
// TODO: ruta para cerrar sesion
router.patch("/destroy", UsersController.destroy);

module.exports = router;
