import { lazy, Suspense } from 'react';
import { SUB_TYPE } from "./util/util";

const SubRenderText = lazy(() => import("./cpnt/subRenderText"));
const SubRenderImage = lazy(() => import("./cpnt/subRenderImage"));
const SubRenderPieChart = lazy(() => import("./cpnt/subRenderPieChart"));
const SubRenderBarChart = lazy(() => import('./cpnt/subRenderBarChart'));
const SubRenderLineChart = lazy(() => import('./cpnt/subRenderLineChart'));
const SubRenderGaugeChart = lazy(() => import('./cpnt/subRenderGaugeChart'));
const SubRenderStackingChart = lazy(() => import('./cpnt/subRenderStackingChart'));
const SubRenderSparklineChart = lazy(() => import('./cpnt/subRenderSparklineChart'));
const SubRenderEcharts = lazy(() => import('./cpnt/subRenderEcharts'));
const SubRenderSprite = lazy(() => import("./cpnt/SubRenderSprite"));
const SubRenderTime = lazy(() => import("./cpnt/SubRenderTime"));
const SubRenderVideo = lazy(() => import("./cpnt/SubRenderVideo"));
const SubRenderMarquee = lazy(() => import("./cpnt/SubRenderMarquee"));
const SubRenderTable = lazy(() => import("./cpnt/SubRenderTable"));
const SubRenderTableOneRow = lazy(() => import("./cpnt/SubRenderTableOneRow"));
const SubRenderSwiper = lazy(() => import("./cpnt/SubRenderSwiper"));
const SubRenderRollOneLine = lazy(() => import("./cpnt/SubRenderRollOneLine"));
const SubRenderSwiperImageText = lazy(() => import("./cpnt/SubRenderSwiperImageText"));
const SubRenderSwiperOnePicture = lazy(() => import("./cpnt/SubRenderSwiperOnePicture"));
const SubRenderButtonActiveOne = lazy(() => import("./cpnt/SubRenderButtonActiveOne"));
const SubRenderThreeCanvas = lazy(() => import("./cpnt/SubRenderThreeCanvas"));
const SubRenderMarqueeImageVideo = lazy(() => import("./cpnt/SubRenderMarqueeImageVideo"));
const SubRenderSlowUpText = lazy(() => import("./cpnt/SubRenderSlowUpText"));
const SubRenderSlowUpTextTwoColumn = lazy(() => import("./cpnt/SubRenderSlowUpTextTwoColumn"));
const SubRenderFabricCanvas = lazy(() => import("./cpnt/SubRenderFabricCanvas"));
const SubRenderChartjs = lazy(() => import("./cpnt/SubRenderChartjs"));
const SubRenderTableBindData = lazy(() => import("./cpnt/SubRenderTableBindData"));
const SubRenderSwiperVideo = lazy(() => import("./cpnt/subRenderSwiperVideo"));
const SubRenderOneLineRightToLeft = lazy(() => import("./cpnt/SubRenderOneLineRightToLeft"));
const SubRenderOneLineRightToLeftM = lazy(() => import("./cpnt/SubRenderOneLineRightToLeftM"));
const SubRenderRectangle = lazy(() => import("./cpnt/SubRenderRectangle"));
const SubRenderIframe = lazy(() => import("./cpnt/SubRenderIframe"));
const SubRenderButton = lazy(() => import("./cpnt/SubRenderButton"));
const SubRenderImageRoll = lazy(() => import("./cpnt/SubRenderImageRoll"));

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
  [SUB_TYPE.SWIPER_IMAGE_TEXT]: SubRenderSwiperImageText,
  [SUB_TYPE.SWIPER_ONE_PICTURE]: SubRenderSwiperOnePicture,
  [SUB_TYPE.BUTTON_ACTIVE_ONE]: SubRenderButtonActiveOne,
  [SUB_TYPE.THREE_CANVAS]: SubRenderThreeCanvas,
  [SUB_TYPE.MARQUEE_IMAGE_VIDEO]: SubRenderMarqueeImageVideo,
  [SUB_TYPE.SLOW_UP_TEXT]: SubRenderSlowUpText,
  [SUB_TYPE.SLOW_UP_TEXT_TWO_COLUMN]: SubRenderSlowUpTextTwoColumn,
  [SUB_TYPE.FABRIC_CANVAS]: SubRenderFabricCanvas,
  [SUB_TYPE.CHARTJS]: SubRenderChartjs,
  [SUB_TYPE.TABLE_BIND_DATA]: SubRenderTableBindData,
  [SUB_TYPE.SWIPER_VIDEO]: SubRenderSwiperVideo,
  [SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT]: SubRenderOneLineRightToLeft,
  [SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT_MULTIPLE]: SubRenderOneLineRightToLeftM,
  [SUB_TYPE.RECTANGLE]: SubRenderRectangle,
  [SUB_TYPE.E_CHART_BAR]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_RING]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_RING_2]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_PIE]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_STACKED_AREA]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_STACKED_LINE]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_LINE]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_STACK_BAR_V]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_STACK_BAR_H]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_RADAR]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_GAUGE]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_GAUGE_TEMPERATURE]: SubRenderEcharts,
  [SUB_TYPE.E_CHART_GAUGE_SPEED]: SubRenderEcharts,
  [SUB_TYPE.IFRAME]: SubRenderIframe,
  [SUB_TYPE.BUTTON]: SubRenderButton,
  [SUB_TYPE.IMAGE_ROLL]: SubRenderImageRoll,

};

export { MAP_SUB_RENDER }
