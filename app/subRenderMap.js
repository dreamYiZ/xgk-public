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
import SubRenderVideo from "./cpnt/SubRenderVideo";
import SubRenderMarquee from "./cpnt/SubRenderMarquee";
import SubRenderTable from "./cpnt/SubRenderTable";
import SubRenderTableOneRow from "./cpnt/SubRenderTableOneRow";
import SubRenderSwiper from "./cpnt/SubRenderSwiper";
import SubRenderRollOneLine from "./cpnt/SubRenderRollOneLine";


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
  [SUB_TYPE.VIDEO]: SubRenderVideo,
  [SUB_TYPE.MARQUEE]: SubRenderMarquee,
  [SUB_TYPE.TABLE]: SubRenderTable,
  [SUB_TYPE.TABLE_ONE_ROW_ANIMATE]: SubRenderTableOneRow,
  [SUB_TYPE.SWIPER]: SubRenderSwiper,
  [SUB_TYPE.SWIPER_JS]: SubRenderSwiper,
  [SUB_TYPE.ROLL_ONE_LINE]: SubRenderRollOneLine,
}


export { MAP_SUB_RENDER }
