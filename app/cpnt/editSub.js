import { SUB_TYPE } from "../util/util";
import useBoxStore from '../store/useBo';
import EditSubText from "./editSubText";
import EditSubImage from "./editSubImage";
import EditSubMuiChartGauge from "./editSubMuiChartGauge"
import EditSubMuiChartPie from "./editSubMuiChartPie"
import { useMemo } from 'react';
import EditSubMuiChart from "./EditSubMuiChart"
import EditSubMuiChartBar from "./EditSubMuiChartBar"


const MAP_SUB_EDIT = {
  [SUB_TYPE.TEXT]: EditSubText,
  [SUB_TYPE.IMAGE]: EditSubImage,
  [SUB_TYPE.PIE_CHART]: EditSubMuiChartPie,
  [SUB_TYPE.GAUGE_CHART]: EditSubMuiChartGauge,

  [SUB_TYPE.BAR_CHART]: EditSubMuiChartBar,
  [SUB_TYPE.LINE_CHART]: EditSubMuiChart,
  [SUB_TYPE.STACKING_CHART]: EditSubMuiChart,
  [SUB_TYPE.SPARKLINE_CHART]: EditSubMuiChart,
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
