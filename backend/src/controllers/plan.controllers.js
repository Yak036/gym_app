const User = require("../model/users.model");
const Plan = require("../model/plan.model");
//TODO: Agregar Plan

exports.store = async (req, res) => {
  console.log(req.body);
  const dataPlan = req.body;
  const createPlan = await Plan.create({
    plan: dataPlan.plan,
    date: dataPlan.date,
    users_id: req.params.idUser,
  });
  res.status(201).json({
    ok: true,
    status: 201,
    message: "Plan Actualizado",
  });
};

exports.myPlan = async (req, res) => {
  const plan = await Plan.findAll({
    include: [
      {
        model: User,
      },
    ],
    where: {
      users_id: req.params.idUser,
    },
  });
  res.status(200).json({
    ok: true,
    status: 200,
    body: plan,
  });
};

exports.update = async (req, res) => {
  const dataPlan = req.body;
  const updatePlan = await Plan.update(
    {
      plan: dataPlan.plan,
      date: dataPlan.date,
    },
    {
      where: {
        users_id: req.params.idUser,
      },
    }
  );
  res.status(200).json({
    ok: true,
    status: 200,
    message: "Plan Actualizado",
    body: updatePlan,
  });
};
