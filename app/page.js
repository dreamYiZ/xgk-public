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
  const isEmpty = useBoxStore((state) => state.isEmpty);
  const shouldEmpty = false;

  useEffect(() => {
    if (isEmpty()) {
      console.log('createBox');
      const newBox = createBox(createBoxPayload(createSubPayload()));
      addBox(newBox);
    }

    return () => {
      shouldEmpty && emptyBox();
    }
  }, [addBox, isEmpty]);

  const renderBoxArr = () => {

    return <>
      {boxArr.map((box, index) => {
        return <Box {...box} key={box.boxid}>
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
