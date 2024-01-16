import LoginFormApp from "./pages/LoginFormApp.jsx";
import MiauApp from "./pages/MiauApp.jsx";
import RegisterFormApp from "./pages/RegisterFormApp.jsx";

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
      element: <MiauApp />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
