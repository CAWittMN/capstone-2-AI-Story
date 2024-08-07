import { Checkbox } from "@nextui-org/react";

const moods = [
  "Action-packed",
  "Dark",
  "Dramatic",
  "Epic",
  "Exciting",
  "Fantastical",
  "Funny",
  "Gritty",
  "Happy",
  "Historical",
  "Horror",
  "Humorous",
  "Ironic",
  "Light-hearted",
  "Mystical",
  "Mysterious",
  "Realistic",
  "Romantic",
  "Sad",
  "Scary",
  "Serious",
  "Silly",
  "Suspenseful",
  "Thrilling",
  "Whimsical",
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
      className="my-1 md:m-3 border-2 border-warning border-opacity-30 rounded-xl"
    >
      {mood}
    </Checkbox>
  ));

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap items-center h-[75vh] overflow-y-scroll">
      {checkBoxes}
    </div>
  );
};

export default MoodsInput;
