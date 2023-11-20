import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const StoryCard = ({ onClick, story, isSelected }) => {
  return (
    <div onClick={onClick} className="m-5 bg-black rounded-3xl bg-opacity-20">
      <Card
        className={
          isSelected
            ? "border-success border border-opacity-70 select-none"
            : "select-none border border-success border-opacity-10"
        }
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
