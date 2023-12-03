import { Switch } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GenConfigs = ({ onChange, genImagesVal, genAudioVal }) => {
  return (
    <div className="GenConfig md:grid md:gap-3">
      <h1 className="text-white">Generation Configuration</h1>
      <Switch
        onChange={onChange}
        isSelected={genImagesVal}
        name="genImages"
        label="Generate Images"
        className="w-full"
        color="warning"
        startContent={<FontAwesomeIcon icon="fa-volume-high" />}
        endContent={<FontAwesomeIcon icon="fa-volume-xmark" />}
      >
        Generate Images
      </Switch>
      <Switch
        onChange={onChange}
        isSelected={genAudioVal}
        color="warning"
        name="genAudio"
        label="Generate Audio"
        className="w-full"
        startContent={<FontAwesomeIcon icon="fa-eye" />}
        endContent={<FontAwesomeIcon icon="fa-eye-slash" />}
      >
        Generate Speech
      </Switch>
      <p className="text-warning">*Enabling will increase load times</p>
    </div>
  );
};

export default GenConfigs;
