import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
  Image,
} from "@nextui-org/react";
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
        className="flex mx-6 mt-5 flex-row border-success border max-h-[60vh] border-opacity-70 select-none"
      >
        {chapter.img && <Image className="object-cover" src={chapter.img} />}
        <CardBody className="">{chapter.text}</CardBody>
      </Card>
      <AudioComponent audioData={chapter.audio} />
    </div>
  );
};

export default Chapter;
