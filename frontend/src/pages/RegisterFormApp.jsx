import QuestContainer from "../components/QuestContainer";
import QuestRegister from "../components/QuestRegister";
import NavBar from "../components/navBar";

const RegisterFormApp = () => {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
          <NavBar />
          <QuestContainer formTitle="Registrarse" form={<QuestRegister />} />
        </>
      ) : (
        "Errr 404"
      )}
    </>
  );
};

export default RegisterFormApp;
