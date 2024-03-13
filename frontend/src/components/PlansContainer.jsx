import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/plans.css";

export default function PlansContainer() {
  const [planStatus, setPlanStatus] = useState(false);
  const [plan, setPlan] = useState();
  useEffect(() => {
    const showPlan = async () => {
      const response = await axios.get(
        `http://localhost:3302/api/plans/${localStorage.getItem("userId")}`
      );
      console.log(response.data.body);
      const data = response.data.body;
      if (data.lenght != 0) {
        setPlan(response.data.body[0].plan);
        console.log(plan);
        setPlanStatus(true);
      }
    };
    showPlan();
  }, []);

  const handleClick = async (key) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    switch (key) {
      case 1:
        console.log(fechaFormateada);
        try {
          if (planStatus) {
            const response = await axios.put(
              `http://localhost:3302/api/plans/${localStorage.getItem(
                "userId"
              )}`,
              {
                plan: "standar",
                date: fechaFormateada,
              }
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
          } else {
            const response = await axios.post(
              `http://localhost:3302/api/plans/${localStorage.getItem(
                "userId"
              )}`,
              {
                plan: "standar",
                date: fechaFormateada,
              }
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
          }
        } catch (error) {
          console.error(error);
        }
        break;
      case 2:
        console.log(fechaFormateada);
        try {
          if (planStatus) {
            const response = await axios.put(
              `http://localhost:3302/api/plans/${localStorage.getItem(
                "userId"
              )}`,
              {
                plan: "premium",
                date: fechaFormateada,
              }
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
          } else {
            const response = await axios.post(
              `http://localhost:3302/api/plans/${localStorage.getItem(
                "userId"
              )}`,
              {
                plan: "premium",
                date: fechaFormateada,
              }
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
          }
        } catch (error) {
          console.error(error);
        }
      default:
        break;
    }
  };
  return (
    <>
      <div className="title prin">Planes</div>
      <div className="columns plans-container">
        <div className="column is-3">
          <div className="title">
            <h2>Estandar 0$</h2>
          </div>
          <div className="content">
            <ul>
              <li>Dieta por IA</li>
              <li>Ejercicio por IA</li>
            </ul>
          </div>
          <div className="footer-plan">
            <button
              className="button is-primary"
              onClick={() => handleClick(1)}
              disabled={plan == "standar" ? "none" : ""}
            >
              Obtener
            </button>
          </div>
          <div className="cristal"></div>
        </div>

        <div className="column is-3">
          <div className="title">
            <h2>Premium 2$</h2>
          </div>
          <div className="content">
            <ul>
              <li>Dieta por IA</li>
              <li>Ejercicio por IA</li>
              <li>Asesoria profesional</li>
            </ul>
          </div>
          <div className="footer-plan">
            <button
              className="button is-primary"
              disabled={plan == "premium" ? "none" : ""}
              onClick={() => handleClick(2)}
            >
              Obtener
            </button>
          </div>
          <div className="cristal"></div>
        </div>
      </div>
    </>
  );
}
