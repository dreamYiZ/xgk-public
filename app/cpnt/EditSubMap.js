import { SUB_TYPE } from "../util/util";
import EditSubText from "./editSubText";
import EditSubImage from "./editSubImage";
import EditSubMuiChartGauge from "./editSubMuiChartGauge";
import EditSubMuiChartPie from "./editSubMuiChartPie";
import EditSubMuiChartBar from "./EditSubMuiChartBar";
import EditSubMuiChartLine from "./EditSubMuiChartLine";
import EditSubMuiChartSTACKING from "./EditSubMuiChartSTACKING";
import EditSubMuiChartSparkLine from "./EditSubMuiChartSparkLine";
import EditSubEcharts from "./editSubEcharts";
import EditSubSprite from "./EditSubSprite";
import EditSubTime from "./EditSubTime";
import EditSubVideo from "./EditSubVideo";
import EditSubMarquee from "./EditSubMarquee";
import EditSubTable from "./EditSubTable";
import EditSubTableOneRow from "./EditSubTableOneRow";
import EditSubSwiper from "./EditSubSwiper";
import EditSubRollOneLine from "./EditSubRollOneLine";
import EditSubSwiperImageText from "./EditSubSwiperImageText";
import EditSubSwiperOnePicture from "./EditSubSwiperOnePicture";
import EditSubButtonActiveOne from "./EditSubButtonActiveOne";
import EditSubThreeCanvas from "./EditSubThreeCanvas";
import EditMarqueeImageVideo from "./EditMarqueeImageVideo";

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
}


