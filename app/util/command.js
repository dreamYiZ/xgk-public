export const CMD = {
  CHANGE_SPRITE_STATE: 'CHANGE_SPRITE_STATE',
  HIDE: "HIDE",
}



export const CMD_DISPLAY = {
  [CMD.CHANGE_SPRITE_STATE]: '修改雪碧状态',
  [CMD.HIDE]: '隐藏'
}


export const CMD_TIME ={
  NOW: 'NOW',
  AFTER_3S: 'AFTER_3S',
}
export const CMD_TIME_DISPLAY ={
  [CMD_TIME.NOW]: '立即执行',
  [CMD_TIME.AFTER_3S]: '三秒之后',
}
