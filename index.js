'use strict';

function isNumber(str) {
  return !Number.isNaN(parseFloat(str)) && Number.isFinite(parseFloat(str));
}

function splitInt(str) {
  return str.split(/([0-9]+)/).filter(Boolean);
}

function splitFloat(str) {
  return str.split(/([0-9]{0,}\.{0,1}[0-9]{1,})+/).filter(Boolean);
}

function convertWidth(str, toFullWidth) {
  const index = toFullWidth ? 1 : 0;
  const regexp = [/[！-～]/, /[!-~]/g];
  const width = toFullWidth ? 0xfee0 : -0xfee0;
  const blank = toFullWidth ? "　" : " ";

  return str
    .replace(regexp[index], function(ch) {
      return String.fromCharCode(ch.charCodeAt(0) + width);
    })
    .replace(/[^\S\r\n]/g, function(ch) {
      return blank;
    })
}

function getDifferences(from, to) {
  const IS_MATCHED = 0;
  const IS_INSERTED = 1;
  const IS_DELETED = -1;

  // create dynamic programming table
  const dpt = [];
  for (let i = 0; i < from.length + 1; i++) {
    dpt.push([]);
    for (let j = 0; j < to.length + 1; j++) {
      dpt[i][j] = 0;
    }
  }

  for (let i = 1; i <= from.length; i++) {
    const charA = from.charAt(i - 1);
    for (let j = 1; j <= to.length; j++) {
      const charB = to.charAt(j - 1);
      if (charA === charB) {
        dpt[i][j] = dpt[i - 1][j - 1] + 1;
      } else {
        dpt[i][j] = Math.max(dpt[i - 1][j], dpt[i][j - 1]);
      }
    }
  }

  let result = [],
      i = from.length,
      j = to.length;

  while (i > 0 || j > 0) {
    const prev = result[result.length - 1];
    const charA = from.charAt(i - 1);
    const charB = to.charAt(j - 1);
    if (i > 0 && j > 0 && charA === charB) {
      if (prev && prev.type === 0) {
        prev.data = charA + prev.data;
      } else {
        result.push({ type: IS_MATCHED, data: charA });
      }
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dpt[i][j - 1] >= dpt[i - 1][j])) {
      if (prev && prev.type === 1) {
        prev.data = charB + prev.data;
      } else {
        result.push({ type: IS_INSERTED, data: charB });
      }
      j--;
    } else if (i > 0 && (j === 0 || dpt[i][j - 1] < dpt[i - 1][j])) {
      if (prev && prev.type === -1) {
        prev.data = charA + prev.data;
      } else {
        result.push({ type: IS_DELETED, data: charA });
      }
      i--;
    }
  }

  return result.reverse();
}

function getAccuracy(a, b) {
  // create dynamic programming table
  const dpt = [];
  for (let i = 0; i < a.length + 1; i++) {
    dpt.push([]);
    for (let j = 0; j < b.length + 1; j++) {
      dpt[i][j] = 0;
    }
  }

  for (let i = 1; i <= a.length; i++) {
    const charA = a.charAt(i - 1);
    for (let j = 1; j <= b.length; j++) {
      const charB = b.charAt(j - 1);
      if (charA === charB) {
        dpt[i][j] = dpt[i - 1][j - 1] + 1;
      } else {
        dpt[i][j] = Math.max(dpt[i - 1][j], dpt[i][j - 1]);
      }
    }
  }

  let matches = 0,
      i = a.length,
      j = b.length;

  while (i > 0 || j > 0) {
    const charA = a.charAt(i - 1);
    const CharB = b.charAt(j - 1);
    if (i > 0 && j > 0 && charA === CharB) {
      matches++;
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dpt[i][j - 1] >= dpt[i - 1][j])) {
      j--;
    } else if (i > 0 && (j === 0 || dpt[i][j - 1] < dpt[i - 1][j])) {
      i--;
    }
  }

  return (matches * 2) / (a.length + b.length);
}

// function indexesOf(str, targets) {
//   const table = [];
//   for (let i = 0; i < str.length + 1; i++) {
//     table.push([]);
//     for (let j = 0; j < targets.length + 1; j++) {
//       table[i][j] = 0;
//     }
//   }

//   for (let i = 0; i < targets.length; i++) {
//     const target = targets[i];
//     let count = 1,
//         offset = 0,
//         index = str.indexOf(target, offset);
//     while(index > -1) {
//       offset = index + target.length;
//       for (let j = index; j < offset; j++) {
//         table[i][j] = count;
//       }
//       count++;
//       index = str.indexOf(target, offset);
//     }
//   }

//   const result = [];
//   let j = 0;
//   while (j < str.length) {
//     for (let i = 0; i < targets.length; i++) {
//       if (table[i][j] > 0) {
//         result.push({
//           index: j,
//           data: targets[i],
//         });
//         j += targets[i].length;
//         break;
//       }
//     }
//     j += 1;
//   }

//   return result;
// }

// function splitByIndexes(str, indexes) {
//   const result = [""];
//   for (let i = 0; i < str.length; i++) {
//     const char = str.charAt(i);
//     const index = indexes.indexOf(i);
//     if (index > -1) {
//       result.push(char);
//     } else {
//       result[result.length - 1] += char;
//     }
//   }
//   return result;
// }

function compareAB(a, b) {
  
  function composeResult(n) {
    if (n > 0) {
      return 1;
    }
    if (n < 0) {
      return -1;
    }
    return 0;
  }

  function compareNumber(strA, strB) {
    return composeResult(parseInt(strA) - parseInt(strB));
  }

  function compareString(strA, strB) {
    const len = Math.max(strA.length, strB.length);
    for (let i = 0; i < len; i++) {
      const charA = strA.charAt(i);
      const charB = strB.charAt(i);
      if (charA === "") {
        return -1;
      }
      if (charB === "") {
        return 1;
      }
      const pointA = charA.codePointAt(0);
      const pointB = charB.codePointAt(0);
      if (pointA > pointB) {
        return 1;
      }
      if (pointA < pointB) {
        return -1;
      }
    }
    return 0;
  }

  const arrA = splitInt(a);
  const arrB = splitInt(b);
  const len = Math.max(arrA.length, arrB.length);
  for (let i = 0; i < len; i++) {
    const strA = arrA[i];
    const strB = arrB[i];
    if (strA !== strB) {
      if (typeof(strB) === "undefined") {
        return 1;
      } else if (typeof(strA) === "undefined") {
        return -1;
      } else if (isNumber(strA) && isNumber(strB)) {
        return compareNumber(strA, strB);
      } else {
        return compareString(strA, strB);
      }
    }
  }
}

export default {
  isNumber: isNumber,
  splitInt: splitInt,
  splitFloat: splitFloat,
  width: convertWidth,
  compare: compareAB,
  diff: getDifferences,
  match: getAccuracy,
}
