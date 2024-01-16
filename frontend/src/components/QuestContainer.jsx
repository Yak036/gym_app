import "../styles/containerQuest.css";
const QuestContainer = ({ formTitle, form }) => {
  return (
    <div className="container-quest">
      <h1 className="title">{formTitle}</h1>
      {form}
    </div>
  );
};

export default QuestContainer;
