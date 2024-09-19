import {
  Card,
  Divider,
  CardBody,
  CardHeader,
  CardFooter,
  ScrollShadow,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const motionProps = {
  variants: {
    enter: {
      transform: "scale(1, 1)",
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
    exit: {
      transform: "scale(1, 0.5)",
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  },
};

const ContinueStory = ({ story, onContinue, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="md:w-[75%] m-auto">
      <Card
        isBlurred
        className="border-success w-full select-none border border-opacity-70 backdrop-brightness-[60%]"
      >
        <CardHeader className="flex flex-row justify-between">
          <span className="text-xs">{story.title}</span>
          <span className="flex flex-row border border-primary backdrop-brightness-90 px-3 py-1 rounded-xl ">
            <FontAwesomeIcon className="mr-1 mt-1" icon="person-walking" />
            {story.charName}
          </span>
        </CardHeader>
        <Divider />
        <CardBody className="h-[12rem] md:no-scrollbar overflow-scroll ">
          <ScrollShadow>
            <div>
              <h1>Genre: {story.genre}</h1>
              <h1>Setting: {story.setting}</h1>
            </div>
            <Divider />
            <div>Summary: {story.currSummary}</div>
          </ScrollShadow>
        </CardBody>
        <CardFooter className="flex flex-row justify-between">
          <div className="">
            <span className="flex flex-col">
              <FontAwesomeIcon icon="fa-book" className="mx-1 mr-1" />
              {story.completedChapters}/{story.maxChapters}
            </span>
          </div>
          <div>
            <span>
              {story.charAlive === false && (
                <FontAwesomeIcon icon="fa-skull-crossbones" />
              )}
            </span>
            <span>
              {story.completed && <FontAwesomeIcon icon="fa-check-circle" />}
            </span>
          </div>
          <div className="flex w-[80%] md:w-[90%] space-x-3 border border-warning rounded-xl px-3 border-opacity-30 justify-end">
            <span>
              <FontAwesomeIcon
                icon={story.genImages ? "fa-eye" : "fa-eye-slash"}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={story.genAudio ? "fa-volume-high" : "fa-volume-xmark"}
              />
            </span>
          </div>
          <span></span>
        </CardFooter>
      </Card>
      <div>
        <Button
          onClick={onContinue}
          variant="ghost"
          color="warning"
          size="lg"
          className="backdrop-blur-sm mt-3 backdrop-brightness-75 w-full text-white"
        >
          {story.completed ? "Review" : "Continue"}
        </Button>
        <Button
          onPress={onOpen}
          variant="bordered"
          size="sm"
          className="backdrop-blur-sm mt-3 backdrop-brightness-75 w-full"
        >
          Delete
        </Button>
        <Modal
          size="xs"
          backdrop="blur"
          isOpen={isOpen}
          onClose={onClose}
          isDismissable={false}
          placement="center"
          motionProps={motionProps}
          className="bg-black text-red-500 font-bold text-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <p>Are you sure you want to delete this story?</p>
                </ModalBody>
                <ModalFooter className="m-auto">
                  <Button
                    variant="ghost"
                    color="danger"
                    onPress={() => {
                      onDelete();
                      onClose();
                    }}
                  >
                    Yes
                  </Button>
                  <Button variant="ghost" color="warning" onPress={onClose}>
                    No
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ContinueStory;

25;
