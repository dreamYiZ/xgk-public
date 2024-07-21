import { SUB_TYPE, SUB_TYPE_DISPLAY, } from "./subType";
import { v4 as uuidv4 } from 'uuid';
import { FRAMEWORK_ID_SELECTOR, FRAMEWORK_ID } from "./cfg";
import { CMD } from "./command";
import { ppplog } from "./ppppp";
import {
  SPRINT_STATUS,
  SPRINT_STATUS_DISPLAY
} from "./spriteType";
import { MARQUEE_TYPE, MARQUEE_TYPE_DISPLAY } from "./marqueeType";
import {
  TIME_TYPE, TIME_TYPE_DISPLAY
} from "./timeType";
import {
  pxToNumber,
  stringToNumber,
  safeNumberIfString,
  canToBeNumber,
  maybeNumberOr,
} from "./numberUtil";
import { THREE_ANIMATE_TYPE } from "./threeAnimateTyle";
import { AUTO_NEXT_PAGE } from "./autoType";

export * from "./autoType";
export * from "./timeType";
export * from "./threeAnimateTyle";

const DEMO_FACE_URL = '/demo-face.jpeg';

export { p, FRAMEWORK_ID, FRAMEWORK_ID_SELECTOR } from "./cfg";

export {
  pxToNumber,
  stringToNumber,
  safeNumberIfString,
  canToBeNumber,
  maybeNumberOr,
}



export const createBoxPayload = (sub) => ({
  boxid: uuidv4(),
  position: 'absolute',
  zIndex: 1,
  groupId: 'group1',
  width: '100px',
  height: '30px',
  x: 0,
  y: 0,
  opacity: 1,
  sub: sub,
});


export const createSubPayload = () => ({
  type: SUB_TYPE.TEXT,
  fontSize: '25px',
  fontWeight: 900,
  content: "Hello, world",
  color: '#FFFFFF',
  font: null,
});



export const createBoxText = () => {
  return createBoxPayload(createSubPayload())
}

export const createSubImagePayload = () => {
  return {
    type: SUB_TYPE.IMAGE,
    url: '/next.svg'
  }
}

export const createBoxImage = () => {
  return { ...createBoxPayload(), sub: createSubImagePayload(), width: '100px', height: '100px' }
}

export const createMarketList = () => {
  return Object.entries(SUB_TYPE).map(([type, value]) => {
    return {
      type: value,
      typeName: SUB_TYPE_DISPLAY[value],
    };
  });
};



export const BASIC_SERIES_PIE_CHART = [
  {
    data: [
      { id: 0, value: 10, label: 'series A' },
      { id: 1, value: 15, label: 'series B' },
      { id: 2, value: 20, label: 'series C' },
    ],
    innerRadius: 30,
    outerRadius: 100,
    paddingAngle: 5,
    cornerRadius: 5,
    startAngle: -90,
    endAngle: 180,
    cx: 150,
    cy: 150,
  },
]
export const createBoxPieChart = () => {
  return {
    ...createBoxPayload(), width: '500px', height: '300px', sub: {
      type: SUB_TYPE.PIE_CHART,
      series: BASIC_SERIES_PIE_CHART,
      width: 500,
      height: 300,
    }
  }
}

export const BASIC_PAYLOAD_BAR_CHART = {
  xAxis: [{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }],
  series: [{ data: [4, 3, 5], color: 'red' }, { data: [1, 6, 3], color: 'green' }, { data: [2, 5, 6], color: 'yellow' }],
  width: 500,
  height: 300
}

export const createBoxBarChart = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '300px',
    sub: {
      type: SUB_TYPE.BAR_CHART,
      ...BASIC_PAYLOAD_BAR_CHART
    }
  }
}


export const BASIC_PAYLOAD_LINE_CHART = {
  xAxis: [{ data: [1, 2, 3, 5, 8, 10] }],
  series: [
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ],
  width: 500,
  height: 300
}

export const createBoxLineChart = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '300px',
    sub: {
      type: SUB_TYPE.LINE_CHART,
      ...BASIC_PAYLOAD_LINE_CHART
    }
  }
}

export const BASIC_PAYLOAD_GAUGE_CHART = {
  width: 100,
  height: 100,
  value: 50
}

export const createBoxGaugeChart = () => {
  return {
    ...createBoxPayload(),
    width: '100px',
    height: '100px',
    sub: {
      type: SUB_TYPE.GAUGE_CHART,
      ...BASIC_PAYLOAD_GAUGE_CHART
    }
  }
}

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: 'Series A',
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: 'Series B',
};
const seriesC = {
  data: [3, 2, 4, 5, 1],
  label: 'Series C',
};



