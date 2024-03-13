const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const UsersController = require("../controllers/users.controllers");
const ArticleController = require("../controllers/article.controllers");
const MetricController = require("../controllers/metrics.controllers");
const HabitController = require("../controllers/habits.controllers");
const PlanController = require("../controllers/plan.controllers");
const { where } = require("sequelize");

//TODO: Rutas para usuarios
// * Ruta para buscar todos los usuarios
router.get("/users", UsersController.index);

// * Ruta para buscar un usuario
router.get("/users/:id", UsersController.oneUser);

// * Ruta para crear usuarios
router.post("/users", UsersController.store);

// * ruta para editar usuarios
router.put("/users/:idUser", UsersController.update);

// * Ruta para iniciar sesion
router.post("/sesion", UsersController.session);

// * ruta para cerrar sesion
router.patch("/destroy", UsersController.destroy);

//TODO: Rutas para articulos
//* Ver todos los articulos
router.get("/articles", ArticleController.index);

//* Ver ciertos articulos
router.get("/articles/:id", ArticleController.myArticles);

//* Crear articulo
router.post("/articles/:idUser", ArticleController.store);

//* Eliminar articulo

router.delete("/articles/:idArticle", ArticleController.delete);

// TODO: Ruta para metricas

//* Crear metricas
router.post("/metrics/:idUser", MetricController.store);

//* Editar metricas
router.put("/metrics/:idUser", MetricController.update);

// * Ver ciertas metricas
router.get("/metrics/:idUser", MetricController.myMetrics);

//TODO: Ruta para habitos
//* Crear habito
router.post("/habits/:idUser", HabitController.store);

//* Editar habito
router.put("/habits/:idUser", HabitController.update);

// * Ver ciertos habitos
router.get("/habits/:idUser", HabitController.myhabits);

//TODO: Planes
//* crear plan
router.post("/plans/:idUser", PlanController.store);

// * ver plan
router.get("/plans/:idUser", PlanController.myPlan);

// * editar plan
router.put("/plans/:idUser", PlanController.update);

module.exports = router;
