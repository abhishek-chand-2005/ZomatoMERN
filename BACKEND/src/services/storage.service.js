// const ImageKit = require('@imagekit/nodejs');
const ImageKit = require("imagekit");
require('dotenv').config();  // Ensure environment variables are loaded

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT // Correct URL endpoint
});

async function uploadImage(file, fileName) {
  try {
    // Log the file and file name to verify
    console.log("Uploading file:", file);
    console.log("File name:", fileName);

    // Check if file is a buffer or base64 string, or file path
    const result = await imagekit.upload({
      file: file,         // Can be a buffer or base64 string or file path
      fileName: fileName  // Ensure this is set correctly
    });

    console.log("Upload result:", result);
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;  // Propagate error for further handling if needed
  }
}

module.exports = {
  uploadImage
};
