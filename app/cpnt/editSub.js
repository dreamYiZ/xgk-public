import { Suspense, useMemo } from 'react';
import useBoxStore from '../store/useBo';
import { MAP_SUB_EDIT } from "./EditSubMap";

function EditSub() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox]);

  if (!activeBoxId) {
    return null;
  }

  if (sub && MAP_SUB_EDIT.hasOwnProperty(sub.type)) {
    const Component = MAP_SUB_EDIT[sub.type];
    return <Suspense fallback={<div>Loading...</div>}>
      <Component sub={sub} activeBox={activeBox} />
    </Suspense>
  }

  return <div>
    TYPE NOT FOUND!{`[${sub?.type}]`}
  </div>;
}

export default EditSub;
