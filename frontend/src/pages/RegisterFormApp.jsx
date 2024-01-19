import QuestContainer from "../components/QuestContainer";
import QuestRegister from "../components/QuestRegister";
import NavBar from "../components/navBar";
import Error404 from "./Error404";

const RegisterFormApp = () => {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
          <NavBar />
          <QuestContainer formTitle="Registrarse" form={<QuestRegister />} />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default RegisterFormApp;
