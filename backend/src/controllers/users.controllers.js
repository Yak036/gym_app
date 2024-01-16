const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

// ? ver usuarios
exports.index = async (req, res) => {
  const users = await Users.findAll();
  res.status(200).json({
    ok: true,
    status: 200,
    body: users,
  });
};

// ? Guardar usuario
exports.store = async (req, res) => {
  console.log(req.body);
  const dataUser = req.body;
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

// ? iniciar sesion
exports.session = async (req, res) => {
  console.log(req.body);
  const dataSession = req.body;
  const users = await Users.findAll();
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
  if (match) {
    const token = uuidv4();
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
