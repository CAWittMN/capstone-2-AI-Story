import { Input } from "@nextui-org/react";

const SettingInput = ({ onChange, value }) => {
  return (
    <div className="SettingInput">
      <Input
        value={value}
        onChange={onChange}
        name="setting"
        label="Setting"
        className="w-full"
        classNames={{
          description: "text-white",
        }}
        description="Leave blank for a random setting. Examples: A spooky forest, London in the 1800s, etc."
      />
    </div>
  );
};

export default SettingInput;
