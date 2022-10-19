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

const getCheapestItem = () => {
  return filteredData.reduce((acc, cur) => {
    if (acc.price < cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 9999);
};

const displayCheapest = () => {
  const parent = document.getElementById("stats");
  const divName = "cheapest-div";
  const existing = document.getElementById(divName);
  if (existing) {
    parent.removeChild(existing);
  }
  const cheapest = getCheapestItem();
  const div = document.createElement("div");
  div.id = divName;
  div.innerHTML = `The cheapest item is ${cheapest.name} and it is ${cheapest.price}`;
  parent.appendChild(div);
};

const mostExpensive = () => {
  return filteredData.reduce((acc, cur) => {
    if (acc.price > cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 0);
};

const displayExpensive = () => {
  const parent = document.getElementById("stats");
  const divName = "expensive-div";
  const existing = document.getElementById(divName);
  if (existing) {
    parent.removeChild(existing);
  }
  const cheapest = mostExpensive();
  const div = document.createElement("div");
  div.id = divName;
  div.innerHTML = `The most Expensive item is ${cheapest.name} and it is ${cheapest.price}`;
  parent.appendChild(div);
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
  console.log("filter data");
  return function (value) {
    console.log("filter data return");
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
// const fruits = curriedFilter("fruit");
// console.log(fruits);
// const beverages = curriedFilter("beverages");
// console.log(beverages);
// const candy = curriedFilter("candy");
// console.log(candy);

const findCategoryMostExpensive = (array) => {
  console.log("findCategoryMostExpensive");
  return array.reduce((acc, cur) => {
    return acc.price > cur.price ? acc : cur;
  }, 0);
};

const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const pipedFn = compose(findCategoryMostExpensive, curriedFilter)("fruit");
// console.log(pipedFn);

const Box = (x) => ({
  map: (f) => Box(f(x)),
  inspect: `Box(${x})`,
  fold: (f) => f(x),
});

const getFoodBetweenOneAndTwo = (data) =>
  Box(data)
    .map((x) => x.filter((f) => f.category == "beverages"))
    .map((x) => x.filter((f) => f.price > 1))
    .map((x) => x.filter((f) => f.price < 2))
    .map((x) => x.map((f) => f.price))
    .map((x) => x.map((f) => parseFloat(f)))
    .map((x) => x.reduce((a, c) => a + c), 0)
    .fold((x) => x);

const result = getFoodBetweenOneAndTwo(data);
console.log("result", result);
