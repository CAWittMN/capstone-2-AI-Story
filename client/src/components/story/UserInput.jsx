import { useState, useRef } from "react";
import { Input } from "@nextui-org/react";
import { animated, useSpring } from "@react-spring/web";

const INITIAL_STATE = {
  userPrompt: "",
};

const UserInput = ({
  handleSubmit,
  isDisabled,
  userPrompt,
  isAlive,
  isComplete,
  charName,
}) => {
  const [inputData, setInputData] = useState(INITIAL_STATE);
  const userInput = useRef();
  const spring = useSpring({
    from: { x: 6000 },
    to: { x: 0 },
    delay: 1000,
  });

  return (
    <animated.div
      style={{ ...spring }}
      className="flex text-white w-[95%]  flex-col items-center"
    >
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
          placeholder={
            userPrompt
              ? userPrompt
              : !isAlive
              ? `${charName} has died. The end`
              : isComplete
              ? "The end."
              : `What does ${charName} do?`
          }
          value={inputData.userPrompt}
          variant="faded"
          onChange={(e) =>
            setInputData({ ...inputData, userPrompt: e.target.value })
          }
        />
      </form>
    </animated.div>
  );
};

export default UserInput;
