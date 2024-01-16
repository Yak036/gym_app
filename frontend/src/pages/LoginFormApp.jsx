import QuestContainer from "../components/QuestContainer";
import QuestLogin from "../components/QuestLogin";
import NavBar from "../components/navBar";

export default function LoginFormApp() {
  return (
    <div>
      <NavBar />
      <QuestContainer formTitle="Iniciar Sesion" form={<QuestLogin />} />
    </div>
  );
}
