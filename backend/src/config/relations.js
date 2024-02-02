const Article = require("../model/article.model");
const User = require("../model/users.model");

User.hasMany(Article, {
  foreignKey: "users_id",
});
Article.belongsTo(User, {
  foreignKey: "users_id",
});
