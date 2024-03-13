const Habit = require("../model/habits.model");
const User = require("../model/users.model");

//TODO: Crear habitos
exports.store = async (req, res) => {
  console.log(req.body);
  const dataHabit = req.body;

  const createHabit = await Habit.create({
    smoke: dataHabit.smoke,
    drink: dataHabit.drink,
    hrsDream: dataHabit.hrsDream,
    users_id: req.params.idUser,
  });

  res.status(201).json({
    ok: true,
    status: 201,
    message: "Habitos agregados",
  });
};

// TODO: Ver los habitos
exports.myhabits = async (req, res) => {
  const habits = await Habit.findAll({
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
    body: habits,
  });
};

// TODO: Editar los habitos
exports.update = async (req, res) => {
  const dataHabits = req.body;
  const updateHabits = await Habit.update(
    {
      smoke: dataHabits.smoke,
      drink: dataHabits.drink,
      hrsDream: dataHabits.hrsDream,
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
    message: "Habitos actualizados exitosamente",
    body: updateHabits,
  });
};
