import {
  createBoxIFrame, createBoxButton,
  createBoxImageRoll, createBoxVideoRoll,
} from "./createBox";
import { SUB_TYPE } from "./subType";
import { SUB_TYPE_DISPLAY } from "./subTypeDisplay";
import { v4 as uuidv4 } from 'uuid';
import {
  FRAMEWORK_ID_SELECTOR,
  FRAMEWORK_ID,
  MAIN_ID_TO_RENDER_BOX_CONTAINER_SELECTOR,
  MAIN_ID_TO_RENDER_BOX_SELECTOR
} from "./cfg";
import { CMD, ALL_BOX_HAVE_CMD } from "./command";
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
import { ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO } from "./animateTypeMarqueeImageVideo";
import { fingerprint } from "./finger";
import * as createEChart from "./createEchart";


export * from "./subType";
export * from "./constant";
export * from "./cfg";
export * from "./numberUtil";
export * from "./animateTypeMarqueeImageVideo";
export * from "./autoType";
export * from "./timeType";
export * from "./threeAnimateTyle";
export * from "./apiFetchUtil";
export * from "./finger";

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
  disableMove: false,
  disableResize: false,

  hidden: false,
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
    url: '/static/bg2.jpeg'
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
  reInit: 30,
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
    muted: true,
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
  commentColor: '#000000',
  commentHeaderText: "评论",
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

export const THREE_AUTO_ANIMATION_DIRECTION = {
  HORIZONTAL_FORWARD_POINTER: 'HORIZONTAL_FORWARD_POINTER',
  HORIZONTAL_REVERSE_POINTER: 'HORIZONTAL_REVERSE_POINTER',
}
export const THREE_AUTO_ANIMATION_DIRECTION_DISPLAY = {
  [THREE_AUTO_ANIMATION_DIRECTION.HORIZONTAL_FORWARD_POINTER]: '水平顺时针',
  [THREE_AUTO_ANIMATION_DIRECTION.HORIZONTAL_REVERSE_POINTER]: '水平逆时针',
}

