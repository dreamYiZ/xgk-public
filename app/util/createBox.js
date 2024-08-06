import { createBoxPayload, SUB_TYPE } from "./util";



const PAYLOAD_E_CHART_BAR = {
  reInit: 20,
  option: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }
}

export const createBoxEChartBar = () => {
  return {
    ...createBoxPayload(),
    zIndex: 12,
    width: 600,
    height: 400,
    sub: {
      type: SUB_TYPE.E_CHART_BAR,
      ...PAYLOAD_E_CHART_BAR
    }
  }
}
