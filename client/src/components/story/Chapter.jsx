import { Card, CardBody, ScrollShadow, Image } from "@nextui-org/react";
import { useState } from "react";
import AudioComponent from "./AudioComponent";
import { useTransition, animated } from "@react-spring/web";

const Chapter = ({ chapter, index }) => {
  const transitions = useTransition(chapter, {
    config: { duration: 250 },
    from: { opacity: 0 },
    enter: { opacity: 1, delay: 250 },
    leave: { opacity: 0 },
    delay: 300,
    exitBeforeEnter: true,
  });
  return (
    <>
      {transitions((style, chapter) => (
        <animated.div
          style={{
            ...style,
            fontFamily: "alice",
          }}
        >
          <Card
            isBlurred
            shadow="lg"
            className="flex flex-col items-center md:flex-row mx-6 mt-5 border-success border max-h-[60vh] border-opacity-70 select-none"
          >
            {chapter.img && (
              <Image className="max-w-[70%] m-auto my-2" src={chapter.img} />
            )}
            <CardBody className="">
              <ScrollShadow className="md:h-[30rem]">
                <p>{chapter.text}</p>
              </ScrollShadow>
            </CardBody>
          </Card>
          <AudioComponent audioData={chapter.audio} />
        </animated.div>
      ))}
    </>
  );
};

export default Chapter;
