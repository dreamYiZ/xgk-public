export const CMD = {
  CHANGE_SPRITE_STATE: 'CHANGE_SPRITE_STATE',
  HIDE: "HIDE",
  GOTO: "GOTO",
  TOGGLE: "TOGGLE",
  NEXT_PAGE: "NEXT_PAGE",
  NEXT_PAGE_CUSTOM: "NEXT_PAGE_CUSTOM",
  CALL_API: 'CALL_API',
  SHOW: 'SHOW',
}



export const CMD_DISPLAY = {
  [CMD.CHANGE_SPRITE_STATE]: '修改雪碧状态',
  [CMD.HIDE]: '隐藏',
  [CMD.SHOW]: '展示',
  [CMD.TOGGLE]: 'toggle展示隐藏',
  [CMD.GOTO]: '切换页面',
  [CMD.NEXT_PAGE]: '下一页面',
  [CMD.NEXT_PAGE_CUSTOM]: "分时换页",
  [CMD.CALL_API]: "调用接口",
}


export const ALL_BOX_HAVE_CMD = [
  CMD.HIDE,
  CMD.SHOW,
  CMD.TOGGLE,
]

export const CMD_TIME = {
  NOW: 'NOW',
  AFTER_3S: 'AFTER_3S',
}
export const CMD_TIME_DISPLAY = {
  [CMD_TIME.NOW]: '立即执行',
  [CMD_TIME.AFTER_3S]: '三秒之后',
}
