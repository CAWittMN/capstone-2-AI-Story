import {
  Card,
  Divider,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContinueStory = ({ username, story, onContinue }) => {
  return (
    <div>
      <Card
        isBlurred
        className="border-success select-none border border-opacity-70"
      >
        <CardHeader>
          <span>{story.title}</span>
        </CardHeader>
        <Divider />
        <CardBody>{story.title}</CardBody>
        <CardFooter>
          <div className="absolute bottom-0 left-0 m-2">
            <span>
              <FontAwesomeIcon icon="fa-book" />
              {story.completedChapters}/{story.maxChapters}
            </span>
          </div>
          <div className="absolute bottom-0 right-0 m-2">
            <span>
              <FontAwesomeIcon
                icon={story.genImages ? "fa-eye" : "fa-eye-slash"}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={story.genAudio ? "fa-volume-high" : "fa-volume-xmark"}
              />
            </span>
          </div>
          <span></span>
        </CardFooter>
      </Card>
      <div>
        <Button
          onClick={onContinue}
          variant="ghost"
          color="warning"
          className="backdrop-blur-sm text-white"
          isDisabled={story.completed}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ContinueStory;
