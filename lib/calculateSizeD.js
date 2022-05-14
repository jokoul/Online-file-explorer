//include node package
const fastFolderSizeSync = require("fast-folder-size/sync");

const calculateSizeD = (itemFullStaticPath, item) => {
  //test
  //return ["110M", 110 * 1000 * 1000]; //depends of personnal system  could be 110*1024*1024

  //escape spaces, tabs, new line, etc with an escape space. the g option stand for search in all the string and change all of them not just the first one.
  let itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, "\\ ");
  itemFullStaticPathCleaned = itemFullStaticPathCleaned.replace(/\\/g, "/");

  let size = fastFolderSizeSync(`${itemFullStaticPath}`);
  console.log(size);
  //Managing units
  const units = "BKMGT";
  let sizeWithDigits;
  if (size <= 999) {
    //B 10B -> 10 bytes (*1024^0)
    sizeWithDigits = `${size}B`;
  } else if (size <= 999999) {
    //K 10K -> 10*1024 bytes (*1024^1)
    sizeWithDigits = size / 1024;
    sizeWithDigits = `${sizeWithDigits.toFixed(1)}K`;
  } else if (size <= 999999999) {
    //M 10B -> 10*1024*1024 bytes (*1024^2)
    sizeWithDigits = size / (1024 * 1024);
    sizeWithDigits = `${sizeWithDigits.toFixed(1)}M`;
  } else if (size <= 999999999999) {
    //G 10G -> 10*1024*1024*1024 bytes (*1000^3)
    sizeWithDigits = size / (1024 * 1024 * 1024);
    sizeWithDigits = `${sizeWithDigits.toFixed(1)}G`;
  }

  //filter and replace letter by nothing with replace method.i option stand for sensitive case Uppercase or lowercase included.
  //sizeWithDigits = sizeWithDigits.replace(/[a-z]/i, "");
  //Convert string into a float number with parseFloat method
  //sizeWithDigits = parseFloat(sizeWithDigits);
  console.log(sizeWithDigits);

  return [sizeWithDigits, size]; //depends of personnal system but for me 1024*1024
};

module.exports = calculateSizeD;
