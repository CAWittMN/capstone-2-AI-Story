import { useState } from "react";
import MaxChaptersInput from "./inputs/MaxChaptersInput";
import AdditionalPromptInput from "./inputs/AdditionalPromptInput";
import CharNameInput from "./inputs/CharNameInput";
import GenreInput from "./inputs/GenreInput";
import MoodsInput from "./inputs/MoodsInput";
import SettingInput from "./inputs/SettingInput";
import GenImagesInput from "./inputs/GenImagesInput";
import GenAudioInput from "./inputs/GenAudioInput";

const INITIAL_STATE = {
  charName: "",
  moods: [],
  genre: "",
  setting: "",
  maxChapters: "",
  genImages: false,
  genAudio: false,
  additionalPrompt: "",
};

const NewStoryForm = ({ onSubmit, setErrors, errors }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [inputIdx, setInputIdx] = useState(0);

  const inputs = [
    <GenreInput />,
    <MoodsInput />,
    <SettingInput />,
    <CharNameInput />,
    <MaxChaptersInput />,
    <GenImagesInput />,
    <GenAudioInput />,
    <AdditionalPromptInput />,
  ];

  const handleSubmitInput = (e) => {
    e.preventDefault();
    const { name, value, checked } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === "genImages" || name === "genAudio" ? checked : value,
    }));

    if (inputIdx === inputs - 1) {
      onSubmit(formData);
    } else {
      setInputIdx((idx) => idx + 1);
    }
  };

  return (
    <div className="NewStoryForm">
      <h1>New Story</h1>
      <form onSubmit={handleSubmitInput}>
        {inputs[inputIdx]}
        <button type="submit">
          {inputIdx === inputs.length - 1 ? "Generate!" : "Next"}
        </button>
      </form>
    </div>
  );
};

export default NewStoryForm;
