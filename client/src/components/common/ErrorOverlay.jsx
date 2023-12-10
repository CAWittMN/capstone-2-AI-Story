import { Button } from "@nextui-org/react";

/**
 * ErrorOverlay component
 * Overlay that displays when there are errors
 */
const ErrorOverlay = ({ errors, setErrors }) => {
  return (
    <div
      className="loading-overlay fixed top-0 left-0 flex justify-center items-center"
      style={{
        zIndex: 1001,
        width: "100vw",
        height: "100vh",
        opacity: errors.length > 0 ? "1" : "0",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(3px)",

        transition: "all 0.5s ease",
        pointerEvents: errors.length > 0 ? "all" : "none",
      }}
    >
      <div className="m-5 md:max-w-[50%]">
        {errors.length > 0 && (
          <>
            <h1 className="text-2xl p-5 no-scrollbar overflow-scroll rounded-3xl border border-warning select-none text-white">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </h1>
            <Button
              variant="flat"
              color="warning"
              onClick={() => setErrors([])}
              className="mt-3 w-full"
            >
              Dismiss
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ErrorOverlay;