export const BASIC_PAYLOAD_STACKING_CHART = {
  series: [
    { ...seriesA, stack: 'total' },
    { ...seriesB, stack: 'total' },
    { ...seriesC, stack: 'total' },
  ],
  width: 600,
  height: 300,
}

export const createBoxStackingChart = () => {
  return {
    ...createBoxPayload(),
    width: '600px',
    height: '300px',
    sub: {
      type: SUB_TYPE.STACKING_CHART,
      ...BASIC_PAYLOAD_STACKING_CHART
    }
  }
}


export const BASIC_PAYLOAD_SPARKLINE_CHART = {
  data: [1, 4, 2, 5, 7, 2, 4, 6],
  height: 100
}

export const createBoxSparklineChart = () => {
  return {
    ...createBoxPayload(),
    width: '400px',
    height: '120px',
    sub: {
      type: SUB_TYPE.SPARKLINE_CHART,
      ...BASIC_PAYLOAD_SPARKLINE_CHART
    }
  }
}

export const BASIC_PAYLOAD_ECHART = {

  option: {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }
    ]
  }
}

export const createBoxECharts = () => {
  return {
    ...createBoxPayload(),
    width: '600px',
    height: '400px',
    sub: {
      type: SUB_TYPE.ECHART_CHART,
      width: 600,
      height: 420,
      ...BASIC_PAYLOAD_ECHART
    }
  }
}



const BASIC_PAYLOAD_SPRINT = {
  status: SPRINT_STATUS.RUNNING,
  enabled: [SPRINT_STATUS.RUNNING],
  urlMap: {
    [SPRINT_STATUS.INITIAL]: '/sprite3.png',
    [SPRINT_STATUS.RUNNING]: '/sprite.png',
    [SPRINT_STATUS.IDLE]: '/sprite2.jpeg',
    [SPRINT_STATUS.STARTING]: null,
    [SPRINT_STATUS.STOP]: null,
  },
  speedMap: {
    [SPRINT_STATUS.INITIAL]: 1000,
    [SPRINT_STATUS.RUNNING]: 3000,
    [SPRINT_STATUS.IDLE]: 2000,
    [SPRINT_STATUS.STARTING]: null,
    [SPRINT_STATUS.STOP]: null,
  },
  sizeMap: {
    [SPRINT_STATUS.INITIAL]: { width: 91.6, height: 94.6 },
    [SPRINT_STATUS.RUNNING]: { width: 73.07, height: 75 },
    [SPRINT_STATUS.IDLE]: { width: 52, height: 46 },
    [SPRINT_STATUS.STARTING]: null,
    [SPRINT_STATUS.STOP]: null,
  },
  frameMap: {
    [SPRINT_STATUS.INITIAL]: 32,
    [SPRINT_STATUS.RUNNING]: 202,
    [SPRINT_STATUS.IDLE]: 20,
    [SPRINT_STATUS.STARTING]: null,
    [SPRINT_STATUS.STOP]: null,
  }
}

export const createSprite = () => {
  return {
    ...createBoxPayload(),
    width: '75px',
    height: '75px',
    sub: {
      type: SUB_TYPE.SPRITE,
      width: 75,
      height: 75,
      ...BASIC_PAYLOAD_SPRINT
    }
  }
}

export const createSpriteB = () => {
  return {
    ...createBoxPayload(),
    width: '75px',
    height: '75px',
    sub: {
      type: SUB_TYPE.SPRITE_B,
      width: 75,
      height: 75,
      ...BASIC_PAYLOAD_SPRINT,
      CMD: [CMD.CHANGE_SPRITE_STATE]
    }
  }
}




export const BASIC_PAYLOAD_TIME = {
  fontSize: '26',
  timeType: TIME_TYPE.YYYY_MM_DD_HH_MM_SS,
  color: '#FFFFFF',
}

export const createTime = () => {
  return {
    ...createBoxPayload(),
    width: '380px',
    height: '30px',
    sub: {
      type: SUB_TYPE.TIME,
      ...BASIC_PAYLOAD_TIME
    }
  }
}

export const BASIC_PAYLOAD_VIDEO = {
  videoJsOptions: {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    loop: true,
    sources: [
      //   {
      //   src: '/path/to/video.mp4',
      //   type: 'video/mp4'
      // }
    ]
  }

}

export const createBoxVideo = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '320px',
    sub: {
      type: SUB_TYPE.VIDEO,
      ...BASIC_PAYLOAD_VIDEO
    }
  }
}