const BASIC_PAYLOAD_THREE_CANVAS = {
  modelUrl: '/upload/free.glb',
  animateType: THREE_ANIMATE_TYPE.AUTO,
  modelScale: 3,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  speed: 1,
  direction: THREE_AUTO_ANIMATION_DIRECTION.HORIZONTAL_REVERSE_POINTER
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

const BASIC_PAYLOAD_MARQUEE_IMAGE_VIDEO = {
  data: new Array(100).fill().map((_, idx) => {
    return {
      id: uuidv4(),
      videoUrl: '/upload/demo-video.mp4',
      imageUrl: DEMO_FACE_URL,

    }
  }),
  imageWidth: 100,
  imageHeight: 80,
  animateType: ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO.GO_LEFT,
  videoWidth: 400,
  videoHeight: 280,
}

export const createBoxMarqueeImageVideo = () => {
  return {
    ...createBoxPayload(),
    width: '900px',
    height: '600px',
    sub: {
      type: SUB_TYPE.MARQUEE_IMAGE_VIDEO,
      ...BASIC_PAYLOAD_MARQUEE_IMAGE_VIDEO
    }
  }
}

export const BASIC_PAYLOAD_SLOW_UP_TEXT = {
  data: new Array(6).fill().map((_, idx) => {
    return {
      id: uuidv4(),
      text: idx + 'blah'.repeat(7),
      secondText: idx + 'right-blah'.repeat(1)
    }
  }),
  fontSize: 22,
  animationTime: 10,
  rowHeight: 50,
  color: '#000000'
}

export const createBoxSlowUpText = () => {
  return {
    ...createBoxPayload(),
    width: '250px',
    height: '500px',
    sub: {
      type: SUB_TYPE.SLOW_UP_TEXT,
      ...BASIC_PAYLOAD_SLOW_UP_TEXT
    }
  }
}

export const BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN = {
  data: new Array(6).fill().map((_, idx) => {
    return {
      id: uuidv4(),
      text: idx + 'blah'.repeat(7),
      secondText: idx + 'right-blah'.repeat(1)
    }
  }),
  fontSize: 22,
  fontSizeSecond: 22,
  animationTime: 10,
  rowHeight: 50,
  color: '#000000',
  colorSecond: '#000000',
}

export const createBoxSlowUpTextTwoColumn = () => {
  return {
    ...createBoxPayload(),
    width: '320px',
    height: '500px',
    sub: {
      type: SUB_TYPE.SLOW_UP_TEXT_TWO_COLUMN,
      ...BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN
    }
  }
}

export const BASIC_PAYLOAD_FABRIC_CANVAS = {
  data: null,
}

export const createBoxFabricCanvas = () => {
  return {
    ...createBoxPayload(),
    zIndex: 999,
    width: '320px',
    height: '500px',
    disableMove: true,
    sub: {
      type: SUB_TYPE.FABRIC_CANVAS,
      ...BASIC_PAYLOAD_FABRIC_CANVAS
    }
  }
}


export const BASIC_PAYLOAD_CHARTJS = {
  payload: {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  },
}

export const createBoxChartjs = () => {
  return {
    ...createBoxPayload(),
    zIndex: 1,
    width: '520px',
    height: '360px',
    sub: {
      type: SUB_TYPE.CHARTJS,
      ...BASIC_PAYLOAD_CHARTJS
    }
  }
}


export const BASIC_PAYLOAD_TABLE_BIND_DATA = {
  tableHeadArray: ['姓名', '语文', '数学', '英语'],
  tableWidthArray: [120, 80, 80, 80],
  tableHeadFontSize: '28',
  tableHeadColor: '#FFFFFF',
  tableBodyColor: '#FFFFFF',
  tableBodyFontSize: '22',
  lineHeight: 40,
  headHeight: 50,
  hasBorder: true,
  borderColor: '#FFFFFF',

  tableBodyArray: [
    ['章三', 55, 77, 44],
    ['李四', 68, 82, 79],
    ['王五', 90, 70, 60],
    ['赵六', 75, 85, 95],
    ['孙七', 80, 88, 92],
    ['周八', 62, 78, 55],
    ['吴九', 70, 65, 80],
    ['郑十', 85, 90, 88],
  ],
}



export const createBoxTableBindData = () => {
  return {
    ...createBoxPayload(),
    zIndex: 1,
    width: '420px',
    height: '460px',
    sub: {
      type: SUB_TYPE.TABLE_BIND_DATA,
      ...BASIC_PAYLOAD_TABLE_BIND_DATA
    }
  }
}

const BASIC_PAYLOAD_SWIPER_VIDEO = {
  fullscreen: false,
  videoSrcList: [],
  muted: true,
}

export const createSwiperVideo = () => {
  return {
    ...createBoxPayload(),
    zIndex: 1,
    width: '520px',
    height: '460px',
    sub: {
      type: SUB_TYPE.SWIPER_VIDEO,
      ...BASIC_PAYLOAD_SWIPER_VIDEO
    }
  }
}

const BASIC_PAYLOAD_ONE_LINE_RIGHT_TO_LEFT = {
  content: `　责人之心责己，恕己之心恕人。
　　守口如瓶，防意如城。
　　宁可人负我，切莫我负人。
　　再三须慎意，第一莫欺心。
　　虎生犹可近，人熟不堪亲。
　　来说是非者，便是是非人。
　　远水难救近火，远亲不如近邻。
　　有茶有酒多兄弟，急难何曾见一人？
　　人情似纸张张薄，世事如棋局局新。
　　山中也有千年树，世上难逢百岁人。
　　力微休负重，言轻莫劝人。
　　无钱休入众，遭难莫寻亲。
　　平生不做皱眉事，世上应无切齿人。`,
  speed: 3,
  fontSize: 26,
  fontWeight: 500,
  color: '#FFFFFF',
  endSpace: 20,
}

export const createBoxOneLineR2L = () => {
  return {
    ...createBoxPayload(),
    zIndex: 10,
    width: 300,
    height: 50,
    sub: {
      type: SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT,
      ...BASIC_PAYLOAD_ONE_LINE_RIGHT_TO_LEFT
    }
  }
}

const BASIC_PAYLOAD_ONE_LINE_RIGHT_TO_LEFT_M = {
  content: [
    `观今宜鉴古，无古不成今。
　　知己知彼，将心比心。
　　酒逢知己饮，诗向会人吟。相识满天下，知心能几人？
　　相逢好似初相识，到老终无怨恨心。
　　近水知鱼性，近山识鸟音。
　　易涨易退山溪水，易反易覆小人心。`,
    `钱财如粪土，仁义值千金。
　　流水下滩非有意，白云出岫本无心。
　　当时若不登高望，谁信东流海洋深？
　　路遥知马力，日久见人心。
　　两人一般心，无钱堪买金；一人一般心，有钱难买针。
　　相见易得好，久处难为人。
　　马行无力皆因瘦，人不风流只为贫。`,
    `贫居闹市无人问，富在深山有远亲。
　　谁人背后无人说，哪个人前不说人？
　　有钱道真语，无钱语不真。
　　不信但看筵中酒，杯杯先劝有钱人。
　　闹里有钱，静处安身。
　　来如风雨，去似微尘。
　　长江后浪推前浪，世上新人换旧人。
　　近水楼台先得月，向阳花木早逢春。`,
  ],
  speed: 3,
  fontSize: 26,
  fontWeight: 500,
  color: '#FFFFFF',
  endSpace: 20,
}

export const createBoxOneLineR2LM = () => {
  return {
    ...createBoxPayload(),
    zIndex: 1,
    width: 300,
    height: 50,
    sub: {
      type: SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT_MULTIPLE,
      ...BASIC_PAYLOAD_ONE_LINE_RIGHT_TO_LEFT_M
    }
  }
}


const PAYLOAD_RECTANGLE = {
  backgroundColor: '#00AA99',
}

export const createBoxRectangle = () => {
  return {
    ...createBoxPayload(),
    zIndex: 1,
    width: 300,
    height: 50,
    sub: {
      type: SUB_TYPE.RECTANGLE,
      ...PAYLOAD_RECTANGLE
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
        sub: getSubById(mergedBoxArr, preBox.boxid) ?? preBox.sub ?? null
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
  ppplog('getRelativePosX:', x);

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
export { SUB_TYPE_DISPLAY } from "./subTypeDisplay";
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


export const emptyUndefined = (obj) => {
  if (!obj) { return {} }
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== 'undefined') {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};


export const MAP_TYPE_FACTORY_A = {
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
  [SUB_TYPE.MARQUEE_IMAGE_VIDEO]: createBoxMarqueeImageVideo,
  [SUB_TYPE.SLOW_UP_TEXT]: createBoxSlowUpText,
  [SUB_TYPE.SLOW_UP_TEXT_TWO_COLUMN]: createBoxSlowUpTextTwoColumn,
  [SUB_TYPE.FABRIC_CANVAS]: createBoxFabricCanvas,
  [SUB_TYPE.CHARTJS]: createBoxChartjs,
  [SUB_TYPE.TABLE_BIND_DATA]: createBoxTableBindData,
  [SUB_TYPE.SWIPER_VIDEO]: createSwiperVideo,
  [SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT]: createBoxOneLineR2L,
  [SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT_MULTIPLE]: createBoxOneLineR2LM,
  [SUB_TYPE.RECTANGLE]: createBoxRectangle,
  [SUB_TYPE.E_CHART_BAR]: createEChart.createBoxEChartBar,
  [SUB_TYPE.E_CHART_RING]: createEChart.createBoxEChartRing,
  [SUB_TYPE.E_CHART_RING_2]: createEChart.createBoxEChartRing2,
  [SUB_TYPE.E_CHART_PIE]: createEChart.createBoxEChartPie,
  [SUB_TYPE.E_CHART_STACKED_AREA]: createEChart.createBoxEChartStackedArea,
  [SUB_TYPE.E_CHART_STACKED_LINE]: createEChart.createBoxEChartStackedLine,
  [SUB_TYPE.E_CHART_LINE]: createEChart.createBoxEChartLine,
  [SUB_TYPE.E_CHART_STACK_BAR_V]: createEChart.createBoxEChartStackedBarV,
  [SUB_TYPE.E_CHART_STACK_BAR_H]: createEChart.createBoxEChartStackedBarH,
  [SUB_TYPE.E_CHART_RADAR]: createEChart.createBoxEChartRadar,
  [SUB_TYPE.E_CHART_GAUGE]: createEChart.createBoxEChartGauge,
  [SUB_TYPE.E_CHART_GAUGE_TEMPERATURE]: createEChart.createBoxEChartGaugeTemperature,
  [SUB_TYPE.E_CHART_GAUGE_SPEED]: createEChart.createBoxEChartGaugeSpeed,
  [SUB_TYPE.IFRAME]: createBoxIFrame,
  [SUB_TYPE.BUTTON]: createBoxButton,
  [SUB_TYPE.IMAGE_ROLL]: createBoxImageRoll,
  [SUB_TYPE.VIDEO_ROLL]: createBoxVideoRoll,

};


const addAllBoxHaveCmd = (subTypeCreateMap, allBoxHaveCmd) => {
  let newMapSubTypeCreateBox = {};
  Object.keys(subTypeCreateMap).forEach(key => {
    newMapSubTypeCreateBox[key] = () => {
      const createdBox = subTypeCreateMap[key]();
      if (!createdBox.sub.CMD) {
        createdBox.sub.CMD = [];
      }

      createdBox.sub.CMD = [...new Set([...createdBox.sub.CMD, ...allBoxHaveCmd])];
      return createdBox;
    }
  });
  return newMapSubTypeCreateBox;
};

export const MAP_TYPE_FACTORY = Object.freeze(addAllBoxHaveCmd(MAP_TYPE_FACTORY_A, ALL_BOX_HAVE_CMD));
