import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import SeriesRecordEdit from "./SeriesRecordEdit";
import ppplog from "ppplog";
import ShowDataEditorWhenNecessaryNessLayout from "./ChartEditorLayout";
import ChartColorEdit from "./ChartColorEdit";

export default function ShowDataEditorWhenNecessaryNess() {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [series, setSeries] = useState(null);
  const [colorArray, setColorArray] = useState([]);



  useEffect(() => {
    ppplog('useEffect-sub')
    if (sub) {
      if (sub?.series && Array.isArray(sub.series)) {
        if (!series) {
          setSeries(sub.series)
        }
      }

      if(sub.color && Array.isArray(sub.color)) {
        setColorArray(sub.color);
      }
    }
  }, [sub])

  if (!series) {
    return null;
  }


  // handleUpdate函数在父组件中定义
  function handleUpdate(index, updatedRecord) {

    ppplog('handleUpdate', index, updatedRecord);
    // 使用函数形式的setState，因为我们依赖于旧状态
    setSeries(oldSeries => {
      // 创建新数组以保持不变性
      const newSeries = [...oldSeries];
      // 更新特定索引处的记录
      newSeries[index] = { ...oldSeries[index], data: updatedRecord };
      return newSeries;
    });
  }


  const saveChange = () => {
    ppplog('series', series)



    if (sub) {
      let newSub = {
        ...sub,
        series
      }
      ppplog('colorArray 1', colorArray)

      if (colorArray && Array.isArray(colorArray) && colorArray.length) {
        ppplog('newSub colorArray', colorArray)

        newSub.color = colorArray;
      }

      ppplog('newSub', newSub)

      changeById(activeBox.boxid, {
        ...activeBox,
        sub: newSub,
      });
    }
  }

  if (!series) {
    return null;
  }


  return (
    <ShowDataEditorWhenNecessaryNessLayout saveChange={saveChange} >

      <Box>
        {series.map((seriesRecord, idx) => {

          return <SeriesRecordEdit seriesRecord={seriesRecord} key={idx} onUpdate={(updatedRecord) => handleUpdate(idx, updatedRecord)} />
        })}


        <ChartColorEdit colorArray={colorArray} setColorArray={setColorArray} />

      </Box>


    </ShowDataEditorWhenNecessaryNessLayout>
  );
}
