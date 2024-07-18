
export const TIME_TYPE = {
  YYYY_MM_DD_HH_MM_SS: 'YYYY_MM_DD_HH_MM_SS',
  MOMENT_LT: 'MOMENT_LT',  //   23:54
  MOMENT_LTS: 'MOMENT_LTS',   // 23:54:00
  MOMENT_L: 'MOMENT_L',    //  2024/07/18
  MOMENT_l: 'MOMENT_l',     // 2024/7/18
  MOMENT_LL: 'MOMENT_LL',    // 2024年7月18日
  MOMENT_ll: 'MOMENT_ll',    // 2024年7月18日
  MOMENT_LLL: 'MOMENT_LLL',   // 2024年7月18日晚上11点54分
  MOMENT_lll: 'MOMENT_lll',   // 2024年7月18日 23:54
  MOMENT_LLLL: 'MOMENT_LLLL',  // 2024年7月18日星期四晚上11点54分
  MOMENT_llll: 'MOMENT_llll',  // 2024年7月18日星期四 23:55


  // moment().format('LT');   // 23:54
  // moment().format('LTS');  // 23:54:00
  // moment().format('L');    // 2024/07/18
  // moment().format('l');    // 2024/7/18
  // moment().format('LL');   // 2024年7月18日
  // moment().format('ll');   // 2024年7月18日
  // moment().format('LLL');  // 2024年7月18日晚上11点54分
  // moment().format('lll');  // 2024年7月18日 23:54
  // moment().format('LLLL'); // 2024年7月18日星期四晚上11点54分
  // moment().format('llll');
}


export const TIME_TYPE_MOMENT = {
  [TIME_TYPE.MOMENT_LT]: 'LT',
  [TIME_TYPE.MOMENT_LTS]: 'LTS',
  [TIME_TYPE.MOMENT_L]: 'L',
  [TIME_TYPE.MOMENT_l]: 'l',
  [TIME_TYPE.MOMENT_LL]: 'LL',
  [TIME_TYPE.MOMENT_ll]: 'll',
  [TIME_TYPE.MOMENT_LLL]: 'LLL',
  [TIME_TYPE.MOMENT_lll]: 'lll',
  [TIME_TYPE.MOMENT_LLLL]: 'LLLL',
  [TIME_TYPE.MOMENT_llll]: 'llll',
}

export const TIME_TYPE_DISPLAY = {


  [TIME_TYPE.YYYY_MM_DD_HH_MM_SS]: "2024年7月19日 0点17分43秒",
  [TIME_TYPE.MOMENT_LT]: "23:54",
  [TIME_TYPE.MOMENT_LTS]: "23:54:00",
  [TIME_TYPE.MOMENT_L]: "2024/07/18",
  [TIME_TYPE.MOMENT_l]: "2024/7/18",
  [TIME_TYPE.MOMENT_LL]: "2024年7月18日",
  [TIME_TYPE.MOMENT_ll]: "2024年7月18日",
  [TIME_TYPE.MOMENT_LLL]: "2024年7月18日晚上11点54分",
  [TIME_TYPE.MOMENT_lll]: "2024年7月18日 23:54",
  [TIME_TYPE.MOMENT_LLLL]: "2024年7月18日星期四晚上11点54分",
  [TIME_TYPE.MOMENT_llll]: "2024年7月18日星期四 23:55",
}


