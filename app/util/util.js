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
    height: '420px',
    sub: {
      type: SUB_TYPE.ECHART_CHART,
      width: 600,
      height: 420,
      ...BASIC_PAYLOAD_ECHART
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
  [SUB_TYPE.ECHART_CHART]: createBoxECharts,
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


export { loadInitConfig } from "./init";
export { default as generateLicense } from "./generateLicense"
export { ANIMATE_TYPES_DISPLAY, ANIMATE_TYPES, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TIME_FUNCTION_TYPES_DISPLAY } from "./animateType";
export { SUB_TYPE_DISPLAY } from "./subType";
export { SUB_TYPE, ppplog }
export { mergeSub } from "./mergeSub";
