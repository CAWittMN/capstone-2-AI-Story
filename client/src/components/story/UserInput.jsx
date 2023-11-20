import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const INITIAL_STATE = {
  userPrompt: "",
};

const UserInput = ({ handleSubmit }) => {
  const [inputData, setInputData] = useState(INITIAL_STATE);
  return (
    <div className="flex  flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputData);
          setInputData(INITIAL_STATE);
        }}
      >
        <Input
          className="w-full"
          placeholder="What happens next?"
          value={inputData.userPrompt}
          variant="faded"
          onChange={(e) =>
            setInputData({ ...inputData, userPrompt: e.target.value })
          }
        />
      </form>
    </div>
  );
};

export default UserInput;
