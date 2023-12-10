import StoryCard from "./StoryCard";
import { ScrollShadow } from "@nextui-org/react";

const StoryList = ({ selectedStory, stories, select }) => {
  const storyCards = stories.map((story) => {
    return (
      <div className="snap-center" key={story.id}>
        <StoryCard
          isSelected={story === selectedStory}
          story={story}
          onClick={() => select(story)}
        />
      </div>
    );
  });

  return (
    <div className="flex md:h-[92vh] w-full flex-col">
      <h1 className="text-center md:mt-3 top-0 inset-x-0 fixed text-success border border-warning border-opacity-10 shadow-xl rounded-b-full backdrop-blur-sm">
        Your Stories
      </h1>
      {storyCards.length ? (
        <div className="flex mt-6 flex-row snap-x md:flex-col overflow-x-scroll md:no-scrollbar overflow-y-scroll">
          {storyCards}
        </div>
      ) : (
        <div className="flex md:p-0 p-10 md:h-full md:mt-3 justify-center items-center">
          <h1 className="text-2xl text-white m-auto">No stories yet!</h1>
        </div>
      )}
    </div>
  );
};

export default StoryList;
