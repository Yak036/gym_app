import Welcome from "../components/Welcome";
import NavBar from "../components/navBar";

export default function WelcomeApp() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <NavBar />
          <Welcome />
        </>
      ) : (
        "Errr 404"
      )}
    </>
  );
}
