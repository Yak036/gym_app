import LoginFormApp from "./pages/LoginFormApp.jsx";
import RegisterFormApp from "./pages/RegisterFormApp.jsx";
import WelcomeApp from "./pages/WelcomeApp.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterFormApp />,
    },
    {
      path: "/login",
      element: <LoginFormApp />,
    },
    {
      path: "/miau",
      element: <WelcomeApp />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
