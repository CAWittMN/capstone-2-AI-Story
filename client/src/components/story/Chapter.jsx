import { Card, CardBody, ScrollShadow, Image } from "@nextui-org/react";
import AudioComponent from "./AudioComponent";

const Chapter = ({ chapter }) => {
  return (
    <div
      style={{
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
    </div>
  );
};

export default Chapter;
