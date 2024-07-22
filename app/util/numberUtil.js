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
