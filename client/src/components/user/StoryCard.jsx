import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const StoryCard = ({ onClick, story, isSelected }) => {
  return (
    <div onClick={onClick} className="m-5  bg-black rounded-3xl bg-opacity-20">
      <Card
        className={
          "h-[180px] w-[130px] md:w-full md:h-full border" +
          (isSelected
            ? " border-success border-opacity-70"
            : " border-success border-opacity-10")
        }
        isHoverable
      >
        <CardHeader>
          <span>{story.title}</span>
        </CardHeader>
        <CardBody></CardBody>
        <CardFooter>
          {story.completedChapters}/{story.maxChapters}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoryCard;
