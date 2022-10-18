console.log("you are ready to start coding");
import "./index.css";
import { isValid } from "./utils";
import { data } from "./data";

console.log(isValid({}));

let filteredData = data;

const state = {
  items: data,
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

const buildDeleteLinks = () => {
  const deletes = document.querySelectorAll("td[data-delete]");
  for (let del of deletes) {
    del.addEventListener("click", (e) => {
      deleteItem(+e.currentTarget.id.substring(3));
    });
  }
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
    const { name, id, price, category, size } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td><td id="tr-${id}" style="cursor:pointer;" data-delete="${id}">Delete</td></tr>`;
  });
  html += "</table>";
  document.getElementById("items").innerHTML = html;
  buildDeleteLinks();
};
buildTable();

Array.prototype.unique = function (field) {
  const newArray = [];
  this.forEach((record) => {
    const { [field]: targetField } = record;
    if (!newArray.includes(targetField)) {
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

const handleFilterChange = (e) => {
  if (e.target.value == "0") {
    filteredData = data;
  } else {
    filteredData = state.items.filter((d) => d.category == e.target.value);
  }
  buildTable();
};

const buildFilterBox = () => {
  const categories = data.unique("category");
  let html =
    '<select id="category-filter"><option value="0">Select a category</option>';
  categories.map((c) => {
    html += `<option value="${c}">${c}</option>`;
  });
  html += "</select>";
  document.getElementById("filter").innerHTML = html;
  const newSelect = document.getElementById("category-filter");
  newSelect.addEventListener("change", handleFilterChange);
};
buildFilterBox();

const deleteItem = (id) => {
  const itemIndex = state.items.findIndex((i) => i.id == id);
  if (itemIndex >= 0) {
    const copiedItems = Array.from(state.items);
    copiedItems.splice(itemIndex, 1);
    state.items = copiedItems;
    filteredData = copiedItems;
    buildTable();
  }
};

const curriedFilter = filterData("category");
const fruits = curriedFilter("fruit");
// console.log(fruits);
const beverages = curriedFilter("beverages");
// console.log(beverages);
const candy = curriedFilter("candy");
// console.log(candy);
