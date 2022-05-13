//required node module
const path = require("path");
//path module method join return : Node\Project1
console.log(path.join("Node", "Project1"));
//path module method normalize return : ..\..\Built in Modules fs
console.log(path.normalize("../../Node/../Built in Modules fs"));
//path module method normalize return : C:\Users\joank\devprojet\Udemy\Built in Modules fs
console.log(path.resolve("../../Node/../Built in Modules fs"));
