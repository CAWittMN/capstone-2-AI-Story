import { Tabs, Tab } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated, easings } from "@react-spring/web";

const ChapterSelect = ({
  numChapters,
  currChapterNum,
  handleChooseChapter,
  completedChapters,
}) => {
  let x;
  let dur;
  if (numChapters === 10) {
    x = -1950;
    dur = 1000;
  } else if (numChapters === 20) {
    x = -2500;
    dur = 1500;
  } else {
    x = -3000;
    dur = 2000;
  }
  const springs = useSpring({
    from: { x: x, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: 750,
    config: { duration: dur, easing: easings.easeOutCubic },
  });
  const tabs = [];
  for (let i = 1; i <= numChapters; i++) {
    tabs.push(
      <Tab
        key={i}
        value={i}
        title={
          <div className="flex flex-col items-center">
            {i <= completedChapters ? (
              <FontAwesomeIcon icon="fa-check" />
            ) : (
              <FontAwesomeIcon icon="fa-lock" />
            )}
            <span>{i}</span>
          </div>
        }
      />
    );
  }

  // Array of keys for disabled tabs
  const disabledKeys = [];
  for (let i = completedChapters + 1; i <= numChapters; i++) {
    disabledKeys.push(i.toString());
  }

  return (
    <animated.div
      style={{ ...springs }}
      className="container h-[3.75rem] no-scrollbar overflow-x-scroll fixed bottom-0 "
    >
      <Tabs
        className="backdrop-blur-lg border-t  border-warning border-opacity-50 shadow-xl rounded-t-full px-5"
        selectedKey={currChapterNum.toString()}
        disabledKeys={disabledKeys}
        onSelectionChange={(val) => {
          handleChooseChapter(parseInt(val));
        }}
        size="large"
        color="warning"
        variant="underlined"
        items={tabs}
      >
        {tabs}
      </Tabs>
    </animated.div>
  );
};

export default ChapterSelect;
