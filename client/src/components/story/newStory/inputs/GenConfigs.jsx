import { Switch } from "@nextui-org/react";

const GenConfigs = ({ onChange, genImagesVal, genAudioVal }) => {
  return (
    <div className="GenConfigs">
      <Switch
        onChange={onChange}
        isSelected={genImagesVal}
        name="genImages"
        label="Generate Images"
        className="w-full"
      >
        Generate Images
      </Switch>
      <Switch
        onChange={onChange}
        isSelected={genAudioVal}
        name="genAudio"
        label="Generate Audio"
        className="w-full"
      >
        Generate Speech
      </Switch>
    </div>
  );
};

export default GenConfigs;
