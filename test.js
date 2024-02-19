import strJs from './index.js';

const str = "Lorem ipsum dolor sit amet.";
const salt = "!@#$";

const _a = strJs.xor(str, salt);
console.log(
  1, _a,
);

console.log(
  2, strJs.xor(_a, salt)
)