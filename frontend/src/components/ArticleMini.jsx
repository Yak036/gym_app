import { useEffect, useState } from "react";

import axios from "axios";
import EditArticleForm from "./EditArticleForm";

export default function ArticleMini({
  title,
  description,
  img,
  id,
  userName,
  disabled = true,
}) {
  const [modal, setModal] = useState(false);
  const [articles, setArticles] = useState([]);

  const handleClick = (id) => {
    setModal(true);
    console.log(id);
    console.log(articles[id].title);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(`http://localhost:3302/api/articles/18`);
      setArticles(response.data.body);
      console.log(response);
    };
    fetchArticles();
  }, [modal]);
  return (
    <>
      <div
        className="column miniArticle is-2 field"
        onClick={() => {
          handleClick(id);
        }}
      >
        <div className="port is-align-content-center">
          <img src={img} alt="" />
        </div>
        <p className="has-text-centered title">{title}</p>
        <p className="description">{description}</p>
      </div>
      {/* //? ventana modal */}
      <div className={modal ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <p>{userName}</p>
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModal(false)}
            ></button>
          </header>
          <section className="modal-card-body">
            <EditArticleForm
              titleArticle={title}
              contentArticle={description}
              imgArticle={img}
              idArticle={id}
              disabled={disabled}
            />
          </section>
        </div>
      </div>
    </>
  );
}
