import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3005";

/**
 *  API to interact with the StoryGen API.
 */
class StoryGenApi {
  static token;
  static username;

  // Generic API request method
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${StoryGenApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Set token and username on StoryGenApi class
  static loadToken(token, username) {
    StoryGenApi.token = token;
    StoryGenApi.username = username;
  }

  //User routes

  // Login and set token and username
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    StoryGenApi.token = res.token;
    StoryGenApi.username = res.username;
    return res;
  }

  // Logout and remove token and username
  static async logout() {
    StoryGenApi.username = null;
    StoryGenApi.token = null;
  }

  //register and set token and username
  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    StoryGenApi.token = res.token;
    StoryGenApi.username = res.username;
    return res.token;
  }

  //get user info
  static async getUser() {
    let res = await this.request(`users/${this.username}`);
    return res.user;
  }

  //get user stories
  static async getUserStories() {
    let res = await this.request(`stories/${this.username}`);
    return res.stories;
  }

  //Story routes

  //get story info
  static async getStory(storyId) {
    let res = await this.request(`stories/${this.username}/${storyId}`);
    return res.story;
  }

  //create and get a new story
  static async createStory(data) {
    let res = await this.request(`stories/${this.username}/new`, data, "post");
    return res.story;
  }

  //create and get a new chapter
  static async createNewChapter(data, storyId) {
    let res = await this.request(
      `stories/${this.username}/${storyId}/new-chapter`,
      data,
      "post"
    );
    return res.chapter;
  }

  //delete story
  static async deleteStory(storyId) {
    let res = await this.request(
      `stories/${this.username}/${storyId}`,
      {},
      "delete"
    );
    return res;
  }

  //Admin routes

  //get all users
  static async getAllUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  //get all stories
  static async getAllStories() {
    let res = await this.request(`stories`);
    return res.stories;
  }

  //delete user
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }
}

export default StoryGenApi;
