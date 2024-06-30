"use client"
import { useEffect, useRef } from 'react';
import styles from './page.module.sass';
import Box from './cpnt/box';
import { createBox } from './store/useBo';
import useBoxStore from './store/useBo';
import subRender from "./subRender.js";
import useGlobalStore from './store/useGlobal';
import { createBoxPayload, createSubPayload } from "./util/util";
import ppplog from "ppplog";

export default function Home() {
  const addBox = useBoxStore((state) => state.add);
  const boxArr = useBoxStore((state) => state.boxArr);
  const emptyBox = useBoxStore((state) => state.empty);
  const isEmpty = useBoxStore((state) => state.isEmpty);
  const mainRef = useRef(null);  // 新增一个 ref 来引用 <main> 元素
  const { screenWidth, screenHeight } = useGlobalStore();  // 获取 'screenWidth' 和 'screenHeight' 状态
  const shouldEmpty = false;

  useEffect(() => {
    if (isEmpty()) {
      ppplog('createBox');
      const newBox = createBox(createBoxPayload(createSubPayload()));
      addBox(newBox);
    }

    return () => {
      shouldEmpty && emptyBox();
    }
  }, [addBox, isEmpty]);

  const renderBoxArr = () => {
    ppplog('boxArr', boxArr);
    return <>
      {boxArr.map((box, index) => {
        return <Box {...box} key={box.boxid} mainRef={mainRef}>
          {subRender(box.sub)}
        </Box>
      })}
    </>
  }

  const mainStyle = { width: `${screenWidth}px`, height: `${screenHeight}px` };  // 使用 'screenWidth' 和 'screenHeight' 设置 <main> 元素的宽度和高度

  return (
    <main ref={mainRef} style={mainStyle} className={styles.main}>
      {renderBoxArr()}
    </main>
  );
}
