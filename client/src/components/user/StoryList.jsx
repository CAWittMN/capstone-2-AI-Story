import StoryCard from "./StoryCard";
import { Divider } from "@nextui-org/react";

const StoryList = ({ selectedStory, stories, select }) => {
  const storyCards = stories.map((story) => {
    return (
      <div key={story.id}>
        <StoryCard
          isSelected={story === selectedStory}
          story={story}
          onClick={() => select(story)}
        />
        <Divider />
      </div>
    );
  });

  const emptyStoryList = (
    <div>
      <h1 className="text-2xl">No stories yet!</h1>
    </div>
  );

  return (
    <div className="pt-5">
      <h1 className="text-center absolute top-0 inset-x-0 text-success border border-warning border-opacity-10 shadow-xl rounded-b-full backdrop-blur-sm">
        Your Stories
      </h1>
      {storyCards.length ? storyCards : emptyStoryList}
    </div>
  );
};

export default StoryList;
