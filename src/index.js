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
