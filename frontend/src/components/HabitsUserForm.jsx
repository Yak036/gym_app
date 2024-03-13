import useForm from "./hooks/useForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/updateUser.css";
export default function HabitsUserForm() {
  const [habitExist, sethabitExist] = useState(false);
  const [formHabits, setFormHabits] = useState({
    smoke: false,
    drink: false,
    hrsDream: "",
  });

  useEffect(() => {
    const showHabits = async () => {
      const response = await axios.get(
        `http://localhost:3302/api/habits/${localStorage.getItem("userId")}`
      );
      console.log(response.data.body[0]);
      if (response.data.ok && response.data.body) {
        setFormHabits({
          smoke: response.data.body[0].smoke,
          drink: response.data.body[0].drink,
          hrsDream: `${response.data.body[0].hrsDream}`,
        });
        sethabitExist(true);
        console.log(formHabits);
      }
    };
    showHabits();
  }, []);

  const onChangeSelect = (event) => {
    setFormHabits({
      ...formHabits,
      hrsDream: event.target.value,
    });
    console.log(formHabits);
  };
  const onChangeCheckbox = (event, caso) => {
    switch (caso) {
      case 1:
        setFormHabits({
          ...formHabits,
          smoke: event.target.checked,
        });
        break;

      case 2:
        setFormHabits({
          ...formHabits,
          drink: event.target.checked,
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!habitExist) {
      console.log(formHabits);
      try {
        const response = await axios.post(
          `http://localhost:3302/api/habits/${localStorage.getItem("userId")}`,
          formHabits
        );
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
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(formHabits);
      try {
        const response = await axios.put(
          `http://localhost:3302/api/habits/${localStorage.getItem("userId")}`,
          formHabits
        );
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
        <div className="column is-full is-flex is-justify-content-center">
          <div class="select is-danger">
            <select value={formHabits.hrsDream} onChange={onChangeSelect}>
              <option>Horas de sueño aproximadas</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div className="column is-10 checkboxs">
          <label className="checkbox mg-small">
            <input
              type="checkbox"
              checked={formHabits.smoke}
              onChange={(event) => onChangeCheckbox(event, 1)}
            />
            Fuma
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={formHabits.drink}
              onChange={(event) => onChangeCheckbox(event, 2)}
            />
            Toma alcohol
          </label>
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
