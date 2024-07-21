import useBoxStore from '../store/useBo';
import { MAP_SUB_EDIT } from "./EditSubMap";


import { useMemo } from 'react';


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
