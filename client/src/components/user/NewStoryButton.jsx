import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewStoryButton = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center md:w-[30rem] w-[50vw]">
      <Button
        onClick={() => navigate(`/stories/new`)}
        variant="flat"
        color="warning"
        className="backdrop-blur-sm backdrop-brightness-[70%] text-2xl h-20 w-full text-white border border-warning border-opacity-20"
      >
        <FontAwesomeIcon icon="fa-book-medical" />
        New Story
      </Button>
    </div>
  );
};

export default NewStoryButton;
