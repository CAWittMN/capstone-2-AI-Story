import { CircleLoader } from "react-spinners";

const LoadingOverlay = () => {
  return (
    <div className="LoadingOverlay">
      <CircleLoader size={100} />
    </div>
  );
};

export default LoadingOverlay;
