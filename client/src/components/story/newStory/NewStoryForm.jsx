import { useState } from "react";
import { Button } from "@nextui-org/react";
import MaxChaptersInput from "./inputs/MaxChaptersInput";
import AdditionalPromptInput from "./inputs/AdditionalPromptInput";
import CharNameInput from "./inputs/CharNameInput";
import GenreInput from "./inputs/GenreInput";
import MoodsInput from "./inputs/MoodsInput";
import SettingInput from "./inputs/SettingInput";
import GenConfigs from "./inputs/GenConfigs";

const INITIAL_STATE = {
  charName: "",
  moods: [],
  genre: "",
  setting: "",
  maxChapters: 0,
  genImages: false,
  genAudio: false,
  additionalPrompt: "",
};

const NewStoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [inputIdx, setInputIdx] = useState(0);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((fData) => ({
      ...fData,
      [name]: name === "genImages" || name === "genAudio" ? checked : value,
    }));
  };

  const handleCheckboxChange = (selected) => {
    setFormData((fData) => ({
      ...fData,
      moods: selected,
    }));
  };

  const handleRadioChange = (selected) => {
    setFormData((fData) => ({
      ...fData,
      maxChapters: selected,
    }));
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    if (inputIdx === inputs.length - 1) {
      onSubmit(formData);
    } else {
      setInputIdx((idx) => idx + 1);
    }
  };

  const inputs = [
    <GenreInput onChange={handleChange} value={formData.genre} />,
    <MoodsInput onChange={handleCheckboxChange} values={formData.moods} />,
    <SettingInput onChange={handleChange} value={formData.setting} />,
    <CharNameInput onChange={handleChange} value={formData.charName} />,
    <MaxChaptersInput
      onChange={handleRadioChange}
      value={formData.maxChapters}
    />,
    <GenConfigs
      onChange={handleChange}
      genAudioVal={formData.genAudio}
      genImagesVal={formData.genImages}
    />,
    // <GenImagesInput onChange={handleChange} value={formData.genImages} />,
    // <GenAudioInput onChange={handleChange} value={formData.genAudio} />,
    // <AdditionalPromptInput onChange={handleChange} />,
  ];

  return (
    <div className="NewStoryForm">
      <h1>New Story</h1>
      <form onSubmit={handleSubmitInput}>
        {inputs[inputIdx]}
        <Button
          variant="ghost"
          type="button"
          color="danger"
          isDisabled={inputIdx === 0}
          onClick={() => setInputIdx((idx) => idx - 1)}
        >
          Back
        </Button>
        <Button type="submit" variant="ghost" color="warning">
          {inputIdx === inputs.length - 1 ? "Generate!" : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default NewStoryForm;
