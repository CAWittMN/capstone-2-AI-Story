import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  useSpring,
  useTransition,
  animated,
  useSpringRef,
} from "@react-spring/web";

const Header = ({ firstOpen, setFirstOpen, token }) => {
  const [stayVisible, setStayVisible] = useState(true);
  const transitions = useTransition(stayVisible, {
    config: { duration: 2000 },
    from: { opacity: 0, display: stayVisible ? "" : "none" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 2000,
    onRest: (_a, _b, item) => {
      if (token) {
        setStayVisible(false);
        console.log("done");
      }
    },
    onDestroyed: (i, k) => {
      console.log("destroyed");
      setFirstOpen(false);
    },
  });

  return (
    <>
      {transitions((style, i) => (
        <animated.div
          style={{ position: "fixed", ...style }}
          className="md:w-2/4 w-full flex justify-center items-center rounded-full"
        >
          <h1
            className="text-[4.5rem] mb-5 z-10 md:text-[8rem] select-none flex justify-center items-center"
            style={{
              fontFamily: "Alice",
              fontWeight: "bold",
            }}
          >
            <span
              className="text-transparent drop-shadow-md bg-clip-text bg-gradient-to-r to-sky-400 via-purple-300 from-green-500"
              style={{
                filter:
                  "saturate(75%) brightness(120%) drop-shadow(0 0 0.5rem #fff)",
              }}
            >
              Story
            </span>
            <span
              style={{
                filter:
                  "saturate(30%) brightness(200%) drop-shadow(0 0 0.5rem #fff)",
              }}
            >
              Gen
            </span>
          </h1>
          <div className="md:w-[580px] z-2 drop-shadow-lg w-full  rounded-full border-black border-[3rem]  blur-3xl  fixed"></div>
        </animated.div>
      ))}
    </>
  );
};

export default Header;
