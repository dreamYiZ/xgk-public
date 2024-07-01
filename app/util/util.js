import { SUB_TYPE, SUB_TYPE_DISPLAY, } from "./subType";
import { v4 as uuidv4 } from 'uuid';
import ppplog from "ppplog";
export { p } from "./cfg"




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
});



export const createBoxText = () => {
  return createBoxPayload(createSubPayload())
}

export const createSubImagePayload = () => {
  return {
    type: SUB_TYPE.IMAGE,
    url: 'next.svg'
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
  },
]
export const createBoxPieChart = () => {
  return {
    ...createBoxPayload(), width: '400px', height: '200px', sub: {
      type: SUB_TYPE.PIE_CHART,
      series: BASIC_SERIES_PIE_CHART,
      width: 400,
      height: 200,
    }
  }
}

export const BASIC_PAYLOAD_BAR_CHART = {
  xAxis: [{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }],
  series: [{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }],
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
    width: '400px',
    height: '200px',
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
    height: '120',
    sub: {
      type: SUB_TYPE.SPARKLINE_CHART,
      ...BASIC_PAYLOAD_SPARKLINE_CHART
    }
  }
}



export const MAP_TYPE_FACTORY = {
  [SUB_TYPE.TEXT]: createBoxText,
  [SUB_TYPE.IMAGE]: createBoxImage,
  [SUB_TYPE.PIE_CHART]: createBoxPieChart,
  [SUB_TYPE.BAR_CHART]: createBoxBarChart,
  [SUB_TYPE.LINE_CHART]: createBoxLineChart,
  [SUB_TYPE.GAUGE_CHART]: createBoxGaugeChart,
  [SUB_TYPE.STACKING_CHART]: createBoxStackingChart,
  [SUB_TYPE.SPARKLINE_CHART]: createBoxSparklineChart,

};


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


export { default as generateLicense } from "./generateLicense"
export { ANIMATE_TYPES_DISPLAY, ANIMATE_TYPES, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TIME_FUNCTION_TYPES_DISPLAY } from "./animateType";
export { SUB_TYPE_DISPLAY } from "./subType";
export { SUB_TYPE, ppplog }
