import { useState } from "react";

const NewStoryFormInput = ({ type, name, value, errors, setErrors }) => {
  const [inputValue, setInputValue] = useState(value);

  /**
   * handle change of an input.
   * if input is a checkbox, update state with checked value
   * if input is a text input, update state with value
   * if input is a radio button, update state with value
   *
   */
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "moods" || name === "genre") {
      const moodIdx = inputValue.indexOf(value);
      if (moodIdx !== -1) {
        const newInputValue =
          inputValue.slice(0, moodIdx) +
          inputValue.slice(moodIdx + value.length);
        setInputValue(newInputValue);
      } else {
        setInputValue(inputValue + value);
      }
    } else {
      setInputValue(
        name === "genImages" || name === "genAudio" ? checked : value
      );
    }
  };

  const inputs = [];

  return <div className="NewStoryFormInput">{inputs}</div>;
};

export default NewStoryFormInput;
