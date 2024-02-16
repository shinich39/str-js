## str-js

String utilities in javascript.

## Usage

```js
import strJs from 'str-js';
```

- isNumber

```js
const result = strJs.isNumber("0.1");
// true
```

- width

```js
const data = "Lorem ipsum dolor";
const result = strJs.width(data, true);
// Ｌｏｒｅｍ　ｉｐｓｕｍ　ｄｏｌｏｒ

const result2 = strJs.width(result, false);
// Lorem ipsum dolor
```

- splitInt

```js
const result = strJs.splitInt("Lorem 39 08.31 ipsum dolor");
// [ 'Lorem ', '39', ' ', '08', '.', '31', ' ipsum dolor' ]
```

- splitFloat

```js
const result = strJs.splitFloat("Lorem 39 08.31 ipsum dolor");
// [ 'Lorem ', '39', ' ', '08.31', ' ipsum dolor' ]
```

- compare

```js
const a = "a-1";
const b = "a-10";
const result = strJs.compare(a, b);
// -1

const a = "a-10";
const b = "a-1";
const result = strJs.compare(a, b);
// 1
```

- diff

```js
const from = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
const to = `Lorem ipsum dolor sit test, consectetur adipiscing elit.`;
const result = strJs.diff(from, to);
// [{
//     "type": 0,
//     "data": "Lorem ipsum dolor sit "
// },{
//     "type": -1,
//     "data": "am"
// },{
//     "type": 1,
//     "data": "t"
// },{
//     "type": 0,
//     "data": "e"
// },{
//     "type": 1,
//     "data": "s"
// },{
//     "type": 0,
//     "data": "t, consectetur adipiscing elit."
// }]
```

- match

```js
const a = "Lorem ipsum dolor sit amet.";
const b = "Lorem IPSUM dolor sit AMET.";
const result = strJs.match(a, b);
// 0.6666
```