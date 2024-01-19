const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const UsersController = require("../controllers/users.controllers");
const { where } = require("sequelize");

// TODO: Ruta para buscar todos los usuarios
router.get("/users", UsersController.index);

// TODO: Ruta para buscar un usuario
router.get("/users/:id", UsersController.oneUser);
// TODO: Ruta para crear usuarios
router.post("/users", UsersController.store);

// TODO: Ruta para iniciar sesion
router.post("/sesion", UsersController.session);
// TODO: ruta para cerrar sesion
router.patch("/destroy", UsersController.destroy);

module.exports = router;
