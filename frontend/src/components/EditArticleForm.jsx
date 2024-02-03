import useForm from "./hooks/useForm";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditArticleForm({
  titleArticle,
  contentArticle,
  imgArticle,
  idArticle,
  disabled,
  userArticle,
}) {
  // alert(idArticle);
  const deleteArticle = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3302/api/articles/${idArticle}`
      );
      let timerInterval;
      Swal.fire({
        title: `${response.data.message}`,
        icon: "success",
        html: "Se cerrara en <b></b> milisegundos.",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          navigate("/welcome");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const verifyDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro?",
      text: "Este proceso no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) deleteArticle();
    });
  };
  const navigate = useNavigate();
  const initialForm = {
    title: false,
    description: false,
    img: false,
    users_id: true,
  };
  const { formState, title, description, img, users_id, onInputChange } =
    useForm(initialForm);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    for (let key in formState) {
      if (!formState[key]) {
        Swal.fire(
          "Debe rellenar todos los campos",
          "Porfavor, hagalo de nuevo",
          "warning"
        );
        return;
      }
    }
    if (formState.title.length < 5) {
      Swal.fire(
        "El Titulo es demasiado corto",
        "Porfavor, corrijalo",
        "warning"
      );
      initialForm.title = false;
    } else {
      initialForm.title = true;
    }

    if (formState.description.length < 10) {
      Swal.fire(
        "La descripcion es demasiado corta",
        "Porfavor, corrijala",
        "warning"
      );
      initialForm.description = false;
    } else {
      initialForm.description = true;
    }

    if (formState.img.length > 300) {
      Swal.fire(
        "La direccion es demasiado larga",
        "Porfavor, corrijala",
        "warning"
      );
      initialForm.img = false;
    } else {
      initialForm.img = true;
    }
    console.log(initialForm);
    if (Object.keys(initialForm).every((key) => initialForm[key] === true)) {
      try {
        const response = await axios.post(
          `http://localhost:3302/api/articles/${localStorage.getItem(
            "userId"
          )}`,
          formState
        );
        console.log(response);
        if (response.data.ok) {
          let timerInterval;
          Swal.fire({
            title: `${response.data.message}`,
            icon: "success",
            html: "Se cerrara en <b></b> milisegundos.",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {disabled ? (
        <>
          <form
            onSubmit={onSubmit}
            className="columns containerForm is-flex-wrap-wrap is-justify-content-center"
            autoComplete="off"
          >
            <div className="column is-8 field">
              <label className="label">Titulo</label>
              <div className="control">
                <input
                  value={titleArticle}
                  className="input"
                  type="text"
                  placeholder="Ej. Los tigresitos tragaban trigo"
                  name="title"
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="column is-5 field">
              <label className="label">Descripcion</label>
              <div className="control">
                <textarea
                  value={contentArticle}
                  className="textarea is-info"
                  type="text"
                  placeholder="Ej. El contenido de tu articulo"
                  name="description"
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="column is-8 field">
              <label className="label">URL de la imagen (temporal)</label>
              <div className="control">
                <input
                  value={imgArticle}
                  className="input"
                  type="text"
                  placeholder="URL de la imagen"
                  name="img"
                  onChange={onInputChange}
                />
                <input type="hidden" name="users_id" onChange={onInputChange} />
              </div>
            </div>
            <button
              className="button is-primary is-light is-large is-fullwidth"
              type="submit"
            >
              Guardar Cambios
            </button>
            <button
              className="button is-primary is-danger is-large is-fullwidth"
              type="submit"
              onClick={verifyDelete}
            >
              Eliminar
            </button>
          </form>
        </>
      ) : (
        <form
          onSubmit={onSubmit}
          className="columns containerForm is-flex-wrap-wrap is-justify-content-center"
          autoComplete="off"
        >
          <div className="column is-8 field">
            <label className="label">Titulo</label>
            <div className="control">
              <input
                disabled
                value={titleArticle}
                className="input"
                type="text"
                placeholder="Ej. Los tigresitos tragaban trigo"
                name="title"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="column is-5 field">
            <label className="label">Descripcion</label>
            <div className="control">
              <textarea
                disabled
                value={contentArticle}
                className="textarea is-info"
                type="text"
                placeholder="Ej. El contenido de tu articulo"
                name="description"
                onChange={onInputChange}
              />
            </div>
          </div>

          <img src={imgArticle} alt="" />
        </form>
      )}
    </>
  );
}
