//console.log("test link");
// console.log([1, 4, 8, 2].sort()); //sort in ascending order by default
// console.log(["a", "c", "b"].sort()); //work also for litteral array
// console.log(
//   [
//     { name: "John", age: 40 },
//     { name: "Sara", age: 21 },
//     { name: "Mark", age: 36 },
//   ]
//     .sort((person1, person2) => {
//       //by default, output will be order by name in ascending order
//       // const name1 = person1.name.toUpperCase();
//       // const name2 = person2.name.toUpperCase();
//       const name1 = person1.age;
//       const name2 = person2.age;
//       if (name1 < name2) {
//         return -1;
//       }
//       if (name1 > name2) {
//         return 1;
//       }
//       //equal name
//       return 0;
//     })
//     .reverse() //to reverse order of sorting
// );

//Order status (good practise to create object instead of lots of variable that make our code more readable)
const sortStatus = {
  name: "none", //none,up,down
  // size:,
  // time:
};

//loop through children of tbody with jQuery
const children = $("tbody").children();
//console.log(typeof children);
console.log(children.forEach); //output : undefined because children is not consider like an array and forEach is an array method.
//convert children to an array
let children_array = [];
for (let i = 0; i < children.length; i++) {
  children_array.push(children[i]);
}
console.log(children_array);
//build an array of object
const items = [];
children_array.forEach((element) => {
  //console.log(element.innerHTML); //get all td element of each tr
  console.log(element.outerHTML); //get all td element + tr parent element so we can see the data attribute
  console.log(element.getAttribute("data-name")); //return the value of the tr attribute called
  const rowDetails = {
    name: element.getAttribute("data-name"),
    size: parseInt(element.getAttribute("data-size")),
    time: parseInt(element.getAttribute("data-time")),
    html: element.outerHTML,
  };
  items.push(rowDetails);
});
//console.log(items);

const sort_name = (items, option) => {
  items.sort((item1, item2) => {
    //by default, the order is sort in ascending order
    const name1 = item1.name.toUpperCase(); //we put all the name in uppercase before comparison to avoid mistake
    const name2 = item2.name.toUpperCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    //equal names
    return 0;
  });
  if (option === "down") {
    items.reverse(); //we reverse the order of items array in descending order
  }
};
//sort_name_up(items);
//console.log(items);

// const sort_name_down = (items) => {
//   sort_name_up(items); //first, we sort items array in ascending order
//   items.reverse(); //then, we reverse the order of items array
// };
// sort_name_down(items);
// console.log(items);

//fill table body with items
const fill_table_body = (items) => {
  const content = items.map((element) => element.html).join(""); //map array method allow to rework each element of the array then we concatenate all element html
  //content.join(""); //should return a string of all element.html concatenate BUT it doesn't in this way.
  console.log(content);
  $("tbody").html(content);
};
//fill_table_body(items); //we fill table with a content made with reorder items array

//event listener
document.getElementById("name").addEventListener("click", () => {
  //   if (sortStatus.name in ["none", "down"]) {
  //     //sort in ascending order
  //     sort_name(items, "up"); //rather than having two fn sort_name_up and ...down, we can refactorize in one with second parameter for order.
  //   }
  //   if (sortStatus.name === "up") {
  //     //sort in descending order
  //     sort_name(items, "down");
  //   }
  //   document.getElementById("name").style.backgroundColor = "red";
  //other way to better write the code
  if (["none", "down"].includes(sortStatus.name)) {
    //sort in ascending order
    sort_name(items, "up");
    sortStatus.name = "up";
  } else if (sortStatus.name === "up") {
    //sort in descending order
    sort_name(items, "down");
    sortStatus.name = "down";
  }
  fill_table_body(items);
});