export const BASIC_PAYLOAD_MARQUEE = {
  data: [
    ...new Array(30).fill().map((i, idx) => {
      return 'demo blablablablalalalblablablablablablablablablablablablablablablabl' + '---' + idx
    })
  ],
  marqueeType: MARQUEE_TYPE.BASIC,
  color: '#000000',
  fontSize: 26,
  time: 16,
}

export const createMarquee = () => {
  return {
    ...createBoxPayload(),
    width: '400px',
    height: '200px',
    sub: {
      type: SUB_TYPE.MARQUEE,
      ...BASIC_PAYLOAD_MARQUEE
    }
  }
}


export const BASIC_PAYLOAD_TABLE = {
  tableHead: ['一', '二', '三', '四'],
  data: [...new Array(300).fill(1).map((i, idx) => [idx * 1, idx * 2, idx * 3, idx * 4])],
  color: '#000000',
  fontSize: 26,
  time: 16,
  pageRowCount: 5,
}

export const createBoxTable = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '400px',
    sub: {
      type: SUB_TYPE.TABLE,
      ...BASIC_PAYLOAD_TABLE
    }
  }
}

export const BASIC_PAYLOAD_TABLE_ONE_ROW = {
  tableHead: ['一', '二', '三', '四'],
  data: [...new Array(10).fill(1).map((i, idx) => [idx * 1, idx * 2, idx * 3, idx * 4])],
  color: '#000000',
  fontSize: 26,
  borderColor: '#000000',
  pageRowCount: 5,
  timeDuration: 6,
  lineHeight: 40,
  isEndFollowStart: true,
  headFontSize: 28
}

export const createBoxTableOneRow = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '400px',
    sub: {
      type: SUB_TYPE.TABLE_ONE_ROW_ANIMATE,
      ...BASIC_PAYLOAD_TABLE_ONE_ROW
    }
  }
}

const BASIC_PAYLOAD_SWIPER = {
  data: [
    ...new Array(10).fill().map((i, idx) => {
      return {
        id: uuidv4(),
        faceUrl: DEMO_FACE_URL,
        name: `Demo-${idx}`,
        description: `Demo description-${idx}`,
        comment: []
      }
    })
  ],
  faceWidth: 80,
  color: '#000000',
  nameFontSize: 28,
  descFontSize: 22,
  commentFontSize: 22,
  timeDuration: 3,
}

export const createBoxSwiper = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '400px',
    sub: {
      type: SUB_TYPE.SWIPER,
      ...BASIC_PAYLOAD_SWIPER
    }
  }
}

const BASIC_PAYLOAD_SWIPER_JS = {
  data: [
    ...new Array(10).fill().map((i, idx) => {
      return {
        id: uuidv4(),
        faceUrl: DEMO_FACE_URL,
        name: `Demo-${idx}`,
        description: `Demo description-${idx}`,
        comment: [
          ...new Array(10).fill().map((i, idx) => {
            return {
              id: uuidv4(),
              text: `Demo comment-${idx}`,
            }
          })
        ]
      }
    })
  ],
  commentTime: 1,
  faceWidth: 80,
  color: '#000000',
  nameFontSize: 28,
  descFontSize: 22,
  commentFontSize: 22,
  timeDuration: 3,
  slidesPerView: 3,
}


export const createBoxSwiperJS = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '400px',
    sub: {
      type: SUB_TYPE.SWIPER_JS,
      ...BASIC_PAYLOAD_SWIPER_JS
    }
  }
}


const BASIC_PAYLOAD_ROLL_ONE_LINE = {
  data: [
    ...new Array(10).fill().map((i, idx) => {
      return 'demo blablablablalalalblablablablablablablablablablablablablablablabl' + '---' + idx
    })
  ],
  color: '#000000',
  fontSize: 26,
  lineHeight: 36,
  timeDuration: 3,
  perPage: 5,
}


export const createBoxRollOneLine = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '400px',
    sub: {
      type: SUB_TYPE.ROLL_ONE_LINE,
      ...BASIC_PAYLOAD_ROLL_ONE_LINE
    }
  }
}

const BASIC_PAYLOAD_SWIPER_IMAGE_TEXT = {
  data: [
    ...new Array(10).fill().map((i, idx) => {
      return {
        id: uuidv4(),
        img: '/demo-face.jpeg',
        textArr: new Array(5).fill().map((_i, _idx) => {
          return 'bla'.repeat(99)
        }),
        imgLeft: idx % 2 === 0
      }
    })
  ],
  color: '#000000',
  fontSize: 26,
  lineHeight: 36,
  textWidth: 300,
  timeDuration: 3,
  imageWidth: 160,
  imageHeight: 160,
  width: 540,
  height: 340,
  textMarginBottom: 20
}


