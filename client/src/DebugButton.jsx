import { useContext } from "react";
import AppContext from "./context/AppContext";
import StoryGenApi from "./api";

const DebugButton = () => {
  const { token, username } = useContext(AppContext);

  const handleDebug = () => {
    console.log("state token: ", token);
    console.log("state username: ", username);
    console.log("local storage token: ", localStorage.getItem("token"));
    console.log("local storage username:", localStorage.getItem("username"));
    console.log("API token: ", StoryGenApi.token);
    console.log("API username: ", StoryGenApi.username);
  };

  return (
    <button
      className="text-white"
      onClick={handleDebug}
      style={{ position: "fixed", bottom: "0", right: "0" }}
    >
      DEBUG
    </button>
  );
};

export default DebugButton;
