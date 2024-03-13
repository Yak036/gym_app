const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

//TODO: ver usuarios
exports.index = async (req, res) => {
  const users = await Users.findAll();
  res.status(200).json({
    ok: true,
    status: 200,
    body: users,
  });
};
// TODO: Ver un usuario
exports.oneUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    ok: true,
    status: 200,
    body: user,
  });
};
//TODO: Guardar usuario
exports.store = async (req, res) => {
  console.log(req.body);
  const dataUser = req.body;

  // ? comprobar si ya existe el Gmail
  const email = req.body.email;
  const matchEmail = await Users.findAll({
    where: {
      email,
    },
  });
  console.log(matchEmail);
  if (matchEmail.length != 0) {
    res.status(203).json({
      ok: false,
      status: 203,
      message: "Este Gmail ya existe",
    });
    return;
  }
  // ? salt: Parametros de encriptado
  const salt = bcrypt.genSaltSync(10);
  // ? hash: palabra ya encriptada
  const hash = bcrypt.hashSync(dataUser.password, salt);
  const createPerson = await Users.create({
    name: dataUser.name,
    surName: dataUser.surName,
    email: dataUser.email,
    dateBirth: dataUser.dateBirth,
    password: hash,
  });

  res.status(201).json({
    ok: true,
    status: 201,
    message: "Created Person",
  });
};

//TODO: Editar persona
exports.update = async (req, res) => {
  const user = await Users.findOne({
    where: { id: req.params.idUser },
  });
  const { password } = req.body;
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const dataUser = req.body;
    const updateUser = await Users.update(
      {
        name: dataUser.name,
        surName: dataUser.surName,
        dateBirth: dataUser.dateBirth,
        email: dataUser.email,
      },
      {
        where: {
          id: req.params.idUser,
        },
      }
    );
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Usuario actualizado correctamente",
      body: updateUser,
    });

    return;
  } else {
    res.status(201).json({
      ok: false,
      status: 201,
      message: "Contraseña invalida",
    });
    return;
  }
};

//TODO: iniciar sesion
exports.session = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email },
  });
  if (!user) {
    res.status(203).json({
      ok: false,
      status: 203,
      message: "Gmail no encontrado",
    });
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  const token = uuidv4();
  if (match) {
    const startSession = await Users.update(
      {
        session: 1,
        secret_token: token,
      },
      {
        where: { email: email },
      }
    );

    res.status(201).json({
      ok: true,
      status: 201,
      token: token,
      userId: user.id,
    });
    return;
  } else {
    res.status(201).json({
      ok: false,
      status: 201,
      message: "Contraseña invalida",
    });
    return;
  }
};

//TODO: cerrar sesion
exports.destroy = async (req, res) => {
  console.log(req.body);
  const { id, secret_token } = req.body;
  const matchUser = await Users.findOne({
    where: {
      id,
      secret_token,
    },
  });
  console.log(matchUser);
  if (matchUser) {
    const closedSession = await Users.update(
      {
        session: 0,
        secret_token: null,
      },
      {
        where: { id: id },
      }
    );
    res.status(201).json({
      ok: true,
      status: 201,
      session: "Cerrando Sesion",
    });
  } else {
    res.status(400).json({
      ok: true,
      status: 201,
      session: "No se ha podido cerrar sesion",
    });
  }
};
// console.log(req.body);
//   const { email, password } = req.body;
//   const user = await Users.findOne({
//     where: { email },
//   });
//   if (!user) {
//     res.status(203).json({
//       ok: false,
//       status: 203,
//       message: "Gmail no encontrado",
//     });
//     return;
//   }
