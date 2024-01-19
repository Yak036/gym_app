import useForm from "./hooks/useForm";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, NavLink, useNavigate } from "react-router-dom";
const QuestLogin = () => {
  const navigate = useNavigate();
  const initialForm = {
    email: "",
    password: "",
  };
  const { formState, name, password, onInputChange } = useForm(initialForm);

  const onSubmit = async (event) => {
    event.preventDefault();
    //? desde aqui se hace la comprobacion de datos
    try {
      const response = await axios.post(
        "http://localhost:3302/api/sesion",
        formState
      );
      console.log(response);
      if (response.data.ok) {
        // ! aqui localiza el token y  guarda la sesion
        console.log(response.data.token);
        let timerInterval;
        Swal.fire({
          title: "Usuario encontrado",
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
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            navigate("/miau");
          },
        });
      } else {
        let timerInterval;
        Swal.fire({
          title: `${response.data.message}`,
          icon: "warning",
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
        <button
          className="button is-primary is-outlined is-large is-fullwidth"
          type="submit"
        >
          Iniciar Sesion
        </button>
      </form>
    </>
  );
};

export default QuestLogin;
