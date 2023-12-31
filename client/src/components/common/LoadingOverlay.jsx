import { CircleLoader } from "react-spinners";

/**
 * LoadingOverlay component
 * Overlay that displays when loading
 */
const LoadingOverlay = ({ isLoading }) => {
  return (
    <div
      className="loading-overlay fixed top-0 left-0 flex justify-center items-center"
      style={{
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        opacity: isLoading ? "1" : "0",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(3px)",
        filter: "blur(2px)",
        transition: "all 0.5s ease",
        pointerEvents: isLoading ? "all" : "none",
      }}
    >
      {isLoading && (
        <CircleLoader color="#fff" size="100px" speedMultiplier="1.5" />
      )}
    </div>
  );
};

export default LoadingOverlay;
