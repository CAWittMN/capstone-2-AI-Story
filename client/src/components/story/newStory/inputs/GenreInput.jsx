import { Input } from "@nextui-org/react";

const GenreInput = ({ onChange, value }) => {
  return (
    <div className="GenreInput">
      <Input
        value={value}
        onChange={onChange}
        name="genre"
        label="Genre"
        isRequired
        className="w-full"
        description="This will set the genre of your story. Examples: Fantasy, Sci-Fi, Romance, etc."
      />
    </div>
  );
};

export default GenreInput;
