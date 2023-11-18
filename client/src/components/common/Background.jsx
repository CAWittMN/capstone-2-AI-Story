import { useLocation } from "react-router-dom";

import space from "../../images/space.png";
import forest from "../../images/forest.png";
import book from "../../images/book.png";
import room from "../../images/room.png";
import city from "../../images/city.png";
import knight from "../../images/knight.png";
import mountains from "../../images/mountains.png";
import ship from "../../images/ship.png";

const Background = () => {
  const location = useLocation();

  const checkPage = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
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

          transition: "all 1s ease",
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
