import useForm from "./hooks/useForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateUserForm() {
  const [dataUser, setDataUser] = useState([]);
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
  };
  useEffect(() => {
    const showUser = async () => {
      const response = await axios.get(
        `http://localhost:3302/api/users/${localStorage.getItem("userId")}`
      );
      console.log(response.data.body);
      setDataUser(response.data.body);
      initialForm.name = response.data.body.name;
      initialForm.surName = response.data.body.surName;
      initialForm.dateBirth = response.data.body.dateBirth;
      initialForm.email = response.data.body.email;
    };
    showUser();
  }, []);

  let { formState, name, surName, email, dateBirth, password, onInputChange } =
    useForm(initialForm);

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
    if (password != "") {
      initialForm.password = true;
    }
    if (Object.keys(initialForm).every((key) => initialForm[key] === true)) {
      try {
        const response = await axios.put(
          `http://localhost:3302/api/users/${localStorage.getItem("userId")}`,
          formState
        );
        console.log(response);
        if (response.data.ok) {
          let timerInterval;
          Swal.fire({
            title: response.data.message,
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
              window.location.reload(true);
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
              value={formState.name}
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
              value={formState.surName}
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
              disabled
              value={formState.email}
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
              value={formState.dateBirth}
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

        <button
          className="button is-primary is-large is-fullwidth"
          type="submit"
        >
          Guardar cambios
        </button>
      </form>
    </>
  );
}
