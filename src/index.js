console.log("you are ready to start coding");
import "./index.css";
import { isValid } from "./utils";
import { data } from "./data";

console.log(isValid({}));

let filteredData = data;

const state = {
  item: data,
  currentItem: {
    name: "",
    size: "",
    price: 0,
    category: "",
  },
};

const changeState = (element) => {
  const { id, value } = element.target;
  if (!isValid(value) || !isValid(id)) return;

  setValue(id, value);

  const result = {
    ...state,
    currentItem: {
      ...(state.currentItem[id] = value),
    },
  };
  console.log(result);
  return result;
};

const setValue = (id, value) => {
  if (isValid(value)) {
    document.getElementById(id).value = value;
  }
};

const inputs = document.getElementsByTagName("input");
console.log(inputs);
for (let input of inputs) {
  input.addEventListener("change", changeState);
}

const buildTable = () => {
  let html = `<table style="width:90%; margin: 20px auto; color:#000">`;
  html +=
    "<tr><th>Product</th><th>Size</th><th>Price</th><th>Category</th><th>Delete</th></tr>";
  filteredData.map((item) => {
    const { name, price, category, size } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td><td style="cursor:pointer">Delete</td></tr>`;
  });
  html += "</table>";
  document.getElementById("items").innerHTML = html;
};
buildTable();

Array.prototype.unique = function (field) {
  const newArray = [];
  this.forEach((record) => {
    const { [field]: targetField } = record;
    if (!newArray.included(targetField)) {
      newArray.push(targetField);
    }
  });
  return newArray;
};

const filterData = (property) => {
  return function (value) {
    return data.filter((i) => i[property] == value);
  };
};

const curriedFilter = filterData("category");
const fruits = curriedFilter("fruit");
// console.log(fruits);
const beverages = curriedFilter("beverages");
// console.log(beverages);
const candy = curriedFilter("candy");
// console.log(candy);
