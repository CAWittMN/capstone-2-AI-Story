import StoryCard from "./StoryCard";

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

  const emptyStoryList = (
    <div className="text-white">
      <h1 className="text-2xl m-auto">No stories yet!</h1>
    </div>
  );

  return (
    <div className="flex md:h-[92vh] flex-col">
      <h1 className="text-center md:mt-3 top-0 inset-x-0 fixed text-success border border-warning border-opacity-10 shadow-xl rounded-b-full backdrop-blur-sm">
        Your Stories
      </h1>
      {storyCards.length ? (
        <div className="flex flex-row snap-x md:flex-col overflow-y-scroll overflow-x-scroll">
          {storyCards}
        </div>
      ) : (
        <div className="flex h-[7rem] md:mt-3 justify-center items-center">
          {emptyStoryList}
        </div>
      )}
    </div>
  );
};

export default StoryList;
