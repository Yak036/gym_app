import NavBar from "../components/navBar";
import ArticleMini from "../components/ArticleMini";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ArticleApp() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(`http://localhost:3302/api/articles`);
      console.log(response.data.body);
      setArticles(response.data.body);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <NavBar />
      <div className="mini-article-container columns containerForm is-flex-wrap-wrap is-justify-content-center">
        {articles.map((article, index) => (
          <ArticleMini
            id={article.id}
            key={index}
            userName={article.user.name + " " + article.user.surName}
            title={article.title}
            description={article.description}
            img={article.img}
            disabled={false}
          />
        ))}
      </div>
    </>
  );
}
