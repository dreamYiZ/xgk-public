import { SPRINT_STATUS } from "../util/util";
import React, { useState, useEffect } from 'react';

export default function (
  { box, ...sub }
) {

  const [currentStatus, setCurrentStatus] = useState([SPRINT_STATUS.RUNNING])

  const [spriteImageUrl, setSpriteImageUrl] = useState();
  const [spriteWidth, setSpriteWidth] = useState();
  const [spriteHeight, setSpriteHeight] = useState();
  const [spriteSpeed, setSpriteSpeed] = useState(1000);
  const [sourceWidth, setSourceWidth] = useState();
  const [sourceHeight, setSourceHeight] = useState();


  useEffect(() => {
    if (currentStatus) {
      setSpriteImageUrl(sub.urlMap[currentStatus])
      setSpriteWidth(sub.sizeMap[currentStatus].width)
      setSpriteHeight(sub.sizeMap[currentStatus].height)
      setSpriteSpeed(sub.speedMap[currentStatus])
      // 创建一个新的 Image 对象
      const img = new Image();
      // 设置图片的 URL
      img.src = sub.urlMap[currentStatus];
      // 当图片加载完成后
      img.onload = () => {

        // console.log('img.onload', img, img.width, img.height);
        // 获取图片的宽度和高度
        if (img.width) {
          setSourceWidth(img.width);
        }
        if (img.height) {
          setSourceHeight(img.height);
        }
      };


    } else {
      setSpriteImageUrl(null);
      setSpriteWidth(null);
      setSpriteHeight(null);

    }



  }, [currentStatus, sub])


  return <div>
    <Sprite spriteImageUrl={spriteImageUrl}
      spriteWidth={spriteWidth}
      spriteHeight={spriteHeight}
      sourceWidth={sourceWidth}
      sourceHeight={sourceHeight}
      spriteSpeed={spriteSpeed}
    />
  </div>
}




function Sprite({
  spriteImageUrl,
  spriteWidth,
  spriteHeight,
  sourceWidth,
  sourceHeight,
  spriteSpeed,
}) {


  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (spriteImageUrl &&
      spriteWidth &&
      spriteHeight &&
      sourceWidth &&
      sourceHeight &&
      spriteSpeed) {

      const animateSprite = () => {

        // console.log('props:',
        //   spriteImageUrl,
        //   spriteWidth,
        //   spriteHeight,
        //   sourceWidth,
        //   sourceHeight,
        //   spriteSpeed
        // );


        const framesPerRow = sourceWidth / spriteWidth;
        const totalFrames = Math.ceil(sourceWidth * sourceHeight / (spriteHeight * spriteWidth))

        setBackgroundPosition((prevPos) => {
          const currentIndex = Math.abs(prevPos.x) / spriteWidth + framesPerRow * (Math.abs(prevPos.y) / spriteHeight);
          const nextIndex = currentIndex + 1;

          if (nextIndex >= totalFrames) {
            return { x: 0, y: 0 };
          }

          const nextX = -nextIndex * spriteWidth % sourceWidth;
          const nextY = -Math.floor(nextIndex / framesPerRow) * spriteHeight;
          // console.log('nextX:', nextX, 'nextY:', nextY);
          return { x: nextX, y: nextY };
        });
        // console.log('spriteSpeed', spriteSpeed);
        setTimeout(animateSprite, spriteSpeed); // Call setTimeout again to repeat the animation
      };

      animateSprite(); // Start the animation
      return () => clearTimeout(animateSprite); // Clear the timeout when the component unmounts
    }
    return () => { }
  }, [
    spriteImageUrl,
    spriteWidth,
    spriteHeight,
    sourceWidth,
    sourceHeight,
    spriteSpeed,
  ]);


  return (
    <div
      style={{
        width: `${spriteWidth}px`,
        height: `${spriteHeight}px`,
        backgroundImage: `url(${spriteImageUrl})`,
        backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
      }}
    />
  );
}
