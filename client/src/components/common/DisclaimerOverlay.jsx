import { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { useSpring, animated } from "@react-spring/web";

/**
 * ElevenLabsApiNoticeOverlay component
 * Overlay that displays a disclaimer about the limited use of the audio generation
 */
const DisclaimerOverlay = ({ firstOpen }) => {
  const [display, setDisplay] = useState(firstOpen);
  const springs = useSpring({
    from: { opacity: 0, pointerEvents: "none" },
    to: {
      opacity: display ? 1 : 0,
      pointerEvents: display ? "all" : "none",
    },
    delay: firstOpen && display ? 8000 : 0,
    config: { duration: 100 },
  });

  return (
    <animated.div
      className="loading-overlay fixed top-0 left-0 flex justify-center items-center"
      style={{
        zIndex: 1020,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(3px)",
        transition: "all 0.5s ease",
        ...springs,
      }}
    >
      <div className="m-5 md:max-w-[50%]">
        <h1 className="text-2xl p-5 no-scrollbar overflow-scroll rounded-3xl border border-warning select-none text-white">
          Hello! Thanks for using StoryGen. This project uses Elevenlabs for
          voice generation and, as this is a passion project, the monthly token
          limits for the api may be reached easily before it refreshes each
          month. If you are trying to generate a story with audio, and it fails,
          try generating one without audio or try again at the beginning of the
          next month. Thank you for your understanding and for using my app!
          <p>
            <Link
              className="m-auto"
              href="https://github.com/CAWittMN/capstone-2-AI-Story"
              underline="hover"
            >
              GitHub
            </Link>
          </p>
        </h1>
        <Button
          variant="flat"
          color="warning"
          onClick={() => setDisplay(false)}
          className="mt-3 w-full"
        >
          Dismiss
        </Button>
      </div>
    </animated.div>
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
