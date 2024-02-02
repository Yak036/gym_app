const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const UsersController = require("../controllers/users.controllers");
const ArticleController = require("../controllers/article.controllers");
const { where } = require("sequelize");

// * Rutas para usuarios
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

//* Rutas para articulos
//TODO: Ver todos los articulos
router.get("/articles", ArticleController.index);

//TODO: Ver ciertos articulos
router.get("/articles/:id", ArticleController.myArticles);

//TODO: Crear articulo
router.post("/articles/:idUser", ArticleController.store);

//TODO Eliminar articulo

router.delete("/articles/:idArticle", ArticleController.delete);

module.exports = router;
