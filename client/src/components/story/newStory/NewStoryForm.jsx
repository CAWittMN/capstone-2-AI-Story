import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useTransition, animated } from "@react-spring/web";
import MaxChaptersInput from "./inputs/MaxChaptersInput";
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
  const transitions = useTransition(inputIdx, {
    config: { duration: 250 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },

    exitBeforeEnter: true,
  });

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
    // <AdditionalPromptInput onChange={handleChange} />,
  ];

  return (
    <>
      {transitions((style, i) => (
        <animated.div
          style={{ ...style }}
          className="NewStoryForm flex justify-center w-full mx-3 md:w-[50vw] border p-4 rounded-3xl backdrop-blur-lg backdrop-brightness-50"
        >
          <form onSubmit={handleSubmitInput} className="w-3/4">
            {inputs[i]}
            <div className="flex flex-row justify-between">
              <Button
                variant="ghost"
                type="button"
                color="secondary"
                isDisabled={i === 0}
                onClick={() => setInputIdx((idx) => idx - 1)}
              >
                Back
              </Button>
              <Button type="submit" variant="ghost" color="warning">
                {i === inputs.length - 1 ? "Generate!" : "Next"}
              </Button>
            </div>
          </form>
        </animated.div>
      ))}
    </>
  );
};

export default NewStoryForm;
