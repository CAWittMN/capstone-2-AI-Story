import { useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import book from "../../images/book.png";
import room from "../../images/room.png";
import blackHole from "../../images/black-hole.png";

/**
 * Background component
 * renders background images based on current page
 * by changing opacity
 */
const Background = () => {
  const location = useLocation();

  // check if current page is the same as the path
  const checkPage = (path) => {
    return location.pathname.includes(path);
  };

  const springs = useSpring({
    config: { duration: 2000 },
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
  });

  return (
    <div>
      <animated.div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          ...springs,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${blackHole})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px) brightness(0.5)",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "-4",
            opacity: checkPage("/stories") ? "1" : "0",
            transition: "opacity 1s ease",
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url(${room})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "-3",
            opacity: checkPage("/stories/new") ? "1" : "0",

            transition: "opacity 1s ease",
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url(${book})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "-5",
          }}
        ></div>
      </animated.div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          backgroundColor: "black",
          zIndex: "-10",
        }}
      ></div>
    </div>
  );
};

export default Background;
