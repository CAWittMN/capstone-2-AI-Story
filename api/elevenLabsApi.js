const axios = require("axios");
const { ELEVENLABS_API_KEY } = require("./config");

const voiceIds = {
  silas: "Af9Ak1Jz1d9LBIyczSKF",
  narrator: "ghWIe9V8UUJG9QUcMI3V",
  oldBrit: "wH5kCXzyKeKf3AAnmP5L",
};

class ElevenLabsApi {
  constructor(configs = {}) {
    this.voiceId = configs.voiceId;

    this.apiKey = configs.apiKey;
  }

  async getAudio(text) {
    const apiRequestOptions = {
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
      headers: {
        accept: "audio/mpeg",
        "content-Type": "application/json",
        "xi-api-key": this.apiKey,
      },
      data: {
        text: text,
      },
      responseType: "arraybuffer",
    };

    const apiResponse = await axios.request(apiRequestOptions);

    return apiResponse.data;
  }
}

const elevenLabsApi = new ElevenLabsApi({
  voiceId: voiceIds.silas,
  apiKey: ELEVENLABS_API_KEY,
});

module.exports = { elevenLabsApi };
