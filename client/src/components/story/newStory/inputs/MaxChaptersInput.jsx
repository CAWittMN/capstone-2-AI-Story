import { useState } from "react";
import { RadioGroup } from "@nextui-org/react";
import MaxChapterRadio from "./MaxChapterRadio";

const MaxChaptersInput = ({ onChange, value }) => {
  return (
    <div className="MaxChaptersInput">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        name="maxChapters"
        label="How many chapters would you like to generate?"
        className="w-full"
      >
        <MaxChapterRadio value={10} />
        <MaxChapterRadio value={20} />
        <MaxChapterRadio value={30} />
      </RadioGroup>
    </div>
  );
};

export default MaxChaptersInput;
