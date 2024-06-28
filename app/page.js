"use client"
import { useEffect } from 'react';
import styles from './page.module.css';
import Box from './cpnt/box';
import { createBox } from './store/useBo';
import useBoxStore from './store/useBo';
import subRender from "./subRender.js";
import { createBoxPayload, createSubPayload } from "./util/util";

export default function Home() {
  const addBox = useBoxStore((state) => state.add);
  const boxArr = useBoxStore((state) => state.boxArr);
  const emptyBox = useBoxStore((state) => state.empty);

  useEffect(() => {
    const newBox = createBox(createBoxPayload(createSubPayload()));

    addBox(newBox);

    return () => {
      emptyBox();
    }
  }, [addBox]);

  const renderBoxArr = () => {

    return <>
      {boxArr.map((box, index) => {
        return <Box key={box.boxid}>
          {subRender(box.sub)}
        </Box>
      })}
    </>
  }

  return (
    <main className={styles.main}>
      {renderBoxArr()}
    </main>
  );
}
