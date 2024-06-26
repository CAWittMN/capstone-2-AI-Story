import { Tabs, Tab } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChapterSelect = ({
  numChapters,
  currChapterNum,
  handleChooseChapter,
  completedChapters,
}) => {
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
    <div className="container h-[3.75rem] no-scrollbar overflow-x-scroll fixed bottom-0 ">
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
    </div>
  );
};

export default ChapterSelect;
