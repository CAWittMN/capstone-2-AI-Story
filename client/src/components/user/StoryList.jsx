import StoryCard from "./StoryCard";
import { useSpring, animated, easings } from "@react-spring/web";

const StoryList = ({ selectedStory, stories, select, firstOpen }) => {
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: firstOpen ? 3000 : 2000, easing: easings.easeInBack },
    delay: firstOpen ? 11000 : 1000,
  });

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
    <animated.div
      style={{ ...springs }}
      className="backdrop-brightness-75 backdrop-blur-sm w-screen md:w-1/4"
    >
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
    </animated.div>
  );
};

export default StoryList;
