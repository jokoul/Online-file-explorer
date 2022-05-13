//require node modules
const url = require("url");
const path = require("path");
const fs = require("fs");

//file imports
const buildBreadcrumb = require("./breadcrumb.js");
const buildMainContent = require("./mainContent");

//static base path: location of your static folder
//show current full static path of respond file.
//console.log(__dirname); //we call the global variable __dirname
//show current full static path of our static folder.
//console.log(path.join(__dirname, "..", "static"));
const staticBasePath = path.join(__dirname, "..", "static");
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
  if (stats.isDirectory) {
    //get content from the template index.html
    let data = fs.readFileSync(
      path.join(staticBasePath, "project-files/index.html"),
      "utf-8"
    ); //to read the content of the file, encoding (utf-8) is needed.
    //Build the page title
    console.log(pathname);
    let pathElements = pathname.split("/").reverse(); //split create an array and reverse order of array value.
    //to get rid of empty string, we can filter the returned array value
    pathElements = pathElements.filter((element) => element !== ""); //don't curly braket to avoid error (empty array)
    const folderName = pathElements[0];
    console.log(folderName);
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
    response.end();
  }
  //console.log(stats.isDirectory());
  //to avoid infinite reload
  //response.write(stats.isDirectory().toString()); //we convert boolean to a string because "write" method don't accept boolean parameter.
  //response.end();
};

module.exports = respond;