export const createBoxSwiperImageText = () => {
  return {
    ...createBoxPayload(),
    width: '570px',
    height: '400px',
    sub: {
      type: SUB_TYPE.SWIPER_IMAGE_TEXT,
      ...BASIC_PAYLOAD_SWIPER_IMAGE_TEXT
    }
  }
}



const BASIC_PAYLOAD_SWIPER_ONE_PICTURE = {
  data: [
    ...new Array(10).fill().map((i, idx) => {
      return {
        id: uuidv4(),
        img: '/demo-face.jpeg',
        text: '',
      }
    })
  ],
  // color: '#000000',
  // fontSize: 26,
  // lineHeight: 36,
  // textWidth: 300,
  timeDuration: 3,
  // imageWidth: 160,
  // imageHeight: 160,
  // width: 540,
  // height: 340,
  // textMarginBottom: 20
}


export const createBoxSwiperOnePicture = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '360px',
    sub: {
      type: SUB_TYPE.SWIPER_ONE_PICTURE,
      ...BASIC_PAYLOAD_SWIPER_ONE_PICTURE
    }
  }
}


export const BASIC_PAYLOAD_BUTTON_ACTIVE_ONE = {
  imgUrl: '/demo-face.jpeg',
  imgActiveUrl: '/demo-cat-2.jpg',
  groupid: null,
  isActive: false,
}

export const createBoxButtonActiveOne = () => {
  return {
    ...createBoxPayload(),
    width: '200px',
    height: '50px',
    sub: {
      type: SUB_TYPE.BUTTON_ACTIVE_ONE,
      ...BASIC_PAYLOAD_BUTTON_ACTIVE_ONE
    }
  }
}


const BASIC_PAYLOAD_THREE_CANVAS = {
  modelUrl: '/upload/free.glb',
  animateType: THREE_ANIMATE_TYPE.AUTO,
  modelScale: 3,
}

export const createBoxThreeCanvas = () => {
  return {
    ...createBoxPayload(),
    width: '500px',
    height: '500px',
    sub: {
      type: SUB_TYPE.THREE_CANVAS,
      ...BASIC_PAYLOAD_THREE_CANVAS
    }
  }
}



export const createMarketTemplates = () => {
  return []
}


export const handleFullscreen = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
    document.documentElement.msRequestFullscreen();
  }
}

export const DATA_TYPE = {
  NONE: 'NONE',
  SERIES_DATA_OBJECT: 'SERIES_DATA_OBJECT',
  SERIES_DATA_NUMERIC: 'SERIES_DATA_NUMERIC',
  SERIES_DATA_EMPTY: 'SERIES_DATA_EMPTY',
  SERIES_NO_DATA: 'SERIES_NO_DATA',
}

export const getSeriesDataType = (seriesRecord) => {
  if (!seriesRecord) {
    return DATA_TYPE.NONE
  }

  if (!seriesRecord.data) {
    return DATA_TYPE.SERIES_NO_DATA
  }

  if (!seriesRecord.data[0]) {
    return DATA_TYPE.SERIES_DATA_EMPTY
  }

  if (typeof seriesRecord.data[0] === 'number') {
    return DATA_TYPE.SERIES_DATA_NUMERIC
  }

  if (typeof seriesRecord.data[0] === 'object') {
    return DATA_TYPE.SERIES_DATA_OBJECT
  }
}

export const parseFontSize = (fontSize) => {
  if (typeof fontSize === 'string') {
    return parseFloat(fontSize.replace('px', ''));
  }
  return fontSize;
};



export const addWindowErrorHandler = () => {
  return false;
  window.onerror = function () {
    // 创建一个按钮
    var btn = document.createElement("button");
    btn.innerHTML = "清除localStorage";
    btn.onclick = function () {
      // 清除localStorage
      localStorage.clear();
      alert("localStorage已清除");
    };

    // 设置按钮样式，使其显示在页面中心
    btn.style.position = 'fixed';
    btn.style.top = '50%';
    btn.style.left = '50%';
    btn.style.transform = 'translate(-50%, -50%)';
    btn.style.padding = '10px 20px';
    btn.style.fontSize = '20px';

    // 将按钮添加到body中
    document.body.appendChild(btn);
  };
}



export const getSubById = (boxArr, boxid) => {
  return boxArr.find(i => i.boxid === boxid)?.sub
}

