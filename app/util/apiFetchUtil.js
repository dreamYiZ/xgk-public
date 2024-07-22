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
