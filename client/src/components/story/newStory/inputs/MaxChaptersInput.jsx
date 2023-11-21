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
        <MaxChapterRadio value={10}>Shorter</MaxChapterRadio>
        <MaxChapterRadio value={20}>Average</MaxChapterRadio>
        <MaxChapterRadio value={30}>Longer</MaxChapterRadio>
      </RadioGroup>
    </div>
  );
};

export default MaxChaptersInput;
