import QuestContainer from "../components/QuestContainer";
import QuestRegister from "../components/QuestRegister";
import NavBar from "../components/navBar";

const RegisterFormApp = () => {
  return (
    <>
      <NavBar />
      <QuestContainer formTitle="Registrarse" form={<QuestRegister />} />
    </>
  );
};

export default RegisterFormApp;
