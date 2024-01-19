import "../styles/error404.css";
export default function Error404() {
  return (
    <>
      <div className="contain">
        <div className="left">
          <h1 className="error">Error 404:</h1>
          <p className="text">
            El sitio al que intenta acceder no existe o no tiene acceso.
          </p>
        </div>
      </div>
    </>
  );
}
