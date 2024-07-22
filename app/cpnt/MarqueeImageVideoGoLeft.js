import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from 'react';
import { ppplog } from "../util/util";

export default function ({ sub, box }) {
  const [styledData, setStyledData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [colCount, setColCount] = useState(0);
  const [rowSpeeds, setRowSpeeds] = useState([]);
  const boxRef = useRef(null);

  const {
    imageWidth,
    imageHeight,
    data,
  } = sub;

  useEffect(() => {
    const _newData = data.map((imgItem, imgItemIdx) => {
      const row = Math.floor(imgItemIdx / colCount);
      const col = imgItemIdx % colCount;

      const newImgItem = {
        ...imgItem,
        left: col * imageWidth,
        top: row * imageHeight
      };

      return newImgItem;
    });

    setStyledData(_newData);
  }, [data, rowCount, colCount]);

  useEffect(() => {
    if (boxRef.current) {
      const boxHeight = boxRef.current.clientHeight;
      const boxWidth = boxRef.current.clientWidth;

      ppplog('boxHeight', boxHeight);
      ppplog('boxWidth', boxWidth);

      const numRows = Math.floor(boxHeight / imageHeight);

      console.log(`The box can display ${numRows} rows.`);

      setRowCount(numRows);
      setColCount(Math.ceil(data.length / numRows));
    }
  }, [data, imageHeight, imageWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyledData(prevData => {
        return prevData.map(imgItem => {
          const row = Math.floor(styledData.indexOf(imgItem) / colCount);
          const speed = rowSpeeds[row] || (imageWidth / 30); // Default speed if rowSpeed is not set

          let newLeft = imgItem.left - speed; // Move left based on the row speed
          if (newLeft + imageWidth <= 0) {
            newLeft = (colCount - 1) * imageWidth;
          }
          // todo: 最后一行，数量不够的时候，处理好，让结束和新的一轮imgItem的位置连接起来，而不是最后空出一些空白
          return { ...imgItem, left: newLeft };
        });
      });
    }, 1000 / 30); // 30 frames per second

    return () => clearInterval(interval);
  }, [colCount, imageWidth, rowSpeeds, styledData]);

  useEffect(() => {
    const setRandomSpeeds = () => {
      const speeds = Array(rowCount).fill(0).map(() => Math.random() * (imageWidth / 15 - imageWidth / 45) + imageWidth / 45);
      setRowSpeeds(speeds);
    };

    setRandomSpeeds();
    const speedInterval = setInterval(setRandomSpeeds, 30000); // Update speeds every 30 seconds

    return () => clearInterval(speedInterval);
  }, [rowCount, imageWidth]);

  return (
    <Box ref={boxRef} sx={{ position: 'relative', height: "100%", width: "100%", overflow: 'hidden' }}>
      {styledData.map((imgItem, index) => (
        <Box key={index} p={2}>
          <img
            src={imgItem.imageUrl}
            width={`${imageWidth - 12}px`}
            height={`${imageHeight - 12}px`}
            style={{
              position: 'absolute',
              left: `${imgItem.left}px`,
              top: `${imgItem.top}px`,
              transition: 'left 0.033s linear' // Smooth transition for animation
            }}
            onDragStart={event => event.preventDefault()}
          />
        </Box>
      ))}
    </Box>
  );
}
