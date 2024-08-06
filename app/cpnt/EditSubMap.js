import { SUB_TYPE } from "../util/util";
import { lazy, Suspense, useMemo } from 'react';
import useBoxStore from '../store/useBo';

const EditSubText = lazy(() => import("./editSubText"));
const EditSubImage = lazy(() => import("./editSubImage"));
const EditSubMuiChartGauge = lazy(() => import("./editSubMuiChartGauge"));
const EditSubMuiChartPie = lazy(() => import("./editSubMuiChartPie"));
const EditSubMuiChartBar = lazy(() => import("./EditSubMuiChartBar"));
const EditSubMuiChartLine = lazy(() => import("./EditSubMuiChartLine"));
const EditSubMuiChartSTACKING = lazy(() => import("./EditSubMuiChartSTACKING"));
const EditSubMuiChartSparkLine = lazy(() => import("./EditSubMuiChartSparkLine"));
const EditSubEcharts = lazy(() => import("./editSubEcharts"));
const EditSubSprite = lazy(() => import("./EditSubSprite"));
const EditSubTime = lazy(() => import("./EditSubTime"));
const EditSubVideo = lazy(() => import("./EditSubVideo"));
const EditSubMarquee = lazy(() => import("./EditSubMarquee"));
const EditSubTable = lazy(() => import("./EditSubTable"));
const EditSubTableOneRow = lazy(() => import("./EditSubTableOneRow"));
const EditSubSwiper = lazy(() => import("./EditSubSwiper"));
const EditSubRollOneLine = lazy(() => import("./EditSubRollOneLine"));
const EditSubSwiperImageText = lazy(() => import("./EditSubSwiperImageText"));
const EditSubSwiperOnePicture = lazy(() => import("./EditSubSwiperOnePicture"));
const EditSubButtonActiveOne = lazy(() => import("./EditSubButtonActiveOne"));
const EditSubThreeCanvas = lazy(() => import("./EditSubThreeCanvas"));
const EditMarqueeImageVideo = lazy(() => import("./EditMarqueeImageVideo"));
const EditSlowUpText = lazy(() => import("./EditSlowUpText"));
const EditSlowUpTextTwoColumn = lazy(() => import("./EditSlowUpTextTwoColumn"));
const EditFabricCanvas = lazy(() => import("./EditFabricCanvas"));
const EditSubChartjs = lazy(() => import("./EditSubChartjs"));
const EditSubTableBindData = lazy(() => import("./EditSubTableBindData"));
const EditSubSwiperVideo = lazy(() => import("./EditSubSwiperVideo"));
const EditSubOneLineRightToLeft = lazy(() => import("./EditSubOneLineRightToLeft"));
const EditSubOneLineRightToLeftM = lazy(() => import("./EditSubOneLineRightToLeftM"));
const EditSubRectangle = lazy(() => import("./EditSubRectangle"));
const EditSubEChartBar = lazy(() => import("./editSubEcharts"));

export const MAP_SUB_EDIT = {
  [SUB_TYPE.TEXT]: EditSubText,
  [SUB_TYPE.IMAGE]: EditSubImage,
  [SUB_TYPE.PIE_CHART]: EditSubMuiChartPie,
  [SUB_TYPE.GAUGE_CHART]: EditSubMuiChartGauge,
  [SUB_TYPE.BAR_CHART]: EditSubMuiChartBar,
  [SUB_TYPE.LINE_CHART]: EditSubMuiChartLine,
  [SUB_TYPE.STACKING_CHART]: EditSubMuiChartSTACKING,
  [SUB_TYPE.SPARKLINE_CHART]: EditSubMuiChartSparkLine,
  [SUB_TYPE.ECHART_CHART]: EditSubEcharts,
  [SUB_TYPE.SPRITE]: EditSubSprite,
  [SUB_TYPE.SPRITE_B]: EditSubSprite,
  [SUB_TYPE.TIME]: EditSubTime,
  [SUB_TYPE.VIDEO]: EditSubVideo,
  [SUB_TYPE.MARQUEE]: EditSubMarquee,
  [SUB_TYPE.TABLE]: EditSubTable,
  [SUB_TYPE.TABLE_ONE_ROW_ANIMATE]: EditSubTableOneRow,
  [SUB_TYPE.SWIPER]: EditSubSwiper,
  [SUB_TYPE.SWIPER_JS]: EditSubSwiper,
  [SUB_TYPE.ROLL_ONE_LINE]: EditSubRollOneLine,
  [SUB_TYPE.SWIPER_IMAGE_TEXT]: EditSubSwiperImageText,
  [SUB_TYPE.SWIPER_ONE_PICTURE]: EditSubSwiperOnePicture,
  [SUB_TYPE.BUTTON_ACTIVE_ONE]: EditSubButtonActiveOne,
  [SUB_TYPE.THREE_CANVAS]: EditSubThreeCanvas,
  [SUB_TYPE.MARQUEE_IMAGE_VIDEO]: EditMarqueeImageVideo,
  [SUB_TYPE.SLOW_UP_TEXT]: EditSlowUpText,
  [SUB_TYPE.SLOW_UP_TEXT_TWO_COLUMN]: EditSlowUpTextTwoColumn,
  [SUB_TYPE.FABRIC_CANVAS]: EditFabricCanvas,
  [SUB_TYPE.CHARTJS]: EditSubChartjs,
  [SUB_TYPE.TABLE_BIND_DATA]: EditSubTableBindData,
  [SUB_TYPE.SWIPER_VIDEO]: EditSubSwiperVideo,
  [SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT]: EditSubOneLineRightToLeft,
  [SUB_TYPE.ONE_LINE_RIGHT_TO_LEFT_MULTIPLE]: EditSubOneLineRightToLeftM,
  [SUB_TYPE.RECTANGLE]: EditSubRectangle,
  [SUB_TYPE.E_CHART_BAR]: EditSubEChartBar,
};
