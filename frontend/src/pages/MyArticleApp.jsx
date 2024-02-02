import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import axios from "axios";
import ArticleMini from "../components/ArticleMini";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ModalArticle from "../components/ModalArticle";
import "../styles/articleMini.css";

export default function MyArticleApp() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `http://localhost:3302/api/articles/${localStorage.getItem("userId")}`
      );
      console.log(response.data.body);
      setArticles(response.data.body);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <NavBar />
      <button
        className="createArticle button is-primary is-light"
        onClick={() => {
          navigate("createArticle");
        }}
      >
        Crear Nuevo Articulo
      </button>
      <div className="mini-article-container columns containerForm is-flex-wrap-wrap is-justify-content-center">
        {articles.map((article, index) => (
          <ArticleMini
            id={index}
            key={index}
            title={article.title}
            description={article.description}
            img={article.img}
          />
        ))}
      </div>
    </>
  );
}
