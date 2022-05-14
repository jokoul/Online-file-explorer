//require node modules
const url = require("url");
const path = require("path");
const fs = require("fs");

//file imports
const buildBreadcrumb = require("./breadcrumb.js");
const buildMainContent = require("./mainContent");
const getMimeType = require("./getMimeType");

//static base path: location of your static folder
//show current full static path of respond file.
//console.log(__dirname); //we call the global variable __dirname
//show current full static path of our static folder.
//console.log(path.join(__dirname, "..", "static"));
const staticBasePath = path.join(__dirname, "..", "static");
// console.log(__dirname);
// console.log(staticBasePath);
//respond to a request
//Following is function passed to createServer used to creater the server
const respond = (request, response) => {
  //   response.write("respond function twice and again fired!");
  //   response.end(); //to stop loading the page indefinitely
  //before working with the pathname, you need to decode it
  //console.log(url.parse(request.url, true).pathname); //boolean second parameter allow to get query key as an object.
  let pathname = url.parse(request.url, true).pathname;
  //if favicon.ico then stop
  if (pathname === "/favicon.ico") {
    return false;
  }
  //console.log(pathname);
  //to decode special url like "/static/Projects/App%20Landing%20Page%20(Bootstrap)" to "/static/Projects/App Landing Page (Bootstrap)"
  //console.log(decodeURIComponent(pathname));
  pathname = decodeURIComponent(pathname);
  //get the corresponding full static path located in the static folder.
  //console.log(path.join(staticBasePath, pathname));//concatenation of staticBasePath and the decoded pathname.
  const fullStaticPath = path.join(staticBasePath, pathname);
  console.log("respond.js LINE 37 : " + fullStaticPath);
  //Can we find something in fullStaticPath?
  //no: send '404: File Not Found!'
  if (!fs.existsSync(fullStaticPath)) {
    //test if the given path exist
    //don't exist (false)
    console.log(`${fullStaticPath} does not exist`);
    response.write("404: File not found!");
    response.end();
    return false; //to stop the script execution here and avoid that app crash by executing the coming code
  }
  //We found something
  //is it a file or directory?
  //we use try/catch to handle error case
  //fs.lstatSync() method is used to synchronously return information about the link that is being used to refer to a file or directory.
  let stats;
  try {
    //console.log(fs.lstatSync(fullStaticPath));
    stats = fs.lstatSync(fullStaticPath);
  } catch (err) {
    console.log(`lstatSync Error: ${err}`);
  }
  //it is a directory:
  if (stats.isDirectory()) {
    //get content from the template index.html
    let data = fs.readFileSync(
      path.join(staticBasePath, "project-files/index.html"),
      "utf-8"
    ); //to read the content of the file, encoding (utf-8) is needed.
    //Build the page title
    console.log("respond.js LINE 66 : " + pathname);
    let pathElements = pathname.split("/").reverse(); //split create an array and reverse order of array value.
    //to get rid of empty string, we can filter the returned array value
    pathElements = pathElements.filter((element) => element !== ""); //don't curly braket to avoid error (empty array)
    const folderName = pathElements[0];
    console.log("respond.js LINE 71 : " + folderName);
    //build breadcrumb
    const breadcrumb = buildBreadcrumb(pathname);
    //build table rows (main content)
    const mainContent = buildMainContent(fullStaticPath, pathname);
    //fill the template data with: the page title, breadcrumb and table rows (main_content)
    data = data.replace("Hello, world!", folderName);
    data = data.replace("pathname", breadcrumb);
    data = data.replace("mainContent", mainContent);
    //print data to the webpage
    response.statusCode = 200;
    response.write(data);
    return response.end(); //"return" stop the script there and avoid to read the code at the bottom.
  }
  //It is not a directory but not a file either
  //send: 401: Access denied!
  if (!stats.isFile()) {
    response.statusCode = 401;
    response.write("401: Access denied!");
    console.log("not a file!");
    return response.end();
  }
  //it is a file
  //Let's get the file extension
  let fileDetails = {};
  fileDetails.extname = path.extname(fullStaticPath);
  console.log("respond.js LINE 98 : " + fileDetails.extname);
  //file size
  let stat;
  try {
    //first we can get filesize throug statSync method
    stat = fs.statSync(fullStaticPath);
  } catch (err) {
    console.log(`error : ${err}`);
  }
  fileDetails.size = stat.size;
  //get the file mime type and add it to the response header
  getMimeType(fileDetails.extname)
    .then((mime) => {
      //fn callback to the returned Promise of getMimeType
      // console.log("respond.js LINE 104 : " + mime);
      // response.statusCode = 200;
      // response.write(`status code in getMimeType function : ${mime}`);
      // return response.end();
      //store headers here
      let head = {};
      let options = {};
      //store response status code
      let statusCode = 200;
      //set "Content-Type" for all file types
      head["Content-Type"] = mime;
      //get the file size and add it to the response header
      //pdf file ? -> display in browser
      if (fileDetails.extname === ".pdf") {
        head["Content-Disposition"] = "inline";
        //head["Content-Disposition"] = "attachment;filename=file.pdf"; //on click on pdf file, it is downloaded with name file.pdf.
      }
      //audio/video file ? -> stream in ranges
      if (RegExp("audio").test(mime) || RegExp("video").test(mime)) {
        //header
        head["Accept-Range"] = "bytes";
        const range = request.headers.range;
        console.log(`range: ${range}`);
        //check if range is undefined or not
        if (range) {
          //if range is not undefined, we get bytes=0-end
          const start_end = range.replace(/bytes=/, "").split("-"); //return [0,end]
          const start = parseInt(start_end[0]); //convert to integer number
          const end = start_end[1]
            ? parseInt(start_end[1])
            : fileDetails.size - 1;
          //0...last byte
          //extra headers needed to make video read properly
          //Content-Range
          head["Content-Range"] = `bytes ${start}-${end}/${fileDetails.size}`;
          //Content-Length
          head["Content-Length"] = end - start + 1; //we add one to count the last bytes after making the delta start - end.
          statusCode = 206;
          options = { start, end }; //populate options object with byte
        }
      }
      //reading the file using fs.readFile then with the promise you just need to put the callback into a then method if resolved and handle the rejected error in catch.
      // fs.promises
      //   .readFile(fullStaticPath, "utf-8")
      //   .then((data) => {
      //     response.writeHead(statusCode, head);
      //     response.write(data);
      //     return response.end();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     response.statusCode = 404;
      //     response.write("404 : File reading error");
      //     return response.end();
      //   });
      //Other way to display file with streaming method. fs.readFile sometime is very slow because user have to wait until all file is loaded But stream method stream the content and users don't need to wait they get content as things progress
      const fileStream = fs.createReadStream(fullStaticPath, options); //after option defined we are able to read video and search through them.
      //Stream chunks to your response object
      response.writeHead(statusCode, head);
      fileStream.pipe(response); //pipe method send chunks to response as reading file progressesq
      //events
      fileStream.on("close", () => {
        return response.end();
      });
      fileStream.on("error", (error) => {
        console.log("respond.js LINE 139 : " + error.code);
        response.statusCode = 404;
        response.write("404 : FileStream error");
        return response.end();
      });
    })
    .catch((err) => {
      //we handle the error if Promise is rejected
      response.statusCode = 500;
      response.write("500: Internal server error");
      console.log(`Promise error : ${err}`);
      return response.end();
    });
};

module.exports = respond;
