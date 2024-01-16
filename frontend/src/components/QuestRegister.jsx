import useForm from "./hooks/useForm";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const QuestRegister = () => {
  const navigate = useNavigate();
  const initialForm = {
    name: "",
    surName: "",
    email: "",
    dateBirth: "",
    password: "",
    confirmpassword: "",
  };
  const {
    formState,
    name,
    surName,
    email,
    dateBirth,
    password,
    confirmpassword,
    onInputChange,
  } = useForm(initialForm);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const response = await axios.post(
        "http://localhost:3302/api/users",
        formState
      );
      console.log(response);
      if (response.data.ok) {
        let timerInterval;
        Swal.fire({
          title: "Registro exitoso",
          icon: "success",
          html: "Se cerrara en <b></b> milisegundos.",
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
            navigate("/login");
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="columns containerForm is-flex-wrap-wrap is-justify-content-center"
        autoComplete="off"
      >
        <div className="column is-5 field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Ej. Ramces"
              name="name"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="column is-5 field">
          <label className="label">Apellido</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Ej. Vera"
              name="surName"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="column is-8 field">
          <label className="label">Correo Electronico</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Ej. ramVe@gmail.com"
              name="email"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="column is-8 field">
          <label className="label">Fecha de Nacimiento</label>
          <div className="control">
            <input
              className="input"
              type="date"
              placeholder="Ej. 09/11/2003"
              name="dateBirth"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="column is-5 field">
          <label className="label">Contraseña</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="*******"
              autoComplete="off"
              name="password"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="column is-5 field">
          <label className="label">Confirmar Contraseña</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="*******"
              autoComplete="off"
              name="confirmpassword"
              onChange={onInputChange}
            />
          </div>
        </div>

        <button
          className="button is-primary is-outlined is-large is-fullwidth"
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </>
  );
};

export default QuestRegister;
