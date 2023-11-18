import StoryCard from "./StoryCard";

const StoryList = ({ selectedStory, stories, select }) => {
  const storyCards = stories.map((story) => {
    return (
      <StoryCard
        isSelected={story === selectedStory}
        key={story.id}
        story={story}
        onClick={() => select(story)}
      />
    );
  });

  const emptyStoryList = (
    <div>
      <h1 className="text-2xl">No stories yet!</h1>
    </div>
  );

  return (
    <div>
      <h1>Your Stories</h1>
      {storyCards.length ? storyCards : emptyStoryList}
    </div>
  );
};

export default StoryList;
