import { useState, useRef } from "react";
import { Input } from "@nextui-org/react";

const INITIAL_STATE = {
  userPrompt: "",
};

const UserInput = ({
  handleSubmit,
  isDisabled,
  userPrompt,
  isAlive,
  isComplete,
}) => {
  const [inputData, setInputData] = useState(INITIAL_STATE);
  const userInput = useRef();

  return (
    <div className="flex text-white w-[95%]  flex-col items-center">
      <form
        className={
          "w-full" +
          (isDisabled || isComplete
            ? " opacity-75 pointer-events-none"
            : " visible")
        }
        onSubmit={(e) => {
          e.preventDefault();
          if (isDisabled) return;
          userInput.current.blur();
          handleSubmit(inputData);
          setInputData(INITIAL_STATE);
        }}
      >
        <Input
          ref={userInput}
          name="userPrompt"
          classNames={{
            input: "text-center",
          }}
          disabled={isDisabled}
          placeholder={() => {
            if (isAlive && !userPrompt && !isComplete) {
              ("What happens next?");
            } else if (!isAlive) {
              ("The character has died.");
            } else if (isComplete) {
              ("The story is complete.");
            } else {
              userPrompt;
            }
          }}
          value={userPrompt ? userPrompt : inputData.userPrompt}
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
