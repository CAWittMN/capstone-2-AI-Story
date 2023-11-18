import { Button } from "@nextui-org/react";

const ErrorOverlay = ({ error, setError }) => {
  return (
    <div>
      <div
        className="loading-overlay fixed top-0 left-0 flex justify-center items-center"
        style={{
          zIndex: 1001,
          width: "100vw",
          height: "100vh",
          opacity: error ? "1" : "0",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(3px)",

          transition: "all 0.5s ease",
          pointerEvents: error ? "all" : "none",
        }}
      >
        <div>
          {error && (
            <>
              <h1 className="text-2xl border border-warning select-none text-white">
                {error}
              </h1>
              <Button
                variant="flat"
                color="warning"
                onClick={() => setError(null)}
                className="mt-3"
              >
                Dismiss
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorOverlay;
