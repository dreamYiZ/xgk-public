import { SUB_TYPE } from "./util/util";
import SubRenderText from "./cpnt/subRenderText";
import SubRenderImage from "./cpnt/subRenderImage";
import SubRenderPieChart from "./cpnt/subRenderPieChart";
import SubRenderBarChart from './cpnt/subRenderBarChart';
import SubRenderLineChart from './cpnt/subRenderLineChart';
import SubRenderGaugeChart from './cpnt/subRenderGaugeChart';
import SubRenderStackingChart from './cpnt/subRenderStackingChart';
import SubRenderSparklineChart from './cpnt/subRenderSparklineChart';
import SubRenderEcharts from './cpnt/subRenderEcharts';
import SubRenderSprite from "./cpnt/SubRenderSprite";
import SubRenderTime from "./cpnt/SubRenderTime";


const MAP_SUB_RENDER = {
  [SUB_TYPE.TEXT]: SubRenderText,
  [SUB_TYPE.IMAGE]: SubRenderImage,
  [SUB_TYPE.PIE_CHART]: SubRenderPieChart,
  [SUB_TYPE.BAR_CHART]: SubRenderBarChart,
  [SUB_TYPE.LINE_CHART]: SubRenderLineChart,
  [SUB_TYPE.GAUGE_CHART]: SubRenderGaugeChart,
  [SUB_TYPE.STACKING_CHART]: SubRenderStackingChart,
  [SUB_TYPE.SPARKLINE_CHART]: SubRenderSparklineChart,
  [SUB_TYPE.ECHART_CHART]: SubRenderEcharts,
  [SUB_TYPE.SPRITE]: SubRenderSprite,
  [SUB_TYPE.SPRITE_B]: SubRenderSprite,
  [SUB_TYPE.TIME]: SubRenderTime,
}


function subRender(sub, box) {
  const Component = MAP_SUB_RENDER[sub.type];
  if (Component) {
    return <Component {...sub} box={box} />
  }

  return <div>
    TYPE NOT FOUND!{`[${sub.type}]`}
  </div>
}

export default subRender;
