const Article = require("../model/article.model");
const User = require("../model/users.model");
const router = require("express").Router();

// TODO: Ver todos los articulos
exports.index = async (req, res) => {
  const articles = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["name", "surName"],
      },
    ],
  });
  res.status(200).json({
    ok: true,
    status: 200,
    body: articles,
  });
};
//TODO: Ver ciertos Articulos
exports.myArticles = async (req, res) => {
  const articles = await Article.findAll({
    where: {
      users_id: req.params.id,
    },
  });
  res.status(200).json({
    ok: true,
    status: 200,
    body: articles,
  });
};

//TODO: Crear un articulo

exports.store = async (req, res) => {
  console.log(req.body);
  const dataArticle = req.body;

  const createArticle = await Article.create({
    title: dataArticle.title,
    description: dataArticle.description,
    img: dataArticle.img,
    users_id: req.params.idUser,
  });

  res.status(201).json({
    ok: true,
    status: 201,
    message: "Articulo Creado",
  });
};

// TODO: Eliminar un articulo

exports.delete = async (req, res) => {
  const id = req.params.idArticle;
  const deleteArticle = await Article.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    ok: true,
    status: 204,
    message: "Articulo eliminado con exito",
    body: deleteArticle,
  });
};
