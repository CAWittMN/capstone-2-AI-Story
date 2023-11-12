import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { useParams } from "react-router-dom";
import StoryGenApi from "../../api";
import ChapterList from "./ChapterList";
import Chapter from "./Chapter";
import UserInput from "./UserInput";

const StoryPage = () => {
  return <div>StoryPage</div>;
};

export default StoryPage;
