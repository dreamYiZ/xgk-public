import { mergeSub, mergeTwoSub } from "./mergeSub";

// 替换box
export const mergePageBo = (prePageList, pageBo) => {
  const newPageList = prePageList.map(page => {

    page.bo = page.bo.map(box => {
      let newBox;
      pageBo.forEach(pageBoItem => {
        if (pageBoItem.boxid === box.boxid) {
          newBox = pageBoItem
        }
      })
      return newBox || box;
    })
    return page
  }

  )
  return newPageList
}



// 只更新sub中改变了的值
export const mergePageBoUpdate = (prePageList, pageBoUpdate) => {

  const newPageList = prePageList.map(page => {

    page.bo = page.bo.map(box => {
      let newBox;
      pageBoUpdate.forEach(pageBoItem => {
        if (pageBoItem.boxid === box.boxid) {
          newBox = mergeTwoSub(box, pageBoItem)
        }
      })
      return newBox || box;
    })
    return page
  }

  )
  return newPageList
}
