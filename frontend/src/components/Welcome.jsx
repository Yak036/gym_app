import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/welcome.css";

export default function Welcome() {
  const conf = true;
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = async () => {
      const response = await axios.get(
        `http://localhost:3302/api/users/${localStorage.getItem("userId")}`
      );
      console.log(response.data.body);
      setUser(response.data.body);
      return;
    };
    userData();
  }, [conf]);
  return (
    <>
      <div className="slogan">
        <h1 className="titlee">Muevete Flojo</h1>
        <p className="userName">
          Un paso más cerca de tu mejor versión. <br />
          Sigue esforzandote {user.name} {user.surName}
        </p>
      </div>
    </>
  );
}
