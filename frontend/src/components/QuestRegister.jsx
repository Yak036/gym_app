import useForm from "./hooks/useForm";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const QuestRegister = () => {
  const navigate = useNavigate();
  const nameExp = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
  const gmailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordExp = /(?=.*\d).{8,}/;
  const initialForm = {
    name: false,
    surName: false,
    email: false,
    dateBirth: false,
    password: false,
    confirmpassword: false,
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
    for (let key in formState) {
      if (!formState[key]) {
        Swal.fire(
          "Debe rellenar todos los campos",
          "Porfavor, hagalo de nuevo",
          "warning"
        );
        return;
      }
    }
    // ? Validacion del nombre
    if (nameExp.test(formState.name)) {
      initialForm.name = true;
    } else {
      Swal.fire(
        "El nombre no es valido",
        "Porfavor, hagalo de nuevo",
        "warning"
      );
      initialForm.name = false;
    }
    // ? validacion del apellido
    if (nameExp.test(formState.surName)) {
      initialForm.surName = true;
    } else {
      Swal.fire(
        "El apellido no es valido",
        "Porfavor, hagalo de nuevo",
        "warning"
      );
      initialForm.surName = false;
    }
    //? validacion del gmail
    if (gmailExp.test(formState.email)) {
      initialForm.email = true;
    } else {
      Swal.fire(
        "El Gmail no es valido",
        "Porfavor, hagalo de nuevo",
        "warning"
      );
      initialForm.email = false;
    }

    //? validar la fecha de nacimiento
    const date = new Date();
    const year = date.getFullYear();
    const partes = formState.dateBirth.split("-");
    const yearUser = Number(partes[0]);
    if (year - yearUser >= 15) {
      initialForm.dateBirth = true;
    } else {
      Swal.fire(
        "Debes tener como minimo 15 años de edad",
        "Porfavor, hagalo de nuevo",
        "warning"
      );
      initialForm.dateBirth = false;
    }

    //? validacion de contrasenia
    if (passwordExp.test(formState.password)) {
      if (formState.password == formState.confirmpassword) {
        initialForm.password = true;
        initialForm.confirmpassword = true;
      } else {
        Swal.fire(
          "Las contraseñas no coinciden",
          "Porfavor, hagalo de nuevo",
          "warning"
        );
        initialForm.password = false;
        initialForm.confirmpassword = false;
      }
    } else {
      Swal.fire(
        "La contraseña requiere una logitud de 8 caracteres o mas",
        "Porfavor, hagalo de nuevo",
        "warning"
      );
      initialForm.password = false;
      initialForm.confirmpassword = false;
    }
    if (Object.keys(initialForm).every((key) => initialForm[key] === true)) {
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
