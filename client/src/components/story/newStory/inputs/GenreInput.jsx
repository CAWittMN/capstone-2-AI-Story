import { Input } from "@nextui-org/react";

const GenreInput = ({ onChange, value }) => {
  return (
    <div className="GenreInput">
      <Input
        value={value}
        onChange={onChange}
        name="genre"
        label="Genre"
        placeholder="What is your favorite genre?"
        isRequired
        className="w-full"
      />
    </div>
  );
};

export default GenreInput;
