import Welcome from "../components/Welcome";
import NavBar from "../components/navBar";
import Error404 from "./Error404";

export default function WelcomeApp() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <NavBar />
          <Welcome />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
}
