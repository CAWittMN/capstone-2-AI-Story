import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const StoryCard = ({ onClick, story, isSelected }) => {
  return (
    <div onClick={onClick}>
      <Card
        className={
          isSelected
            ? "border-success border border-opacity-70 select-none"
            : "select-none border border-success border-opacity-10"
        }
        isBlurred
        isHoverable
      >
        <CardHeader>
          <span>{story.title}</span>
        </CardHeader>
        <CardBody>{story.description}</CardBody>
        <CardFooter>
          {story.completedChapters}/{story.maxChapters} chapters completed.
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoryCard;
