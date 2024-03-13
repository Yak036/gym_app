import useForm from "./hooks/useForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MetricsUserForm() {
  const [metrics, setmetrics] = useState(false);
  const [formmetrics, setformmetrics] = useState({
    height: "",
    weight: "",
    grease: "",
    genetic: "",
  });

  useEffect(() => {
    const showMetrics = async () => {
      const response = await axios.get(
        `http://localhost:3302/api/metrics/${localStorage.getItem("userId")}`
      );
      console.log(response.data.body);
      if (response.data.ok) {
        setformmetrics({
          height: response.data.body[0].height,
          weight: response.data.body[0].weight,
          grease: response.data.body[0].grease,
          genetic: response.data.body[0].genetic,
        });
        setmetrics(true);
        console.log(formmetrics);
      }
    };
    showMetrics();
  }, []);

  const onChangeSelect = (event) => {
    setformmetrics({
      ...formmetrics,
      genetic: event.target.value,
    });
  };

  const onChangeInput = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    if (event.target.name == "height" && event.target.value > 2.75) {
      Swal.fire({
        icon: "error",
        title: "No puedes ser tan alto",
        text: "Ingresa bien tu altura",
      });
    }
    if (event.target.name == "weight" && event.target.value > 400) {
      Swal.fire({
        icon: "error",
        title: "No puedes ser tan pesado",
        text: "Ingresa bien tu peso",
      });
    }
    if (event.target.name == "grease" && event.target.value > 30) {
      Swal.fire({
        icon: "error",
        title: "No puedes tener tanta grasa",
        text: "Ingresa bien porcentaje de grasa",
      });
    } else {
      setformmetrics({
        ...formmetrics,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!metrics) {
      console.log(formmetrics);
      try {
        const response = await axios.post(
          `http://localhost:3302/api/metrics/${localStorage.getItem("userId")}`,
          formmetrics
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
      console.log(formmetrics);
      try {
        const response = await axios.put(
          `http://localhost:3302/api/metrics/${localStorage.getItem("userId")}`,
          formmetrics
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
    <div>
      <form
        onSubmit={onSubmit}
        className="columns containerForm is-flex-wrap-wrap is-justify-content-center"
        autoComplete="off"
      >
        <div className="column is-5 field">
          <div className="field-body">
            <div className="field is-expanded">
              <label className="label">Altura (metros)</label>
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">M</a>
                </p>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="number"
                    placeholder="Ej. 1.50"
                    value={formmetrics.height}
                    name="height"
                    onChange={onChangeInput}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-5 field">
          <div className="field-body">
            <div className="field is-expanded">
              <label className="label">Peso (Kilogramos)</label>
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">Kg</a>
                </p>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="number"
                    placeholder="Ej. 70"
                    name="weight"
                    value={formmetrics.weight}
                    onChange={onChangeInput}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-5 field">
          <div className="field-body">
            <div className="field is-expanded">
              <label className="label">Grasa (porcentaje)</label>
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">%</a>
                </p>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="number"
                    placeholder="Ej. 30"
                    name="grease"
                    value={formmetrics.grease}
                    onChange={onChangeInput}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-full is-flex is-justify-content-center">
          <div className="select is-danger">
            <select value={formmetrics.genetic} onChange={onChangeSelect}>
              <option>Tipo de Genetica</option>
              <option value="Ectomorfo">Ectomorfo</option>
              <option value="Endomorfo">Endomorfo</option>
              <option value="Mesomorfo">Mesomorfo</option>
            </select>
          </div>
        </div>
        <button
          className="button is-primary is-large is-fullwidth"
          type="submit"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
