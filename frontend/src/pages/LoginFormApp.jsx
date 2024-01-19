import QuestContainer from "../components/QuestContainer";
import QuestLogin from "../components/QuestLogin";
import NavBar from "../components/navBar";

export default function LoginFormApp() {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
          <NavBar />
          <QuestContainer formTitle="Iniciar Sesion" form={<QuestLogin />} />
        </>
      ) : (
        "Errr 404"
      )}
    </>
  );
}
