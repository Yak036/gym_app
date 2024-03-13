import QuestContainer from "../components/QuestContainer";
import UpdateUserForm from "../components/UpdateUserForm";
import HabitsUserForm from "../components/HabitsUserForm";
import NavBar from "../components/navBar";
import Error404 from "./Error404";
import "../styles/updateUser.css";
import { useState } from "react";
import MetricsUserForm from "../components/MetricsUserForm";
export default function PerfilApp() {
  const [showContainer, SetShowContainer] = useState({
    personalData: true,
    habitos: false,
    medidas: false,
  });
  const handleClick = (key) => {
    switch (key) {
      case 1:
        SetShowContainer({
          personalData: !showContainer.personalData,
          habitos: false,
          medidas: false,
        });
        break;
      case 2:
        SetShowContainer({
          personalData: false,
          habitos: !showContainer.habitos,
          medidas: false,
        });
        break;
      case 3:
        SetShowContainer({
          personalData: false,
          habitos: false,
          medidas: !showContainer.medidas,
        });
        break;
      default:
        break;
    }
  };
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Error404 />
      ) : (
        <>
          <NavBar />
          <div class="tabs is-centered">
            <ul>
              <li
                class={`personal-data ${
                  showContainer.personalData ? "is-active" : ""
                }`}
                onClick={() => handleClick(1)}
              >
                <a>Datos Personales</a>
              </li>
              <li
                class={`personal-data ${
                  showContainer.habitos ? "is-active" : ""
                }`}
                onClick={() => handleClick(2)}
              >
                <a>Habitos</a>
              </li>
              <li
                class={`personal-data ${
                  showContainer.medidas ? "is-active" : ""
                }`}
                onClick={() => handleClick(3)}
              >
                <a>Medidas</a>
              </li>
            </ul>
          </div>
          {showContainer.personalData ? (
            <QuestContainer
              formTitle="Datos Personales"
              form={<UpdateUserForm />}
            />
          ) : (
            ""
          )}
          {showContainer.habitos ? (
            <QuestContainer formTitle="Habitos" form={<HabitsUserForm />} />
          ) : (
            ""
          )}
          {showContainer.medidas ? (
            <QuestContainer formTitle="Medidas" form={<MetricsUserForm />} />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
