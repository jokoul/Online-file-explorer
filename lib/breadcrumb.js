//include node module
const path = require("path");

const buildBreadcrumb = (pathname) => {
  const pathChunks = pathname.split("/").filter((element) => element !== "");
  console.log(`pathChunks ${pathChunks}`);
  let breadcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;
  //we need to use a loop to build the rest of our breadcrum element
  //we set the initial link
  let link = "/";
  pathChunks.forEach((item, index) => {
    //we need to build first the link
    link = path.join(link, item);
    //then we avoid to change the last "li"
    if (index !== pathChunks.length - 1) {
      breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
    } else {
      //for the last "li"
      breadcrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`;
    }
  });
  return breadcrumb;
};

module.exports = buildBreadcrumb;
