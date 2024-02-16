import strjs from './index.js';

const a = "Lorem ipsum dolor 33.33 99.99 sit amet.";
const b = "Lorem ipsum dolor 33.33 99.99 sit amet";

console.log(
  strjs.match(a, b)
);