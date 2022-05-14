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
    //to store item details in an object, we did that to avoid all block scoping error
    let itemDetails = {}; //good practise to make the code more readable
    //Name
    itemDetails.name = item;
    //link
    const link = path.join(pathname, item);

    //get stats of the item
    const itemFullStaticPath = path.join(fullStaticPath, item);
    try {
      itemDetails.stats = fs.statSync(itemFullStaticPath);
      console.log(itemFullStaticPath);
      console.log(itemDetails.stats);
    } catch (err) {
      console.log(`statSync error: ${err}`);
      mainContent = `<div class='alert alert-danger'>Internal server error</div>`;
      return false;
    }
    //size
    if (itemDetails.stats.isDirectory()) {
      itemDetails.icon = '<i class="fa-solid fa-folder me-1"></i>';
      //function which calculate the size and return an aray of two variable
      [itemDetails.size, itemDetails.sizeBytes] =
        calculateSizeD(itemFullStaticPath);
    } else if (itemDetails.stats.isFile()) {
      itemDetails.icon = '<i class="fa-solid fa-file me-1"></i>';
      //function which calculate the size and return an array of two variable
      [itemDetails.size, itemDetails.sizeBytes] = calculateSizeF(
        itemDetails.stats
      );
    }
    //Last Modified time
    //property mtimeMs of stats object is the last modified time in millisecond and it will give us the unix timestamps
    itemDetails.timeStamp = itemDetails.stats.mtimeMs;
    //to make sure all the timeStamp retrieve are integer (without float number)
    itemDetails.timeStamp = parseInt(itemDetails.timeStamp);
    //convert timestamp to a date with the constructor new Date
    itemDetails.date = new Date(itemDetails.timeStamp);
    //itemDetails.date = itemDetails.date.toLocaleDateString();//return 11/05/2022
    itemDetails.date = itemDetails.date.toLocaleString(); //return 11/05/2022, 12:31:24 AM
    console.log(itemDetails.date);

    mainContent += `
        <tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
            <td>${itemDetails.icon}<a href='${link}'>${item}</a></td>
            <td>${itemDetails.size}</td>
            <td>${itemDetails.date}</td>
        </tr>
    `;
  });

  return mainContent;
};

module.exports = buildMainContent;
