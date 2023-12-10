const axios = require("axios");
const { ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID } = require("./config");

/**
 * ElevenLabs API Wrapper
 * Configs:
 * - voiceId: ID string
 * - apiKey: API Key string
 */
class ElevenLabsApi {
  constructor(configs = {}) {
    this.voiceId = configs.voiceId;

    this.apiKey = configs.apiKey;
  }

  /**
   * Convert text to audio.
   */
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

// create instance of ElevenLabsApi
const elevenLabsApi = new ElevenLabsApi({
  voiceId: ELEVENLABS_VOICE_ID,
  apiKey: ELEVENLABS_API_KEY,
});

module.exports = { elevenLabsApi };
