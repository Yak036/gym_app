const Article = require("../model/article.model");
const User = require("../model/users.model");
const Metric = require("../model/metrics.model");
const Habit = require("../model/habits.model");
const Plan = require("../model/plan.model");
User.hasMany(Article, {
  foreignKey: "users_id",
});
Article.belongsTo(User, {
  foreignKey: "users_id",
});

Metric.belongsTo(User, {
  foreignKey: "users_id",
});

Habit.belongsTo(User, {
  foreignKey: "users_id",
});

Plan.belongsTo(User, {
  foreignKey: "users_id",
});
