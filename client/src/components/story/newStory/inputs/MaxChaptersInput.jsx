import { RadioGroup } from "@nextui-org/react";
import MaxChapterRadio from "./MaxChapterRadio";

const MaxChaptersInput = ({ onChange, value }) => {
  return (
    <div className="MaxChaptersInput">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        name="maxChapters"
        label="How long would you like the story to be?"
        className="w-full justify-center flex flex-col items-center"
        classNames={{
          description: "text-white",
          label: "text-white",
        }}
        description="This will set the number of chapters in your story. Shorter: 10, Average: 20, Longer: 30"
      >
        <MaxChapterRadio value={10}>Shorter</MaxChapterRadio>
        <MaxChapterRadio value={20}>Average</MaxChapterRadio>
        <MaxChapterRadio value={30}>Longer</MaxChapterRadio>
      </RadioGroup>
    </div>
  );
};

export default MaxChaptersInput;
