/**
 * Converts a buffer to a base64 source string for a png image.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
const convertBufferImage = (buffer) => {
  const bufferBase64 = buffer.toString("base64");
  const bufferString = `data:image/png;base64,${bufferBase64}`;
  return bufferString;
};

/**
 * Converts a buffer to a base64 source string for an mpeg audio file.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
const convertBufferAudio = (buffer) => {
  const bufferBase64 = buffer.toString("base64");
  const bufferString = `data:audio/mpeg;base64,${bufferBase64}`;
  return bufferString;
};

module.exports = { convertBufferImage, convertBufferAudio };
