import { useState } from "react";
import { Checkbox } from "@nextui-org/react";

const moods = [
  "Happy",
  "Sad",
  "Silly",
  "Serious",
  "Scary",
  "Exciting",
  "Romantic",
  "Mysterious",
  "Action-packed",
  "Whimsical",
  "Humorous",
  "Dramatic",
  "Suspenseful",
  "Thrilling",
  "Mystical",
  "Ironic",
];

const MoodsInput = ({ onChange, values }) => {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (!values.includes(value)) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((val) => val !== value));
    }
  };

  const checkBoxes = moods.map((mood) => (
    <Checkbox
      key={mood}
      onChange={handleChange}
      value={mood}
      name="moods"
      label={mood}
      isSelected={values.includes(mood)}
      className="m-3"
    >
      {mood}
    </Checkbox>
  ));

  return <div className="MoodsInput">{checkBoxes}</div>;
};

export default MoodsInput;
