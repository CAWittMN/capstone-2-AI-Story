import { Button } from "@nextui-org/react";

const ErrorOverlay = ({ error, setError }) => {
  return (
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
      <div className="m-5 md:max-w-[50%]">
        {error && (
          <>
            <h1 className="text-2xl p-5 no-scrollbar overflow-scroll rounded-3xl border border-warning select-none text-white">
              {error}
            </h1>
            <Button
              variant="flat"
              color="warning"
              onClick={() => setError(null)}
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
