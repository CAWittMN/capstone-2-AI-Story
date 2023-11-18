import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

const ContinueButton = ({ storyId }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      color="primary"
      className="text-white rounded-xl p-2 backdrop-blur-sm mt-2"
      onClick={() => {
        navigate(`/stories/${storyId}/${story.completedChapters}`);
      }}
    >
      Continue...
    </Button>
  );
};

export default ContinueButton;
