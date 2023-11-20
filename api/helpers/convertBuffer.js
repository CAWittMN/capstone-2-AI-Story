const convertBufferImage = (buffer) => {
  const bufferBase64 = buffer.toString("base64");
  const bufferString = `data:image/png;base64,${bufferBase64}`;
  return bufferString;
};

const convertBufferAudio = (buffer) => {
  const bufferBase64 = buffer.toString("base64");
  const bufferString = `data:audio/mpeg;base64,${bufferBase64}`;
  return bufferString;
};

module.exports = { convertBufferImage, convertBufferAudio };
