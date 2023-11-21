import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import NewStoryForm from "./NewStoryForm";

const NewStoryFormPage = () => {
  const { handleCreateStory } = useContext(AppContext);

  return (
    <div className="NewStoryFormPage flex absolute h-full items-center justify-center align-center inset-0">
      <NewStoryForm onSubmit={handleCreateStory} />
    </div>
  );
};

export default NewStoryFormPage;
