//require node module
const https = require("node:https");

//json file link
const mimeURL =
  "https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json";

const getMimeType = (extension) => {
  return new Promise((resolve, reject) => {
    https
      .get(mimeURL, (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(
            `Error : Failed to load mime types json file : ${response.statusCode}`
          );
          console.log(
            `Error : Failed to load mime types json file : ${response.statusCode}`
          );
          return false;
        }

        let data = ""; //some time it is an array
        //you will received data by chunks
        response.on("data", (chunk) => {
          data += chunk;
        });
        //Once you received all chunk of data
        response.on("end", () => {
          resolve(JSON.parse(data)[extension]); //convert data to an array and pass a key "extension" to get the correct extension
        });
      })
      .on("error", (e) => {
        console.error(e);
      });
  });
};

module.exports = getMimeType;
