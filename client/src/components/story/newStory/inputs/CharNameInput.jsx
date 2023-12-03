import { Input } from "@nextui-org/react";

const CharNameInput = ({ onChange, value }) => {
  return (
    <div className="GenreInput">
      <Input
        value={value}
        onChange={onChange}
        name="charName"
        label="Character Name"
        isRequired
        className="w-full"
        classNames={{
          description: "text-white",
        }}
        description="This will set the name of the main character. Examples: John, Jane, etc."
      />
    </div>
  );
};

export default CharNameInput;
