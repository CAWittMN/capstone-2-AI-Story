const AudioComponent = ({ audioData }) => {
  return (
    <div className="">
      {sourceUrl && (
        <audio controls className="h-10 m-auto" src={audioData}></audio>
      )}
    </div>
  );
};

export default AudioComponent;
