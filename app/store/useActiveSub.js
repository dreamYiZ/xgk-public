import { useMemo } from 'react';
import useBoxStore from '../store/useBo';

export function useActiveSub() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const activeSub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const { changeById } = useBoxStore();

  return { activeSub, activeBox, activeBoxId, changeById };
}
