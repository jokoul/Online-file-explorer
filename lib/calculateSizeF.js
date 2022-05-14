//include node package
const fastFolderSizeSync = require("fast-folder-size/sync");

const calculateSizeF = (stats) => {
  //test
  //return ["110M", 110 * 1000 * 1000]; //depends of personnal system  could be 110*1024*1024

  //size in bytes
  const filesizeBytes = stats.size;
  //size in human readable format
  const index = Math.floor(Math.log10(filesizeBytes) / 3);
  sizeWithDigits = filesizeBytes;
  //managing units
  const units = "BKMGT";
  //700->700/1000^0
  //10000->10000/1000^1
  //10000000->10000/1000^2
  const filesizeHuman = (filesizeBytes / Math.pow(1000, index)).toFixed(1);

  const unit = units[index];

  const filesize = `${filesizeHuman}${unit}`;
  //console.log(`${filesizeHuman}${unit}`);

  return [filesize, filesizeBytes]; //depends of personnal system but for me 1024*1024
};

module.exports = calculateSizeF;
