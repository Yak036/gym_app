import React from "react";

export default function validateSession(component, redirect, login) {
  switch (login) {
    case true:
      if (localStorage.getItem("token")) {
        return redirect;
      } else {
        return component;
      }
      break;
    case false:
      if (localStorage.getItem("token")) {
        return component;
      } else {
        return redirect;
      }
      break;
  }
}
