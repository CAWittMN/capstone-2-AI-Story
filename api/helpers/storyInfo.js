/**
 * helper function to get character gender and age description based off users age and gender
 */
const getCharacterInfo = (age, gender) => {
  let characterGender = "";
  if (age < 13) {
    characterGender + "young";
    gender == "male"
      ? (characterGender += " boy")
      : (characterGender += " girl");
  } else if (age < 18) {
    characterGender += "teenage";
    gender == "male"
      ? (characterGender += " boy")
      : (characterGender += " girl");
  } else if (age < 27) {
    characterGender += "young adult";
    gender == "male"
      ? (characterGender += " man")
      : (characterGender += " woman");
  } else if (age < 60) {
    gender == "male"
      ? (characterGender += "man")
      : (characterGender += "woman");
  } else {
    characterGender += "elderly";
    gender == "male"
      ? (characterGender += " man")
      : (characterGender += " woman");
  }
  return characterGender;
};

/**
 * helper function to get demographic based on age
 */
const getDemographic = (age) => {
  if (age < 6) {
    return "toddlers";
  } else if (age < 13) {
    return "children";
  } else if (age < 18) {
    return "young adults";
  } else {
    return "adults";
  }
};

module.exports = { getCharacterInfo, getDemographic };