export const validApiUrl = (url) => {
  // 检查 url 是否是一个字符串
  if (typeof url !== 'string') {
    return false;
  }

  // 检查 url 是否有长度
  if (url.length === 0) {
    return false;
  }

  // 检查 url 是否包含 "http" 或 "https"
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }

  // 如果所有的检查都通过了，返回 true
  return true;
};

export const combineBoxAndSubArr = (boxArr, mergedBoxArr) => {
  return boxArr.map(
    preBox => {
      return {
        ...preBox,
        sub: getSubById(mergedBoxArr, preBox.boxid)
      }
    }
  )
}



// A debounce function that takes a function and a delay as parameters
function debounce(func, delay) {
  // A timer variable to track the delay period
  let timer;
  // Return a function that takes arguments
  return function (...args) {
    // Clear the previous timer if any
    clearTimeout(timer);
    // Set a new timer that will execute the function after the delay period
    timer = setTimeout(() => {
      // Apply the function with arguments
      func.apply(this, args);
    }, delay);
  };
}


// A throttle function that takes a function and an interval as parameters
function throttle(func, interval) {
  // A flag variable to track whether the function is running or not
  let isRunning = false;
  // Return a function that takes arguments
  return function (...args) {
    // If the function is not running
    if (!isRunning) {
      // Set the flag to true
      isRunning = true;
      // Apply the function with arguments
      func.apply(this, args);
      // Set a timer that will reset the flag after the interval
      setTimeout(() => {
        // Set the flag to false
        isRunning = false;
      }, interval);
    }
  };
}

export const getRelativePosX = (x) => {
  return x - 300 + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollLeft

}
export const getRelativePosY = (y) => {
  return y + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollTop
}


export { loadInitConfig } from "./init";
export { default as generateLicense } from "./generateLicense"
export {
  ANIMATE_TYPES_DISPLAY,
  ANIMATE_TYPES,
  ANIMATE_TIME_FUNCTION_TYPES,
  ANIMATE_TIME_FUNCTION_TYPES_DISPLAY
} from "./animateType";
export { SUB_TYPE_DISPLAY } from "./subType";
export { SUB_TYPE }
export { mergeSub } from "./mergeSub";
export { default as Bideo } from "./bbv";
export {
  CMD,
  CMD_DISPLAY, CMD_TIME,
  CMD_TIME_DISPLAY
} from "./command";
export { xgkConsole } from "./xgk";
export { ppplog };
export { throttle, debounce };
export {
  SPRINT_STATUS, SPRINT_STATUS_DISPLAY
};
export { MARQUEE_TYPE, MARQUEE_TYPE_DISPLAY } from "./marqueeType";


export const MAP_TYPE_FACTORY = {
  [SUB_TYPE.TEXT]: createBoxText,
  [SUB_TYPE.IMAGE]: createBoxImage,
  [SUB_TYPE.PIE_CHART]: createBoxPieChart,
  [SUB_TYPE.BAR_CHART]: createBoxBarChart,
  [SUB_TYPE.LINE_CHART]: createBoxLineChart,
  [SUB_TYPE.GAUGE_CHART]: createBoxGaugeChart,
  [SUB_TYPE.STACKING_CHART]: createBoxStackingChart,
  [SUB_TYPE.SPARKLINE_CHART]: createBoxSparklineChart,
  [SUB_TYPE.ECHART_CHART]: createBoxECharts,
  [SUB_TYPE.SPRITE]: createSprite,
  [SUB_TYPE.TIME]: createTime,
  [SUB_TYPE.SPRITE_B]: createSpriteB,
  [SUB_TYPE.VIDEO]: createBoxVideo,
  [SUB_TYPE.MARQUEE]: createMarquee,
  [SUB_TYPE.TABLE]: createBoxTable,
  [SUB_TYPE.TABLE_ONE_ROW_ANIMATE]: createBoxTableOneRow,
  [SUB_TYPE.SWIPER]: createBoxSwiper,
  [SUB_TYPE.SWIPER_JS]: createBoxSwiperJS,
  [SUB_TYPE.ROLL_ONE_LINE]: createBoxRollOneLine,
  [SUB_TYPE.SWIPER_IMAGE_TEXT]: createBoxSwiperImageText,
  [SUB_TYPE.SWIPER_ONE_PICTURE]: createBoxSwiperOnePicture,
  [SUB_TYPE.BUTTON_ACTIVE_ONE]: createBoxButtonActiveOne,
  [SUB_TYPE.THREE_CANVAS]: createBoxThreeCanvas,
};
