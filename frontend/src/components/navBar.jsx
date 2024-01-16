import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const closedSession = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/register");
  };
  return (
    <>
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img
              src="https://queremosgraduarnos.org/wp-content/uploads/2022/07/LOGO-DEL-IUJO.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
          <div
            class="navbar-burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="https://bulma.io/">
              Inicio
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="/register">
                Registrarse
              </a>
              <div class="navbar-dropdown is-boxed">
                <a class="navbar-item" href="/login">
                  Iniciar Sesion
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                {localStorage.getItem("token") ? (
                  <p class="control">
                    <a
                      class="bd-tw-button button"
                      data-social-network="Twitter"
                      data-social-action="tweet"
                      data-social-target="https://bulma.io"
                      target="_blank"
                    >
                      <span class="icon">
                        <i class="fab fa-twitter"></i>
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
