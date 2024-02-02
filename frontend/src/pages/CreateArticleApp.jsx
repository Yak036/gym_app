import CreateArticleForm from "../components/CreateArticleForm";
import QuestContainer from "../components/QuestContainer";
import NavBar from "../components/navBar";
import Error404 from "./Error404";

// import "../styles/articleMini.css";
export default function CreateArticleApp() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <NavBar />
          <QuestContainer
            formTitle="Crear Articulo"
            form={<CreateArticleForm />}
          />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
}
