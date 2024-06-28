"use client"
import { useEffect } from 'react';
import styles from './page.module.css';
import Box from './cpnt/box';
import { createBox } from './store/useBo';
import useBoxStore from './store/useBo';
import subRender from "./subRender.js";

export default function Home() {
  const addBox = useBoxStore((state) => state.add);
  const boxArr = useBoxStore((state) => state.boxArr);
  const emptyBox = useBoxStore((state) => state.empty);

  useEffect(() => {
    const newBox = createBox({
      position: 'absolute',
      zIndex: 1,
      groupId: 'group1',
      width: '100px',
      height: '100px',
      opacity: 0.5,
      sub: [],
    });

    addBox(newBox);

    return () => {
      emptyBox();
    }
  }, [addBox]);

  const renderBoxArr = () => {

    console.log('boxArr', boxArr);
    return <>
      {boxArr.map((box, index) => {
        return <Box key={index}>
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
