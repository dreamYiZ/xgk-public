"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.sass';
import Box from './cpnt/box';
import { createBox } from './store/useBo';
import useBoxStore from './store/useBo';
import subRender from "./subRender.js";
import useGlobalStore, { BG_TYPE } from './store/useGlobal';
import { createBoxText } from "./util/util";
import MouseXY from "./cpnt/mouseXY";

import dynamic from 'next/dynamic';

const BoxNoSSR = dynamic(() => import('./cpnt/box'), { ssr: false });


export default function Home() {

  const [isClient, setIsClient] = useState(false)
  const addBox = useBoxStore((state) => state.add);
  const boxArr = useBoxStore((state) => state.boxArr);
  const emptyBox = useBoxStore((state) => state.empty);

  const { bg } = useGlobalStore();  // Get the 'bg' state

  const isEmpty = useBoxStore((state) => state.isEmpty);
  const mainRef = useRef(null);  // 新增一个 ref 来引用 <main> 元素
  const { showWhenEditing, screenWidth, screenHeight } = useGlobalStore();  // 获取 'screenWidth' 和 'screenHeight' 状态
  const shouldEmpty = false;



  useEffect(() => {
    setIsClient(true)
  }, [])


  useEffect(() => {
    if (isEmpty()) {
      const newBox = createBox(createBoxText());
      addBox(newBox);
    }

    return () => {
      shouldEmpty && emptyBox();
    }
  }, [addBox, isEmpty]);



  useEffect(() => {
    // TODO: Video BG
    return () => { };
    var bv = new Bideo();
    bv.init({
      videoEl: document.querySelector("#background_video"),

      container: document.querySelector("body"),

      resize: true,

      isMobile: window.matchMedia("(max-width: 768px)").matches,

      src: [
        {
          src: VideoFullv,
          type: "video/mp4",
        },
      ],

      onLoad: function () {
        if (document.querySelector("#video_cover")) {
          // @ts-ignore-enable
          document.querySelector("#video_cover").style.display = "none";
          // @ts-ignore-disable
        }
      },
    });
    // }
  }, []);

  const renderBoxArr = () => {
    return <>
      {boxArr.map((box, index) => {
        return <BoxNoSSR {...box} key={box.boxid} mainRef={mainRef}>
          {subRender(box.sub, box)}
        </BoxNoSSR>
      })}
    </>
  }

  const mainStyle = {
    width: `${screenWidth}px`,
    height: `${screenHeight}px`,
    background: bg.type === BG_TYPE.IMAGE ? `url(${bg.filename}) no-repeat center center / cover` : '',
  };  // Set the background of the <main> element based on the 'bg' state


  if (!isClient) {
    return '';
  }
  return (
    <main id="main-id-to-render-box-arr" ref={mainRef} style={mainStyle} className={styles.main} suppressHydrationWarning>
      <div style={{ width: "100%", height: "100%" }}>
        {renderBoxArr()}
        {showWhenEditing && <MouseXY />}
      </div>
    </main>)


}
