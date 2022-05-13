//required node module
const fs = require("fs");
const path = require("path");

//require Files
const calculateSizeD = require("./calculateSizeD");
const calculateSizeF = require("./calculateSizeF");

const buildMainContent = (fullStaticPath, pathname) => {
  //test
  //   return `
  //         <tr>
  //             <td>name</td>
  //             <td>100M</td>
  //             <td>12/08/2018, 09:00:00 PM</td>
  //         </tr>
  //     `;
  //main variable which store all data retrieve
  let mainContent = "";
  //first, loop through the elements inside the folder
  let items;
  try {
    //we use a try/catch because we don't use callback function in the method below
    items = fs.readdirSync(fullStaticPath);
    console.log(items);
  } catch (err) {
    //if the method send error, handle it
    console.log(`readdirSync error: ${err}`);
    return `<div class='alert alert-danger'>Internal Server Error</div>`;
  }
  //get the following elements for each item:
  items.forEach((item) => {
    //link
    const link = path.join(pathname, item);
    //icon
    let itemDetails = {};
    let icon, stats;

    //get stats of the item
    const itemFullStaticPath = path.join(fullStaticPath, item);
    try {
      itemDetails.stats = fs.statSync(itemFullStaticPath);
    } catch (err) {
      console.log(`statSync error: ${err}`);
      mainContent = `<div class='alert alert-danger'>Internal server error</div>`;
      return false;
    }
    if (itemDetails.stats.isDirectory()) {
      itemDetails.icon = '<i class="fa-solid fa-folder me-1"></i>';
      //function which calculate the size and return an aray of two variable
      [itemDetails.size, itemDetails.sizeBytes] =
        calculateSizeD(itemFullStaticPath);
    } else if (itemDetails.stats.isFile()) {
      itemDetails.icon = '<i class="fa-solid fa-file me-1"></i>';
      //function which calculate the size and return an array of two variable
      //[itemDetails.size,itemDetails.sizeBytes] = calculateSizeF();
    }
    mainContent += `
        <tr>
            <td>${itemDetails.icon}<a href='${link}'>${item}</a></td>
            <td>${itemDetails.size}</td>
            <td>12/08/2018, 09:00:00 PM</td>
        </tr>
    `;
  });

  //size
  //last modified

  return mainContent;
};

module.exports = buildMainContent;
