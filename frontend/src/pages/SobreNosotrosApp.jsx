import Footer from "../components/Footer";
import NavBar from "../components/navBar";
import "../styles/sobreNosotros.css";

export default function SobreNosotrosApp() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <NavBar />
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Esta pagina tiene como finalidad principal la creación de un
                sistema de gestión de entrenamiento y dieta donde el usuario
                podrá tener una dieta personalizada individual, así como una
                dieta personalizada individual que cambiará cada n cantidad de
                días dependiendo de su mejoramiento o empeoramiento de las
                medidas morfológicas del individuo hasta llegar mediante
                técnicas estadísticas a un entrenamiento fijo e idóneo para el
                mantenimiento del físico y su alimentación{" "}
              </p>
              <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </header>
          </div>

          <Footer />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
}
