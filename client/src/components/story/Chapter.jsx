import { Card, CardBody, ScrollShadow, Image } from "@nextui-org/react";
import { useState } from "react";
import AudioComponent from "./AudioComponent";
import {
  useTransition,
  animated,
  useSpring,
  useSpringRef,
  useChain,
  easings,
  config,
} from "@react-spring/web";
import { spring, transform } from "framer-motion";

const Chapter = ({ chapter, index }) => {
  const transRef = useSpringRef();
  const transitions = useTransition(chapter, {
    ref: transRef,
    // initial: { opacity: 0, x: 0 },
    from: { opacity: 0, x: 200 },
    enter: { opacity: 1, x: 0, delay: 350 },
    leave: {
      opacity: 0,
      x: -200,
      config: { duration: 250, easing: easings.easeInSine },
    },
    exitBeforeEnter: true,
  });

  const springRef = useSpringRef();
  const spring = useSpring({
    ref: springRef,
    from: { scale: 0 },
    to: { scale: 1 },
    // delay: 1000,
    // config: { duration: 1000 },
  });

  useChain([springRef, transRef]);

  return (
    <animated.div style={{ ...spring }}>
      <Card
        isBlurred
        shadow="lg"
        className="flex 2xl:p-20 flex-col items-center md:flex-row mx-6 mt-5 border-success border max-h-[60vh] border-opacity-70 select-none"
      >
        {transitions((style, chapter) => (
          <animated.div style={{ ...style }}>
            {chapter.img && (
              <Image className="max-w-[70%] m-auto my-2" src={chapter.img} />
            )}
          </animated.div>
        ))}
        {transitions((style, chapter) => (
          <animated.div
            style={{
              ...style,
              fontFamily: "alice",
            }}
          >
            <CardBody>
              <ScrollShadow className="md:h-[30rem] max-h-48 flex">
                <p className="m-auto max-w-[50rem]">{chapter.text}</p>
              </ScrollShadow>
            </CardBody>
          </animated.div>
        ))}
      </Card>
      <AudioComponent audioData={chapter.audio} />
    </animated.div>
  );
};

export default Chapter;
