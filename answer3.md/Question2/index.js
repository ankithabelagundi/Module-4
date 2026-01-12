import boxen from "boxen";

const message = "I am using my first external module!";
const title = "Hurray!!!";

const classicBox = boxen(message, {
  title: title,
  padding: 1,
  borderStyle: "classic"
});

const singleDoubleBox = boxen(message, {
  title: title,
  padding: 1,
  borderStyle: "singleDouble"
});

const roundBox = boxen(message, {
  title: title,
  padding: 1,
  borderStyle: "round"
});

console.log(classicBox);
console.log();
console.log(singleDoubleBox);
console.log();
console.log(roundBox);
