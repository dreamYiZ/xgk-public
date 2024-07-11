"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.sass';
import Box from './cpnt/box';
import { createBox } from './store/useBo';
import useBoxStore from './store/useBo';
import subRender from "./subRender.js";
import useGlobalStore, { BG_TYPE } from './store/useGlobal';
import { createBoxText, Bideo } from "./util/util";
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
  const { showWhenEditing, screenWidth, screenHeight, bgVideo } = useGlobalStore();  // 获取 'screenWidth' 和 'screenHeight' 状态
  const shouldEmpty = false;

  const [showVideoBg, setShowVideoBg] = useState(false);

  console.log('bgVideo', bgVideo);

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
    if (isClient && bgVideo) {
      var bv = new Bideo();
      bv.init({
        videoEl: document.querySelector("#background_video"),

        container: document.querySelector("body"),

        resize: true,

        isMobile: window.matchMedia("(max-width: 768px)").matches,

        src: [
          {
            src: bgVideo,
            type: "video/mp4",
          },
        ],

        onLoad: function () {
          setShowVideoBg(true);

          if (document.querySelector("#video_cover")) {
            // @ts-ignore-enable
            document.querySelector("#video_cover").style.display = "none";
            // @ts-ignore-disable
          }
        },
      });
    }

  }, [bgVideo, isClient]);

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
    backgroundImage: bg.type === BG_TYPE.IMAGE ? `url(${bg.filename})` : '',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };  // Set the background of the <main> element based on the 'bg' state


  if (!isClient) {
    return '';
  }

  return (
    <main id="main-id-to-render-box-arr" ref={mainRef} style={mainStyle} className={styles.main} suppressHydrationWarning>
      <video id="background_video" className={styles.background_video} loop muted style={{ width: '100%', height: '100%', display: `${showVideoBg ? 'block' : 'none'}` }}></video>
      <div style={{ width: "100%", height: "100%" }} >
        {renderBoxArr()}
        {showWhenEditing && <MouseXY />}
      </div>
    </main>)


}
