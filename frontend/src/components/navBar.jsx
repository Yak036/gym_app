import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function NavBar() {
  const navigate = useNavigate();
  const sessionData = {
    id: localStorage.getItem("userId"),
    secret_token: localStorage.getItem("token"),
  };
  const closedSession = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3302/api/destroy",
        sessionData
      );
      let timerInterval;
      Swal.fire({
        title: `Cerrando Sesion`,
        icon: "info",
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
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          navigate("/register");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar is-link">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://queremosgraduarnos.org/wp-content/uploads/2022/07/LOGO-DEL-IUJO.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
          <div
            className="navbar-burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item has-text-white" href="https://bulma.io/">
              Inicio
            </a>
            {!localStorage.getItem("token") ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link has-text-white" href="/register">
                  Registrarse
                </a>
                <div className="navbar-dropdown is-boxed">
                  <a className="navbar-item " href="/login">
                    Iniciar Sesion
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link has-text-white" href="/register">
                    Perfil
                  </a>
                  <div className="navbar-dropdown is-boxed">
                    <a className="navbar-item " href="/login">
                      Configuracion
                    </a>
                  </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link has-text-white" href="/article">
                    Articulos
                  </a>
                  <div className="navbar-dropdown is-boxed">
                    <a className="navbar-item " href="/myArticle">
                      Mis Articulos
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                {localStorage.getItem("token") ? (
                  <p className="control">
                    <a
                      className="bd-tw-button button"
                      data-social-network="Twitter"
                      data-social-action="tweet"
                      data-social-target="https://bulma.io"
                      target="_blank"
                    >
                      <span className="icon">
                        <i className="fab fa-twitter"></i>
                      </span>
                      <span onClick={closedSession}>Cerrar Sesion</span>
                    </a>
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
