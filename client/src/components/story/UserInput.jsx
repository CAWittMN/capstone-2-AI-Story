import { useState } from "react";
import { Input } from "@nextui-org/react";
const INITIAL_STATE = {
  userPrompt: "",
};

const UserInput = ({ handleSubmit, isDisabled, userPrompt }) => {
  const [inputData, setInputData] = useState(INITIAL_STATE);
  return (
    <div className="flex text-white w-[95%]  flex-col items-center">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputData);
          setInputData(INITIAL_STATE);
        }}
      >
        <Input
          name="userPrompt"
          classNames={{
            input: "text-center",
          }}
          disabled={isDisabled}
          placeholder="What happens next?"
          // disabled={userPrompt ? true : false}
          // value={userPrompt ? userPrompt : inputData.userPrompt}
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
