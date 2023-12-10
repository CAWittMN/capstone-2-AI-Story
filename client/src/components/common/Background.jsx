import { useLocation } from "react-router-dom";

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

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${blackHole})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px) brightness(0.5)",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
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
          width: "100vw",
          height: "100vh",
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
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: "-5",
        }}
      ></div>
    </div>
  );
};

export default Background;
