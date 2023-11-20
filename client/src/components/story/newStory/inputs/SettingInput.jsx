import { Input } from "@nextui-org/react";

const SettingInput = ({ onChange, value }) => {
  return (
    <div className="SettingInput">
      <Input
        value={value}
        onChange={onChange}
        name="setting"
        label="Setting"
        placeholder="Where does the story take place? Leave blank if want to generate a random setting."
        className="w-full"
      />
    </div>
  );
};

export default SettingInput;
