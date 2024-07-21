import useBoxStore from '../store/useBo';
import { useMemo } from 'react';

export default function () {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  return {
    boxArr,
    activeBoxId,
    activeBox,
    sub,
    changeById,
  }
}
