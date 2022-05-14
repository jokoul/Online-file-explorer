//const child_process = require('child_process')//we define all methods of the module
//const execSync = require("child_process").execSync;//we define and use just one method of the module
const { execSync } = require("child_process"); //ES6 way to write
const fs = require("fs");
const du = require("du"); //third part package

du("./lib/respond.js", function (err, size) {
  sizeInMegaBytes = size / 1000000;
  sizeInMegaBytes3digits = sizeInMegaBytes.toFixed(3);
  console.log("My folder size :" + sizeInMegaBytes3digits + " M");
});

// fs.stat("./", (error, fileDirInfo) => {
//   if (error) {
//     console.log(error.message);
//   } else {
//     const fileSizeInBytes = fileDirInfo.size;
//     console.log(fileSizeInBytes);
//     console.log(fileDirInfo);
//   }
// });

// const stats = fs.statSync(
//   "/Users/joank/devprojet/Udemy/The Complete Web Development Course/Online-file-explorer/app.js"
// );
// const fileSizeInBytes = stats.size;
// //convert to MegaBytes
// const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
// console.log(fileSizeInMegabytes);
// console.log(fileSizeInBytes);
// console.log(stats);

// try {
//   //execSync execute any command pass as parameter and return the output.
//   const result = execSync(
//     `du -sh "/Users/joank/devprojet/Udemy/The\ Complete\ Web\ Development\ Course\Online-file-explorer"`
//   ).toString();
//   //   const result = execSync(`$totalsize = [long]0
//   // Get-ChildItem -File -Recurse -Force -ErrorAction SilentlyContinue | % {$totalsize += $_.Length}
//   // $totalsize`);
//   console.log(result);
// } catch (err) {
//   console.log(`Error: ${err}`);
//   err.stdout;
//   err.stderr;
//   err.pid;
//   err.signal;
//   err.status;
// }
