export const pxToNumber = (pxValue) => {
  if (typeof pxValue === 'number') {
    return pxValue;
  }
  if (typeof pxValue === 'string') {
    return parseFloat(pxValue.replace('px', ''));
  }
  return pxValue
}

export const stringToNumber = (maybeNumber) => {
  if (typeof maybeNumber === 'number') {
    return maybeNumber;
  }
  if (typeof maybeNumber === 'string') {
    let parsed = parseFloat(maybeNumber);
    if (typeof parsed === 'number') {
      return parsed;
    }
  }
}

export const safeNumberIfString = (maybeNumber) => {
  if (typeof maybeNumber === 'number') {
    return maybeNumber;
  }
  if (typeof maybeNumber === 'string') {
    let parsed = parseFloat(maybeNumber);
    if (typeof parsed === 'number') {
      return parsed;
    }
    return 10
  }
  return 10
}

export const canToBeNumber = (stringOrNumber) => {
  const number = parseFloat(stringOrNumber);
  // Check if the string representation of the parsed number is the same as the original string
  return !isNaN(number) && number.toString() === stringOrNumber.toString();
};

export const maybeNumberOr = (someNumber, defaultValue) => {
  if (canToBeNumber(someNumber)) {
    return parseFloat(someNumber)
  }

  return defaultValue
}


export const trimStringToIntOrNull = (stringOrNumber) => {
  const shouldBeInt = parseInt(stringOrNumber);

  if (Number.isInteger(shouldBeInt)) {
    return shouldBeInt;
  }
  return null;
}

export const ifNumberToPx = (stringOrNumber) => {
  if(canToBeNumber(stringOrNumber)){
    return `${stringOrNumber}px`
  }
  return stringOrNumber
}


// 当somePxOrEm = '100px' | '2em' | '50%'
//  的时候，
//  返回 100 | 2 | 50
export const renderWithoutUnit = (somePxOrEmOrUnit) => {
  // Use a regular expression to match the numeric part of the string
  const match = somePxOrEmOrUnit.match(/(\d+(\.\d+)?)/);
  // If a match is found, return the numeric part as a number
  return match ? parseFloat(match[0]) : null;
}

// Examples:
// console.log(renderWithoutUnit('100px')); // 100
// console.log(renderWithoutUnit('2em'));   // 2
// console.log(renderWithoutUnit('50%'));   // 50


// 当somePxOrEm = '100px' | '2em' | '50%'
//  的时候，
//  返回 px | em | %

export const getUnitFromSomeSizeValue = (somePxOrEmOrUnit) => {
  // Use a regular expression to match the unit part of the string
  const match = somePxOrEmOrUnit.match(/[a-z%]+$/);
  // If a match is found, return the unit part
  return match ? match[0] : null;
}

// Examples:
// console.log(getUnitFromSomeSizeValue('100px')); // px
// console.log(getUnitFromSomeSizeValue('2em'));   // em
// console.log(getUnitFromSomeSizeValue('50%'));   // %



// 当  someValue = 10 | 20 | 3
//     someUnit  = px | em | %
// 的时候
// 返回         '10px' | '20em' | '3%'
export const setSomeSizeWithUnit = (someValue, someUnit) => {
  return `${someValue}${someUnit}`;
}

// Examples:
// console.log(setSomeSizeWithUnit(10, 'px')); // '10px'
// console.log(setSomeSizeWithUnit(20, 'em')); // '20em'
// console.log(setSomeSizeWithUnit(3, '%'));   // '3%'
