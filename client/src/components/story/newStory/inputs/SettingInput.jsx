import { Input } from "@nextui-org/react";

const SettingInput = ({ onChange, value }) => {
  return (
    <div className="SettingInput">
      <Input
        value={value}
        onChange={onChange}
        name="setting"
        label="Setting"
        placeholder="Where does the story take place?"
        className="w-full"
        description="Leave blank for a random setting. Examples: A spooky forest, London in the 1800s, etc."
      />
    </div>
  );
};

export default SettingInput;
