import { Input } from "@nextui-org/react";

const CharNameInput = ({ onChange, value }) => {
  return (
    <div className="GenreInput">
      <Input
        value={value}
        onChange={onChange}
        name="charName"
        label="Character Name"
        placeholder="Enter a name for the main character"
        isRequired
        className="w-full"
        description="This will set the name of the main character. Examples: John, Jane, etc."
      />
    </div>
  );
};

export default CharNameInput;
