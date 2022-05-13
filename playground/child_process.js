//const child_process = require('child_process')//we define all methods of the module
//const execSync = require("child_process").execSync;//we define and use just one method of the module
const { execSync } = require("child_process"); //ES6 way to write

try {
  //execSync execute any command pass as parameter and return the output.
  const result = execSync(
    `du -sh "/Users/joank/devprojet/Udemy/The\ Complete\ Web\ Development\ Course\Online-file-explorer"`
  ).toString();
  //   const result = execSync(`$totalsize = [long]0
  // Get-ChildItem -File -Recurse -Force -ErrorAction SilentlyContinue | % {$totalsize += $_.Length}
  // $totalsize`);
  console.log(result);
} catch (err) {
  console.log(`Error: ${err}`);
  err.stdout;
  err.stderr;
  err.pid;
  err.signal;
  err.status;
}
