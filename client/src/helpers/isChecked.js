const isChecked = (name, value, inputValue) => {
  if (name === "moods") {
    return inputValue.includes(value);
  } else if (name === "genre" || name === "maxChapters") {
    return inputValue === value;
  }
};

export default isChecked;
