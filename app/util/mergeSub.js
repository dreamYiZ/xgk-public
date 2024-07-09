

const isPrimitive = (val) => {
  return val !== Object(val);
}

const isArrayAndAllItemIsPrimitive = (val) => {
  return Array.isArray(val) && val.every(isPrimitive);
}

const mergeTwoSub = (preSub, newSub) => {
  let resultSub = { ...preSub };
  for (const key in newSub) {
    if (isPrimitive(newSub[key]) || isArrayAndAllItemIsPrimitive(newSub[key])) {
      resultSub[key] = newSub[key];
    } else if (typeof newSub[key] === 'object') {
      if (Array.isArray(newSub[key])) {

        resultSub[key] = resultSub[key].map(
          (item, idx) => {
            return mergeTwoSub(item, newSub[key][idx])
          }
        );

      } else {

        resultSub[key] = mergeTwoSub(preSub[key], newSub[key]);
      }
    }
  }
  return resultSub;
}

const mergeSub = (preBoxArr, newBoxArr) => {
  // 创建一个新的数组来存储合并后的结果
  let mergedBoxArr = [...preBoxArr];

  // 遍历 newBoxArr
  newBoxArr.forEach(newBox => {
    // 在 preBoxArr 中查找相同 boxid 的元素
    const index = preBoxArr.findIndex(preBox => preBox.boxid === newBox.boxid);

    if (index !== -1) {
      // 如果找到了相同 boxid 的元素，只更新存在的字段
      mergedBoxArr[index].sub = mergeTwoSub(mergedBoxArr[index].sub, newBox.sub);
    }
  });

  return mergedBoxArr;
};


module.exports = {
  mergeSub
}
