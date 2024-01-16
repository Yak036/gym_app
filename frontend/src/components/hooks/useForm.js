import React, { useState } from "react";

// ? Se le debe pasar un objeto con los parametros q recibira el formulario
const useForm = (initialForm = {}) => {
  //? Se coloca ese formulario en el useState
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (event) => {
    // ? de los inputs va a sacar el name y el valor de cada uno para agregarlos a un objeto
    const { name, value } = event.target;

    // ? actualiza sustituyendo datos viejos por nuevos
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    ...formState,
    formState,
    onInputChange,
  };
};

export default useForm;
