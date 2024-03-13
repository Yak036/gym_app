const Metric = require("../model/metrics.model");
const User = require("../model/users.model");

//TODO: Crear metricas
exports.store = async (req, res) => {
  console.log(req.body);
  const dataMetric = req.body;

  const createMetric = await Metric.create({
    height: dataMetric.height,
    weight: dataMetric.weight,
    grease: dataMetric.grease,
    genetic: dataMetric.genetic,
    users_id: req.params.idUser,
  });

  res.status(201).json({
    ok: true,
    status: 201,
    message: "Metricas agregadas",
  });
};

// TODO: Ver las metricas
exports.myMetrics = async (req, res) => {
  const metrics = await Metric.findAll({
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
    body: metrics,
  });
};

// TODO: Editar las metricas
exports.update = async (req, res) => {
  const dataMetric = req.body;
  const updateMetrics = await Metric.update(
    {
      height: dataMetric.height,
      weight: dataMetric.weight,
      grease: dataMetric.grease,
      genetic: dataMetric.genetic,
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
    message: "Metricas actualizadas exitosamente",
    body: updateMetrics,
  });
};
