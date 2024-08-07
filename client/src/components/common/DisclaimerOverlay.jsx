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
          Hello! Thanks for using StoryGen. Because of recent increased usage
          &#40;almost 200 users! Wow!&#41; and this being a passion project, the
          monthly limits for my OpenAI and Elevenlabs APIs are reached very
          quickly. I will continue to work on increasing limits and creating a
          sample page for anyone &#40;especially recruiters&#41; to view in case
          limits are reached and a story can not be generated. This app is also
          hosted on a free render account so initial load times may be longer
          than expected. Thank you for your understanding!
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
/**
 *  Hello! Thanks for using StoryGen. Because of recent increased usage
          --almost 200 users! Wow!--, and this being a passion project, the
          limit for my OpenAI and Elevenlabs APIs are reached very quickly. I
          will continue to work on increasing limits and creating a sample page
          for anyone --especially recruiters-- to view when limits are reached.
          This app is also hosted on a free render account so initial load times
          may be longer than expected. Thank you for your understanding!
 */
export default DisclaimerOverlay;
