import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class StoryGenApi {
  // the token for interactive with the API will be stored here.
  static token;
  static username;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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

  //User routes
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    StoryGenApi.token = res.token;
    StoryGenApi.username = res.username;
    return res.token;
  }

  static async logout() {
    StoryGenApi.token = null;
    StoryGenApi.username = null;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    StoryGenApi.token = res.token;
    StoryGenApi.username = res.username;
    return res.token;
  }

  //Story routes

  static async getStory(storyId) {
    let res = await this.request(`stories/${storyId}`);
    return res.story;
  }

  static async getStories() {
    let res = await this.request(`stories`);
    return res.stories;
  }

  static async createStory(data) {
    let res = await this.request(`stories/${this.username}/new`, data, "post");
    return res.story;
  }

  static async createNewChapter(data, storyId) {
    let res = await this.request(
      `stories/${this.username}/${storyId}/new-chapter`,
      data,
      "post"
    );
    return res.chapter;
  }
}

export default StoryGenApi;
