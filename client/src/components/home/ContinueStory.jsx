import {
  Card,
  Divider,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContinueStory = ({ story }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Card isBlurred className="border-success border border-opacity-70">
        <CardHeader>
          <span>{story.title}</span>
        </CardHeader>
        <Divider />
        <CardBody>{story.title}</CardBody>
        <CardFooter>
          {story.completedChapters}/{story.maxChapters} chapters completed.
        </CardFooter>
      </Card>
      <div>
        <Button
          onClick={() =>
            navigate(`/stories/${story.id}/${story.completedChapters}`)
          }
          variant="ghost"
          color="warning"
          isDisabled={story.completed}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ContinueStory;
