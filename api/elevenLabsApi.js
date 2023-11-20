const axios = require("axios");
const { ELEVENLABS_API_KEY } = require("./config");
const { BadRequestError } = require("./expressError");
const { convertBufferAudio } = require("./helpers/convertBuffer");

const voiceIds = {
  silas: "Af9Ak1Jz1d9LBIyczSKF",
  narrator: "ghWIe9V8UUJG9QUcMI3V",
  oldBrit: "wH5kCXzyKeKf3AAnmP5L",
};

const getAudio = async (text) => {
  const apiKey = ELEVENLABS_API_KEY;
  const voiceId = voiceIds.narrator;
  const apiRequestOptions = {
    method: "POST",
    url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    headers: {
      accept: "audio/mpeg",
      "content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    data: {
      text: text,
    },
    responseType: "arraybuffer",
  };

  const apiResponse = await axios.request(apiRequestOptions);

  return apiResponse.data;
};

module.exports = { getAudio };
