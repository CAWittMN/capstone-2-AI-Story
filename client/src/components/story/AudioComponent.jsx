import { useRef } from "react";

const AudioComponent = ({ audioData }) => {
  const audioRef = useRef();
  const sourceUrl = audioData;

  return (
    <div className="ml-5">
      {sourceUrl && <audio controls src={sourceUrl}></audio>}
    </div>
  );
};

export default AudioComponent;
