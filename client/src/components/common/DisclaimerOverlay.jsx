import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

/**
 * ElevenLabsApiNoticeOverlay component
 * Overlay that displays a disclaimer about the limited use of the audio generation
 */
const DisclaimerOverlay = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsDismissed(false);
  }, []);

  return (
    <div
      className="loading-overlay fixed top-0 left-0 flex justify-center items-center"
      style={{
        zIndex: 1020,
        width: "100vw",
        height: "100vh",
        opacity: !isDismissed ? "1" : "0",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(3px)",

        transition: "all 0.5s ease",
        pointerEvents: !isDismissed ? "all" : "none",
      }}
    >
      <div className="m-5 md:max-w-[50%]">
        <h1 className="text-2xl p-5 no-scrollbar overflow-scroll rounded-3xl border border-warning select-none text-white">
          Hello! This app is hosted on a free Render server, which may be slow
          to load initially. Also, the audio generation feature uses the Eleven
          Labs API and has a limited number of uses per month for the server. If
          the audio generation fails, try again some other time or create a new
          story with the audio generation feature turned off. Thank you for your
          understanding! Happy story generating!
        </h1>
        <Button
          variant="flat"
          color="warning"
          onClick={() => setIsDismissed(true)}
          className="mt-3 w-full"
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default DisclaimerOverlay;
