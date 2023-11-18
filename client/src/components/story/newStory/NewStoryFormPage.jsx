import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import NewStoryForm from "./NewStoryForm";

const NewStoryFormPage = () => {
  const { handleCreateStory } = useContext(AppContext);

  return (
    <div className="NewStoryFormPage">
      <NewStoryForm onSubmit={handleCreateStory} />
    </div>
  );
};

export default NewStoryFormPage;
