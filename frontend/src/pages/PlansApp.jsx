import NavBar from "../components/navBar";
import Error404 from "./Error404";
import "../styles/updateUser.css";
import { useState } from "react";
import PlansContainer from "../components/PlansContainer";

export default function PlansApp() {
  return (
    <div>
      <>
        {!localStorage.getItem("token") ? (
          <Error404 />
        ) : (
          <>
            <NavBar />
            <PlansContainer />
          </>
        )}
      </>
    </div>
  );
}
