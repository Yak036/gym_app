import LoginFormApp from "./pages/LoginFormApp.jsx";
import RegisterFormApp from "./pages/RegisterFormApp.jsx";
import WelcomeApp from "./pages/WelcomeApp.jsx";
import ArticleApp from "./pages/ArticleApp.jsx";
import MyArticleApp from "./pages/MyArticleApp.jsx";
import CreateArticleApp from "./pages/CreateArticleApp.jsx";
import SobreNosotrosApp from "./pages/SobreNosotrosApp.jsx";
import PerfilApp from "./pages/PerfilApp.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PlansApp from "./pages/PlansApp.jsx";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterFormApp />,
    },
    {
      path: "/",
      element: <WelcomeApp />,
    },
    {
      path: "/login",
      element: <LoginFormApp />,
    },
    {
      path: "/welcome",
      element: <WelcomeApp />,
    },
    {
      path: "article",
      element: <ArticleApp />,
    },
    {
      path: "myArticle",
      element: <MyArticleApp />,
    },
    {
      path: "myArticle/createArticle",
      element: <CreateArticleApp />,
    },
    {
      path: "sobreNosotros",
      element: <SobreNosotrosApp />,
    },
    {
      path: "perfil",
      element: <PerfilApp />,
    },
    {
      path: "plans",
      element: <PlansApp />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
