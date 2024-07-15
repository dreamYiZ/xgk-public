import { SUB_TYPE } from "../util/util";
import useBoxStore from '../store/useBo';
import EditSubText from "./editSubText";
import EditSubImage from "./editSubImage";
import EditSubMuiChartGauge from "./editSubMuiChartGauge";
import EditSubMuiChartPie from "./editSubMuiChartPie";
import { useMemo } from 'react';
import EditSubMuiChartBar from "./EditSubMuiChartBar";
import EditSubMuiChartLine from "./EditSubMuiChartLine";
import EditSubMuiChartSTACKING from "./EditSubMuiChartSTACKING";
import EditSubMuiChartSparkLine from "./EditSubMuiChartSparkLine";
import EditSubEcharts from "./editSubEcharts";
import EditSubSprite from "./EditSubSprite"
import EditSubTime from "./EditSubTime"
import EditSubVideo from "./EditSubVideo"
import EditSubMarquee from "./EditSubMarquee"


const MAP_SUB_EDIT = {
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
}

function EditSub() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox]);

  const Component = MAP_SUB_EDIT[sub?.type];

  if (!activeBoxId) {
    return null;
  }
  if (Component) {
    return <Component sub={sub} activeBox={activeBox} />
  }

  return <div>
    TYPE NOT FOUND!{`[${sub?.type}]`}
  </div>
}

export default EditSub;
