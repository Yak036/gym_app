import React from "react";
import NavBar from "../components/navBar";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function MiauApp() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    let a = 1;
  } else {
    navigate("/login");
  }
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <NavBar />
          <img
            src="https://th.bing.com/th/id/R.a7396e3a82bfb6c0236da11e06c85dbb?rik=vI0aEMHzwdfW3Q&pid=ImgRaw&r=0"
            alt=""
          />
        </>
      ) : (
        <h1>Error: 404 (tengo que ponerlo mas bonito deme chance xdxd)</h1>
      )}
    </>
  );
}
