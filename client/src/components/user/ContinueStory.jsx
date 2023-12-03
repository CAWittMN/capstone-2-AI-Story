import {
  Card,
  Divider,
  CardBody,
  CardHeader,
  CardFooter,
  ScrollShadow,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContinueStory = ({ story, onContinue }) => {
  return (
    <div className="md:w-[75%] m-auto">
      <Card
        isBlurred
        className="border-success w-full select-none border border-opacity-70 backdrop-brightness-[60%]"
      >
        <CardHeader className="flex flex-row justify-between">
          <span>{story.title}</span>
          <span className="flex flex-row border border-primary backdrop-brightness-90 px-3 py-1 rounded-xl ">
            <FontAwesomeIcon icon="person-walking" />
            {story.charName}
          </span>
        </CardHeader>
        <Divider />
        <CardBody className="h-[12rem] overflow-scroll ">
          <ScrollShadow>
            <div>
              <h1>Genre: {story.genre}</h1>
              <h1>Setting: {story.setting}</h1>
            </div>
            <Divider />
            <div>Summary: {story.currSummary}</div>
          </ScrollShadow>
        </CardBody>
        <CardFooter className="flex flex-row justify-between">
          <div className="">
            <span>
              <FontAwesomeIcon icon="fa-book" className="mx-1" />
              {story.completedChapters}/{story.maxChapters}
            </span>
          </div>
          <div>
            <span>
              {story.charAlive === false && (
                <FontAwesomeIcon icon="fa-skull-crossbones" />
              )}
            </span>
            <span>
              {story.completed && <FontAwesomeIcon icon="fa-check-circle" />}
            </span>
          </div>
          <div className="flex w-[80%] md:w-[90%] space-x-3 border border-warning rounded-xl px-3 border-opacity-30 justify-end">
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
          className="backdrop-blur-sm backdrop-brightness-75 w-full text-white"
          isDisabled={story.completed}
        >
          {story.completed ? "Review" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default ContinueStory;
