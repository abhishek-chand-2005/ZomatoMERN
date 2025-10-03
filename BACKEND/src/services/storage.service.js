const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  UrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadImage(file, fileName) {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName
  })

  return  result;
}


module.exports = {
  uploadImage
}
