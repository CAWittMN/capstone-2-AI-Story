import { useRef } from "react";

const AudioComponent = ({ audioData }) => {
  const audioRef = useRef();
  const sourceUrl = audioData;

  return (
    <div className="">
      {sourceUrl && (
        <audio controls className="h-10 m-auto" src={sourceUrl}></audio>
      )}
    </div>
  );
};

export default AudioComponent;
