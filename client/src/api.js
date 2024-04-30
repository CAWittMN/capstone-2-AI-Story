import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3005";

/**
 *  API to interact with the StoryGen API.
 */
class StoryGenApi {
  static token;
  static username;
  static isAdmin;

  // Generic API request method
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static loadApi(token) {
    this.token = token;
    const { username, isAdmin } = jwtDecode(token);
    this.username = username;
    this.isAdmin = isAdmin;
  }

  static loadToken(token) {
    return jwtDecode(token);
  }

  //User routes

  // Login and set token and username
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    const token = res.token;
    const { username, isAdmin } = jwtDecode(token);

    return { token, username, isAdmin };
  }

  //register and set token and username
  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  //get user info
  static async getUser(token) {
    this.loadApi(token);
    let res = await this.request(`users/${this.username}`);
    return res.user;
  }

  //get user stories
  static async getUserStories(token) {
    this.loadApi(token);
    let res = await this.request(`stories/${this.username}`);
    return res.stories;
  }

  //Story routes

  //get story info
  static async getStory(token, storyId) {
    this.loadApi(token);
    let res = await this.request(`stories/${this.username}/${storyId}`);
    return res.story;
  }

  //create and get a new story
  static async createStory(token, data) {
    this.loadApi(token);
    let res = await this.request(`stories/${this.username}/new`, data, "post");
    return res.story;
  }

  //create and get a new chapter
  static async createNewChapter(token, data, storyId) {
    this.loadApi(token);
    let res = await this.request(
      `stories/${this.username}/${storyId}/new-chapter`,
      data,
      "post"
    );
    return res.chapter;
  }

  //delete story
  static async deleteStory(token, storyId) {
    this.loadApi(token);
    let res = await this.request(
      `stories/${this.username}/${storyId}`,
      {},
      "delete"
    );
    return res;
  }

  //Admin routes

  //check if user is admin and load api
  static authAdmin(token) {
    this.loadApi(token);
    return this.isAdmin;
  }

  //get all users
  static async adminGetAllUsers(token) {
    if (!this.authAdmin(token)) {
      throw new Error("Unauthorized");
    }
    let res = await this.request(`users`);
    return res.users;
  }

  //get all stories
  static async adminGetAllStories(token) {
    if (!this.authAdmin(token)) {
      throw new Error("Unauthorized");
    }
    let res = await this.request(`stories`);
    return res.stories;
  }

  //delete user
  static async adminDeleteUser(token, username) {
    if (!this.authAdmin(token)) {
      throw new Error("Unauthorized");
    }
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }

  //get other user stories
  static async adminGetUserStories(token, username) {
    if (!this.authAdmin(token)) {
      throw new Error("Unauthorized");
    }
    let res = await this.request(`stories/${username}`);
    return res.stories;
  }

  //get other user story
  static async adminGetStory(token, username, storyId) {
    if (!this.authAdmin(token)) {
      throw new Error("Unauthorized");
    }
    let res = await this.request(`stories/${username}/${storyId}`);
    return res.story;
  }
}

export default StoryGenApi;
